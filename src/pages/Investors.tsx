import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  FileText, 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  TrendingUp, 
  Sparkles,
  Percent,
  Download,
  Leaf,
  Layers,
  Users,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import WordPressPageHeader from '../components/WordPressPageHeader';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';

interface InvestorsProps {
  onOpenPartnerModal: () => void;
  onNavigate: (page: string) => void;
  initialTab?: 'governance' | 'risk';
  onTabChange?: (tab: 'governance' | 'risk') => void;
}

export default function Investors({ 
  onOpenPartnerModal, 
  onNavigate, 
  initialTab = 'governance',
  onTabChange 
}: InvestorsProps) {
  const [activeTab, setActiveTab] = useState<'governance' | 'risk'>(initialTab);

  // Sync internal state with prop changes (e.g., from header submenus)
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabSelect = (tab: 'governance' | 'risk') => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const tabs = [
    { id: 'governance', label: 'Our Governance', icon: Users, desc: 'Nomination and committee frameworks' },
    { id: 'risk', label: 'Managing Risk', icon: ShieldCheck, desc: 'Enterprise Risk Management framework' }
  ] as const;

  // Committee Member Profiles
  const COMMITTEE_MEMBERS = {
    governance: {
      title: "Governance & Nomination Committee",
      desc: "Providing rigorous oversight on board selection, corporate code compliance, and institutional appointment protocols.",
      members: [
        {
          name: "Mr. Seni Adio, SAN",
          role: "Chairman",
          bioPage: "Seni Adio",
          image: "https://i.postimg.cc/FzL4hWr0/seni-adio.jpg",
          initials: "SA",
          designation: "Director & Legal Counsel"
        },
        {
          name: "Chief Segun Ojo",
          role: "Member",
          bioPage: "Chief Segun Ojo",
          image: "https://i.postimg.cc/y6PhP1sr/Segun-Ojo.jpg",
          initials: "SO",
          designation: "Director & Former Finance Commissioner"
        },
        {
          name: "Dr. Tola Kasali",
          role: "Member",
          bioPage: "Tola Kasali",
          image: "https://i.postimg.cc/hj6VBLpX/Tola-Kasali.jpg",
          initials: "TK",
          designation: "Director & Former Commissioner (Lagos)"
        }
      ]
    },
    audit: {
      title: "Audit & Risk Committee",
      desc: "Guarding corporate assets, financial reporting integrity, statutory audits, and corporate risk landscapes.",
      members: [
        {
          name: "Mr. Segun Olujobi",
          role: "Chairman",
          bioPage: "Segun Olujobi",
          image: "https://i.postimg.cc/7Lyxpfgt/Segun-Olujobi.jpg",
          initials: "SO",
          designation: "Director & CEO, Vertex Energy"
        },
        {
          name: "Chief Segun Ojo",
          role: "Member",
          bioPage: "Chief Segun Ojo",
          image: "https://i.postimg.cc/y6PhP1sr/Segun-Ojo.jpg",
          initials: "SO",
          designation: "Director & Former Finance Commissioner"
        },
        {
          name: "Otunba Bimbo Ashiru",
          role: "Member",
          bioPage: "Bimbo Ashiru",
          image: "https://i.postimg.cc/XYxrCqWq/0c5017f7-bd1e-47d5-9265-656d8fbcbb1c.jpg",
          initials: "BA",
          designation: "Chairman, Board of Directors"
        }
      ]
    },
    finance: {
      title: "Finance, Investment & Strategy Committee",
      desc: "Steering asset growth, portfolio diversification, capital deployment, and regional joint-venture blueprints.",
      members: [
        {
          name: "Otunba Bimbo Ashiru",
          role: "Chairman",
          bioPage: "Bimbo Ashiru",
          image: "https://i.postimg.cc/XYxrCqWq/0c5017f7-bd1e-47d5-9265-656d8fbcbb1c.jpg",
          initials: "BA",
          designation: "Chairman, Board of Directors"
        },
        {
          name: "Mr. Adewale Raji",
          role: "Member",
          bioPage: null, // Former GMD
          image: "https://oduainvestment.com.ng/wp-content/uploads/2020/06/raji-adewale.jpg",
          initials: "AR",
          designation: "Director & Former Group GMD"
        },
        {
          name: "Mr. Segun Olujobi",
          role: "Member",
          bioPage: "Segun Olujobi",
          image: "https://i.postimg.cc/7Lyxpfgt/Segun-Olujobi.jpg",
          initials: "SO",
          designation: "Director & CEO, Vertex Energy"
        },
        {
          name: "Dr. Tola Kasali",
          role: "Member",
          bioPage: "Tola Kasali",
          image: "https://i.postimg.cc/hj6VBLpX/Tola-Kasali.jpg",
          initials: "TK",
          designation: "Director & Former Commissioner (Lagos)"
        },
        {
          name: "Mr. Seni Adio, SAN",
          role: "Member",
          bioPage: "Seni Adio",
          image: "https://i.postimg.cc/FzL4hWr0/seni-adio.jpg",
          initials: "SA",
          designation: "Director & Legal Counsel"
        }
      ]
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col text-left font-sans"
    >
      {/* WordPress-Style Header with Breadcrumbs */}
      <WordPressPageHeader
        title={activeTab === 'governance' ? "Corporate Governance & Board Oversight" : "Enterprise Risk Management Framework"}
        subtitle="Ensuring institutional-grade corporate compliance, fiduciary integrity, and resilient risk mitigation structures across our investment portfolio."
        badge="Investor Relations & Governance"
        breadcrumbs={[
          { label: 'Governance', page: 'Our Governance' },
          { label: activeTab === 'governance' ? 'Board Committees' : 'Managing Risk', active: true }
        ]}
        onNavigate={onNavigate}
        backgroundImage={HERO_BACKGROUNDS.investors}
      />

      {/* TABS CONTAINER */}
      <section className="bg-white border-b border-neutral-200/80 sticky top-20 z-30 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center sm:justify-start overflow-x-auto scrollbar-none py-4 gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabSelect(tab.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all cursor-pointer text-left group shrink-0 border ${
                    isSelected
                      ? 'bg-neutral-950 text-white border-neutral-950 shadow-md scale-102'
                      : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 border-neutral-200/60'
                  }`}
                >
                  <span className={`p-2 rounded-xl transition-colors ${
                    isSelected ? 'bg-[#00a757] text-[#fce303]' : 'bg-neutral-200/60 text-neutral-500 group-hover:text-neutral-800'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <div>
                    <h5 className="font-bold text-xs leading-none">{tab.label}</h5>
                    <p className={`text-[9px] font-light mt-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {tab.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* DYNAMIC SUB-PAGES */}
      <section className="py-16 bg-[#fcfdfc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {activeTab === 'governance' ? (
              <motion.div
                key="governance-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-16"
              >
                {/* Intro */}
                <div className="text-left space-y-4 max-w-4xl">
                  <span className="text-[#00a757] text-xs font-bold uppercase tracking-widest bg-[#00a757]/10 px-3.5 py-1.5 rounded-full inline-block font-mono">
                    Board Oversight
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 leading-tight">
                    Our Governance Structure
                  </h2>
                  <p className="text-neutral-600 text-sm font-light leading-relaxed">
                    Odu’a Investment Company Limited implements strict corporate governance standards aligned with international best practices. Under the guidance of our state-appointed board representing South-Western Nigeria, three distinct standing committees carry out regular fiduciary, risk, and strategy execution checks.
                  </p>
                </div>

                {/* Committees Grids */}
                {Object.entries(COMMITTEE_MEMBERS).map(([key, section]) => (
                  <div key={key} className="space-y-6 border-t border-neutral-200/80 pt-10">
                    <div className="max-w-3xl text-left space-y-2">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 flex items-center gap-2.5">
                        <span className="w-1.5 h-6 bg-[#00a757] rounded" />
                        {section.title}
                      </h3>
                      <p className="text-neutral-500 text-xs font-light">{section.desc}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {section.members.map((member, idx) => (
                        <div 
                          key={idx}
                          onClick={() => member.bioPage && onNavigate(member.bioPage)}
                          className={`bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-sm transition-all duration-300 group flex flex-col ${
                            member.bioPage 
                              ? 'cursor-pointer hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1' 
                              : ''
                          }`}
                        >
                          {/* Large Prominent Executive Portrait Image */}
                          <div className="w-full h-64 sm:h-72 bg-gradient-to-b from-neutral-100 to-neutral-200 overflow-hidden relative border-b border-neutral-100">
                            {member.image ? (
                              <img 
                                src={member.image} 
                                alt={member.name}
                                className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.02] transition-transform duration-500 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  const fallback = e.currentTarget.parentElement?.querySelector('.fallback-initials') as HTMLElement | null;
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div 
                              className={`fallback-initials w-full h-full ${member.image ? 'hidden' : 'flex'} items-center justify-center bg-gradient-to-br from-[#00a757] via-emerald-800 to-neutral-900 font-serif font-bold text-white text-4xl shadow-inner`}
                            >
                              {member.initials}
                            </div>
                            
                            {/* Role Badge pinned neatly to top right */}
                            <div className="absolute top-3 right-3 z-10">
                              <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md backdrop-blur-md ${
                                member.role === 'Chairman' 
                                  ? 'bg-[#00a757] text-white ring-2 ring-white/30' 
                                  : 'bg-neutral-900/85 text-white ring-1 ring-white/20'
                              }`}>
                                {member.role}
                              </span>
                            </div>
                          </div>

                          <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left bg-white">
                            <div>
                              <h4 className="font-serif text-base sm:text-lg font-bold text-neutral-900 group-hover:text-[#00a757] transition-colors leading-snug">
                                {member.name}
                              </h4>
                              <p className="text-xs text-neutral-600 font-medium mt-1 leading-relaxed">
                                {member.designation}
                              </p>
                            </div>

                            {member.bioPage && (
                              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00a757] group-hover:translate-x-1 transition-transform">
                                  <span>View Executive Biography</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="risk-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-16"
              >
                {/* Intro Hero Style Banner */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <span className="text-amber-600 text-xs font-bold uppercase tracking-widest bg-amber-50 px-3.5 py-1.5 rounded-full inline-block border border-amber-200/50 font-mono">
                      Mitigation &amp; Safety
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 leading-tight">
                      Enterprise Risk Management Philosophy
                    </h2>
                    
                    <div className="space-y-4 text-neutral-700 text-sm font-light leading-relaxed">
                      <p>
                        The company is aware that the business world is becoming increasingly complex due to new, evolving, and emerging risks. Failure to manage risks effectively will in no doubt jeopardize our objective of creating value for our stakeholders and maximizing returns on our shareholders’ investment.
                      </p>
                      <p>
                        We know that the uncertainties in the business world today present both risk and opportunity with the potential to erode or enhance stakeholder value. The Board has established and maintains a robust Enterprise Risk Management (ERM) framework through which the organization deals effectively with uncertainties and associated risks and opportunities thereby enhancing our capacity to build value.
                      </p>
                    </div>

                    <div className="pt-4 flex items-center gap-3 text-xs text-[#00a757] font-bold">
                      <ShieldCheck className="w-5 h-5 shrink-0" />
                      <span>Certified compliant with regional statutory audit mandates.</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-neutral-900 rounded-3xl p-8 border border-neutral-800 text-white relative overflow-hidden shadow-xl">
                    <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#00a757]/10 rounded-full blur-2xl pointer-events-none" />
                    
                    <h3 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-4 mb-4 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-[#fce303]" />
                      <span>Key Risk Pillars</span>
                    </h3>

                    <div className="space-y-4">
                      {[
                        { title: "Strategic Risk", desc: "Co-investing with high-integrity partners to prevent portfolio stagnation." },
                        { title: "Operational Risk", desc: "Subsidiary tracking, asset performance auditing, and technical readiness." },
                        { title: "Financial Risk", desc: "Liquidity reserve protections, optimal leverage ratios, and treasury security." },
                        { title: "Regulatory Risk", desc: "Statutory code filings and total transparency inside OICL conglomerates." }
                      ].map((pillar, i) => (
                        <div key={i} className="text-left space-y-1">
                          <h5 className="font-bold text-xs text-[#fce303] flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-[#00a757] rounded-full" />
                            {pillar.title}
                          </h5>
                          <p className="text-[10px] text-neutral-400 font-light leading-snug pl-2.5">
                            {pillar.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ERM Implementation Model */}
                <div className="border-t border-neutral-200/80 pt-16 space-y-8 text-left">
                  <div className="max-w-3xl space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">
                      Our Three Lines of Defense Model
                    </h3>
                    <p className="text-neutral-500 text-xs font-light">
                      Odu'a Group enforces independent checkpoints across all operating divisions to guarantee transparency.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                      {
                        num: "01",
                        title: "Frontline Management",
                        desc: "Operational divisions and subsidiary managers actively monitor risks, maintain compliance registers, and report performance."
                      },
                      {
                        num: "02",
                        title: "Risk Oversight & Legal",
                        desc: "The Group Risk Management function coordinates legal controls, defines the general risk appetites, and reviews audit logs."
                      },
                      {
                        num: "03",
                        title: "Independent Audit",
                        desc: "Internal and external statutory audits supply independent reporting directly to the Audit & Risk Board Committee."
                      }
                    ].map((step, idx) => (
                      <div key={idx} className="bg-white rounded-2xl p-6 border border-neutral-200/60 shadow-sm text-left space-y-4">
                        <span className="text-2xl font-black text-[#00a757]/15 block tracking-widest font-mono">
                          {step.num}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-neutral-900">{step.title}</h4>
                        <p className="text-neutral-600 text-xs font-light leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
}
