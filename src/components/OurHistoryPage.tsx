import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Play, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Building, 
  Sparkles, 
  ArrowRight,
  Bookmark,
  Volume2,
  Clock,
  History
} from 'lucide-react';

interface Chapter {
  year: string;
  tagline: string;
  title: string;
  summary: string;
  icon: React.ComponentType<any>;
  details: string[];
  quote: string;
  badge: string;
  metric?: {
    value: string;
    label: string;
  };
  colorTheme: {
    bg: string;
    text: string;
    border: string;
    glow: string;
    lightBg: string;
  };
}

const CHAPTERS: Chapter[] = [
  {
    year: "Feb 1976",
    title: "The Three-State Division",
    tagline: "Breaking of the Western State",
    summary: "On Tuesday, February 3, 1976, the Western State was broken into three states, namely Oyo, Ondo and Ogun. Brigadier David Medaiyese Jemibewon was appointed the military Governor of Oyo State, while Wing Commander David Ikpeme and Lt. Col. Ayodele Balogun were named as military governors of the newly created Ondo and Ogun states respectively. They assumed temporary duties in Ibadan as their base until moving to Akure and Abeokuta.",
    icon: Building,
    badge: "Sovereign Origins",
    quote: "A State Implementation Committee (SIC) comprising the three military governors and their secretaries to government and heads of service was established with Brigadier David Jemibewon as the chairman to arrange a painless distribution of all the organs of the former Western State.",
    details: [
      "Oyo, Ondo, and Ogun states officially took off as distinct political territories.",
      "The first meeting of the State Implementation Committee (SIC) was held in Ibadan on March 3, 1976.",
      "The committee held nine meetings and considered a total of 135 memoranda before dissolving in September 1976."
    ],
    metric: {
      value: "3 States",
      label: "Initial Owners"
    },
    colorTheme: {
      bg: "bg-[#00a757]",
      text: "text-[#00a757]",
      border: "border-[#00a757]",
      glow: "shadow-[#00a757]/30",
      lightBg: "bg-[#00a757]/5"
    }
  },
  {
    year: "Mar 1976",
    title: "Designing the Holding Company",
    tagline: "Creation of Odu'a Investment",
    summary: "As early as February 26, 1976, just about three weeks after the creation of the three states, the State Implementation Committee gave thought to establishing a holding company to supervise and monitor over 60 sundry investments previously managed by the Western State Industrial Investment and Credit Corporation.",
    icon: ShieldCheck,
    badge: "Holding Design",
    quote: "The professional experts of the Economic Projects Performance Unit recommended a company structure with three departments (Investment Supervision, Consultancy, Finance & Administration) and a 10-member board representing the owner states.",
    details: [
      "At its fourth meeting on March 24, 1976, the State Implementation Committee officially named the holding company 'Odu’a Investment Company Limited'.",
      "Approved an initial financial provision of N7 million to cover administrative expenses, commitments, and subsidiary investments.",
      "Attorneys-general of the three states reviewed the joint-venture agreement and the memorandum and articles of association."
    ],
    metric: {
      value: "N7 Million",
      label: "Initial Capitalization"
    },
    colorTheme: {
      bg: "bg-amber-500",
      text: "text-amber-500",
      border: "border-amber-500",
      glow: "shadow-amber-500/30",
      lightBg: "bg-amber-50"
    }
  },
  {
    year: "Jul 1976",
    title: "Approval & Leadership Selection",
    tagline: "Appointing a Managing Director of Proven Ability",
    summary: "At its seventh meeting on July 16, 1976, the military governors and secretaries to government approved the documents establishing the company. Recognizing Odu’a as an 'octopus' second in size only to the UAC Group, they sought a leader of impeccable probity and transparent honesty.",
    icon: Users,
    badge: "Board & Leadership",
    quote: "Mr. C.S.O Akande, the retiring Secretary to the Military Government of Oyo State, was requested to change his retirement plans and accept the Managing Director post to serve the three states.",
    details: [
      "Incorporated Mr. C.S.O Akande as the first Managing Director of the holding company.",
      "Approved Oyo State nominees: Chief Kola Daisi (First Board Chairman) and Professor Ayo Ogunseye.",
      "Approved Ondo State nominee: Mr. J.K. Akingbade; and Ogun State nominee: Professor Saburi Biobaku."
    ],
    metric: {
      value: "First Board",
      label: "Chaired by Chief Kola Daisi"
    },
    colorTheme: {
      bg: "bg-blue-600",
      text: "text-blue-600",
      border: "border-blue-600",
      glow: "shadow-blue-600/30",
      lightBg: "bg-blue-50"
    }
  },
  {
    year: "Oct 1976",
    title: "Official Commencement of Business",
    tagline: "Launching the Conglomerate Portfolio",
    summary: "Odu’a Investment Company Limited commenced business on October 1, 1976. Since inception, the company operated as a major corporate conglomerate, with over 70% of its businesses structured as investments or joint ventures with reputable multinationals.",
    icon: History,
    badge: "Business Launch",
    quote: "The investments going into the company constituted the live-wire of the three states... delivering a painless distribution of all the assets of the old Western State within six months.",
    details: [
      "Portfolio spanned textile mills, breweries, commercial banking, insurance, livestock, and carbonated drinks.",
      "Controlled landmark hospitality assets (including Premier and Lafia Hotels) and printing services.",
      "Secured substantial real estate holdings in choice locations including Ikeja, Apapa, and Ibadan's Aje House."
    ],
    metric: {
      value: "60+ Assets",
      label: "Active Inception Portfolio"
    },
    colorTheme: {
      bg: "bg-[#00a757]",
      text: "text-[#00a757]",
      border: "border-[#00a757]",
      glow: "shadow-[#00a757]/30",
      lightBg: "bg-[#00a757]/5"
    }
  },
  {
    year: "2012-2020",
    title: "Corporate Rebirth & Reorganization",
    tagline: "The KPMG Diagnosis & SRC 2025 Plan",
    summary: "Following years of administrative interference, Southwest governors took the historic decision to step back from political nominations, transitioning Odu’a to professional private-sector governance. A diagnostic 'health check' by KPMG paved the way for the 'SRC 2025' strategy.",
    icon: TrendingUp,
    badge: "Structural Reform",
    quote: "Odu'a transitioned to a pure holding company format, actively optimizing legacy assets and consolidating real estate operations under Wemabod Limited.",
    details: [
      "Eliminated political board nominations, replacing them with independent professionals.",
      "Formulated the SRC 2025 (Sweat, Revive, and Create) strategic plan to optimize old assets.",
      "Achieved OICL's first corporate credit rating from Agusto & Co. to enable capital access."
    ],
    metric: {
      value: "KPMG Audited",
      label: "Fiduciary Re-design"
    },
    colorTheme: {
      bg: "bg-indigo-600",
      text: "text-indigo-600",
      border: "border-indigo-600",
      glow: "shadow-indigo-600/30",
      lightBg: "bg-indigo-50"
    }
  },
  {
    year: "2021",
    title: "Lagos State Historic Re-entry",
    tagline: "The Golden Circle of Southwest Unity",
    summary: "Facilitated by corporate evaluation with PricewaterhouseCoopers (PwC), Lagos State took an equal shareholding block, joining Oyo, Ogun, Ondo, Osun, and Ekiti states to establish 100% regional investment unity under the Odu'a banner.",
    icon: Sparkles,
    badge: "Regional Unity",
    quote: "Integrating Nigeria's commercial epicenter completed the economic synergy of the Southwest block, unlocking cross-border infrastructure and high-capital real estate joint-ventures.",
    details: [
      "Rigorous asset evaluation by PwC matched state shareholding values perfectly.",
      "Established full cooperation among the six Southwest states to coordinate long-term developments.",
      "Paved the way for major real estate and agritech projects like SWAgCo and Wemabod projects."
    ],
    metric: {
      value: "6 States",
      label: "Complete Southwest Block"
    },
    colorTheme: {
      bg: "bg-purple-600",
      text: "text-purple-600",
      border: "border-purple-600",
      glow: "shadow-purple-600/30",
      lightBg: "bg-purple-50"
    }
  },
  {
    year: "2026 & Beyond",
    title: "Modern Progression & Succession",
    tagline: "Strategic Leadership & Rating Upgrades",
    summary: "Odu'a completed its first competitive, private-sector-style executive transition, appointing Group GMD/CEO Mr. Abdulrahman Yinusa. With Agusto & Co upgrading OICL's rating to 'Aa-', the company is positioned to scale its healthcare, agritech, and property portfolios.",
    icon: Award,
    badge: "The Future Era",
    quote: "With a stable outlook, optimized cash flow, and robust asset management, we stay committed to delivering superior returns to our stakeholder states.",
    details: [
      "Seamless and competitive executive transition from previous leadership.",
      "Upgraded corporate rating to 'Aa-' with Stable Outlook by Agusto & Co in 2025.",
      "Expanding high-impact portfolios including SWAgCo agribusiness hubs and healthcare platform platforms."
    ],
    metric: {
      value: "Aa- Stable",
      label: "Agusto & Co Rating"
    },
    colorTheme: {
      bg: "bg-[#00a757]",
      text: "text-[#00a757]",
      border: "border-[#00a757]",
      glow: "shadow-[#00a757]/30",
      lightBg: "bg-[#00a757]/5"
    }
  }
];

