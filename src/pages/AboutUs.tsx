import React from 'react';
import { motion } from 'motion/react';
import { Eye, Target, Shield, ArrowRight, History, Users, MapPin, Award, ChevronRight } from 'lucide-react';
import WordPressPageHeader from '../components/WordPressPageHeader';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';

interface AboutUsProps {
  onNavigate: (page: string) => void;
  pageContent?: Record<string, any>;
  customTextBlocks?: any[];
  generalSettings?: {
    siteName?: string;
    tagline?: string;
    phone?: string;
    email?: string;
    address?: string;
    assetValue?: string;
    keySectorsCount?: string;
    vision?: string;
    mission?: string;
    coreValues?: string;
    establishedYear?: string;
    ownerStatesCount?: string;
    coreSubsidiariesCount?: string;
  };
}

export default function AboutUs({ onNavigate, pageContent, customTextBlocks, generalSettings }: AboutUsProps) {
  const activeHeroBadge = pageContent?.heroBadge || "Corporate Overview";
  const activeHeroTitle = pageContent?.heroTitle || `About ${generalSettings?.siteName || "Odu'a"} Investment`;
  const activeHeroSubtitle = pageContent?.heroSubtitle || "The prime engine of commercial growth and sustainable wealth preservation in Southwest Nigeria, unlocking high-value cross-sector opportunities for regional prosperity.";
  const activeCoreTitle = pageContent?.coreTitle || "Unlocking Value, Delivering Sustainable Heritage";
  const activeCoreDesc = pageContent?.coreDesc || `${generalSettings?.siteName || "Odu’a"} Investment Company Limited was established in November ${generalSettings?.establishedYear || "1976"} to manage the industrial, commercial, and financial assets of the Western Region of Nigeria. From our historic headquarters in Cocoa House, Ibadan, we have grown into one of the nation's premier investment conglomerates.`;
  const activeCoreDesc2 = pageContent?.coreDesc2 || "We operate with high institutional governance standards, bridging sovereign public state support with modern venture capital dynamics. We invest strategically across key sectors of the economy, ensuring our six owner states (Oyo, Ogun, Ondo, Osun, Ekiti, and Lagos) remain competitive on a global scale.";

  const stats = [
    { label: 'Established', value: generalSettings?.establishedYear || '1976', desc: '5 Decades of Heritage' },
    { label: 'Owner States', value: generalSettings?.ownerStatesCount || '6 States', desc: 'Southwest Sovereign Equity' },
    { label: 'Core Subsidiaries', value: generalSettings?.coreSubsidiariesCount || '10+', desc: 'Across Key Economic Sectors' },
    { label: 'Assets Managed', value: generalSettings?.assetValue || '₦300B+', desc: 'Wemabod & Strategic Holdings' }
  ];

  const sections = [
    {
      title: "Who We Are & Owner States",
      desc: "Explore how we manage the sovereign commercial wealth and industrial assets of Oyo, Ogun, Ondo, Osun, Ekiti, and Lagos states.",
      icon: <MapPin className="w-5 h-5 text-emerald-600" />,
      targetPage: "Who We Are",
      actionText: "Interactive Map & Profiles"
    },
    {
      title: "Our Historical Legacy",
      desc: "Trace our rich corporate journey since 1976—spanning decades of resilience, value creation, and wealth preservation.",
      icon: <History className="w-5 h-5 text-amber-600" />,
      targetPage: "Our History",
      actionText: "Explore our Timeline"
    },
    {
      title: "Board of Directors",
      desc: "Meet our high-caliber board of independent administrators steering corporate compliance and financial sustainability.",
      icon: <Users className="w-5 h-5 text-blue-600" />,
      targetPage: "Board of Directors",
      actionText: "Meet the Directors"
    },
    {
      title: "Executive Leadership Team",
      desc: "Read about our seasoned management and technical experts coordinating operations across our key market holdings.",
      icon: <Award className="w-5 h-5 text-purple-600" />,
      targetPage: "Leadership Team",
      actionText: "Meet the Executives"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 pb-16"
    >
      {/* WordPress-Style Editorial Header with Breadcrumbs */}
      <WordPressPageHeader
        title={activeHeroTitle}
        subtitle={activeHeroSubtitle}
        badge={activeHeroBadge}
        breadcrumbs={[
          { label: 'About Us', active: true }
        ]}
        onNavigate={onNavigate}
        backgroundImage={HERO_BACKGROUNDS.aboutUs}
      />

      {/* Main Corporate Profile & Core Philosophy */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              {activeCoreTitle}
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {activeCoreDesc}
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {activeCoreDesc2}
            </p>
            
            {/* Mission / Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                    <Eye size={18} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Our Vision</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {generalSettings?.vision || "To be a world-class conglomerate, delivering sustainable value to our stakeholders while remaining the undisputed engine of growth."}
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                    <Target size={18} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Our Mission</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {generalSettings?.mission || "To run commercially viable enterprises focused on high-yield sectors, optimizing asset performance, and creating generational value."}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none" />
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Core Strategic Values
            </h3>
            
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5 font-bold text-xs">1</div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">"Iwa Pele" (Good Character)</h5>
                  <p className="text-xs text-slate-500 mt-1">Our philosophical foundation, driving strict transparency, ethical operations, and social accountability.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 shrink-0 mt-0.5 font-bold text-xs">2</div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">Asset Stewardship & Excellence</h5>
                  <p className="text-xs text-slate-500 mt-1">Nurturing premier real estate, hospitality, agriculture, and high-growth technology sandboxes for future generations.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 shrink-0 mt-0.5 font-bold text-xs">3</div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">Sovereign Collaboration</h5>
                  <p className="text-xs text-slate-500 mt-1">Fostering shared regional goals, unified infrastructure development, and stable partnership conduits for foreign and local investors.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Corporate Statistics Grid */}
      <section className="bg-neutral-900 text-white py-16 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center lg:text-left space-y-2">
                <span className="block font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#fce303]">
                  {stat.value}
                </span>
                <span className="block text-xs font-bold tracking-wider uppercase text-neutral-300">
                  {stat.label}
                </span>
                <span className="block text-[11px] text-neutral-400 font-light">
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directory & Detailed Pages section links */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl font-bold text-slate-900">
            Corporate Structure & Leadership
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-3">
            Odu'a Investment operates across multiple governance layers. Dive deeper into our specific structures below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((sec, i) => (
            <div 
              key={i} 
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 rounded-lg group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                    {sec.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    {sec.title}
                  </h3>
                </div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed pl-1">
                  {sec.desc}
                </p>
              </div>

              <div className="pt-6 pl-1">
                <button
                  onClick={() => onNavigate(sec.targetPage)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
                >
                  <span>{sec.actionText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Custom Text Blocks added via Admin Text Editor */}
      {Array.isArray(customTextBlocks) && customTextBlocks.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
          <div className="space-y-6">
            {customTextBlocks.map((block: any) => (
              <div 
                key={block.id || block.title}
                className="bg-white rounded-2xl border border-emerald-100 p-6 md:p-8 shadow-xs relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00a757]" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#00a757] bg-emerald-50 px-2.5 py-1 rounded-md">
                    {block.category || 'Special Update'}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xl md:text-2xl text-neutral-900 mb-3">
                  {block.title}
                </h3>
                <div className="text-neutral-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {block.content}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
}
