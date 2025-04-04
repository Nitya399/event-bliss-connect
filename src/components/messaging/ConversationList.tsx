
import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useBusinesses } from '@/contexts/BusinessesContext';
import { Conversation, useMessaging } from '@/contexts/MessagingContext';
import { formatDistanceToNow } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ConversationListProps {
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
}

const ConversationList = ({ 
  selectedConversationId, 
  onSelectConversation 
}: ConversationListProps) => {
  const { user } = useAuth();
  const { businesses } = useBusinesses();
  const { conversations, messages } = useMessaging();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sort conversations by last message time (most recent first)
  const sortedConversations = useMemo(() => {
    return [...conversations].sort((a, b) => 
      new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    );
  }, [conversations]);
  
  // Filter conversations by search term
  const filteredConversations = useMemo(() => {
    if (!searchTerm) return sortedConversations;
    
    return sortedConversations.filter(conversation => {
      const business = conversation.businessId 
        ? businesses.find(b => b.id === conversation.businessId)
        : null;
        
      return business?.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [sortedConversations, searchTerm, businesses]);
  
  // Check if conversation has unread messages
  const hasUnreadMessages = (conversation: Conversation) => {
    if (!user) return false;
    
    return messages[conversation.id]?.some(
      message => message.receiverId === user.id && !message.read
    ) || false;
  };
  
  // Get the other participant's info
  const getConversationInfo = (conversation: Conversation) => {
    if (!user) return { name: '', image: '' };
    
    // If conversation has a businessId, use the business info
    if (conversation.businessId) {
      const business = businesses.find(b => b.id === conversation.businessId);
      if (business) {
        return {
          name: business.name,
          image: business.profileImage || ''
        };
      }
    }
    
    // Fallback to generic name
    return {
      name: user.role === 'business' ? 'Event Host' : 'Business',
      image: ''
    };
  };
  
  // Get the last message for a conversation
  const getLastMessage = (conversation: Conversation) => {
    const conversationMessages = messages[conversation.id] || [];
    if (conversationMessages.length === 0) {
      return { text: 'No messages yet', time: conversation.lastMessageTime };
    }
    
    const lastMessage = conversationMessages[conversationMessages.length - 1];
    return {
      text: lastMessage.content.length > 35 
        ? lastMessage.content.substring(0, 35) + '...' 
        : lastMessage.content,
      time: lastMessage.timestamp
    };
  };
  
  if (!user) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Search bar */}
      <div className="p-2 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search conversations"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No conversations found</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => {
            const { name, image } = getConversationInfo(conversation);
            const lastMessage = getLastMessage(conversation);
            const isUnread = hasUnreadMessages(conversation);
            
            return (
              <div
                key={conversation.id}
                className={`p-3 cursor-pointer ${
                  selectedConversationId === conversation.id
                    ? 'bg-gray-100'
                    : 'hover:bg-gray-50'
                } ${isUnread ? 'font-semibold' : ''}`}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                    {image ? (
                      <img src={image} alt={name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-royal text-white font-semibold">
                        {name.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className={`block truncate ${isUnread ? 'text-royal' : ''}`}>{name}</span>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(lastMessage.time), { addSuffix: true })}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 truncate">
                      {isUnread && <span className="inline-block w-2 h-2 bg-royal rounded-full mr-1"></span>}
                      {lastMessage.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationList;
