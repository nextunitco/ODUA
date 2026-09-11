import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Globe, 
  Award, 
  TrendingUp, 
  Building2, 
  Leaf, 
  ShieldCheck,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { Project, NewsCard } from '../types';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';

interface HomeProps {
  cocoaHouseImg: string;
  onNavigate: (page: string) => void;
  onOpenPartnerModal: () => void;
  projects: Project[];
  news: NewsCard[];
  pageContent?: any;
  generalSettings?: {
    siteName?: string;
    tagline?: string;
    phone?: string;
    email?: string;
    address?: string;
    assetValue?: string;
    keySectorsCount?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    vision?: string;
    mission?: string;
    coreValues?: string;
    establishedYear?: string;
    ownerStatesCount?: string;
  };
  customTextBlocks?: any[];
}

export default function Home({
  cocoaHouseImg,
  onNavigate,
  onOpenPartnerModal,
  projects,
  news,
  pageContent,
  generalSettings,
  customTextBlocks
}: HomeProps) {
  // Get active projects or top highlights
  const topProjects = projects.slice(0, 3);
  const topNews = news.slice(0, 3);

  // Dynamic Content variables from pageContent / generalSettings
  // Prioritize official Wikipedia Cocoa House image for hero background
  const rawBanner = pageContent?.bannerImage;
  const isBlurryBanner = !rawBanner || rawBanner.includes('gj0gKfZ7');
  const activeHeroBanner = (!isBlurryBanner && rawBanner) ? rawBanner : HERO_BACKGROUNDS.home;
  const activeHeroTitle = (pageContent?.heroTitle && !pageContent.heroTitle.includes('Pioneering')) 
    ? pageContent.heroTitle 
    : (generalSettings?.heroTitle && !generalSettings.heroTitle.includes('Pioneering'))
    ? generalSettings.heroTitle
    : "Enhancing the legacy for future generations";

  const activeHeroSubtitle = (pageContent?.heroSubtitle && !pageContent.heroSubtitle.includes('Pioneering'))
    ? pageContent.heroSubtitle
    : (generalSettings?.heroSubtitle && !generalSettings.heroSubtitle.includes('Pioneering'))
    ? generalSettings.heroSubtitle
    : "Through strategic investments and efficient management of our diversified portfolio, we are enhancing our rich legacy and unlocking new opportunities that will thrive for generations to come.";
  const activePrimaryBtn = "Learn More";
  const activeSecondaryBtn = "";

  const activeFiduciaryBadge = pageContent?.fiduciaryBadge || "Sovereign Fiduciary";
  const activeFiduciaryTitle = pageContent?.fiduciaryTitle || "Catalyzing Wealth & Development Across South-Western Nigeria";
  const activeFiduciaryDesc = pageContent?.fiduciaryDesc || `As the sovereign asset hub representing Western Nigeria, we optimize and grow a highly diversified portfolio. Over the last ${new Date().getFullYear() - parseInt(generalSettings?.establishedYear || "1976")} years, we have converted our collective heritage into industry-leading operating subsidiaries in Real Estate, Agronomy, and Sovereign Financial Instruments.`;

  const activePillarsBadge = pageContent?.pillarsBadge || "Core Investment Engines";
  const activePillarsTitle = pageContent?.pillarsTitle || "Strategic Investment Pillars";

  const activeJvBadge = pageContent?.jvBadge || "Joint Ventures Desk";
  const activeJvTitle = pageContent?.jvTitle || "Accelerating Southwest Nigeria's Industrial Processing Zones";
  const activeJvDesc = pageContent?.jvDesc || "We invite institutional players, domestic fund managers, and global diaspora networks to join our stable co-investment pool. Our secure sovereign framework is backed directly by state cabinet guarantees.";
  const activeJvPrimaryBtn = pageContent?.jvPrimaryBtn || "Request Group Prospectus";
  const activeJvSecondaryBtn = pageContent?.jvSecondaryBtn || "Connect with Secretariat";

  const activeMediaBadge = pageContent?.mediaBadge || "Corporate Communications";
  const activeMediaTitle = pageContent?.mediaTitle || "Media Highlights";

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 70, 
        damping: 14 
      } 
    }
  };

  const hoverScale = {
    hover: { 
      scale: 1.03, 
      y: -5,
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 flex flex-col"
    >
      {/* HERO SECTION WITH COCOA HOUSE AND CENTERED TEXT OVERLAYS */}
      <section className="relative min-h-[90vh] md:min-h-[96vh] flex flex-col justify-start sm:justify-center items-center overflow-hidden pt-40 sm:pt-48 md:pt-52 lg:pt-56 pb-24 sm:pb-32">
        
        {/* Dynamic Cityscape & Cocoa House Background Image (Wikipedia Official Cocoa House, Ibadan) */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-950">
          <motion.img 
            initial={{ scale: 1.02, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src={activeHeroBanner} 
            alt="Cocoa House Skyscraper Ibadan - Historic Headquarters of Odu'a Investment" 
            className="w-full h-full object-cover object-center transform-gpu will-change-transform"
            onError={(e) => {
              e.currentTarget.src = "/uploads/cocoa_house_wikipedia.jpg";
            }}
            referrerPolicy="no-referrer"
          />
          {/* Executive Vignette Backdrop Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/75 via-neutral-950/40 to-neutral-950/85 pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>

        {/* Decorative Grid overlay for subtle architectural texture */}
        <div className="absolute inset-0 z-1 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

        {/* Centered Main Hero Content - Positioned generously below fixed navbar */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center justify-center w-full mt-2 sm:mt-6 md:mt-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-5 sm:space-y-6 flex flex-col items-center text-center"
          >
            {/* Refined Commanding Headline */}
            <motion.h1 
              variants={itemVariants}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-sm max-w-3xl mx-auto text-center"
            >
              {activeHeroTitle}
            </motion.h1>

            {/* Balanced Sub-text */}
            <motion.p 
              variants={itemVariants}
              className="text-neutral-200 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto drop-shadow-xs text-center"
            >
              {activeHeroSubtitle}
            </motion.p>

            {/* Elegant, Proportional CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <button 
                onClick={() => onNavigate('About Us')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{activePrimaryBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => onNavigate('Portfolio')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-sm font-bold px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{activeSecondaryBtn || "Explore Portfolio"}</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-300" />
              </button>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* POST-HERO REFINED EXECUTIVE STATS BAR */}
      <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-neutral-200/80 shadow-xl sm:shadow-2xl p-5 sm:p-7"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200/60">
            
            <motion.div 
              whileHover={{ y: -2 }}
              className="flex items-center gap-3.5 p-2 sm:px-4 text-left transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100/80 shrink-0 shadow-2xs">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-serif text-neutral-900 tracking-tight">
                  {generalSettings?.ownerStatesCount || "6 States"}
                </div>
                <div className="text-[10px] sm:text-[11px] text-emerald-700 uppercase tracking-wider font-bold mt-0.5">
                  Shared Sovereign Equity
                </div>
                <p className="text-[11px] text-neutral-500 font-normal leading-tight mt-0.5 hidden sm:block">
                  Southwest Nigerian alliance.
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              className="flex items-center gap-3.5 p-2 sm:px-4 text-left transition-all pt-4 sm:pt-2"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100/80 shrink-0 shadow-2xs">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-serif text-neutral-900 tracking-tight">
                  {new Date().getFullYear() - parseInt(generalSettings?.establishedYear || "1976")}+ Yrs
                </div>
                <div className="text-[10px] sm:text-[11px] text-emerald-700 uppercase tracking-wider font-bold mt-0.5">
                  Enduring Heritage
                </div>
                <p className="text-[11px] text-neutral-500 font-normal leading-tight mt-0.5 hidden sm:block">
                  Preserving wealth since {generalSettings?.establishedYear || "1976"}.
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              className="flex items-center gap-3.5 p-2 sm:px-4 text-left transition-all pt-4 sm:pt-2"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100/80 shrink-0 shadow-2xs">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-serif text-neutral-900 tracking-tight">
                  {generalSettings?.assetValue || "₦300B+"}
                </div>
                <div className="text-[10px] sm:text-[11px] text-emerald-700 uppercase tracking-wider font-bold mt-0.5">
                  Asset Value Base
                </div>
                <p className="text-[11px] text-neutral-500 font-normal leading-tight mt-0.5 hidden sm:block">
                  Diversified institutional holdings.
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              className="flex items-center gap-3.5 p-2 sm:px-4 text-left transition-all pt-4 sm:pt-2"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100/80 shrink-0 shadow-2xs">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-serif text-neutral-900 tracking-tight">
                  {generalSettings?.keySectorsCount || "9"}
                </div>
                <div className="text-[10px] sm:text-[11px] text-emerald-700 uppercase tracking-wider font-bold mt-0.5">
                  Key Economic Sectors
                </div>
                <p className="text-[11px] text-neutral-500 font-normal leading-tight mt-0.5 hidden sm:block">
                  Real estate, agri, finance & energy.
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* 6 SOUTHWEST SHAREHOLDER OWNER STATES LOGO SECTION */}
      <section className="bg-[#f8faf8] border-b border-neutral-200/60 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-[11px] uppercase tracking-widest font-bold text-emerald-700 font-mono">
                  Sovereign Shareholder States
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
                Jointly Owned by the 6 States of Southwest Nigeria
              </h3>
            </div>
            <button
              onClick={() => onNavigate('Who We Are')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Explore Sovereign Equity & Profiles</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-5">
            {[
              { name: 'Oyo State', capital: 'Ibadan', tagline: 'The Pace Setter', logo: 'https://i.postimg.cc/mktQk9JQ/images.jpg' },
              { name: 'Ogun State', capital: 'Abeokuta', tagline: 'The Gateway State', logo: 'https://i.postimg.cc/C5BqSgnC/logo.png' },
              { name: 'Ondo State', capital: 'Akure', tagline: 'The Sunshine State', logo: 'https://i.postimg.cc/L8f3jzXz/images.png' },
              { name: 'Osun State', capital: 'Osogbo', tagline: 'State of the Virtuous', logo: 'https://i.postimg.cc/6pNvJFWn/images-(1).jpg' },
              { name: 'Ekiti State', capital: 'Ado-Ekiti', tagline: 'Land of Honour', logo: 'https://i.postimg.cc/sgp5Ms67/setting-ekiti-logo.gif' },
              { name: 'Lagos State', capital: 'Ikeja', tagline: 'Centre of Excellence', logo: 'https://i.postimg.cc/yYRQsJR2/images-(2).jpg' }
            ].map((st, idx) => (
              <motion.div
                key={st.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                whileHover={{ y: -3 }}
                onClick={() => onNavigate('Who We Are')}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/70 shadow-2xs hover:shadow-md hover:border-emerald-500/40 transition-all flex flex-col items-center text-center cursor-pointer group"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-neutral-50 border border-neutral-100 p-2 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-2xs">
                  <img
                    src={st.logo}
                    alt={`${st.name} Logo Seal`}
                    className="w-full h-full object-contain filter drop-shadow-2xs"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-serif font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-emerald-700 transition-colors leading-tight">
                  {st.name}
                </span>
                <span className="text-[10px] text-neutral-500 font-medium mt-0.5">
                  {st.tagline}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE IDENTITY BRIEF & ACCREDITATION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">{activeFiduciaryBadge}</span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mt-4 leading-tight">
                {activeFiduciaryTitle}
              </h2>
              <p className="text-neutral-600 font-normal mt-4 leading-relaxed text-sm sm:text-base">
                {activeFiduciaryDesc}
              </p>
              <div className="mt-7 flex gap-4">
                <button 
                  onClick={() => onNavigate('About Us')}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 shadow-sm duration-200"
                >
                  <span>Read Corporate History</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
            >
              {[
                { icon: Building2, title: "Wemabod Real Estate", desc: "Commercial skyscrapers, smart residential developments, and urban property management." },
                { icon: Leaf, title: "SWAgCo Agriculture", desc: "Regional food security initiatives, industrial cassava processing, and cash crops." },
                { icon: TrendingUp, title: "Odu'a Financials", desc: "Venture capital, early-stage SME accelerators, and strategic banking stakes." },
                { icon: ShieldCheck, title: "Fiduciary Governance", desc: "Rigorous transparency with high sovereign ratings driving secure co-investment." }
              ].map((item, idx) => (
                <motion.div 
                  whileHover="hover"
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0 },
                    hover: { y: -3, boxShadow: "0 10px 25px -8px rgba(0, 167, 87, 0.12)", borderColor: "rgba(0, 167, 87, 0.25)" }
                  }}
                  key={idx} 
                  className="p-5 sm:p-6 bg-[#fbfcfb] rounded-2xl border border-neutral-200/70 transition-all text-left duration-300 shadow-2xs"
                >
                  <span className="w-10 h-10 bg-emerald-50 border border-emerald-100/70 text-emerald-700 rounded-xl flex items-center justify-center mb-3.5">
                    <item.icon className="w-5 h-5" />
                  </span>
                  <h3 className="font-bold text-sm text-neutral-900 tracking-wide">{item.title}</h3>
                  <p className="text-neutral-600 text-xs font-normal mt-1.5 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO HIGHLIGHTS / LANDMARKS & REGIONAL PROJECTS */}
      <section className="bg-[#071910] text-white py-16 sm:py-20 text-left relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-amber-300 text-xs font-mono uppercase tracking-widest font-semibold">Active Engagements</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">Landmarks & Regional Projects</h2>
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('Ongoing Projects')}
              className="text-amber-300 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore All Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {topProjects.map((proj, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                key={idx} 
                className="bg-white/[0.04] rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.07] transition-all duration-300 group cursor-pointer shadow-lg"
              >
                <div className="h-48 overflow-hidden relative">
                  <motion.img 
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5 }}
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover filter saturate-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  <span className="absolute top-3.5 right-3.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-600/90 text-white px-2.5 py-0.5 rounded-full backdrop-blur-sm">{proj.status}</span>
                </div>
                <div className="p-5 sm:p-6">
                  <span className="text-amber-300 text-[10px] font-semibold uppercase tracking-widest block mb-1">{proj.sector}</span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-amber-200 transition-colors">{proj.title}</h3>
                  <p className="text-neutral-300/80 text-xs font-light line-clamp-2 leading-relaxed">{proj.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTMENT PROMOTION & PROSPECTUS DOWNLOAD */}
      <section className="bg-[#f8faf8] py-16 sm:py-20 border-t border-b border-neutral-200/60 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <motion.span 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="text-emerald-700 text-xs uppercase font-bold tracking-wider bg-emerald-50 border border-emerald-200/60 px-3.5 py-1 rounded-full inline-block"
          >
            {activeJvBadge}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight"
          >
            {activeJvTitle}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-neutral-600 font-normal text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          >
            {activeJvDesc}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="pt-2 flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenPartnerModal}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow cursor-pointer"
            >
              {activeJvPrimaryBtn}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate('Contact Us')}
              className="border border-neutral-300 hover:border-neutral-400 text-neutral-800 px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all bg-white hover:bg-neutral-50 shadow-2xs cursor-pointer"
            >
              {activeJvSecondaryBtn}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* LATEST NEWS STORIES PREVIEW */}
      <section className="py-16 sm:py-20 bg-white text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider block mb-1">{activeMediaBadge}</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">{activeMediaTitle}</h2>
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate('Media')}
              className="text-emerald-700 hover:text-emerald-900 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View All News</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {topNews.map((article, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.12 }}
                whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.08)" }}
                key={article.id} 
                className="bg-[#fcfdfc] border border-neutral-200/70 rounded-2xl overflow-hidden shadow-2xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 sm:h-48 overflow-hidden relative">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3.5 left-3.5 bg-neutral-900/90 backdrop-blur-sm text-white text-[9px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-md">{article.category}</span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <span className="text-[10px] text-neutral-400 font-mono block mb-1">{article.date}</span>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-neutral-900 line-clamp-2 leading-snug mb-2 hover:text-emerald-700 transition-colors cursor-pointer" onClick={() => onNavigate('Media')}>{article.title}</h3>
                    <p className="text-neutral-600 text-xs font-normal line-clamp-2 leading-relaxed">{article.excerpt}</p>
                  </div>
                </div>
                <div className="p-5 sm:p-6 pt-0">
                  <button 
                    onClick={() => onNavigate('Media')}
                    className="text-emerald-700 text-xs font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Press Release</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* USER'S CUSTOM WORDS & PARAGRAPH BLOCKS (IF ADDED VIA ADMIN TEXT EDITOR) */}
      {customTextBlocks && customTextBlocks.length > 0 && (
        <section className="py-16 bg-[#f7f9f7] border-t border-neutral-200/70 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {customTextBlocks.map((blk: any) => (
              <div 
                key={blk.id} 
                className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-[#00a757] text-white">
                    {blk.category || 'Announcement'}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-neutral-900">{blk.title}</h3>
                </div>
                <p className="text-neutral-700 text-sm leading-relaxed font-light whitespace-pre-line">
                  {blk.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

    </motion.div>
  );
}
