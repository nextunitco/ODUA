import React from 'react';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';

export interface BreadcrumbItem {
  label: string;
  page?: string;
  active?: boolean;
}

export interface WordPressPageHeaderProps {
  title: string;
  subtitle?: string;
  category?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  onNavigate?: (page: string) => void;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  align?: 'left' | 'center';
  backgroundImage?: string;
}

export default function WordPressPageHeader({
  title,
  subtitle,
  category,
  badge,
  breadcrumbs = [],
  onNavigate = () => {},
  action,
  icon,
  align = 'left',
  backgroundImage
}: WordPressPageHeaderProps) {
  // Guaranteed high-resolution corporate background image fallback
  const activeBgImage = backgroundImage || HERO_BACKGROUNDS.aboutUs || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80";

  return (
    <section className="relative text-white pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-emerald-900/30 bg-neutral-950 min-h-[280px] sm:min-h-[320px] md:min-h-[360px] flex flex-col justify-end">
      {/* High-Impact Clearly Visible Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={activeBgImage}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.72] sm:brightness-[0.75] contrast-105 saturate-105 scale-100 transition-transform duration-1000 ease-out"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80";
          }}
        />
        
        {/* Calibrated Multi-Stop Overlays:
            - Left/Center: Smooth dark vignette ensures 100% WCAG contrast for text and breadcrumbs
            - Right/Background: Translucent gradient lets the photography, buildings, and imagery remain clearly visible
            - Top/Bottom: Soft blend into the transparent navbar above and content section below
        */}
        <div className={`absolute inset-0 pointer-events-none ${
          align === 'center'
            ? 'bg-gradient-to-b from-neutral-950/75 via-neutral-950/50 to-neutral-950/80'
            : 'bg-gradient-to-r from-neutral-950/90 via-neutral-950/65 to-neutral-950/35'
        }`} />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/45 pointer-events-none" />
        <div className="absolute inset-0 bg-[#00a757]/10 mix-blend-overlay pointer-events-none" />
      </div>

      {/* Subtle executive geometric texture */}
      <div className="absolute inset-0 z-1 opacity-[0.04] bg-[radial-gradient(#00a757_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute -top-24 right-1/4 z-1 w-96 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        {/* Header Content Grid / Flex */}
        <div className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'sm:flex-row sm:items-end justify-between text-left'} gap-4`}>
          <div className="max-w-3xl space-y-2.5">
            {(badge || category) && (
              <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-[#fce303] shadow-md backdrop-blur-md">
                {icon && <span className="w-3.5 h-3.5 flex items-center justify-center">{icon}</span>}
                <span>{badge || category}</span>
              </div>
            )}

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-md">
              {title}
            </h1>

            {subtitle && (
              <p className="text-neutral-100 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl drop-shadow-xs">
                {subtitle}
              </p>
            )}
          </div>

          {action && (
            <div className="shrink-0 pt-2 sm:pt-0">
              {action}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
