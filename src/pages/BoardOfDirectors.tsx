import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, X, ArrowRight, Award } from 'lucide-react';
import WordPressPageHeader from '../components/WordPressPageHeader';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';

interface Profile {
  id?: string | number;
  name: string;
  role: string;
  bio: string;
  tag: string;
  initials: string;
  image?: string;
  committees?: string;
  achievements?: string[];
  education?: string;
  fullBioParagraphs?: string[];
}

const BOARD_MEMBERS: Profile[] = [
  {
    name: "Otunba Bimbo Ashiru",
    role: "Chairman, Board of Directors",
    tag: "Board Chairman",
    initials: "BA",
    image: "https://i.postimg.cc/XYxrCqWq/0c5017f7-bd1e-47d5-9265-656d8fbcbb1c.jpg",
    committees: "Governance (Chair), Strategic Alliances, Sovereign Relations",
    education: "FCA, FCTI - Fellow, Chartered Institute of Bankers of Nigeria",
    bio: "Otunba Bimbo Ashiru is a highly distinguished investment banker and seasoned public administrator. As the Chairman of Odu'a Investment Company Limited, he leads strategic oversight, coordinates high-level sovereign relationships between shareholder states, and ensures the highest level of corporate integrity. Known for his stellar execution, he has successfully repositioned Odu'a as the prime investment engine of South-Western Nigeria, fostering landmark public-private collaborations.",
    achievements: [
      "Secured massive regional infrastructure investment commitments",
      "Pioneered state-level investment coordination councils",
      "Upgraded institutional governance standards to international benchmarks"
    ]
  },
  {
    name: "Mr. Abdulrahman Yinusa",
    role: "Group Managing Director / CEO",
    tag: "GMD / CEO",
    initials: "AY",
    image: "https://i.postimg.cc/76ZdZBVy/processed-51B12DDB-7334-4282-9D88-3345BD2681ED.jpg",
    committees: "Executive Committee, Finance & Investment, Risk Management",
    education: "B.Sc. Economics, MBA Finance, Fellow of CIBN & ICAN",
    bio: "Mr. Abdulrahman Yinusa is an accomplished financial executive with over three decades of premium banking, treasury management, and executive corporate leadership. He steers the daily operations, portfolio diversification, and capital allocation strategies of the Odu'a Group. Under his visionary stewardship, the conglomerate is undergoing an unprecedented digital and sustainable agriculture transformation, driving outstanding commercial yields and lasting societal value.",
    achievements: [
      "Led the comprehensive restructuring of group subsidiaries for maximum profit efficiency",
      "Spearheaded SWAgCo's large-scale agricultural regeneration schemes",
      "Successfully launched the group's digital incubation and innovation hub"
    ]
  },
  {
    name: "Mr. Abiodun Olamide Bamiduro",
    role: "Group Chief Financial Officer / GCFO",
    tag: "Group Finance",
    initials: "AB",
    image: "https://i.postimg.cc/sg7qY5F3/Whats-App-Image-2026-01-16-at-8-20-46-AM.jpg",
    committees: "Finance & Investment, Audit & Compliance, Risk Management",
    education: "FCA, Executive Management Alumnus of Wharton School",
    bio: "Mr. Abiodun Olamide Bamiduro, a Fellow of the Institute of Chartered Accountants of Nigeria (ICAN), is promoted from within, having served as the Group’s Financial Controller, Odu’a Investment Company Limited (OICL) since 2021. His tenure as Financial Controller was marked by significant contributions, including leading the committee that achieved OICL’s first Credit Rating by Agusto & Co, chairing the implementation of a cost-saving Group-wide ERP system, and establishing a robust internal financial control framework. Mr. Bamiduro is a strategic business leader who has demonstrated an unparalleled understanding of the company’s vision. Prior to joining OICL, Mr. Bamiduro spent over 2 decades in the energy industry, which includes a notable 15-year career with Transocean, a global leader in offshore drilling. There, he rose to the position of Finance Manager for Nigeria & Africa Remote Operations, making history as the first Nigerian and African to hold full financial responsibility for one of the company’s largest operational regions. His expertise is comprehensive, covering financial control, treasury, tax management, and complex financial integrations. His strategic acumen is further recognized through his current roles as a Non-Executive Director on the boards of some OICL subsidiaries, including Lagos Airport Hotel Limited.",
    achievements: [
      "Led the committee that achieved Odu'a's first ever Agusto & Co Credit Rating",
      "Chaired the implementation of a group-wide cost-saving ERP system",
      "Established a robust internal financial control framework across OICL"
    ]
  },
  {
    name: "Chief Segun Ojo",
    role: "Director",
    tag: "Shareholder Representative",
    initials: "SO",
    image: "https://i.postimg.cc/y6PhP1sr/Segun-Ojo.jpg",
    committees: "Agro-Allied Development, Audit Committee",
    education: "M.Sc. Economics & Statistics, Fellow of the Institute of Statisticians, England",
    bio: "Chief Segun Ojo is a thoroughbred civil servant, distinguished author, and resourceful administrator who served as the Ondo State Commissioner for Finance, Economic Planning, and Budget (1999-2003). He pioneered critical fiscal reforms and was the strategic brain behind the establishment of OSOPADEC.",
    achievements: [
      "Pioneered the establishment of the Ondo State Oil Producing Area Development Commission (OSOPADEC)",
      "Vastly increased Ondo State's IGR and blocked leakages in the financial system as Finance Commissioner",
      "Served with distinction as Chairman of Odu'a Investment Company Limited from April 2017 to December 2017"
    ]
  },
  {
    name: "Mr. Seni Adio, SAN",
    role: "Director",
    tag: "Legal Counsel",
    initials: "SA",
    image: "https://i.postimg.cc/FzL4hWr0/seni-adio.jpg",
    committees: "Legal & Regulatory Compliance (Chair), Corporate Governance",
    education: "LL.B (Hons), LL.M (Columbia University), Senior Advocate of Nigeria",
    bio: "Mr. Seni Adio, SAN, is a Senior Advocate of Nigeria and Managing Partner of COPLEY PARTNERS. He has over three decades of international and domestic experience representing global conglomerates and spearheading major legal reforms.",
    achievements: [
      "Appointed to the Presidential Committee on the impact and readiness of AfCFTA",
      "Served as Chairman of the Nigerian Bar Association Section on Business Law (NBA-SBL)",
      "Admitted as Member (Partner) at the prominent law firm Mintz Levin in Boston, USA"
    ]
  },
  {
    name: "Dr. Tola Kasali",
    role: "Director",
    tag: "Lagos State Representative",
    initials: "TK",
    image: "https://i.postimg.cc/hj6VBLpX/Tola-Kasali.jpg",
    committees: "Social Infrastructure & Healthcare, Strategy Execution, Lagos State Representation",
    education: "Doctor of Medicine (M.D.)",
    bio: "Dr. Tola Kasali is a dedicated and compassionate medical practitioner and a highly accomplished public administrator who has served in multiple commissioner portfolios in Lagos State, including Rural Development, Health, and Special Duties, midwifing landmark security and emergency infrastructures.",
    achievements: [
      "Former Commissioner for Rural Development, Lagos State (2003-2006), significantly upgrading rural infrastructure",
      "Former Commissioner for Health, Lagos State (2006)",
      "Former Commissioner for Special Duties, Lagos State (2007-2011), midwifing LASEMA and the Lagos State Safety Commission",
      "Former Executive Chairman of Ibeju-Lekki Local Government Council with an indelible record of achievements"
    ]
  },
  {
    name: "Mr. Segun Olujobi",
    role: "Director",
    tag: "Energy & Management",
    initials: "SO",
    image: "https://i.postimg.cc/7Lyxpfgt/Segun-Olujobi.jpg",
    committees: "Energy Infrastructure, Audit, Strategic Growth Support",
    education: "Mechanical Engineering (University of Lagos), LBS & IMD Alumnus",
    bio: "Mr. Segun Olujobi is the Chief Executive Officer of Vertex Energy Limited. He co-founded the firm after an illustrious career spanning African Capital Alliance (private equity) and Accenture (global management consulting). He is an alumnus of the executive programs of Lagos Business School and IMD, and a fellow of the Aspen Leadership Initiative West Africa.",
    achievements: [
      "Chief Executive Officer and Co-founder of Vertex Energy Limited",
      "Former Investment Professional at African Capital Alliance (ACA)",
      "Former Management Consultant at Accenture, advising blue-chip conglomerates",
      "Fellow of the Aspen Leadership Initiative West Africa (ALIWA)"
    ]
  },
  {
    name: "Otunba Lai Oriowo",
    role: "Director",
    tag: "Aviation & Finance",
    initials: "LO",
    image: "https://i.postimg.cc/PfL5vsrv/OTUNBA-ORIOWO.jpg",
    committees: "Aviation & Infrastructure Development, Risk Oversight",
    education: "NCAT Zaria Graduate, Airline Training Institute Alumnus",
    bio: "Otunba Lai Oriowo is a consummate Aviation professional of over three decades, an alumnus of Airline Training Institute (California), and former Executive Director at NAMA. He has served on NCAT and SAHCOL boards, and is currently Chairman of Chanelle Microfinance Bank.",
    achievements: [
      "Appointed Director of OICL effective 7th May 2024",
      "Former Executive Director at Nigerian Airspace Management Agency (NAMA)",
      "Current Chairman of Chanelle Microfinance Bank",
      "Over 30 years of aviation and corporate governance experience"
    ]
  },
  {
    name: "Otunba Mrs. Adebola Osibogun",
    role: "Independent Director",
    tag: "Finance & Banking",
    initials: "AO",
    image: "https://i.postimg.cc/qqHS73vF/Otunba-Mrs-Adebola-Osibogun.jpg",
    committees: "Audit & Risk Assessment, Ethics Committee, Finance & General Purpose",
    education: "M.Sc. Banking & Finance, B.Ed. Economics (University of Ibadan)",
    bio: "Otunba Mrs. Adebola Osibogun is an Independent Director of Odu'a Investment Company Limited, a Fellow and Past President of CIBN, and board member of FBN Holdings Plc. She brings over 30 years of premier financial services, mortgage banking, and trusteeship leadership.",
    achievements: [
      "Former National President of the Mortgage Bankers Association of Nigeria",
      "Fellow and Former President of the Chartered Institute of Bankers of Nigeria (CIBN)",
      "Served on Presidential Committees for Urban Development & Housing and Mortgage Finance",
      "Established strategic governance frameworks for multiple financial institutions"
    ]
  },
  {
    name: "Mrs. Folusho Olaniyan, OON",
    role: "Independent Director",
    tag: "Agribusiness & FMCG",
    initials: "FO",
    image: "https://i.postimg.cc/63bTJB68/PHOTO-2026-06-05-13-45-49.jpg",
    committees: "Investment (Chair), Governance & Nominations",
    education: "Master of Public Administration (UNILAG), HBS Corporate Director (2024)",
    bio: "Mrs. Folusho Olaniyan, OON, is an Independent Director of Odu'a Investment and Chair of the Board Investment Committee. She is a former Managing Director of UTC Nigeria Plc, Governing Council member of CIoD Nigeria, and recipient of the National Honour of OON.",
    achievements: [
      "Chairs the Board Investment Committee of OICL",
      "Former Managing Director/CEO of UTC Nigeria Plc",
      "Recipient of National Honour: Officer of the Order of the Niger (OON)",
      "Governing Council Member of Chartered Institute of Directors Nigeria"
    ]
  },
  {
    name: "Mr. Yemi Ajao",
    role: "Executive Director",
    tag: "Strategy & Investments",
    initials: "YA",
    image: "https://i.postimg.cc/FRSFq3qr/yemi-ajao-253x300.png",
    committees: "Executive Committee, Strategic Growth & Investments",
    education: "MBA (Rice University), M.Sc. Petroleum Eng (University of Houston), B.Sc. Chemical Eng (OAU)",
    bio: "Mr. Yemi Ajao is an experienced Investment Executive with over 20 years of work experience spanning Oil & Gas, Financial Services, Technology, and Commercial Real Estate. He previously served as Business Development and New Ventures Director at CAMAC International.",
    achievements: [
      "Led commercial acquisition workstream for OML 26 from Shell/NNPC JV",
      "Structured Nigeria's first locally arranged Reserve-Based Lending (RBL)",
      "Former Business Development and New Ventures Director at CAMAC International",
      "Over 10 years of international petroleum engineering and corporate finance leadership"
    ]
  }
];

