
import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Message } from '@/contexts/MessagingContext';
import { formatDistanceToNow } from 'date-fns';

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const { user } = useAuth();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!user) return null;

  return (
    <div className="flex flex-col space-y-4 py-4 overflow-y-auto">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500">No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === user.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                message.senderId === user.id
                  ? 'bg-royal text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p>{message.content}</p>
              <div 
                className={`text-xs mt-1 ${
                  message.senderId === user.id ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
              </div>
            </div>
          </div>
        ))
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageList;
