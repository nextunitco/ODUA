import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  BookOpen, 
  Sprout, 
  Laptop, 
  Users, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap,
  ExternalLink,
  Globe,
  MapPin,
  Mail,
  ShieldCheck,
  Code,
  Building2
} from 'lucide-react';
import WordPressPageHeader from '../components/WordPressPageHeader';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';

interface OduaFoundationProps {
  onNavigate?: (page: string) => void;
  onOpenPartnerModal?: () => void;
  initiatives?: any[];
}

const OFFICIAL_PILLARS = [
  {
    icon: Code,
    title: "Project DEFINED (Digital Education)",
    category: "Flagship Digital Revolution",
    badge: "Official Flagship",
    desc: "Digital Education for Innovation and Economic Development (DEFINED) equips public primary and secondary school students across all 137 LGAs in the 6 Southwest states with world-class digital skills, coding curricula, and innovation hubs.",
    stats: "137 Local Gov Areas across 6 SW States",
    linkText: "Learn more on odif.ng",
    linkUrl: "https://www.odif.ng/"
  },
  {
    icon: GraduationCap,
    title: "Education & Literacy Transformation",
    category: "Academic Empowerment",
    badge: "Scholarships & Schools",
    desc: "Upgrading public school learning infrastructure, funding tertiary scholarships for indigent scholars in STEM and economics, and providing continuous professional development for regional educators.",
    stats: "Thousands of Public School Scholars Supported",
    linkText: "View Educational Initiatives",
    linkUrl: "https://www.odif.ng/"
  },
  {
    icon: Heart,
    title: "Healthcare & Community Well-being",
    category: "Public Health & Social Welfare",
    badge: "Community Care",
    desc: "Targeted medical outreaches, maternal and child healthcare support, and public health awareness drives in underserved rural and semi-urban communities across the Southwest.",
    stats: "Direct Primary Health Outreaches",
    linkText: "Health Programs on odif.ng",
    linkUrl: "https://www.odif.ng/"
  },
  {
    icon: Sprout,
    title: "Youth Empowerment & Agripreneurship",
    category: "Agribusiness & Enterprise",
    badge: "Economic Inclusion",
    desc: "Fostering productive livelihoods for Southwestern youths through hands-on entrepreneurship incubation, modern mechanized farming grants, and linkage with Odu'a agribusiness subsidiaries.",
    stats: "Empowering Next-Gen Agripreneurs",
    linkText: "Explore Youth Programs",
    linkUrl: "https://www.odif.ng/"
  }
];

