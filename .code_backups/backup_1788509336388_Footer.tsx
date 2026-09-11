import React, { useState } from 'react';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Settings, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Check, 
  Shield, 
  Building2, 
  Award, 
  Clock, 
  Globe, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';

export type FooterStyleType = 
  | 'corporate-dark' 
  | 'executive-heritage' 
  | 'minimal-clean' 
  | 'sovereign-mega' 
  | 'modern-bento';

interface FooterProps {
  footerStyle?: FooterStyleType;
  currentTheme: {
    name: string;
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
  };
  activeGeneralSettings: any;
  navLinks: string[];
  isPortalMode: boolean;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  navigateToPage: (page: string) => void;
  setIsCalculatorOpen: (open: boolean) => void;
  southwestStates?: Record<string, any>;
}

export default function Footer({
  footerStyle = 'corporate-dark',
  currentTheme,
  activeGeneralSettings,
  navLinks,
  isPortalMode,
  currentPage,
  setCurrentPage,
  navigateToPage,
  setIsCalculatorOpen,
  southwestStates
}: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterSubscribed(false);
      setNewsletterEmail('');
    }, 3500);
  };

  const statesList = [
    { name: 'Oyo State', capital: 'Ibadan', role: 'Headquarters & Cocoa House' },
    { name: 'Ogun State', capital: 'Abeokuta', role: 'Industrial Powerhouse' },
    { name: 'Ondo State', capital: 'Akure', role: 'Agro & Maritime Corridor' },
    { name: 'Osun State', capital: 'Osogbo', role: 'Heritage & Youth Farming' },
    { name: 'Ekiti State', capital: 'Ado-Ekiti', role: 'Knowledge Zone & Tech' },
    { name: 'Lagos State', capital: 'Ikeja', role: 'Financial Metropolis' }
  ];

  // -------------------------------------------------------------
  // STYLE 2: EXECUTIVE HERITAGE (Deep Forest Green Gradient & State Badges)
  // -------------------------------------------------------------
  if (footerStyle === 'executive-heritage') {
    return (
      <footer id="main-site-footer" className="bg-gradient-to-b from-[#062615] via-[#03180d] to-[#010d07] text-white border-t-2 border-[#fce303]/40 relative overflow-hidden transition-all duration-300">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00a757]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#fce303]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Tier: 6 Shareholder States Sovereign Banner */}
        <div className="border-b border-white/10 bg-black/30 backdrop-blur-sm py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#fce303] animate-pulse" />
                <span className="text-xs uppercase tracking-widest font-mono font-bold text-[#fce303]">
                  Owned by the 6 Sovereign States of Southwest Nigeria:
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {statesList.map((st) => (
                  <button
                    key={st.name}
                    onClick={() => {
                      setCurrentPage('Who We Are');
                    }}
                    className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white/90 transition-all flex items-center gap-1.5 cursor-pointer hover:border-[#fce303]/40"
                  >
                    <span className="text-[11px]">🏛️</span>
                    <span>{st.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Tier: 4 Columns with Rich Visual Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* Col 1: Group Identity & Cocoa House Card */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg p-1.5 ring-2 ring-[#fce303]/30">
                  <img 
                    src="https://i.postimg.cc/mg37tmcB/logo.png" 
                    alt="Odu'a Logo" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-serif font-black text-xl tracking-wide text-white leading-none">
                    {activeGeneralSettings?.siteName?.toUpperCase() || "ODU'A"}
                  </h3>
                  <span className="text-[9px] uppercase tracking-widest font-black text-[#fce303] block mt-1">
                    INVESTMENT COMPANY LIMITED
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                <div className="flex items-start gap-2 text-white/80">
                  <MapPin className="w-4 h-4 text-[#fce303] shrink-0 mt-0.5" />
                  <span className="leading-snug text-[11.5px]">
                    {activeGeneralSettings?.address || "Floors 20-23, Cocoa House, Dugbe, Ibadan, Oyo State, Nigeria."}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/80 pt-1 border-t border-white/10">
                  <Phone className="w-3.5 h-3.5 text-[#00a757]" />
                  <span className="text-[11.5px] font-mono">{activeGeneralSettings?.phone || "+234 2 241 0835"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-white/60">
                <span className="text-[10px] uppercase font-mono tracking-wider">Follow:</span>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-white/5 hover:bg-white/20 text-white transition-colors" title="LinkedIn">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-white/5 hover:bg-white/20 text-white transition-colors" title="Twitter">
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-white/5 hover:bg-white/20 text-white transition-colors" title="Facebook">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#fce303] font-mono flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-[#00a757]" /> Corporate Navigation
              </h4>
              <ul className="grid grid-cols-1 gap-2 text-xs text-white/80 font-medium">
                {navLinks.map((link) => (
                  <li key={link}>
                    <button 
                      onClick={() => setCurrentPage(link)}
                      className="hover:text-[#fce303] hover:translate-x-1 transition-all cursor-pointer flex items-center gap-1.5 text-left"
                    >
                      <span className="text-white/30 text-[10px]">•</span>
                      <span>{link}</span>
                    </button>
                  </li>
                ))}
                {isPortalMode && (
                  <li className="pt-2 border-t border-white/10">
                    <button 
                      onClick={() => setCurrentPage('Admin')}
                      className="text-[#00a757] hover:text-[#fce303] font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span>Admin Management Console</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Col 3: Strategic Portals & Subsidiaries */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#fce303] font-mono flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#00a757]" /> Subsidiaries & Portals
              </h4>
              <ul className="space-y-2 text-xs text-white/80 font-medium">
                <li>
                  <button onClick={() => setCurrentPage('Subsidiaries Directory')} className="hover:text-[#fce303] transition-colors cursor-pointer text-left flex items-center gap-1.5">
                    <span>🏢</span> Wemabod & Real Estate Holdings
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('Our Subsidiaries')} className="hover:text-[#fce303] transition-colors cursor-pointer text-left flex items-center gap-1.5">
                    <span>🌾</span> SWAgCo Agricultural Hubs
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsCalculatorOpen(true)} className="text-[#00a757] hover:text-[#fce303] font-bold transition-colors cursor-pointer text-left flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> Co-Investment Yield Simulator
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('Odu\'a Foundation')} className="hover:text-[#fce303] transition-colors cursor-pointer text-left flex items-center gap-1.5">
                    <span>🌱</span> Odu'a Foundation (CSR & Youth)
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('Golden Jubilee')} className="hover:text-[#fce303] transition-colors cursor-pointer text-left flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#fce303]" /> 50-Year Golden Jubilee (1976-2026)
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Institutional Digest Newsletter */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#fce303] font-mono flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#00a757]" /> Executive Briefing
              </h4>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Subscribe for quarterly investor reports, state infrastructure announcements, and board communiqués.
              </p>

              {newsletterSubscribed ? (
                <div className="p-3.5 rounded-xl bg-[#00a757]/20 border border-[#00a757] text-white text-xs text-center font-bold flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-[#fce303]" />
                  <span>Subscribed to Executive Digest</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="official.email@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#fce303]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#fce303] hover:bg-[#e6cf02] text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
                  >
                    <span>Receive Briefings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Bottom Tier: Governance Legal & Jubilee Badge */}
        <div className="border-t border-white/10 bg-black/50 py-5 text-center text-xs text-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-[11px]">
              © {new Date().getFullYear()} Odu’a Investment Company Limited. RC 18274. Sovereign asset vehicle of Oyo, Ogun, Ondo, Osun, Ekiti & Lagos.
            </p>
            <div className="flex items-center gap-4 text-[11px]">
              <button onClick={() => setCurrentPage('Governance & Whistleblowing')} className="hover:text-white transition-colors cursor-pointer">
                Ethics & Whistleblowing
              </button>
              <span>•</span>
              <button onClick={() => navigateToPage('DISCLAIMERS')} className="hover:text-white transition-colors cursor-pointer">
                Fiduciary Disclaimers
              </button>
              <span>•</span>
              <button onClick={() => navigateToPage('Contact')} className="hover:text-white transition-colors cursor-pointer">
                Investor Desk
              </button>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // -------------------------------------------------------------
  // STYLE 3: MINIMAL CLEAN (High-End Editorial Luxury & Floating Pill)
  // -------------------------------------------------------------
  if (footerStyle === 'minimal-clean') {
    return (
      <footer id="main-site-footer" className="bg-neutral-950 text-neutral-200 border-t border-neutral-800 py-16 relative overflow-hidden transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Top Big Statement Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-10 border-b border-neutral-800">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Institutional Fiduciary</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
                Pioneering Sustainable Wealth Across Southwest Nigeria
              </h3>
            </div>

            {/* Floating Newsletter Pill */}
            <div className="w-full lg:w-auto">
              {newsletterSubscribed ? (
                <div className="px-6 py-3 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Subscribed to Odu'a Corporate Releases</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex items-center rounded-full bg-neutral-900 border border-neutral-700/80 p-1.5 w-full sm:w-96 shadow-inner">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter official email..."
                    className="flex-1 bg-transparent px-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-neutral-950 shrink-0"
                    style={{ backgroundColor: currentTheme.secondary }}
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Middle Nav Row */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.postimg.cc/mg37tmcB/logo.png" 
                alt="Odu'a Logo" 
                className="w-8 h-8 object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="font-serif font-bold text-white tracking-wider text-base">
                ODU'A INVESTMENT COMPANY
              </span>
            </div>

            {/* Horizontal Links */}
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-neutral-400">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => setCurrentPage(link)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {link}
                </button>
              ))}
              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer font-bold"
              >
                Yield Calculator
              </button>
              {isPortalMode && (
                <button
                  onClick={() => setCurrentPage('Admin')}
                  className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-bold"
                >
                  Admin Portal
                </button>
              )}
            </nav>
          </div>

          {/* Bottom Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-900 text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} Odu’a Investment Company Ltd. Cocoa House, Ibadan. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setCurrentPage('Governance & Whistleblowing')} className="hover:text-neutral-300">Compliance</button>
              <span>•</span>
              <button onClick={() => navigateToPage('DISCLAIMERS')} className="hover:text-neutral-300">Disclaimers</button>
              <span>•</span>
              <button onClick={() => navigateToPage('Contact')} className="hover:text-neutral-300">Contact</button>
            </div>
          </div>

        </div>
      </footer>
    );
  }

  // -------------------------------------------------------------
  // STYLE 4: SOVEREIGN MEGA (Institutional 5-Column Multi-Deck)
  // -------------------------------------------------------------
  if (footerStyle === 'sovereign-mega') {
    return (
      <footer id="main-site-footer" className="bg-[#0b1320] text-slate-200 border-t-4 border-[#00a757] py-14 relative transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Top 5-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Col 1: Identity & Sovereign Trust */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-white rounded-lg p-1 flex items-center justify-center">
                  <img src="https://i.postimg.cc/mg37tmcB/logo.png" alt="Odu'a" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-serif font-black text-white text-base leading-none">ODU'A</h4>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold tracking-widest uppercase">SOVEREIGN TRUST</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Managing ₦300B+ in multi-sector sovereign assets for Oyo, Ogun, Ondo, Osun, Ekiti, and Lagos States.
              </p>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] space-y-1">
                <span className="text-emerald-400 font-bold block font-mono">CREDIT RATING: Aa-</span>
                <span className="text-slate-400 text-[10px]">Agusto & Co (Stable Outlook)</span>
              </div>
            </div>

            {/* Col 2: High-Yield Portfolios */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Asset Portfolios</h5>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><button onClick={() => setCurrentPage('Portfolio')} className="hover:text-white cursor-pointer">Real Estate & Skyline</button></li>
                <li><button onClick={() => setCurrentPage('Portfolio')} className="hover:text-white cursor-pointer">Agro-Industrial Value Chain</button></li>
                <li><button onClick={() => setCurrentPage('Portfolio')} className="hover:text-white cursor-pointer">Energy & Green Transition</button></li>
                <li><button onClick={() => setCurrentPage('Portfolio')} className="hover:text-white cursor-pointer">Hospitality & Tourism</button></li>
                <li><button onClick={() => setCurrentPage('Portfolio')} className="hover:text-white cursor-pointer">Financial & Venture Sandboxes</button></li>
              </ul>
            </div>

            {/* Col 3: Corporate Governance */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Governance & Ethics</h5>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><button onClick={() => setCurrentPage('Board of Directors')} className="hover:text-white cursor-pointer">Board of Directors</button></li>
                <li><button onClick={() => setCurrentPage('Leadership Team')} className="hover:text-white cursor-pointer">Executive Leadership</button></li>
                <li><button onClick={() => setCurrentPage('Governance & Whistleblowing')} className="hover:text-white cursor-pointer">Whistleblowing Hotline</button></li>
                <li><button onClick={() => setCurrentPage('Investors')} className="hover:text-white cursor-pointer">Audit & Risk Management</button></li>
                <li><button onClick={() => navigateToPage('DISCLAIMERS')} className="hover:text-white cursor-pointer">Fiduciary Statement</button></li>
              </ul>
            </div>

            {/* Col 4: Subsidiaries & Foundation */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Key Subsidiaries</h5>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><button onClick={() => setCurrentPage('Subsidiaries Directory')} className="hover:text-white cursor-pointer">Wemabod Real Estate</button></li>
                <li><button onClick={() => setCurrentPage('Subsidiaries Directory')} className="hover:text-white cursor-pointer">SWAgCo Agricultural Corp</button></li>
                <li><button onClick={() => setCurrentPage('Subsidiaries Directory')} className="hover:text-white cursor-pointer">Premier Hotel Ibadan</button></li>
                <li><button onClick={() => setCurrentPage('Subsidiaries Directory')} className="hover:text-white cursor-pointer">Lafia Hotel Hospitality</button></li>
                <li><button onClick={() => setCurrentPage('Odu\'a Foundation')} className="hover:text-white cursor-pointer">Odu'a Foundation (CSR)</button></li>
              </ul>
            </div>

            {/* Col 5: Investor Desk & Contact */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Headquarters</h5>
              <div className="text-xs text-slate-400 space-y-1.5">
                <p>Floors 20-23, Cocoa House, Dugbe, Ibadan, Oyo State, Nigeria.</p>
                <p className="font-mono text-slate-300">Tel: +234 2 241 0835</p>
                <p className="font-mono text-slate-300">Email: info@oduainvestment.com.ng</p>
              </div>
              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Yield Simulator</span>
              </button>
            </div>

          </div>

          {/* Bottom Row */}
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Odu’a Investment Company Limited. 50 Years of Sovereign Stewardship (1976-2026).</p>
            {isPortalMode && (
              <button onClick={() => setCurrentPage('Admin')} className="text-amber-400 font-bold hover:underline">
                ⚙️ Admin Control Center
              </button>
            )}
          </div>

        </div>
      </footer>
    );
  }

  // -------------------------------------------------------------
  // STYLE 5: MODERN BENTO (Modular Bento-Grid Segmented Layout)
  // -------------------------------------------------------------
  if (footerStyle === 'modern-bento') {
    return (
      <footer id="main-site-footer" className="bg-[#121418] text-white py-14 border-t border-neutral-800 relative transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            
            {/* Bento Card 1: Brand & Cocoa House Hero (Spans 2 cols on Desktop) */}
            <div className="lg:col-span-2 p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-all shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl p-1 flex items-center justify-center">
                    <img src="https://i.postimg.cc/mg37tmcB/logo.png" alt="Odu'a Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-serif font-black text-xl text-white">ODU'A INVESTMENT</h4>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">ESTABLISHED 1976 • IBADAN, NIGERIA</span>
                  </div>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  The sovereign economic engine of Southwest Nigeria, fostering industrialization, sustainable food security, and world-class commercial infrastructure across generations.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-800 text-xs">
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Cocoa House, Dugbe, Ibadan</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono">+234 2 241 0835</span>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Interactive Co-Investment & Yield Shortcut */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#06331a] to-[#02180d] border border-emerald-500/30 flex flex-col justify-between space-y-4 shadow-lg">
              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase inline-block">
                  Co-Investment Desk
                </span>
                <h4 className="font-serif font-bold text-lg text-white">Yield Calculator</h4>
                <p className="text-xs text-emerald-100/70 leading-snug">
                  Model institutional capital returns across Real Estate, Agro-hubs, and Energy portfolios.
                </p>
              </div>
              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="w-full py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow"
              >
                <span>Launch Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bento Card 3: Newsletter & Direct Briefings */}
            <div className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between space-y-4 shadow-sm">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                  Institutional Dispatch
                </span>
                <h4 className="font-bold text-base text-white">Subscribe to News</h4>
                <p className="text-xs text-neutral-400">
                  Quarterly fiscal disclosures & press notices.
                </p>
              </div>

              {newsletterSubscribed ? (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-bold text-center">
                  ✓ Subscribed!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="email@domain.com"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Bento Bottom Bar: 6 States Pill Grid & Legal */}
          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase font-mono text-neutral-500 font-bold">Owner States:</span>
              {statesList.map(s => (
                <button 
                  key={s.name} 
                  onClick={() => setCurrentPage('Who We Are')} 
                  className="px-2.5 py-0.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] transition-colors cursor-pointer"
                >
                  {s.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <button onClick={() => setCurrentPage('Governance & Whistleblowing')} className="hover:text-white">Compliance</button>
              <span>•</span>
              <button onClick={() => navigateToPage('DISCLAIMERS')} className="hover:text-white">Legal</button>
              {isPortalMode && (
                <>
                  <span>•</span>
                  <button onClick={() => setCurrentPage('Admin')} className="text-emerald-400 font-bold hover:underline">Admin Console</button>
                </>
              )}
            </div>
          </div>

        </div>
      </footer>
    );
  }

  // -------------------------------------------------------------
  // STYLE 1: CORPORATE DARK (Default Classic 4-Column Layout)
  // -------------------------------------------------------------
  return (
    <footer id="main-site-footer" className="bg-[#121212] text-white pt-16 pb-12 border-t-2 border-white/5 relative overflow-hidden transition-all duration-300">
      
      {/* Decorative top stroke */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00a757] to-transparent" 
        style={{ backgroundImage: `linear-gradient(to right, transparent, ${currentTheme.primary}, transparent)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Bio & Socials */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow p-1">
                <img 
                  src="https://i.postimg.cc/mg37tmcB/logo.png" 
                  alt="Odu'a Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-lg tracking-wider text-white leading-none">
                  {activeGeneralSettings?.siteName?.toUpperCase() || "ODU'A"}
                </span>
                <span className="text-[8px] uppercase tracking-widest font-bold mt-1" style={{ color: currentTheme.secondary }}>INVESTMENT COMPANY</span>
              </div>
            </div>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              {activeGeneralSettings?.tagline || "The premier investment engine owned by the six South-Western States of Nigeria. Cultivating sustainable wealth, infrastructure, and agricultural prosperity across generations."}
            </p>
            <div className="flex items-center gap-3.5 text-white/50">
              <a 
                href={activeGeneralSettings?.facebookUrl || "https://facebook.com"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={activeGeneralSettings?.twitterUrl || "https://twitter.com"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href={activeGeneralSettings?.linkedinUrl || "https://linkedin.com"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest font-mono" style={{ color: currentTheme.secondary }}>Quick Navigation</h3>
            <ul className="space-y-2.5 text-xs text-white/70 font-light">
              {navLinks.map((link) => (
                <li key={link}>
                  <button 
                    onClick={() => setCurrentPage(link)} 
                    className="hover:underline transition-all cursor-pointer text-left uppercase text-[10px] tracking-wider font-semibold"
                  >
                    {link}
                  </button>
                </li>
              ))}
              {isPortalMode && (
                <li className="pt-2 border-t border-white/5">
                  <button 
                    onClick={() => setCurrentPage('Admin')} 
                    className="hover:underline transition-all cursor-pointer text-left uppercase text-[10px] tracking-wider font-extrabold text-emerald-400 flex items-center gap-1"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Admin Dashboard</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Portfolios & Governance */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest font-mono" style={{ color: currentTheme.secondary }}>Ecosystem & Portals</h3>
            <ul className="space-y-2 text-xs text-white/70 font-light">
              <li><button onClick={() => setCurrentPage('Subsidiaries Directory')} className="hover:text-[#fce303] hover:underline cursor-pointer text-left">Subsidiaries Directory</button></li>
              <li><button onClick={() => setIsCalculatorOpen(true)} className="hover:text-[#fce303] hover:underline cursor-pointer text-left font-bold text-[#00a757]">Co-Investment Yield Simulator</button></li>
              <li><button onClick={() => setCurrentPage('Governance & Whistleblowing')} className="hover:text-[#fce303] hover:underline cursor-pointer text-left">Whistleblowing & Compliance</button></li>
              <li><button onClick={() => setCurrentPage('Odu\'a Foundation')} className="hover:text-[#fce303] hover:underline cursor-pointer text-left">Odu'a Foundation (CSR)</button></li>
              <li><button onClick={() => setCurrentPage('Golden Jubilee')} className="hover:text-[#fce303] hover:underline cursor-pointer text-left">50-Year Golden Jubilee</button></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-bold uppercase tracking-widest font-mono" style={{ color: currentTheme.secondary }}>Newsletter Signup</h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Stay updated on quarterly fiscal reports, regional state alliances, and newly listed projects.
            </p>

            {newsletterSubscribed ? (
              <div className="border rounded-xl p-3 text-center text-xs text-white bg-white/5" style={{ borderColor: currentTheme.primary }}>
                ✓ Successfully subscribed!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 text-xs">
                <input 
                  type="email" 
                  required 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="investor@domain.com" 
                  className="flex-1 p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-offset-0" 
                />
                <button 
                  type="submit" 
                  className="font-bold px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer text-neutral-900"
                  style={{ backgroundColor: currentTheme.secondary }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 text-center text-[11px] text-white/40 space-y-2">
          <p>© {new Date().getFullYear()} Odu’a Investment Company Limited. All Rights Reserved. Owned by Oyo, Ogun, Ondo, Osun, Ekiti, and Lagos States.</p>
          <div className="flex justify-center gap-4 text-white/30 text-[10px]">
            <button onClick={() => setCurrentPage('Governance & Whistleblowing')} className="hover:text-white transition-colors">Governance & Ethics</button>
            <span>•</span>
            <button onClick={() => setIsCalculatorOpen(true)} className="hover:text-white transition-colors">Yield Calculator</button>
            <span>•</span>
            <button onClick={() => navigateToPage('DISCLAIMERS')} className="hover:text-white transition-colors">Sovereign Fiduciary Statement</button>
          </div>
        </div>

      </div>

    </footer>
  );
}
