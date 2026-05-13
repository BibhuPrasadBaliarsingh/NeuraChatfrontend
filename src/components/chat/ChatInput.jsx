import { useState, useRef, useEffect } from 'react';
import { Send, Square } from 'lucide-react';

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = Math.min(ref.current.scrollHeight, 200) + 'px';
    }
  }, [value]);

  const handleSubmit = () => {
    const msg = value.trim();
    if (!msg || disabled) return;
    setValue('');
    onSend(msg);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-white/8 bg-surface-900/80 backdrop-blur-xl px-4 py-4">
      <div className="max-w-3xl mx-auto">
        <div className={`flex items-end gap-3 bg-white/5 border rounded-2xl px-4 py-3 transition-all duration-150
          ${disabled ? 'border-white/8' : 'border-white/12 focus-within:border-brand-400/40 focus-within:bg-white/7'}`}>
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKey}
            disabled={disabled}
            placeholder="Message NeuraChat…"
            rows={1}
            className="flex-1 bg-transparent text-white placeholder-white/30 resize-none focus:outline-none text-sm leading-relaxed
                       disabled:opacity-50 disabled:cursor-not-allowed max-h-48 overflow-y-auto"
          />
          <button
            onClick={handleSubmit}
            disabled={!value.trim() || disabled}
            className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 active:scale-90
              ${value.trim() && !disabled
                ? 'bg-brand-500 hover:bg-brand-400 text-white'
                : 'bg-white/8 text-white/25 cursor-not-allowed'}`}
          >
            {disabled ? <Square size={14} fill="currentColor" /> : <Send size={14} />}
          </button>
        </div>
        <p className="text-center text-white/20 text-xs mt-2">
          Press <kbd className="bg-white/8 px-1 rounded text-white/30">Enter</kbd> to send · <kbd className="bg-white/8 px-1 rounded text-white/30">Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}
