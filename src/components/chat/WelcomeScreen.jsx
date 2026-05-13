import { Sparkles, Code2, BookOpen, Lightbulb } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const suggestions = [
  { icon: Sparkles, label: 'Creative writing', prompt: 'Write a short science fiction story about AI and humanity coexisting in 2150.' },
  { icon: Code2, label: 'Code help', prompt: 'Explain async/await in JavaScript with practical examples.' },
  { icon: BookOpen, label: 'Summarize', prompt: 'Summarize the key concepts of machine learning in simple terms.' },
  { icon: Lightbulb, label: 'Brainstorm', prompt: 'Give me 10 innovative startup ideas in the AI space for 2025.' },
];

export default function WelcomeScreen({ onSuggestion }) {
  const { user } = useAuth();

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 animate-fadeIn">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center mb-6 shadow-2xl shadow-brand-500/20">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="white" fillOpacity="0.95" />
        </svg>
      </div>
      <h1 className="text-3xl font-semibold text-white mb-2">
        Hello, {user?.name?.split(' ')[0] || 'there'} 👋
      </h1>
      <p className="text-white/40 text-base mb-10 text-center max-w-sm">
        I'm NeuraChat, your AI assistant. Ask me anything — I'm here to help.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
        {suggestions.map(({ icon: Icon, label, prompt }) => (
          <button
            key={label}
            onClick={() => onSuggestion(prompt)}
            className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/8
                       hover:bg-white/10 hover:border-white/15 transition-all duration-150 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-500/15 flex items-center justify-center shrink-0 group-hover:bg-brand-500/25 transition-colors">
              <Icon size={15} className="text-brand-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{label}</p>
              <p className="text-xs text-white/35 mt-0.5 line-clamp-2">{prompt}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
