
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useBusinesses } from '@/contexts/BusinessesContext';

// Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  businessId?: string;
  lastMessageTime: string;
}

interface MessagingContextType {
  conversations: Conversation[];
  messages: { [conversationId: string]: Message[] };
  sendMessage: (receiverId: string, businessId: string | undefined, content: string) => Promise<boolean>;
  getConversationMessages: (conversationId: string) => Message[];
  getOrCreateConversation: (receiverId: string, businessId?: string) => Promise<string>;
  markAsRead: (conversationId: string) => void;
  loading: boolean;
  error: string | null;
}

// Mock data
let MOCK_CONVERSATIONS: Conversation[] = [];
let MOCK_MESSAGES: { [conversationId: string]: Message[] } = {};

// Helper to generate unique IDs
const generateId = (): string => Math.random().toString(36).substring(2, 15);

// Create context
const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

// Provider Component
export const MessagingProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { businesses } = useBusinesses();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<{ [conversationId: string]: Message[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load conversations and messages
  useEffect(() => {
    const loadMessagingData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Simulate API request
        await new Promise(resolve => setTimeout(resolve, 500));

        // Filter conversations for current user
        const userConversations = MOCK_CONVERSATIONS.filter(
          conv => conv.participantIds.includes(user.id)
        );
        
        // If no conversations exist and we have a business owner, create sample conversations
        if (userConversations.length === 0 && businesses.length > 0) {
          if (user.role === 'business') {
            // For business owner, create a conversation with a sample user
            const sampleConversation: Conversation = {
              id: generateId(),
              participantIds: [user.id, '1'], // '1' is sample user ID
              businessId: businesses.find(b => b.ownerId === user.id)?.id,
              lastMessageTime: new Date().toISOString(),
            };
            
            MOCK_CONVERSATIONS = [sampleConversation];
            
            MOCK_MESSAGES = {
              [sampleConversation.id]: [
                {
                  id: generateId(),
                  senderId: '1',
                  receiverId: user.id,
                  content: 'Hi, I\'m interested in your services for my upcoming wedding.',
                  timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
                  read: true,
                },
                {
                  id: generateId(),
                  senderId: '1',
                  receiverId: user.id,
                  content: 'Do you have availability for June 15th next year?',
                  timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
                  read: false,
                },
              ]
            };
          } else if (user.role === 'user') {
            // For regular user, create sample conversations with businesses
            const sampleConversations = businesses.slice(0, 2).map((business) => {
              const conversationId = generateId();
              
              // Create messages for this conversation
              MOCK_MESSAGES[conversationId] = [
                {
                  id: generateId(),
                  senderId: business.ownerId,
                  receiverId: user.id,
                  content: `Thank you for your interest in ${business.name}. How can we help you?`,
                  timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
                  read: true,
                },
                {
                  id: generateId(),
                  senderId: user.id,
                  receiverId: business.ownerId,
                  content: 'I\'m planning a birthday party and would like to get a quote.',
                  timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
                  read: true,
                },
                {
                  id: generateId(),
                  senderId: business.ownerId,
                  receiverId: user.id,
                  content: "Sure! We'd be happy to provide a quote. Could you tell us more about your event date, number of guests, and location?",
                  timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
                  read: false,
                },
              ];
              
              return {
                id: conversationId,
                participantIds: [user.id, business.ownerId],
                businessId: business.id,
                lastMessageTime: new Date(Date.now() - 43200000).toISOString(),
              };
            });
            
            MOCK_CONVERSATIONS = sampleConversations;
          }
        }
        
        setConversations(MOCK_CONVERSATIONS.filter(conv => conv.participantIds.includes(user.id)));
        setMessages(MOCK_MESSAGES);
      } catch (err) {
        console.error('Error loading messaging data:', err);
        setError('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    loadMessagingData();
  }, [user, businesses]);

  // Send a message
  const sendMessage = async (receiverId: string, businessId: string | undefined, content: string): Promise<boolean> => {
    if (!user) return false;

    try {
      // Find existing conversation or create a new one
      const conversationId = await getOrCreateConversation(receiverId, businessId);
      
      // Create new message
      const newMessage: Message = {
        id: generateId(),
        senderId: user.id,
        receiverId,
        content,
        timestamp: new Date().toISOString(),
        read: false,
      };

      // Update messages state
      const updatedMessages = {
        ...messages,
        [conversationId]: [
          ...(messages[conversationId] || []),
          newMessage
        ]
      };

      // Update conversation last message time
      const updatedConversations = conversations.map(conv => 
        conv.id === conversationId 
          ? { ...conv, lastMessageTime: newMessage.timestamp }
          : conv
      );

      // Update mock data
      MOCK_MESSAGES = updatedMessages;
      MOCK_CONVERSATIONS = MOCK_CONVERSATIONS.map(conv => 
        conv.id === conversationId 
          ? { ...conv, lastMessageTime: newMessage.timestamp }
          : conv
      );

      // Update state
      setMessages(updatedMessages);
      setConversations(updatedConversations);
      
      return true;
    } catch (err) {
      console.error('Error sending message:', err);
      return false;
    }
  };

  // Get messages for a conversation
  const getConversationMessages = (conversationId: string): Message[] => {
    return messages[conversationId] || [];
  };

  // Get existing conversation or create a new one
  const getOrCreateConversation = async (receiverId: string, businessId?: string): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    // Try to find existing conversation
    const existingConversation = conversations.find(conv => 
      conv.participantIds.includes(user.id) && 
      conv.participantIds.includes(receiverId) &&
      (!businessId || conv.businessId === businessId)
    );

    if (existingConversation) {
      return existingConversation.id;
    }

    // Create new conversation
    const newConversation: Conversation = {
      id: generateId(),
      participantIds: [user.id, receiverId],
      businessId,
      lastMessageTime: new Date().toISOString(),
    };

    // Update mock data
    MOCK_CONVERSATIONS = [...MOCK_CONVERSATIONS, newConversation];
    
    // Update state
    setConversations(prev => [...prev, newConversation]);
    
    return newConversation.id;
  };

  // Mark messages as read
  const markAsRead = (conversationId: string) => {
    if (!user || !messages[conversationId]) return;

    const updatedMessages = {
      ...messages,
      [conversationId]: messages[conversationId].map(msg => 
        msg.receiverId === user.id && !msg.read 
          ? { ...msg, read: true } 
          : msg
      )
    };

    // Update mock data
    MOCK_MESSAGES = updatedMessages;
    
    // Update state
    setMessages(updatedMessages);
  };

  return (
    <MessagingContext.Provider
      value={{
        conversations,
        messages,
        sendMessage,
        getConversationMessages,
        getOrCreateConversation,
        markAsRead,
        loading,
        error,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};

// Custom Hook
export const useMessaging = () => {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
};