export default function OduaFoundation({ onNavigate, onOpenPartnerModal, initiatives }: OduaFoundationProps) {
  // Eligibility Checker State
  const [eligibilityState, setEligibilityState] = useState({
    stateOrigin: 'Oyo State',
    category: 'Project DEFINED Digital Training',
    ageGroup: '18-35',
    isStudentOrEntrepreneur: 'Student / Young Professional'
  });
  const [checkerResult, setCheckerResult] = useState<boolean | null>(null);

  const handleCheckEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckerResult(true);
  };

  const activeInitiatives = (initiatives !== undefined && initiatives !== null && initiatives.length > 0) 
    ? initiatives 
    : OFFICIAL_PILLARS;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#fcfdfc] min-h-screen pb-20 font-sans"
    >
      {/* WordPress-Style Header with Breadcrumbs */}
      <WordPressPageHeader
        title="The Odu'a Investment Foundation (OIF)"
        subtitle="Established in September 2021 as the non-profit CSR arm advancing social development, education, youth digital skills, and healthcare across the six shareholder states."
        badge="Corporate Social Responsibility"
        breadcrumbs={[
          { label: 'About Us', page: 'About Us' },
          { label: "Odu'a Foundation", active: true }
        ]}
        onNavigate={onNavigate || (() => {})}
        backgroundImage={HERO_BACKGROUNDS.foundation}
        action={
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href="https://www.odif.ng/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-xs"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>Visit odif.ng</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
            <button
              onClick={() => onOpenPartnerModal && onOpenPartnerModal()}
              className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold px-4 py-2 rounded-lg transition-colors border border-neutral-200 cursor-pointer"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
            </button>
          </div>
        }
      />

      {/* Impact Stat Highlights Bar */}
      <div className="bg-white border-b border-neutral-200 py-4 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-100 text-center sm:text-left">
            <div className="pt-2 sm:pt-0 sm:px-3">
              <span className="font-serif text-xl sm:text-2xl font-bold text-emerald-800">137 LGAs</span>
              <p className="text-[11px] font-mono text-neutral-500 uppercase mt-0.5">Project DEFINED Reach</p>
            </div>
            <div className="pt-2 sm:pt-0 sm:px-3">
              <span className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">6 States</span>
              <p className="text-[11px] font-mono text-neutral-500 uppercase mt-0.5">SW Shareholder Network</p>
            </div>
            <div className="pt-2 sm:pt-0 sm:px-3">
              <span className="font-serif text-xl sm:text-2xl font-bold text-emerald-700">Sept 2021</span>
              <p className="text-[11px] font-mono text-neutral-500 uppercase mt-0.5">Foundation Established</p>
            </div>
            <div className="pt-2 sm:pt-0 sm:px-3">
              <span className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">Cocoa House</span>
              <p className="text-[11px] font-mono text-neutral-500 uppercase mt-0.5">23rd Floor Secretariat</p>
            </div>
          </div>
        </div>
      </div>

      {/* OFFICIAL ODIF.NG PORTAL CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-gradient-to-r from-emerald-900 via-neutral-900 to-neutral-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#fce303] animate-ping" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#fce303]">
                Official Independent Foundation Portal
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Discover Full Foundation Programs on odif.ng
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Explore real-time program updates, Project DEFINED school registrations, grant opportunities, donor partnerships, and official impact reports directly on the dedicated foundation website.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <a
              href="https://www.odif.ng/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              <span>Go to odif.ng</span>
              <ExternalLink className="w-4 h-4 text-[#fce303]" />
            </a>
          </div>
        </div>
      </section>

      {/* FLAGSHIP SPOTLIGHT: PROJECT DEFINED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a757]/10 text-[10px] font-mono font-bold uppercase tracking-widest text-[#00a757]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Flagship Digital Empowerment Initiative</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
                Project DEFINED
              </h2>
              <p className="text-xs font-mono text-[#00a757] font-bold">
                Digital Education For Innovation and Economic Development
              </p>
              <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">
                Launched by the Odu'a Investment Foundation in October 2023, Project DEFINED is a generational initiative created to ignite a digital education revolution across public primary and secondary schools in all 137 Local Government Areas of Southwest Nigeria.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Core Pillar 1</span>
                <p className="text-xs font-bold text-neutral-900">Curriculum Digital Integration</p>
                <p className="text-[11px] text-neutral-500 font-light">Embedding digital skills across the first 12 years of basic education.</p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Core Pillar 2</span>
                <p className="text-xs font-bold text-neutral-900">School Coding Clubs & Hubs</p>
                <p className="text-[11px] text-neutral-500 font-light">Providing coding clubs, hackathons, and physical innovation sandboxes.</p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Core Pillar 3</span>
                <p className="text-xs font-bold text-neutral-900">Teacher Upskilling & Tech</p>
                <p className="text-[11px] text-neutral-500 font-light">Equipping public school educators with modern tech pedagogical toolkits.</p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Core Pillar 4</span>
                <p className="text-xs font-bold text-neutral-900">137 LGA Pan-Southwest Scale</p>
                <p className="text-[11px] text-neutral-500 font-light">Equitable grassroots access across Oyo, Ondo, Ogun, Osun, Ekiti, and Lagos.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono font-bold text-[#00a757]">
                Live applications and updates at odif.ng
              </span>
              <a
                href="https://www.odif.ng/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-[#00a757] transition-colors cursor-pointer"
              >
                <span>Read Project DEFINED Brief</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-neutral-900 relative min-h-[300px]">
            <img 
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80" 
              alt="Digital Education and Technology" 
              className="w-full h-full object-cover filter brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-xs font-mono text-[#fce303] uppercase font-bold">Youth Empowerment</span>
              <h4 className="font-serif text-xl font-bold mt-1">Preparing Southwest Youths for the Global Digital Economy</h4>
              <p className="text-xs text-neutral-300 font-light mt-1">From coding fundamentals to robotics and artificial intelligence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE STRATEGIC IMPACT PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-[#00a757] tracking-wider">
            Sustaining Heritage & Social Welfare
          </span>
          <h2 className="font-serif text-3xl font-bold text-neutral-900">Core Strategic Pillars</h2>
          <p className="text-neutral-600 text-sm font-light">
            Complementing the efforts of the six shareholder state governments to transform lives through targeted socio-economic interventions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeInitiatives.map((init: any, idx: number) => {
            const Icon = init.icon || Heart;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-neutral-200/80 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-[#00a757]/10 text-[#00a757] rounded-2xl flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full border border-neutral-200">
                      {init.category || init.badge || "Impact Pillar"}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-neutral-900">{init.title}</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">{init.desc}</p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#00a757]">{init.stats}</span>
                  <a
                    href={init.linkUrl || "https://www.odif.ng/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-neutral-900 hover:text-[#00a757] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{init.linkText || "Learn on odif.ng"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* LEADERSHIP & ADVISORY COUNCIL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 border border-neutral-800 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-[#fce303] tracking-wider">
              Governance & Stewardship
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Foundation Advisory Council
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
              Guided by distinguished leaders of Southwest Nigeria committed to integrity, transparency, and high-impact social governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fce303]/20 text-[#fce303] flex items-center justify-center font-serif font-bold text-sm">
                  AO
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Ambassador (Dr.) Olatokunbo Awolowo Dosumu</h4>
                  <p className="text-xs text-[#fce303] font-mono">Chairman, Foundation Advisory Council</p>
                </div>
              </div>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                Eminent medical doctor, former diplomat, and daughter of Chief Obafemi Awolowo, leading the seven-member Advisory Council of the Odu'a Investment Foundation to drive regional transformation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00a757]/20 text-[#00a757] flex items-center justify-center font-serif font-bold text-sm">
                  AA
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Mrs. Abiola Olufunke Ajayi</h4>
                  <p className="text-xs text-[#00a757] font-mono">Executive Secretary, Odu'a Investment Foundation</p>
                </div>
              </div>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                Company Secretary and Head of Legal at Odu'a Investment Company Limited, steering foundation administration, institutional compliance, and day-to-day program delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GRANT & SCHOLARSHIP ELIGIBILITY CHECKER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-neutral-800 space-y-8">
          <div className="border-b border-white/10 pb-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#fce303] mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Eligibility Portal</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Check Your Program Eligibility
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm font-light mt-1">
              Are you an indigenous youth, student, or educator in Oyo, Ogun, Ondo, Osun, Ekiti, or Lagos? Verify your program fit in 30 seconds before visiting the official portal at odif.ng.
            </p>
          </div>

          <form onSubmit={handleCheckEligibility} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono font-bold uppercase text-neutral-400 block mb-1">State of Origin / Residence</label>
                <select
                  value={eligibilityState.stateOrigin}
                  onChange={(e) => setEligibilityState({ ...eligibilityState, stateOrigin: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#00a757]"
                >
                  <option value="Oyo State" className="text-black">Oyo State</option>
                  <option value="Ogun State" className="text-black">Ogun State</option>
                  <option value="Ondo State" className="text-black">Ondo State</option>
                  <option value="Osun State" className="text-black">Osun State</option>
                  <option value="Ekiti State" className="text-black">Ekiti State</option>
                  <option value="Lagos State" className="text-black">Lagos State</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono font-bold uppercase text-neutral-400 block mb-1">Program Track</label>
                <select
                  value={eligibilityState.category}
                  onChange={(e) => setEligibilityState({ ...eligibilityState, category: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#00a757]"
                >
                  <option value="Project DEFINED Digital Training" className="text-black">Project DEFINED Digital Skills (137 LGAs)</option>
                  <option value="Agribusiness Grant" className="text-black">SWAgCo NextGen Agripreneurs</option>
                  <option value="Tertiary Scholarship" className="text-black">Undergraduate STEM & Economics Scholarships</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
            >
              <span>Evaluate Eligibility</span>
              <ArrowRight className="w-4 h-4 text-[#fce303]" />
            </button>
          </form>

          {checkerResult !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-white/10 border border-[#00a757] space-y-4"
            >
              <div className="flex items-center gap-3 text-[#fce303]">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <h4 className="font-serif text-lg font-bold text-white">Eligible for {eligibilityState.category}!</h4>
              </div>
              <p className="text-xs text-neutral-200 font-light leading-relaxed">
                As a resident/indigene of <strong className="text-white">{eligibilityState.stateOrigin}</strong>, you qualify to apply through the official Foundation portal. Official registrations and intake cohorts are processed on <strong className="text-white">odif.ng</strong>.
              </p>
              <div className="pt-2">
                <a
                  href="https://www.odif.ng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00a757] hover:bg-[#008c48] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <span>Proceed to Official Registration at odif.ng</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* FOUNDATION SECRETARIAT & CONTACT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-md p-8 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00a757] block mb-1">
                Foundation Secretariat
              </span>
              <h3 className="font-serif text-2xl font-bold text-neutral-900">
                Odu'a Investment Foundation Office
              </h3>
            </div>
            <a
              href="https://www.odif.ng/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-[#00a757] text-white text-xs font-bold transition-all cursor-pointer shadow-sm shrink-0"
            >
              <span>Visit odif.ng</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#00a757] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-neutral-800 mb-0.5">Location</strong>
                <p className="text-neutral-600 font-light">23rd Floor, Cocoa House, Dugbe, Ibadan, Oyo State, Nigeria</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#00a757] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-neutral-800 mb-0.5">Inquiries & Grants</strong>
                <p className="text-neutral-600 font-light">info@odif.ng</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="w-4 h-4 text-[#00a757] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-neutral-800 mb-0.5">Official Portal</strong>
                <a 
                  href="https://www.odif.ng/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#00a757] hover:underline font-bold"
                >
                  www.odif.ng
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
}

