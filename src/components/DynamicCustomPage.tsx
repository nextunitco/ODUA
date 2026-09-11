import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  BarChart3, 
  Globe, 
  Layers, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  Mail, 
  Send,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Shield,
  Leaf,
  Sun,
  Activity,
  Award,
  Phone,
  MapPin,
  Clock,
  Video,
  Users,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { PageBlock } from './DragDropPageBuilder';
import { LOCAL_IMAGES } from '../assets/localImages';
import { resolveAssetUrl } from '../assets/resolveAssetUrl';

export const SOUTHWEST_STATE_LOGOS: Record<string, { name: string; logo: string; capital: string }> = {
  Oyo: { 
    name: "Oyo State", 
    logo: "https://i.postimg.cc/mktQk9JQ/images.jpg", 
    capital: "Ibadan" 
  },
  Ogun: { 
    name: "Ogun State", 
    logo: "https://i.postimg.cc/C5BqSgnC/logo.png", 
    capital: "Abeokuta" 
  },
  Ondo: { 
    name: "Ondo State", 
    logo: "https://i.postimg.cc/L8f3jzXz/images.png", 
    capital: "Akure" 
  },
  Osun: { 
    name: "Osun State", 
    logo: "https://i.postimg.cc/6pNvJFWn/images-(1).jpg", 
    capital: "Osogbo" 
  },
  Ekiti: { 
    name: "Ekiti State", 
    logo: "https://i.postimg.cc/sgp5Ms67/setting-ekiti-logo.gif", 
    capital: "Ado-Ekiti" 
  },
  Lagos: { 
    name: "Lagos State", 
    logo: "https://i.postimg.cc/yYRQsJR2/images-(2).jpg", 
    capital: "Ikeja" 
  }
};

interface DynamicCustomPageProps {
  pageName: string;
  blocks?: PageBlock[];
  generalSettings?: any;
  onNavigate?: (page: string) => void;
  onOpenPartnerModal?: () => void;
  cmsData?: any;
}

