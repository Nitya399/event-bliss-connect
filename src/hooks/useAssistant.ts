
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { parseSearchQuery } from '@/utils/searchQueryParser';
import { MessageType } from '@/components/assistant/AssistantMessage';

export const useAssistant = (onClose: () => void) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    { type: 'assistant', content: 'Hello! I can help you find event services. Try asking me something like "Find a caterer in Mumbai under 50000" or "I need a photographer in Delhi".' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsProcessing(true);
    setMessages(prev => [...prev, { type: 'user', content: searchQuery }]);
    
    try {
      // Parse the natural language query
      const params = parseSearchQuery(searchQuery);
      
      // Small delay to simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 800));

      // Generate response based on query parameters
      let response = '';
      
      if (params.category || params.location || params.minPrice !== undefined || params.maxPrice !== undefined) {
        // Build response containing parsed parameters
        const parts = ["I'll look for"];
        
        if (params.category) {
          parts.push(`${params.category} services`);
        } else {
          parts.push("all services");
        }
        
        if (params.location) {
          parts.push(`in ${params.location}`);
        }
        
        if (params.minPrice !== undefined && params.maxPrice !== undefined) {
          parts.push(`with prices between ₹${params.minPrice} and ₹${params.maxPrice}`);
        } else if (params.minPrice !== undefined) {
          parts.push(`with prices above ₹${params.minPrice}`);
        } else if (params.maxPrice !== undefined) {
          parts.push(`with prices under ₹${params.maxPrice}`);
        }
        
        response = `${parts.join(" ")}. Redirecting you to the search results page.`;
        
        // Add the search parameters to the URL and navigate
        const searchParams = new URLSearchParams();
        
        if (params.category) {
          searchParams.append('category', params.category);
        }
        
        if (params.location) {
          searchParams.append('location', params.location);
        }
        
        if (params.minPrice !== undefined) {
          searchParams.append('minPrice', params.minPrice.toString());
        }
        
        if (params.maxPrice !== undefined) {
          searchParams.append('maxPrice', params.maxPrice.toString());
        }
        
        // Push response message
        setMessages(prev => [...prev, { type: 'assistant', content: response }]);
        
        // Always navigate to the businesses page regardless of current location
        setTimeout(() => {
          navigate(`/businesses?${searchParams.toString()}`);
          onClose();
        }, 1500);
      } else {
        // Generic response for queries we couldn't parse
        response = "I'm not sure I understood what you're looking for. Could you try being more specific? For example, try asking for 'photographers in Mumbai' or 'caterer under 50000 in Delhi'.";
        setMessages(prev => [...prev, { type: 'assistant', content: response }]);
      }
    } catch (error) {
      console.error('Error processing search query:', error);
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        content: "Sorry, I had trouble processing your request. Please try again." 
      }]);
    } finally {
      setIsProcessing(false);
      setQuery('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isProcessing) {
      handleSearch(query);
    }
  };

  const handleSpeechResult = (transcript: string) => {
    setQuery(transcript);
    handleSearch(transcript);
  };

  return {
    query,
    setQuery,
    isProcessing,
    messages,
    messagesEndRef,
    handleSearch,
    handleSubmit,
    handleSpeechResult
  };
};
