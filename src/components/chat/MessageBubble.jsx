import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, User } from 'lucide-react';

const Logo = () => (
  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shrink-0">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="white" />
    </svg>
  </div>
);

function CopyButton({ text, className = '' }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className={`flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors px-2 py-1 rounded ${className}`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

const CodeBlock = ({ inline, className, children }) => {
  const match = /language-(\w+)/.exec(className || '');
  const lang = match?.[1] || 'text';
  const code = String(children).replace(/\n$/, '');

  if (inline) {
    return <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-brand-300">{children}</code>;
  }

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-white/10 bg-surface-950">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/8">
        <span className="text-xs text-white/40 font-mono">{lang}</span>
        <CopyButton text={code} />
      </div>
      <SyntaxHighlighter
        style={oneDark}
        language={lang}
        PreTag="div"
        customStyle={{ margin: 0, background: 'transparent', padding: '16px', fontSize: '13px', fontFamily: 'JetBrains Mono, monospace' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default function MessageBubble({ message, isLast, onRegenerate, showRegenerate }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 px-4 py-5 animate-fadeIn group ${isUser ? 'flex-row-reverse' : ''}`}>
      {isUser ? (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center shrink-0 mt-0.5">
          <User size={14} className="text-white" />
        </div>
      ) : (
        <div className="mt-0.5"><Logo /></div>
      )}

      <div className={`flex flex-col gap-1 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
        {isUser ? (
          <div className="bg-brand-500/20 border border-brand-500/20 rounded-2xl rounded-tr-sm px-4 py-3 text-white text-sm leading-relaxed">
            {message.content}
          </div>
        ) : (
          <div className="prose-ai text-sm text-white/90">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{ code: CodeBlock }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}

        {!isUser && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
            <CopyButton text={message.content} className="bg-white/5 hover:bg-white/10" />
            {isLast && showRegenerate && (
              <button
                onClick={onRegenerate}
                className="flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10"
              >
                ↻ Regenerate
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