const colorThemesMap: Record<string, any> = {
  green: {
    bg: "bg-[#00a757]",
    text: "text-[#00a757]",
    border: "border-[#00a757]",
    glow: "shadow-[#00a757]/30",
    lightBg: "bg-[#00a757]/5"
  },
  amber: {
    bg: "bg-amber-500",
    text: "text-amber-500",
    border: "border-amber-500",
    glow: "shadow-amber-500/30",
    lightBg: "bg-amber-50"
  },
  blue: {
    bg: "bg-blue-600",
    text: "text-blue-600",
    border: "border-blue-600",
    glow: "shadow-blue-600/30",
    lightBg: "bg-blue-50"
  },
  indigo: {
    bg: "bg-indigo-600",
    text: "text-indigo-600",
    border: "border-indigo-600",
    glow: "shadow-indigo-600/30",
    lightBg: "bg-indigo-50"
  },
  purple: {
    bg: "bg-purple-600",
    text: "text-purple-600",
    border: "border-purple-600",
    glow: "shadow-purple-600/30",
    lightBg: "bg-purple-50"
  },
  teal: {
    bg: "bg-teal-600",
    text: "text-teal-600",
    border: "border-teal-600",
    glow: "shadow-teal-600/30",
    lightBg: "bg-teal-50"
  }
};

