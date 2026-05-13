export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-surface-950 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center animate-pulse2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="white" fillOpacity="0.9" />
          </svg>
        </div>
        <p className="text-white/40 text-sm tracking-widest uppercase font-medium">NeuraChat</p>
      </div>
    </div>
  );
}