export const DynamicCustomPage: React.FC<DynamicCustomPageProps> = ({
  pageName,
  blocks = [],
  generalSettings,
  onNavigate,
  onOpenPartnerModal,
  cmsData
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Active blocks filtered by visibility
  const activeBlocks: PageBlock[] = blocks && blocks.length > 0 
    ? blocks.filter(b => b.visible !== false) 
    : [
        {
          id: 'default-hero',
          type: 'hero',
          title: pageName,
          visible: true,
          data: {
            badge: "Odu'a Investment Corporate Portal",
            title: pageName,
            subtitle: `Strategic overview, milestones, and sustainable initiatives driving value across Southwest Nigeria.`,
            bannerImage: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=1600",
            primaryBtnText: "Explore Portfolio",
            secondaryBtnText: "Contact Us"
          }
        },
        {
          id: 'default-stats',
          type: 'stats',
          title: 'Key Metrics',
          visible: true,
          data: {
            stat1Value: '6 States',
            stat1Label: 'Regional Coverage',
            stat2Value: '₦300B+',
            stat2Label: 'Asset Valuation Base',
            stat3Value: '100% ESG',
            stat3Label: 'Sustainability Target',
            stat4Value: '50+ Yrs',
            stat4Label: 'Heritage & Governance'
          }
        },
        {
          id: 'default-content',
          type: 'rich_text',
          title: 'Strategic Mandate',
          visible: true,
          data: {
            title: 'Empowering Southwest Nigeria',
            subtitle: 'Our Commitment to Long-Term Sovereign Impact',
            content: `As the premier conglomerate holding company of Southwest Nigeria, Odu'a Investment is committed to fostering sustainable economic development, clean energy transition, industrial growth, and responsible corporate citizenship across our owner states: Oyo, Ogun, Ondo, Osun, Ekiti, and Lagos.`
          }
        }
      ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="w-full bg-[#fcfdfc] text-neutral-800 font-sans">
      {activeBlocks.map((block, idx) => {
        const d = block.data || {};

        // 1. HERO BANNER
        if (block.type === 'hero') {
          const heroImg = (pageName.toLowerCase() === 'home' || !d.bannerImage || d.bannerImage.includes('unsplash'))
            ? (d.bannerImage && !d.bannerImage.includes('unsplash') ? resolveAssetUrl(d.bannerImage) : LOCAL_IMAGES.cocoaHouseSharp)
            : d.bannerImage;

          return (
            <section key={block.id || idx} className="relative bg-neutral-950 text-white min-h-[520px] lg:min-h-[620px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src={heroImg} 
                  alt={d.title || pageName} 
                  className="w-full h-full object-cover object-center filter brightness-[0.75] saturate-110 contrast-105 scale-100"
                  onError={(e) => {
                    e.currentTarget.src = LOCAL_IMAGES.cocoaHouseSharp;
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/50 to-neutral-950/70 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/45 pointer-events-none" />
              </div>

              <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center space-y-6 flex flex-col items-center justify-center">
                {d.badge && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{d.badge}</span>
                  </motion.div>
                )}

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#fed000] leading-[1.12] tracking-tight max-w-4xl mx-auto text-center drop-shadow-lg"
                >
                  {d.title && !d.title.includes('Pioneering') ? d.title : (pageName.toLowerCase() === 'home' ? "Enhancing the legacy for future generations" : pageName)}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base sm:text-lg md:text-xl text-white font-light sm:font-normal max-w-3xl mx-auto leading-relaxed drop-shadow-sm text-center"
                >
                  {d.subtitle && !d.subtitle.includes('Pioneering') ? d.subtitle : (pageName.toLowerCase() === 'home' ? "Through strategic investments and efficient management of our diversified portfolio, we are enhancing our rich legacy and unlocking new opportunities that will thrive for generations to come." : `Driving regional transformation, long-term impact, and sovereign wealth across Southwest Nigeria.`)}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap items-center justify-center gap-4 pt-4"
                >
                  <button
                    onClick={() => {
                      if (d.primaryBtnLink && onNavigate) onNavigate(d.primaryBtnLink);
                      else if (onNavigate) onNavigate('About Us');
                      else if (onOpenPartnerModal) onOpenPartnerModal();
                    }}
                    className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#fed000] hover:bg-amber-300 text-neutral-950 font-bold text-base shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center"
                  >
                    <span>{d.primaryBtnText || 'Learn More'}</span>
                  </button>
                  {d.secondaryBtnText && (
                    <button
                      onClick={() => {
                        if (d.secondaryBtnLink && onNavigate) onNavigate(d.secondaryBtnLink);
                        else if (onNavigate) onNavigate('Contact Us');
                      }}
                      className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-base transition-all border border-white/20 backdrop-blur-md cursor-pointer"
                    >
                      {d.secondaryBtnText}
                    </button>
                  )}
                </motion.div>
              </div>
            </section>
          );
        }

        // 2. STATS & METRICS BAR
        if (block.type === 'stats') {
          return (
            <section key={block.id || idx} className="relative z-20 -mt-10 max-w-6xl mx-auto px-4 sm:px-6">
              <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
                {[
                  { val: d.stat1Value || '6 States', lbl: d.stat1Label || 'Regional Coverage' },
                  { val: d.stat2Value || '₦300B+', lbl: d.stat2Label || 'Asset Valuation' },
                  { val: d.stat3Value || '100% ESG', lbl: d.stat3Label || 'Clean Targets' },
                  { val: d.stat4Value || '50+ Yrs', lbl: d.stat4Label || 'Sovereign Heritage' },
                ].map((stat, i) => (
                  <div key={i} className={`text-center space-y-1 ${i > 0 ? 'pt-4 md:pt-0' : ''}`}>
                    <p className="font-serif text-2xl sm:text-3xl font-black text-[#00a757] tracking-tight">{stat.val}</p>
                    <p className="text-xs font-bold text-neutral-600 uppercase tracking-wider">{stat.lbl}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        // 3. RICH TEXT / STRATEGY SECTION
        if (block.type === 'rich_text' || block.type === 'strategy') {
          return (
            <section key={block.id || idx} className="py-16 sm:py-24 max-w-5xl mx-auto px-6">
              <div className="text-center space-y-3 mb-12">
                {d.subtitle && (
                  <span className="text-xs font-mono font-bold text-[#00a757] uppercase tracking-widest block">
                    {d.subtitle}
                  </span>
                )}
                <h2 className="font-serif text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                  {d.title || block.title}
                </h2>
                <div className="w-16 h-1 bg-[#00a757] mx-auto rounded-full mt-4" />
              </div>

              <div className="bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-12 shadow-sm text-neutral-700 leading-relaxed text-sm sm:text-base space-y-6">
                <div className="whitespace-pre-line leading-relaxed font-light">
                  {d.content || d.text || `Odu'a Investment Company Limited continues to spearhead sustainable growth and regional transformation with unwavering governance, robust capital discipline, and strategic partnerships.`}
                </div>

                {d.highlights && Array.isArray(d.highlights) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-neutral-100">
                    {d.highlights.map((h: string, hi: number) => (
                      <div key={hi} className="flex items-start gap-3 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100">
                        <CheckCircle2 className="w-4 h-4 text-[#00a757] shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-neutral-800">{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        }

        // 4. STATES GRID
        if (block.type === 'states') {
          return (
            <section key={block.id || idx} className="py-16 bg-neutral-50 border-y border-neutral-200/60">
              <div className="max-w-6xl mx-auto px-6 text-center space-y-8">
                <div>
                  <span className="text-xs font-mono font-bold text-[#00a757] uppercase tracking-widest">Sovereign Shareholders</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 mt-1">{d.title || "The 6 Owner States of Southwest Nigeria"}</h2>
                  {d.subtitle && (
                    <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl mx-auto mt-2 font-light">{d.subtitle}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {['Oyo', 'Ogun', 'Ondo', 'Osun', 'Ekiti', 'Lagos'].map((st) => {
                    const stateMeta = SOUTHWEST_STATE_LOGOS[st];
                    return (
                      <div 
                        key={st} 
                        onClick={() => onNavigate && onNavigate('Who We Are')}
                        className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col items-center justify-center space-y-2.5 hover:border-[#00a757] hover:shadow-md transition-all group cursor-pointer"
                        title={`View ${stateMeta?.name || `${st} State`} profile & investment presence`}
                      >
                        <div className="w-14 h-14 rounded-full bg-white p-1.5 flex items-center justify-center border border-neutral-200/80 shadow-2xs group-hover:scale-110 group-hover:border-[#00a757]/50 transition-all overflow-hidden">
                          <img 
                            src={stateMeta?.logo} 
                            alt={`${st} State Logo`} 
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-[#00a757] transition-colors">{st} State</span>
                        <span className="text-[10px] font-mono text-neutral-400">Shareholder</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }

        // 5. VISION & MISSION PILLARS
        if (block.type === 'vision_mission') {
          return (
            <section key={block.id || idx} className="py-16 max-w-6xl mx-auto px-6">
              <div className="text-center space-y-2 mb-10">
                <span className="text-xs font-mono font-bold text-[#00a757] uppercase tracking-widest">Corporate Pillars</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900">{d.title || "Vision, Mission & Core Values"}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00a757] flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-neutral-900">{d.visionTitle || "Our Vision"}</h3>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">{d.visionText || "To be a world-class conglomerate, delivering sustainable value to our stakeholders while remaining the engine of growth for Southwest Nigeria."}</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00a757] flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-neutral-900">{d.missionTitle || "Our Mission"}</h3>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">{d.missionText || "To run a commercially viable enterprise focused on high-yield sectors, optimizing asset performance, and creating generational economic value."}</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00a757] flex items-center justify-center font-bold">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-neutral-900">{d.coreValuesTitle || "Core Values & Ethos"}</h3>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">{d.coreValuesText || "Guided by the philosophy of 'Iwa Pele' (Good Character), structured through Accountability, Enterprise, Integrity, and Collaboration."}</p>
                </div>
              </div>
            </section>
          );
        }

        // 6. PROJECTS / INITIATIVES SHOWCASE
        if (block.type === 'projects') {
          const projectList = (cmsData?.projects && cmsData.projects.length > 0) ? cmsData.projects.slice(0, 3) : [
            {
              title: "Renewable Solar & Agrivoltaics",
              sector: "Clean Energy & ESG",
              description: "Deploying commercial solar microgrids and renewable irrigation infrastructure across regional agricultural belts.",
              image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=800"
            },
            {
              title: "Southwest Agricultural Hubs (SWAgCo)",
              sector: "Agro-Allied & Food Security",
              description: "10,000+ hectares under sustainable mechanized cultivation and high-yield export processing.",
              image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800"
            },
            {
              title: "Eco-Industrial Green Real Estate (WEMABOD)",
              sector: "Real Estate & Infrastructure",
              description: "Development of LEED-certified commercial and residential spaces aligned with global ESG decarbonization targets.",
              image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=800"
            }
          ];

          return (
            <section key={block.id || idx} className="py-16 max-w-6xl mx-auto px-6 space-y-10">
              <div className="text-center space-y-2">
                <span className="text-xs font-mono font-bold text-[#00a757] uppercase tracking-widest">{d.tag || "Active Ventures"}</span>
                <h2 className="font-serif text-2xl sm:text-4xl font-black text-neutral-900">{d.title || "Strategic Initiatives & Projects"}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projectList.map((proj: any, pi: number) => (
                  <div key={pi} className="bg-white rounded-3xl border border-neutral-200/80 overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-all group">
                    <div className="h-48 overflow-hidden relative">
                      <img src={proj.image || proj.img || "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=800"} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <span className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full uppercase font-bold">
                        {proj.sector || "Infrastructure"}
                      </span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-serif font-bold text-base text-neutral-900">{proj.title}</h3>
                        <p className="text-xs text-neutral-600 font-light mt-1.5 leading-relaxed">{proj.description || proj.desc}</p>
                      </div>
                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#00a757]">
                        <span>{proj.status || "Active Portfolio"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        // 7. CORPORATE NEWS / MEDIA GRID
        if (block.type === 'news') {
          const newsList = (cmsData?.news && cmsData.news.length > 0) ? cmsData.news.slice(0, 3) : [
            {
              title: "Odu'a Investment Posts ₦300B+ Asset Foundation in Annual General Meeting",
              date: "2026-08-15",
              category: "Corporate",
              summary: "Group Chairman highlights resilient dividend payouts and strategic joint ventures across the 6 Southwest shareholder states."
            },
            {
              title: "SWAgCo Expands High-Yield Agronomy Processing Hubs across Oyo and Ogun",
              date: "2026-07-28",
              category: "Agribusiness",
              summary: "Accelerating mechanized agriculture with over 10,000 hectares under cultivation for export food security."
            },
            {
              title: "WEMABOD Unveils Smart Eco-Industrial Estates in Lagos Commercial Corridor",
              date: "2026-07-10",
              category: "Real Estate",
              summary: "Sustainable warehousing, solar-powered logistics hubs, and modern commercial complexes launched."
            }
          ];

          return (
            <section key={block.id || idx} className="py-16 max-w-6xl mx-auto px-6 space-y-8">
              <div className="text-center space-y-2">
                <span className="text-xs font-mono font-bold text-[#00a757] uppercase tracking-widest">{d.tag || "Corporate News"}</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900">{d.title || "Latest Announcements & Press Releases"}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newsList.map((item: any, ni: number) => (
                  <div key={ni} className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold text-neutral-400 uppercase">
                        <span className="text-[#00a757]">{item.category || "Announcement"}</span>
                        <span>{item.date || "2026"}</span>
                      </div>
                      <h3 className="font-serif font-bold text-base text-neutral-900 leading-snug">{item.title}</h3>
                      <p className="text-xs text-neutral-600 font-light leading-relaxed">{item.summary || item.excerpt}</p>
                    </div>
                    <button 
                      onClick={() => onNavigate && onNavigate('Media')}
                      className="text-xs font-bold text-[#00a757] hover:text-[#008f49] flex items-center gap-1.5 pt-3 border-t border-neutral-100 cursor-pointer"
                    >
                      <span>Read Full Press Statement</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        // 8. CTA BANNER / JOINT VENTURE CALL
        if (block.type === 'cta_banner') {
          return (
            <section key={block.id || idx} className="py-16 max-w-5xl mx-auto px-6">
              <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-neutral-800 text-center space-y-6">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full inline-block">
                  {d.badge || "Joint Ventures & Partnerships"}
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-black text-white max-w-3xl mx-auto leading-tight">
                  {d.title || "Accelerating Southwest Nigeria's Industrial Prosperity"}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
                  {d.text || "We invite accredited institutional players, domestic fund managers, and global diaspora networks to join our stable co-investment pool."}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => onOpenPartnerModal ? onOpenPartnerModal() : (onNavigate && onNavigate('Contact Us'))}
                    className="px-6 py-3.5 rounded-full bg-[#00a757] hover:bg-[#008f49] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 cursor-pointer flex items-center gap-2"
                  >
                    <span>{d.primaryBtnText || "Request Group Prospectus"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onNavigate && onNavigate('Contact Us')}
                    className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 cursor-pointer"
                  >
                    {d.secondaryBtnText || "Connect with Secretariat"}
                  </button>
                </div>
              </div>
            </section>
          );
        }

        // 9. FAQ ACCORDION BLOCK
        if (block.type === 'faq') {
          const faqs = d.faqs || [
            { q: "What is Odu'a Investment's mandate?", a: "Odu'a Investment coordinates institutional capital, government cooperation, and private sector execution to drive long-term regional economic growth." },
            { q: "How are projects funded and managed?", a: "Projects are structured through public-private partnerships (PPP), co-investments with international development finance institutions, and commercial joint ventures." },
            { q: "How can institutional partners collaborate?", a: "Accredited investors and enterprise partners can submit co-investment proposals through our Partner portal or contact the corporate investment desk." }
          ];

          return (
            <section key={block.id || idx} className="py-16 bg-neutral-50 border-t border-neutral-200/60">
              <div className="max-w-3xl mx-auto px-6 space-y-8">
                <div className="text-center space-y-2">
                  <span className="text-xs font-mono font-bold text-[#00a757] uppercase tracking-widest">Knowledgebase</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900">{d.title || "Frequently Asked Questions"}</h2>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq: any, fi: number) => {
                    const isOpen = openFaq === fi;
                    return (
                      <div key={fi} className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs">
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : fi)}
                          className="w-full p-4 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-neutral-900 hover:text-[#00a757] transition-colors cursor-pointer"
                        >
                          <span>{faq.q || faq.question}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-[#00a757]" /> : <ChevronDown className="w-4 h-4 shrink-0 text-neutral-400" />}
                        </button>
                        {isOpen && (
                          <div className="p-4 pt-0 text-xs text-neutral-600 font-light leading-relaxed border-t border-neutral-100">
                            {faq.a || faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }

        // 10. CONTACT / INQUIRY & HEADQUARTERS DIRECTORY
        if (block.type === 'contact_box') {
          return (
            <section key={block.id || idx} className="py-16 max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Contact Information Card */}
                <div className="lg:col-span-5 bg-[#f5f7f5] rounded-3xl p-8 border border-neutral-200/80 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-[#00a757] font-bold uppercase tracking-widest block">Direct Secretariat</span>
                    <h2 className="font-serif text-2xl font-black text-neutral-900">{d.title || "Cocoa House Headquarters"}</h2>
                    <p className="text-xs text-neutral-600 leading-relaxed font-light">
                      {d.subtitle || "Floors 20-23, Cocoa House, Oba Adebimpe Road, Dugbe, Ibadan, Oyo State, Nigeria."}
                    </p>
                    
                    <div className="space-y-3 pt-2 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#00a757] flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <span className="text-neutral-700 font-semibold">{generalSettings?.address || "Cocoa House, Dugbe, Ibadan, Nigeria"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#00a757] flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="text-neutral-700 font-semibold">{generalSettings?.email || d.email || "info@odua-investment.com"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#00a757] flex items-center justify-center shrink-0">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span className="text-neutral-700 font-semibold">{generalSettings?.phone || d.phone || "+234 2 241 4183"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#00a757] flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <span className="text-neutral-700 font-semibold">{d.hours || "Mon - Fri: 8:00 AM - 5:00 PM WAT"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-neutral-200/60 text-[11px] text-neutral-500 font-light flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#00a757] shrink-0" />
                    <span>Official correspondence is routed directly to the Executive Committee.</span>
                  </div>
                </div>

                {/* Interactive Message Form */}
                <div className="lg:col-span-7 bg-neutral-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                  <div className="relative z-10 space-y-4">
                    <div>
                      <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">Connect Directly</span>
                      <h3 className="font-serif text-2xl font-black text-white mt-1">Submit Corporate Message</h3>
                      <p className="text-xs text-neutral-400 mt-1">Our secretariat desk responds to institutional inquiries within 24 business hours.</p>
                    </div>

                    {contactSubmitted ? (
                      <div className="p-6 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-center space-y-2">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                        <p className="font-bold text-sm text-white">Inquiry Received Successfully</p>
                        <p className="text-xs text-emerald-300/80">Our corporate communications desk will follow up promptly.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-3.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <input
                            type="text"
                            required
                            placeholder="Full Name / Organization"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs focus:ring-2 focus:ring-[#00a757] focus:outline-none placeholder:text-neutral-400"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Official Email Address"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs focus:ring-2 focus:ring-[#00a757] focus:outline-none placeholder:text-neutral-400"
                          />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Subject / Department of Interest"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs focus:ring-2 focus:ring-[#00a757] focus:outline-none placeholder:text-neutral-400"
                        />
                        <textarea
                          rows={3}
                          required
                          placeholder="Your message, investment inquiry, or proposal summary..."
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs focus:ring-2 focus:ring-[#00a757] focus:outline-none placeholder:text-neutral-400"
                        />
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-xl bg-[#00a757] hover:bg-[#008f49] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Transmit Message</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>

              </div>
            </section>
          );
        }

        // 11. INTERACTIVE MAP SECTION
        if (block.type === 'map') {
          const mapQuery = d.mapQuery || encodeURIComponent(generalSettings?.address || "Cocoa House, Dugbe, Ibadan, Nigeria");
          const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&t=&z=${d.zoom || 16}&ie=UTF8&iwloc=&output=embed`;

          return (
            <section key={block.id || idx} className="py-12 max-w-6xl mx-auto px-6">
              <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-lg p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a757]/10 text-[10px] font-bold uppercase tracking-widest text-[#00a757]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Headquarters Map & Location</span>
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-neutral-900">{d.title || "Find Us at Cocoa House, Ibadan"}</h2>
                    <p className="text-xs text-neutral-600 font-light">
                      {d.subtitle || generalSettings?.address || "Floors 20-23, Cocoa House, Oba Adebimpe Road, Dugbe, Ibadan, Oyo State, Nigeria"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Cocoa House, Dugbe, Ibadan, Nigeria")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-[#00a757] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Google Maps Interactive Iframe */}
                <div className="w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden border border-neutral-200 shadow-inner bg-neutral-100 relative">
                  <iframe
                    title="Odu'a Investment Company Limited Headquarters Map"
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full filter contrast-[1.02]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
                  <div className="p-4 rounded-2xl bg-[#f5f7f5] border border-neutral-200/60">
                    <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider block mb-1">Landmark</span>
                    <p className="font-bold text-neutral-800">Cocoa House (Floors 20-23)</p>
                    <p className="text-[11px] text-neutral-500">First Skyscraper in Tropical Africa</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#f5f7f5] border border-neutral-200/60">
                    <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider block mb-1">District</span>
                    <p className="font-bold text-neutral-800">Dugbe Commercial Hub</p>
                    <p className="text-[11px] text-neutral-500">Ibadan Central Business Corridor</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#f5f7f5] border border-neutral-200/60">
                    <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider block mb-1">Coordinates</span>
                    <p className="font-bold text-neutral-800">7.3872° N, 3.8824° E</p>
                    <p className="text-[11px] text-neutral-500">Southwest Nigeria Regional Hub</p>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Generic block fallback
        return null;
      })}
    </div>
  );
};
