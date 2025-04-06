
import React, { useRef, useEffect } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AssistantInputProps {
  query: string;
  setQuery: (query: string) => void;
  isListening: boolean;
  toggleListening: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  isProcessing: boolean;
}

export const AssistantInput: React.FC<AssistantInputProps> = ({ 
  query, 
  setQuery, 
  isListening, 
  toggleListening, 
  handleSubmit, 
  isProcessing 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current && !isProcessing) {
      inputRef.current.focus();
    }
  }, [isProcessing]);

  return (
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
  );
};