const iconMap: Record<string, React.ComponentType<any>> = {
  building: Building,
  shield: ShieldCheck,
  users: Users,
  history: History,
  trending: TrendingUp,
  sparkles: Sparkles,
  award: Award,
  book: Bookmark,
  calendar: Clock,
  layers: Building,
  flag: ShieldCheck,
  globe: History
};

interface OurHistoryPageProps {
  generalSettings?: {
    youtubeDocId?: string;
    docRuntime?: string;
  };
  historyMilestones?: any[];
}

export default function OurHistoryPage({ generalSettings, historyMilestones }: OurHistoryPageProps) {
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [isPlayingDoc, setIsPlayingDoc] = useState<boolean>(false);

  const dynamicChapters: Chapter[] = (historyMilestones && historyMilestones.length > 0)
    ? historyMilestones.map((m: any) => ({
        year: m.year,
        title: m.title,
        tagline: m.tagline || "",
        summary: m.summary || "",
        icon: iconMap[m.icon] || History,
        badge: m.badge || "Milestone",
        quote: m.quote || "",
        details: m.details || [],
        metric: m.metric,
        colorTheme: colorThemesMap[m.color] || colorThemesMap.green
      }))
    : CHAPTERS;

  const currentChapter = dynamicChapters[activeChapter] || dynamicChapters[0] || CHAPTERS[0];

  return (
    <div className="space-y-16 py-8">
      
      {/* A. INTERACTIVE VIDEO HEADER (THE DOCUMENTARY SHOWCASE) */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-neutral-950 text-white shadow-2xl border border-neutral-800"
      >
        
        {/* Background Visual Patterns */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a757]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#fce303]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center relative z-10">
          
          {/* Header Left: Explanatory Content */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest bg-white/5 border border-white/10 text-[#fce303]">
              <History className="w-3.5 h-3.5 text-[#fce303]" />
              <span>THE DOCUMENTARY FILM</span>
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              A Story of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a757] to-[#fce303]">
                Resilience & Resurgence
              </span>
            </h2>
            
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
              Watch the journey of Odu'a Investment Company Limited—from its regional founding legacy to its modern-day rebirth as a world-class conglomerate. Learn how Southwest Nigeria's joint wealth overcame storms to emerge as an investment powerhouse.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => setIsPlayingDoc(true)}
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#00a757] to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white font-bold uppercase tracking-wider text-xs py-3.5 px-6 rounded-xl shadow-lg shadow-[#00a757]/20 hover:scale-102 transition-all cursor-pointer select-none"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Play Documentary</span>
              </button>
              
              <div className="flex items-center gap-2.5 text-neutral-400 text-xs px-2 py-3">
                <Clock className="w-4 h-4 text-[#fce303]" />
                <span>Runtime: {generalSettings?.docRuntime || "36 mins"}</span>
              </div>
            </div>
            
            <div className="border-t border-neutral-800 pt-6 flex items-center gap-4">
              <div className="flex -space-x-3">
                {['OY', 'OG', 'ON', 'OS', 'EK', 'LA'].map((state, idx) => (
                  <div key={idx} className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-[9px] font-bold text-white tracking-tighter shadow-md">
                    {state}
                  </div>
                ))}
              </div>
              <p className="text-xs text-neutral-500 font-light">
                Unifying <span className="text-white font-medium">six states</span> in developmental synergy.
              </p>
            </div>
          </div>

          {/* Header Right: Embedded Video Player with Premium Overlay */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl group">
              
              {!isPlayingDoc ? (
                // Custom Premium Cinematic Poster Overlay
                <div 
                  className="absolute inset-0 z-10 flex flex-col justify-between p-6 bg-cover bg-center cursor-pointer"
                  style={{ 
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.4) 100%), url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Cocoa_House%2C_Ibadan_03.jpg/1200px-Cocoa_House%2C_Ibadan_03.jpg')`
                  }}
                  onClick={() => setIsPlayingDoc(true)}
                >
                  {/* Top corner watermark */}
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#fce303] bg-black/60 px-3 py-1 rounded border border-white/5">
                      ODU'A OFFICIAL
                    </span>
                    <span className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-[#00a757] border border-white/5">
                      <Bookmark className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Play Button Ring Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#00a757]/95 text-white flex items-center justify-center shadow-2xl shadow-[#00a757]/40 ring-4 ring-[#fce303]/30 group-hover:scale-110 group-hover:bg-[#fce303] group-hover:text-black transition-all duration-300">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold tracking-wider text-white uppercase mt-1 drop-shadow-md">
                      Click to Stream
                    </span>
                  </div>

                  {/* Bottom Text bar */}
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2.5 rounded-xl bg-[#fce303]/10 border border-[#fce303]/20 shrink-0">
                      <Volume2 className="w-5 h-5 text-[#fce303]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#fce303]">Corporate Documentary</p>
                      <p className="text-xs text-neutral-300">A Story of Resilience & Resurgence</p>
                    </div>
                  </div>
                </div>
              ) : (
                // Full High-Performance iframe embed
                <iframe
                  src={`https://www.youtube.com/embed/${generalSettings?.youtubeDocId || "eWX37F1H_ZM"}?autoplay=1&rel=0`}
                  title="Odu'a Investment Corporate Documentary Video"
                  className="w-full h-full border-0 absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}

            </div>
          </div>

        </div>
      </motion.section>

      {/* B. INTERACTIVE NARRATIVE TIMELINE (VERTICAL STEPPER + DETAILS ENGINE) */}
      <section className="space-y-10 text-left">
        <div className="border-b border-neutral-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[#00a757] text-xs font-mono font-bold uppercase tracking-widest bg-[#00a757]/5 px-3 py-1 rounded-full">
              INTERACTIVE STEPPER
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mt-2">
              The Chapters of Resilience
            </h3>
            <p className="text-neutral-500 font-light text-xs sm:text-sm mt-1">
              Select any historical milestone below to inspect our timeline, strategy evolution, and key corporate checkpoints.
            </p>
          </div>
          <div className="flex gap-1.5 bg-neutral-100 p-1.5 rounded-xl border border-neutral-200 shrink-0 text-xs font-bold uppercase">
            <span className="px-3 py-1.5 bg-white text-neutral-800 rounded-lg shadow-sm border border-neutral-200/50">
              {dynamicChapters.length} Chapters
            </span>
            <span className="px-3 py-1.5 text-neutral-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#00a757]" /> Live
            </span>
          </div>
        </div>

        {/* Timeline Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Stepper Left list (Desktop/Mobile unified timeline) */}
          <div className="lg:col-span-5 space-y-4">
            
            <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 font-mono pl-1">
              Timeline Roadmap
            </p>

            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-3.5 relative pl-4 border-l-2 border-neutral-200"
            >
              {dynamicChapters.map((chapter, idx) => {
                const isActive = idx === activeChapter;
                const IconComp = chapter.icon;
                
                return (
                  <motion.button
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80 } }
                    }}
                    key={chapter.year}
                    onClick={() => setActiveChapter(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative select-none cursor-pointer flex gap-4 items-center hover:scale-[1.01] ${
                      isActive 
                        ? `bg-white ${chapter.colorTheme.border} ${chapter.colorTheme.glow} shadow-lg ring-2 ring-[#fce303]/20` 
                        : 'bg-white/50 border-neutral-200/80 hover:bg-white hover:border-neutral-300 hover:shadow'
                    }`}
                  >
                    {/* Stepper connector bullet */}
                    <div className={`absolute -left-[23px] w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                      isActive 
                        ? `${chapter.colorTheme.bg} border-white ring-4 ring-[#fce303]/30` 
                        : 'bg-neutral-300 border-white hover:bg-neutral-400'
                    }`} />

                    {/* Left Icon circle */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isActive 
                        ? `${chapter.colorTheme.bg} text-white border-transparent` 
                        : 'bg-neutral-100 text-neutral-500 border-neutral-200'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>

                    <div className="space-y-1 flex-grow">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[11px] font-mono font-bold leading-none uppercase ${
                          isActive ? chapter.colorTheme.text : 'text-neutral-400'
                        }`}>
                          {chapter.badge}
                        </span>
                        <span className={`text-xs font-mono font-black ${
                          isActive ? 'text-neutral-900 bg-[#fce303]/30 px-2 py-0.5 rounded' : 'text-neutral-500'
                        }`}>
                          {chapter.year}
                        </span>
                      </div>
                      <p className="text-neutral-900 font-serif font-extrabold text-sm sm:text-base leading-tight mt-1.5">
                        {chapter.title}
                      </p>
                      <p className="text-[11px] text-neutral-500 font-light truncate max-w-[280px]">
                        {chapter.tagline}
                      </p>
                    </div>

                    <ChevronRight className={`ml-auto w-4 h-4 shrink-0 transition-transform duration-300 ${
                      isActive ? `${chapter.colorTheme.text} translate-x-1` : 'text-neutral-300'
                    }`} />
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Detail View Right panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-xl space-y-8 relative overflow-hidden"
              >
                {/* Visual top border indicator matching current era theme */}
                <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 to-[#fce303]`} />

                {/* Card Title & Era tag */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6">
                  <div>
                    <span className={`text-xs font-mono font-bold uppercase tracking-widest ${currentChapter.colorTheme.text}`}>
                      {currentChapter.badge} — Milestone
                    </span>
                    <h4 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 mt-1">
                      {currentChapter.year} : {currentChapter.title}
                    </h4>
                    <p className="text-neutral-400 text-xs sm:text-sm italic mt-0.5">
                      "{currentChapter.tagline}"
                    </p>
                  </div>
                  
                  {/* Huge numeric label bubble */}
                  <div className={`w-14 h-14 rounded-2xl ${currentChapter.colorTheme.lightBg} ${currentChapter.colorTheme.text} border-2 ${currentChapter.colorTheme.border}/20 flex flex-col items-center justify-center shrink-0 shadow-inner`}>
                    <span className="text-[10px] uppercase font-mono font-bold leading-none">CHAPTER</span>
                    <span className="text-lg font-black font-mono leading-none mt-1">{activeChapter + 1}</span>
                  </div>
                </div>

                {/* Summary narrative paragraph */}
                <div className="space-y-5">
                  <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                    {currentChapter.summary}
                  </p>

                  {/* Bullet points detailing film insights */}
                  <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100 space-y-3.5">
                    <p className="text-[10px] uppercase font-bold text-neutral-400 font-mono tracking-widest">
                      Key Highlights & Documentary Insights
                    </p>
                    <ul className="space-y-2.5">
                      {currentChapter.details.map((detail, idx) => (
                        <li key={idx} className="flex gap-3 items-start text-xs text-neutral-600 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00a757] mt-1.5 shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Testimonial/Quotations section */}
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100/50 border border-neutral-200/60 overflow-hidden">
                  <span className="absolute -top-6 -left-2 text-7xl font-serif text-neutral-200/50 pointer-events-none select-none">“</span>
                  <p className="text-xs sm:text-sm text-neutral-600 italic leading-relaxed relative z-10 pl-4 font-light">
                    {currentChapter.quote}
                  </p>
                </div>

                {/* Footer metrics block */}
                <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {currentChapter.metric && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#fce303]/10 border border-[#fce303]/20 flex items-center justify-center text-[#00a757]">
                        <Award className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm font-mono font-black text-neutral-900 leading-none">{currentChapter.metric.value}</p>
                        <p className="text-[10px] text-neutral-500 uppercase font-mono mt-1 font-bold">{currentChapter.metric.label}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 ml-auto">
                    <button
                      onClick={() => setActiveChapter((prev) => (prev > 0 ? prev - 1 : dynamicChapters.length - 1))}
                      className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-xl border border-neutral-200 cursor-pointer transition-colors"
                    >
                      Prev Chapter
                    </button>
                    <button
                      onClick={() => setActiveChapter((prev) => (prev < dynamicChapters.length - 1 ? prev + 1 : 0))}
                      className="inline-flex items-center gap-1 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl cursor-pointer transition-colors"
                    >
                      <span>Next Chapter</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* FOOTER CTA SECTION */}
      <section className="bg-gradient-to-br from-[#00a757] to-emerald-800 text-white rounded-3xl p-8 sm:p-10 border-t-4 border-[#fce303] shadow-lg text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[#fce303] text-xs font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
              Looking Forward
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold">
              The Journey of Prosperity Continues
            </h4>
            <p className="text-emerald-50 font-light text-xs sm:text-sm max-w-2xl leading-relaxed">
              Odu’a is not just an archive of historical events; we are a living asset manager driving agritech, healthcare hub integration, real estate optimization, and sustainable energy development.
            </p>
          </div>
          <a
            href="#who"
            className="inline-flex items-center justify-center gap-2 bg-[#fce303] hover:bg-yellow-400 text-neutral-900 font-extrabold uppercase tracking-wider text-xs py-3.5 px-6 rounded-xl shrink-0 shadow-lg hover:scale-102 transition-all cursor-pointer"
          >
            <span>Who We Are</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

    </div>
  );
}
