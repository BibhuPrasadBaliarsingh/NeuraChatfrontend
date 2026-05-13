import { Menu } from 'lucide-react';

export default function Header({ chat, onMenuClick }) {
  return (
    <header className="h-14 border-b border-white/8 flex items-center px-4 gap-3 shrink-0 bg-surface-950/60 backdrop-blur-xl">
      <button onClick={onMenuClick} className="btn-ghost p-1.5 md:hidden">
        <Menu size={18} />
      </button>
      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-medium text-white truncate">
          {chat?.title || 'NeuraChat'}
        </h2>
        {chat && (
          <p className="text-xs text-white/30">
            {chat.messages?.length || 0} messages
          </p>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse2" />
        <span className="text-xs text-white/30 hidden sm:inline">Llama 3.1 70B</span>
      </div>
    </header>
  );
}
