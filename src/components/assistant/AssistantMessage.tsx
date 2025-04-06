
import React from 'react';
import { Loader2 } from 'lucide-react';

export type MessageType = {
  type: 'user' | 'assistant';
  content: string;
};

interface MessageProps {
  message: MessageType;
}

export const AssistantMessage: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className={`mb-3 ${message.type === 'user' ? 'text-right' : ''}`}>
      <div 
        className={`inline-block px-3 py-2 rounded-lg max-w-[80%] ${
          message.type === 'user' 
            ? 'bg-royal text-white' 
            : 'bg-gray-200 text-gray-900'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export const ProcessingIndicator: React.FC = () => {
  return (
    <div className="mb-3">
      <div className="inline-block px-3 py-2 bg-gray-200 text-gray-900 rounded-lg">
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
    </div>
  );
};
