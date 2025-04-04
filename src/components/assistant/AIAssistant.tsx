
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Mic, MicOff, Send, X, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { parseSearchQuery } from '@/utils/searchQueryParser';
import { useBusinesses } from '@/contexts/BusinessesContext';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { businesses } = useBusinesses();
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<{type: 'user' | 'assistant', content: string}[]>([
    { type: 'assistant', content: 'Hello! I can help you find event services. Try asking me something like "Find a caterer in Mumbai under 50000" or "I need a photographer in Delhi".' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  
  // Set up speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleSearch(transcript);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast.error("Couldn't access microphone. Please ensure you've granted permission.");
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        toast.error("Failed to start listening. Please try again.");
      }
    }
  };

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
        
        // Push response message and navigate after a delay
        setMessages(prev => [...prev, { type: 'assistant', content: response }]);
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

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">AI Event Assistant</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[400px]">
          {/* Messages container */}
          <div className="flex-1 overflow-y-auto mb-4 p-4 rounded-md bg-gray-50">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-3 ${message.type === 'user' ? 'text-right' : ''}`}
              >
                <div 
                  className={`inline-block px-3 py-2 rounded-lg max-w-[80%] ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="mb-3">
                <div className="inline-block px-3 py-2 bg-gray-200 text-gray-900 rounded-lg">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Button
              type="button"
              variant={isListening ? "destructive" : "outline"}
              size="icon"
              onClick={toggleListening}
              className="flex-shrink-0"
              title={isListening ? "Stop listening" : "Start voice input"}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me to find services for you..."
              className="flex-1"
              disabled={isProcessing}
            />
            
            <Button 
              type="submit" 
              size="icon"
              disabled={!query.trim() || isProcessing}
              className="flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIAssistant;
