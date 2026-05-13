import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Plus, Search, Trash2, MessageSquare, Sun, Moon,
  LogOut, ChevronLeft, ChevronRight, X, User,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { SidebarSkeleton } from '../ui/Skeleton.jsx';

export default function Sidebar({ chats, loading, onDelete, onClearAll, collapsed, setCollapsed }) {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(chats);

  useEffect(() => {
    if (!search.trim()) { setFiltered(chats); return; }
    setFiltered(chats.filter((c) => c.title.toLowerCase().includes(search.toLowerCase())));
  }, [search, chats]);

  const groups = groupByDate(filtered);

  return (
    <>
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
      <aside
        className={`
          fixed md:relative z-20 h-full flex flex-col
          bg-surface-900 border-r border-white/8
          transition-all duration-300 ease-in-out shrink-0
          ${collapsed ? 'w-0 overflow-hidden md:w-16' : 'w-72'}
        `}
      >
        <div className={`flex items-center h-14 px-3 border-b border-white/8 shrink-0 ${collapsed && 'md:justify-center'}`}>
          {!collapsed && (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="white" />
                </svg>
              </div>
              <span className="font-semibold text-white tracking-tight">NeuraChat</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="btn-ghost p-1.5 rounded-lg ml-auto"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {!collapsed && (
          <>
            <div className="p-2 shrink-0">
              <button
                onClick={() => navigate('/')}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-brand-500/20 hover:bg-brand-500/30
                           text-brand-300 font-medium text-sm transition-all duration-150 border border-brand-500/20"
              >
                <Plus size={16} />
                New Chat
              </button>
            </div>

            <div className="px-2 pb-2 shrink-0">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search chats…"
                  className="w-full bg-white/5 border border-white/8 rounded-lg pl-8 pr-3 py-2 text-sm text-white
                             placeholder-white/25 focus:outline-none focus:border-brand-400/40"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 space-y-4 py-1">
              {loading ? (
                <SidebarSkeleton />
              ) : filtered.length === 0 ? (
                <p className="text-white/25 text-xs text-center py-8">No chats found</p>
              ) : (
                Object.entries(groups).map(([label, items]) => (
                  <div key={label}>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest font-medium px-2 mb-1">{label}</p>
                    <div className="space-y-0.5">
                      {items.map((chat) => (
                        <ChatItem
                          key={chat._id}
                          chat={chat}
                          active={chat._id === chatId}
                          onDelete={onDelete}
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </nav>

            <div className="border-t border-white/8 p-2 space-y-1 shrink-0">
              {chats.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-400/70 hover:text-red-400
                             hover:bg-red-400/10 text-sm transition-all duration-150"
                >
                  <Trash2 size={14} />
                  Clear all chats
                </button>
              )}
              <button
                onClick={toggle}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white/50 hover:text-white
                           hover:bg-white/8 text-sm transition-all duration-150"
              >
                {dark ? <Sun size={14} /> : <Moon size={14} />}
                {dark ? 'Light mode' : 'Dark mode'}
              </button>
            </div>

            <div className="border-t border-white/8 p-2 shrink-0">
              <div className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/5 group">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center text-xs font-semibold shrink-0">
                  {user?.name?.[0]?.toUpperCase() || <User size={12} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                  <p className="text-xs text-white/35 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-white transition-all"
                  title="Logout"
                >
                  <LogOut size={14} />
                </button>
              </div>
            </div>
          </>
        )}

        {collapsed && (
          <div className="hidden md:flex flex-col items-center py-3 gap-2">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg bg-brand-500/20 text-brand-300 hover:bg-brand-500/30 transition-colors"
              title="New Chat"
            >
              <Plus size={18} />
            </button>
            <button onClick={toggle} className="btn-ghost p-2" title="Toggle theme">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={logout} className="btn-ghost p-2 mt-auto" title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function ChatItem({ chat, active, onDelete }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-all duration-150
        ${active ? 'bg-brand-500/20 text-white' : 'text-white/60 hover:text-white hover:bg-white/6'}`}
      onClick={() => navigate(`/chat/${chat._id}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <MessageSquare size={13} className="shrink-0 opacity-60" />
      <span className="flex-1 truncate">{chat.title}</span>
      {hover && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(chat._id); }}
          className="shrink-0 text-white/30 hover:text-red-400 transition-colors"
        >
          <Trash2 size={12} />
        </button>
      )}
    </div>
  );
}

function groupByDate(chats) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const week = new Date(today);
  week.setDate(week.getDate() - 7);

  const groups = { Today: [], Yesterday: [], 'This week': [], Older: [] };

  chats.forEach((chat) => {
    const d = new Date(chat.updatedAt);
    if (d >= today) groups['Today'].push(chat);
    else if (d >= yesterday) groups['Yesterday'].push(chat);
    else if (d >= week) groups['This week'].push(chat);
    else groups['Older'].push(chat);
  });

  return Object.fromEntries(Object.entries(groups).filter(([, v]) => v.length > 0));
}
