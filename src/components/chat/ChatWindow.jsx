import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble.jsx';
import TypingIndicator from './TypingIndicator.jsx';
import WelcomeScreen from './WelcomeScreen.jsx';
import ChatInput from './ChatInput.jsx';
import { MessageSkeleton } from '../ui/Skeleton.jsx';

export default function ChatWindow({ chat, loading, sending, onSend, onRegenerate }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages, sending]);

  const handleSend = (msg) => onSend(msg);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div>
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
          </div>
        ) : !chat ? (
          <WelcomeScreen onSuggestion={handleSend} />
        ) : (
          <div className="max-w-3xl mx-auto py-4">
            {chat.messages.map((msg, i) => (
              <MessageBubble
                key={msg._id || i}
                message={msg}
                isLast={i === chat.messages.length - 1}
                onRegenerate={onRegenerate}
                showRegenerate={!sending}
              />
            ))}
            {sending && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>
        )}
      </div>
      <ChatInput onSend={handleSend} disabled={sending || loading} />
    </div>
  );
}
