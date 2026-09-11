import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Award, 
  Briefcase, 
  FileText, 
  GraduationCap, 
  MapPin, 
  Star, 
  TrendingUp, 
  Users,
  Heart,
  BookOpen
} from 'lucide-react';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';

export interface TimelineItem {
  year: string;
  desc: string;
}

export interface BioPageWrapperProps {
  name: string;
  role: string;
  image: string;
  tag: string;
  category: 'board' | 'leadership' | 'both';
  location?: string;
  royalTitle?: string;
  credentials?: string[];
  academics?: string[];
  memberships?: string[];
  hobbies?: string[];
  timeline?: TimelineItem[];
  staticDetails: string[];
  staticAchievements?: string[];
  setCurrentPage: (page: string) => void;
}

export default function BioPageWrapper({
  name,
  role,
  image,
  tag,
  category,
  location = "Headquarters, Ibadan",
  royalTitle,
  credentials = [],
  academics = [],
  memberships = [],
  hobbies = [],
  timeline = [],
  staticDetails = [],
  staticAchievements = [],
  setCurrentPage
}: BioPageWrapperProps) {
  const [activeTab, setActiveTab] = useState<'bio' | 'achievements' | 'credentials'>('bio');

  // Check CMS (localStorage) for generalSettings and member updates in real-time
  const generalSettings = useMemo(() => {
    if (typeof window === 'undefined') return {};
    try {
      const cached = localStorage.getItem('odua_cms_db');
      if (cached) {
        return JSON.parse(cached).generalSettings || {};
      }
    } catch (e) {}
    return {};
  }, []);

  const showBackButton = generalSettings.showProfileBackButton !== false;
  const backButtonLabel = generalSettings.profileBackButtonText || "Go Back";
  const showFloatingBack = generalSettings.profileFloatingBackButton !== false;

  const handleGoBack = () => {
    try {
      const storedPrev = sessionStorage.getItem('odua_prev_page');
      if (storedPrev && storedPrev !== displayName && storedPrev !== name && storedPrev !== 'Admin') {
        setCurrentPage(storedPrev);
        return;
      }
    } catch (e) {}

    if (category === 'leadership') {
      setCurrentPage('Leadership Team');
    } else {
      setCurrentPage('Board of Directors');
    }
  };

  const cmsMember = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const cachedDb = localStorage.getItem('odua_cms_db');
    if (!cachedDb) return null;
    try {
      const parsed = JSON.parse(cachedDb);
      // Search boardMembers first
      let found = parsed.boardMembers?.find((m: any) => 
        m.name.toLowerCase().includes(name.toLowerCase()) || 
        name.toLowerCase().includes(m.name.toLowerCase())
      );
      // If not found, search leadershipTeam
      if (!found) {
        found = parsed.leadershipTeam?.find((m: any) => 
          m.name.toLowerCase().includes(name.toLowerCase()) || 
          name.toLowerCase().includes(m.name.toLowerCase())
        );
      }
      return found || null;
    } catch (e) {
      return null;
    }
  }, [name]);

  const displayName = cmsMember?.name || name;
  const displayRole = cmsMember?.role || role;
  const displayImage = cmsMember?.image || image;

  // Retrieve details/biography from CMS, or fallback to staticDetails
  const displayDetailsParagraphs = useMemo(() => {
    if (cmsMember && cmsMember.details) {
      if (Array.isArray(cmsMember.details)) {
        return cmsMember.details;
      }
      if (typeof cmsMember.details === 'string') {
        return cmsMember.details.split('\n').map((p: string) => p.trim()).filter(Boolean);
      }
    }
    return staticDetails;
  }, [cmsMember, staticDetails]);

  // Retrieve achievements from CMS, or fallback to staticAchievements
  const displayAchievements = useMemo(() => {
    if (cmsMember && cmsMember.achievements) {
      if (Array.isArray(cmsMember.achievements)) {
        return cmsMember.achievements;
      }
      if (typeof cmsMember.achievements === 'string') {
        return cmsMember.achievements.split('\n').map((a: string) => a.trim()).filter(Boolean);
      }
    }
    return staticAchievements;
  }, [cmsMember, staticAchievements]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col text-left font-sans bg-neutral-50"
    >
      {/* PORTRAIT HERO BANNER (Extends to top to blend with transparent site navbar) */}
      <section className="bg-neutral-950 text-white relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20 border-b border-neutral-900">
        {/* High-Impact Clearly Visible Backdrop Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={category === 'leadership' ? HERO_BACKGROUNDS.leadershipTeam : HERO_BACKGROUNDS.boardOfDirectors}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-105 saturate-105 scale-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/60 to-neutral-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/50" />
          <div className="absolute inset-0 bg-[#00a757]/10 mix-blend-overlay" />
        </div>

        <div className="absolute inset-0 opacity-15 pointer-events-none z-1">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00a757] rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#fce303] rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb & Back navigation inside hero */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              {showBackButton && (
                <button
                  id="profile-top-go-back-btn"
                  onClick={handleGoBack}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-lg shadow-sm font-semibold text-xs transition-all transform hover:-translate-x-0.5 cursor-pointer select-none backdrop-blur-sm"
                  title="Return to previous directory"
                >
                  <ArrowLeft className="w-4 h-4 text-[#fce303]" />
                  <span>{backButtonLabel}</span>
                </button>
              )}

              <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-300 font-medium">
                <button 
                  onClick={() => setCurrentPage('Home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
                <span className="text-neutral-500">/</span>
                <button 
                  onClick={() => setCurrentPage(category === 'leadership' ? 'Leadership Team' : 'Board of Directors')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {category === 'leadership' ? 'Leadership' : 'Board of Directors'}
                </button>
                <span className="text-neutral-500">/</span>
                <span className="text-[#fce303] truncate max-w-[200px] font-semibold">{displayName}</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#fce303] bg-white/10 border border-white/15 px-3 py-1 rounded-full font-bold">
                {tag}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* PORTRAIT IMAGE */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#00a757] via-[#fce303] to-emerald-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-neutral-900 rounded-2xl overflow-hidden border-2 border-white/10 w-72 h-96 sm:w-80 sm:h-[420px] md:w-96 md:h-[480px] shadow-2xl shrink-0">
                  <img 
                    src={displayImage} 
                    alt={displayName} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter contrast-105 brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#fce303] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#fce303]/30">
                      {cmsMember?.title || tag}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* TEXT INFO */}
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <div className="inline-flex items-center gap-2 bg-[#00a757]/15 border border-[#00a757]/30 text-[#fce303] px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-bold">
                  <Star className="w-3.5 h-3.5 text-[#fce303] fill-current animate-pulse" />
                  <span>Executive Profile</span>
                </div>
                {showBackButton && (
                  <button
                    id="profile-hero-back-btn"
                    onClick={handleGoBack}
                    className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all border border-white/10 font-semibold cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{backButtonLabel}</span>
                  </button>
                )}
              </div>

              <div className="space-y-2">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                  {displayName}
                </h1>
                <p className="text-[#00a757] text-lg sm:text-xl font-bold font-serif uppercase tracking-wide">
                  {displayRole}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs text-neutral-400 font-light mt-1.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#fce303]" />
                    {location}
                  </span>
                  {credentials.length > 0 && (
                    <>
                      <span className="h-4 w-[1px] bg-neutral-800 hidden sm:inline" />
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-[#00a757]" />
                        {credentials[0]}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Royal Title Accent Box */}
              {royalTitle && (
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl max-w-2xl text-left">
                  <p className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#fce303]">Distinction</p>
                  <p className="text-white text-sm sm:text-base font-serif italic mt-1 font-light leading-relaxed">
                    {royalTitle}
                  </p>
                </div>
              )}

              <p className="text-neutral-300 font-light text-sm sm:text-base leading-relaxed max-w-3xl">
                {displayDetailsParagraphs[0] || "Distinguished representative of the Southwestern regional economic engine."}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CORE CONTENT NAVIGATION */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 justify-start">
            {[
              { id: 'bio', label: 'Biography & Overview', icon: FileText },
              { id: 'achievements', label: 'Key Milestones', icon: TrendingUp },
              { id: 'credentials', label: 'Credentials & Track Record', icon: GraduationCap }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isAct = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 border-b-2 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all select-none cursor-pointer ${
                    isAct 
                      ? 'border-[#00a757] text-[#00a757]' 
                      : 'border-transparent text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT PANEL: KEY STATS & INFO */}
          <div className="lg:col-span-4 space-y-8">
            {/* Professional Summary List */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-6">
              <h3 className="font-serif text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                Professional Dossier
              </h3>
              
              <div className="space-y-4">
                {academics.length > 0 && (
                  <div>
                    <span className="text-[10px] uppercase font-mono text-neutral-400 font-bold block">Academic Qualifications</span>
                    <ul className="text-xs text-neutral-800 space-y-1 mt-1.5 font-medium list-disc list-inside">
                      {academics.map((acad, i) => (
                        <li key={i}>{acad}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {credentials.length > 0 && (
                  <>
                    <div className="h-[1px] bg-neutral-100" />
                    <div>
                      <span className="text-[10px] uppercase font-mono text-neutral-400 font-bold block">Fellowships & Accreditations</span>
                      <ul className="text-xs text-neutral-800 space-y-1 mt-1.5 font-medium list-disc list-inside">
                        {credentials.map((cred, i) => (
                          <li key={i}>{cred}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {memberships.length > 0 && (
                  <>
                    <div className="h-[1px] bg-neutral-100" />
                    <div>
                      <span className="text-[10px] uppercase font-mono text-neutral-400 font-bold block">Memberships</span>
                      <ul className="text-xs text-neutral-800 space-y-1 mt-1.5 font-medium list-disc list-inside">
                        {memberships.map((memb, i) => (
                          <li key={i}>{memb}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {hobbies.length > 0 && (
                  <>
                    <div className="h-[1px] bg-neutral-100" />
                    <div>
                      <span className="text-[10px] uppercase font-mono text-neutral-400 font-bold block">Hobbies & Extracurriculars</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {hobbies.map((hobby, i) => (
                          <span key={i} className="text-[10px] font-mono font-bold uppercase bg-neutral-100 text-neutral-600 px-2 py-1 rounded-md border border-neutral-200">
                            {hobby}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* TIMELINE TRACK */}
            {timeline.length > 0 && (
              <div className="bg-gradient-to-br from-[#00a757] to-emerald-800 text-white rounded-3xl p-6 shadow-md space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full" />
                <h3 className="font-serif text-lg font-bold text-[#fce303]">
                  Milestone Highlights
                </h3>

                <div className="space-y-4 relative z-10">
                  {timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#fce303] mt-1 shrink-0" />
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-[#fce303] font-bold">{item.year}</p>
                        <p className="text-xs text-white/90 mt-0.5 leading-relaxed font-light">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANEL: TABS CONTENT */}
          <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            {activeTab === 'bio' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h2 className="font-serif text-2xl font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                  Professional Biography
                </h2>
                <div className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light space-y-4">
                  {displayDetailsParagraphs.map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h2 className="font-serif text-2xl font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                  Distinguished Achievements
                </h2>
                {displayAchievements.length > 0 ? (
                  <div className="space-y-4">
                    {displayAchievements.map((ach, index) => (
                      <div key={index} className="flex gap-4 items-start bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                        <span className="w-8 h-8 rounded-full bg-[#fce303]/20 text-neutral-900 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                            {ach}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-400 text-xs italic">No specific milestones documented yet.</p>
                )}
              </div>
            )}

            {activeTab === 'credentials' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                    Corporate Credentials & Frameworks
                  </h2>
                  <p className="text-neutral-600 text-sm leading-relaxed font-light">
                    Odu'a Investment Group operates on world-class governance frameworks, ensuring robust compliance, dynamic risk supervision, and sustainable value delivery to all shareholder states of South-West Nigeria.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/60 shadow-sm">
                    <h4 className="font-serif text-base font-bold text-neutral-900 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#00a757]" />
                      <span>Fiduciary Care</span>
                    </h4>
                    <p className="text-neutral-500 text-xs font-light mt-2 leading-relaxed">
                      Rigorous asset monitoring, transparent fiscal reporting, and highly vetted capital expenditure allocations.
                    </p>
                  </div>

                  <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/60 shadow-sm">
                    <h4 className="font-serif text-base font-bold text-neutral-900 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#00a757]" />
                      <span>Knowledge Capital</span>
                    </h4>
                    <p className="text-neutral-500 text-xs font-light mt-2 leading-relaxed">
                      Continuous capacity building, professional certifications, and executive representation across prominent sector boards.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM RETURN & EXPLORE SECTION (Full Width Container) */}
        <section className="mt-12 pt-8 border-t border-neutral-200/80 w-full" aria-label="Directory Navigation">
          <div className="bg-gradient-to-r from-neutral-50 via-white to-neutral-50 p-6 sm:p-8 rounded-3xl border border-neutral-200/90 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left space-y-1.5 flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#00a757] font-bold bg-[#00a757]/10 px-2.5 py-1 rounded-md">
                <Users className="w-3 h-3" />
                <span>Directory Navigation</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Finished reviewing {displayName}&apos;s profile?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-2xl">
                Easily return to the previous page or explore other members of our Board of Directors and Executive Management team.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 w-full lg:w-auto shrink-0">
              {showBackButton && (
                <button
                  id="profile-bottom-go-back-btn"
                  onClick={handleGoBack}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#00a757] hover:bg-[#008945] text-white rounded-xl shadow-sm font-bold text-xs uppercase tracking-wider transition-all transform hover:-translate-x-0.5 cursor-pointer select-none"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{backButtonLabel}</span>
                </button>
              )}
              {(category === 'board' || category === 'both') && (
                <button
                  id="profile-bottom-board-btn"
                  onClick={() => setCurrentPage('Board of Directors')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer select-none shadow-2xs"
                >
                  <span>Board of Directors</span>
                </button>
              )}
              {(category === 'leadership' || category === 'both') && (
                <button
                  id="profile-bottom-leadership-btn"
                  onClick={() => setCurrentPage('Leadership Team')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer select-none shadow-2xs"
                >
                  <span>Leadership Team</span>
                </button>
              )}
              <button
                id="profile-bottom-home-btn"
                onClick={() => setCurrentPage('Home')}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer select-none"
              >
                <span>Home</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING QUICK GO BACK BUTTON (Positioned bottom-right to avoid blocking content) */}
      {showFloatingBack && (
        <motion.button
          id="profile-floating-go-back-btn"
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGoBack}
          className="fixed bottom-6 right-6 z-40 bg-neutral-900/95 hover:bg-[#00a757] text-white px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md border border-white/20 flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer group select-none"
          title="Go Back"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{backButtonLabel}</span>
        </motion.button>
      )}
    </motion.div>
  );
}