interface BoardOfDirectorsProps {
  setCurrentPage: (page: string) => void;
  boardMembers?: Profile[];
}

export default function BoardOfDirectors({ setCurrentPage, boardMembers }: BoardOfDirectorsProps) {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const activeMembers = React.useMemo(() => {
    if (boardMembers === undefined) return BOARD_MEMBERS;
    if (boardMembers.length === 0) return [];

    return boardMembers.map((m: any) => {
      const staticMember = BOARD_MEMBERS.find(sm => 
        sm.name.toLowerCase().trim() === (m.name || '').toLowerCase().trim() ||
        String(sm.id) === String(m.id)
      );

      const bioText = Array.isArray(m.details)
        ? m.details.join(' ')
        : (m.details || m.bio || staticMember?.bio || "");
      
      const achievementsList = Array.isArray(m.achievements)
        ? m.achievements
        : typeof m.achievements === 'string'
        ? m.achievements.split('\n').filter(Boolean)
        : (staticMember?.achievements || []);

      return {
        id: m.id || staticMember?.id,
        name: m.name || staticMember?.name || '',
        role: m.role || staticMember?.role || '',
        tag: m.title || m.role || staticMember?.tag || '',
        initials: m.initials || (m.name ? m.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : 'OD'),
        image: m.image || staticMember?.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        committees: m.committees || staticMember?.committees || "",
        education: m.education || staticMember?.education || "",
        bio: bioText,
        achievements: achievementsList,
        fullBioParagraphs: Array.isArray(m.details) ? m.details : (staticMember?.fullBioParagraphs || [bioText])
      };
    });
  }, [boardMembers]);

  const chairman = activeMembers.find((m) => m.role.toLowerCase().includes('chairman'));
  const otherMembers = activeMembers.filter((m) => !m.role.toLowerCase().includes('chairman'));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col text-left font-sans bg-neutral-50"
    >
      {/* WordPress-Style Header with Breadcrumbs */}
      <WordPressPageHeader
        title="Board of Directors"
        subtitle="Governed by high-caliber administrators representing sovereign shareholder state alignments and fiduciary market operations."
        badge="Governance & Oversight"
        breadcrumbs={[
          { label: 'Leadership', page: 'Our Leadership' },
          { label: 'Board of Directors', active: true }
        ]}
        onNavigate={setCurrentPage}
        backgroundImage={HERO_BACKGROUNDS.boardOfDirectors}
      />

      {/* BOARD MEMBERS LISTING */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-[#00a757] text-xs font-bold uppercase tracking-widest bg-[#00a757]/5 px-3 py-1 rounded-full">Board Governance</span>
          <h2 className="font-serif text-3xl font-bold text-neutral-900">Leadership & Oversight</h2>
          <p className="text-neutral-500 font-light text-xs sm:text-sm">
            Click on any board member's card to view their complete professional biography, academic qualifications, and specific board committee oversight roles.
          </p>
        </div>

        {/* SPECIAL CHAIRMAN PROMINENT HIGHLIGHT */}
        {chairman && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", stiffness: 60 }}
            className="mb-16 bg-gradient-to-br from-neutral-900 via-neutral-950 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-neutral-800 shadow-xl relative overflow-hidden group text-left"
          >
            {/* Elegant backgrounds */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#00a757] rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#fce303] rounded-full blur-[80px]" />
            </div>
            <div className="absolute top-0 right-0 w-24 h-1 bg-gradient-to-l from-[#00a757] to-[#fce303]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Photo Area */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#00a757] via-[#fce303] to-emerald-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-700" />
                  <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900">
                    {chairman.image ? (
                      <img
                        src={chairman.image}
                        alt={chairman.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top filter brightness-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-4xl font-serif font-bold text-white">
                        {chairman.initials}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="lg:col-span-8 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-[#00a757]/20 border border-[#00a757]/30 text-[#fce303] px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold">
                  <Award className="w-3.5 h-3.5 text-[#fce303] fill-current animate-pulse" />
                  <span>Chairman of the Board</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#fce303]/95 font-bold block">Leadership Highlight</span>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                    {chairman.name}
                  </h3>
                  <p className="text-[#00a757] text-sm sm:text-base font-bold font-mono uppercase tracking-wide">
                    {chairman.role}
                  </p>
                </div>

                <p className="text-neutral-300 font-light text-xs sm:text-sm leading-relaxed max-w-2xl">
                  {chairman.bio}
                </p>

                {chairman.committees && (
                  <div className="text-xs text-neutral-400 border-l-2 border-[#fce303] pl-4 py-1 italic">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-neutral-500 block not-italic">Committee Chairmanship</span>
                    {chairman.committees}
                  </div>
                )}

                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <button
                    onClick={() => setCurrentPage("Bimbo Ashiru")}
                    className="inline-flex items-center gap-2 text-xs font-bold bg-[#00a757] hover:bg-[#00a757]/90 text-white uppercase tracking-wider py-3 px-6 rounded-xl transition-all cursor-pointer group shadow-lg"
                  >
                    <span>Read Full Biography</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Official Executive Profile</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* HEADER FOR OTHER BOARD MEMBERS */}
        <div className="border-t border-neutral-200/60 pt-12 pb-8 text-center sm:text-left">
          <h3 className="font-serif text-2xl font-bold text-neutral-900">
            Directors & Board Representatives
          </h3>
          <p className="text-neutral-500 text-xs mt-1">
            Explore our world-class board oversight committee representatives and non-executive leadership.
          </p>
        </div>

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.06
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {otherMembers.map((member) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 14 } }
              }}
              whileHover={{ 
                y: -6, 
                scale: 1.015,
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.08)"
              }}
              key={member.name}
              onClick={() => {
                if (member.name === "Otunba Bimbo Ashiru") {
                  setCurrentPage("Bimbo Ashiru");
                } else if (member.name === "Mr. Abdulrahman Yinusa") {
                  setCurrentPage("Abdulrahman Yinusa");
                } else if (member.name === "Chief Segun Ojo") {
                  setCurrentPage("Chief Segun Ojo");
                } else if (member.name === "Mr. Seni Adio, SAN") {
                  setCurrentPage("Seni Adio");
                } else if (member.name === "Mr. Abiodun Olamide Bamiduro") {
                  setCurrentPage("Abiodun Bamiduro");
                } else if (member.name === "Dr. Tola Kasali") {
                  setCurrentPage("Tola Kasali");
                } else if (member.name === "Mr. Segun Olujobi") {
                  setCurrentPage("Segun Olujobi");
                } else if (member.name === "Otunba Lai Oriowo") {
                  setCurrentPage("Lai Oriowo");
                } else if (member.name === "Otunba Mrs. Adebola Osibogun") {
                  setCurrentPage("Adebola Osibogun");
                } else if (member.name === "Mrs. Folusho Olaniyan, OON") {
                  setCurrentPage("Folusho Olaniyan");
                } else if (member.name === "Mr. Yemi Ajao") {
                  setCurrentPage("Yemi Ajao");
                } else {
                  setSelectedProfile(member);
                }
              }}
              className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer select-none group text-left flex flex-col justify-between hover:border-[#00a757]/20 relative"
            >
              <div className="absolute top-0 right-0 w-16 h-1 bg-gradient-to-l from-[#00a757] to-[#fce303] z-10" />

              <div>
                {/* Large Profile Image Area */}
                <div className="w-full h-72 sm:h-80 overflow-hidden bg-neutral-100 relative">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#00a757]/10 to-[#00a757]/5 flex items-center justify-center text-5xl font-serif font-bold text-[#00a757]">
                      {member.initials}
                    </div>
                  )}
                  {/* tag overlay */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur border border-neutral-200 px-3 py-1 rounded-full shadow-sm">
                    <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-neutral-600">
                      {member.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-neutral-900 group-hover:text-[#00a757] transition-colors leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-[#00a757] text-xs font-semibold uppercase font-mono tracking-wide mt-1">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-neutral-500 text-xs font-light leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-[#00a757] font-bold uppercase tracking-wider group-hover:text-neutral-900 transition-colors">
                  <span>{["Otunba Bimbo Ashiru", "Mr. Abdulrahman Yinusa", "Chief Segun Ojo", "Mr. Seni Adio, SAN", "Mr. Abiodun Olamide Bamiduro", "Dr. Tola Kasali", "Mr. Segun Olujobi", "Otunba Lai Oriowo", "Otunba Mrs. Adebola Osibogun", "Mrs. Folusho Olaniyan, OON", "Mr. Yemi Ajao"].includes(member.name) ? "Read Full Biography" : "View Bio & Oversight"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* DETAIL MODAL WINDOW */}
      <AnimatePresence>
        {selectedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProfile(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl max-w-2xl w-full border border-neutral-200 shadow-2xl relative overflow-hidden text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#00a757] to-[#fce303]" />

              <button
                onClick={() => setSelectedProfile(null)}
                className="absolute top-4 right-4 p-2.5 bg-neutral-100 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200 transition-colors rounded-full cursor-pointer select-none z-10"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6 sm:p-10 space-y-6 max-h-[85vh] overflow-y-auto">
                <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00a757]/10 to-[#00a757]/5 text-[#00a757] border border-[#00a757]/20 flex items-center justify-center font-bold font-serif text-2xl shadow-sm shrink-0">
                    {selectedProfile.initials}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full">
                      {selectedProfile.tag}
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-neutral-900 mt-2 leading-none">
                      {selectedProfile.name}
                    </h2>
                    <p className="text-[#00a757] text-sm font-semibold uppercase font-mono tracking-wide mt-1.5">
                      {selectedProfile.role}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-neutral-100">
                  {selectedProfile.education && (
                    <div className="text-xs text-neutral-500 bg-neutral-50 p-3 rounded-xl border border-neutral-200/50">
                      <span className="font-bold text-neutral-700 block uppercase tracking-wider text-[10px] mb-1">Education & Accreditations</span>
                      <p className="font-medium">{selectedProfile.education}</p>
                    </div>
                  )}

                  <div className="text-neutral-700 text-sm leading-relaxed font-light space-y-3">
                    <span className="font-bold text-neutral-900 block uppercase tracking-wider text-[10px]">Professional Biography</span>
                    <p>{selectedProfile.bio}</p>
                  </div>

                  {selectedProfile.committees && (
                    <div className="space-y-1.5 text-xs text-neutral-600 bg-neutral-50 p-3 rounded-xl border border-neutral-200/50">
                      <span className="font-bold text-neutral-800 uppercase tracking-widest text-[9px] font-mono block">Board Committees & Oversight</span>
                      <p className="font-medium">{selectedProfile.committees}</p>
                    </div>
                  )}

                  {selectedProfile.achievements && selectedProfile.achievements.length > 0 && (
                    <div className="space-y-2.5">
                      <span className="font-bold text-neutral-900 block uppercase tracking-wider text-[10px]">Key Achievements & Footprints</span>
                      <ul className="space-y-2">
                        {selectedProfile.achievements.map((ach: string, i: number) => (
                          <li key={i} className="flex gap-3 items-start text-xs text-neutral-600">
                            <span className="w-5 h-5 rounded-full bg-[#00a757]/10 text-[#00a757] flex items-center justify-center text-[10px] shrink-0 font-bold mt-0.5">✓</span>
                            <span className="leading-relaxed font-light">{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-neutral-100 flex justify-end">
                  <button
                    onClick={() => setSelectedProfile(null)}
                    className="bg-[#00a757] hover:bg-[#00a757]/90 text-white font-bold uppercase tracking-wider text-xs py-2.5 px-6 rounded-xl shadow select-none cursor-pointer"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
