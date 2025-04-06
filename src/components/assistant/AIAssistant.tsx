
import React, { useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AssistantMessage, ProcessingIndicator } from './AssistantMessage';
import { AssistantInput } from './AssistantInput';
import { useAssistant } from '@/hooks/useAssistant';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const { 
    query, 
    setQuery, 
    isProcessing, 
    messages, 
    messagesEndRef, 
    handleSubmit,
    handleSpeechResult
  } = useAssistant(onClose);
  
  const { isListening, toggleListening } = useSpeechRecognition({ 
    onTranscript: handleSpeechResult 
  });
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">AI Event Assistant</DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-500">
            Ask me to find services for you or help navigate the platform
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-[400px]">
          {/* Messages container */}
          <div className="flex-1 overflow-y-auto mb-4 p-4 rounded-md bg-gray-50">
            {messages.map((message, index) => (
              <AssistantMessage key={index} message={message} />
            ))}
            {isProcessing && <ProcessingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <AssistantInput 
            query={query}
            setQuery={setQuery}
            isListening={isListening}
            toggleListening={toggleListening}
            handleSubmit={handleSubmit}
            isProcessing={isProcessing}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIAssistant;
