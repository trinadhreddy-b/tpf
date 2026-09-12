import React from 'react';
import { useStore } from '../context/StoreContext';
import { Palette, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { settings, setIsThemeDrawerOpen } = useStore();

  return (
    <div
      id="announcement-bar"
      className="bg-brand-primary text-brand-on-primary py-2 px-4 text-xs sm:text-sm font-sans-brand transition-colors overflow-hidden"
      style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Scrolling Announcement */}
        <div className="overflow-hidden flex-1 relative">
          <div className="animate-marquee flex items-center shrink-0 cursor-default">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-2 pr-12 shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-amber-200 shrink-0 animate-pulse" />
                <span className="font-medium tracking-wide">{settings.announcement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Theme Button */}
        <div className="flex items-center shrink-0 z-10 pl-2">
          <button
            id="quick-theme-btn"
            onClick={() => setIsThemeDrawerOpen(true)}
            className="flex items-center gap-1 opacity-90 hover:opacity-100 hover:underline cursor-pointer text-xs font-semibold tracking-wider uppercase font-label-brand px-2 py-0.5 rounded transition"
          >
            <Palette className="w-3 h-3" />
            <span>Theme</span>
          </button>
        </div>
      </div>
    </div>
  );
};
