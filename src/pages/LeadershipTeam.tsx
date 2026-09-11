import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, X, ArrowRight, Briefcase } from 'lucide-react';
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
  hobbies?: string[];
  professionalMemberships?: string[];
}

const LEADERSHIP_TEAM: Profile[] = [
  {
    name: "Mr. Abdulrahman Yinusa",
    role: "Group Managing Director / CEO",
    tag: "GMD / CEO",
    initials: "AY",
    image: "https://i.postimg.cc/76ZdZBVy/processed-51B12DDB-7334-4282-9D88-3345BD2681ED.jpg",
    bio: "Group GMD/CEO steering the executive team and directing daily operations to maximize portfolio efficiency, optimize cash flows, and achieve high corporate benchmarks."
  },
  {
    name: "Mr. Yemi Ajao",
    role: "Group Chief Investment & Business Dev. Officer (GCIBDO)",
    tag: "GCIBDO",
    initials: "YA",
    image: "https://i.postimg.cc/FRSFq3qr/yemi-ajao-253x300.png",
    bio: "Mr. Yemi Ajao is an experienced Investment Executive with over 20 years of work experience spanning Oil & Gas, Financial Services, Technology, and Commercial Real Estate, leading the group's investment portfolio and venture syndications."
  },
  {
    name: "Mrs. Abiola Olufunke Ajayi",
    role: "Company Secretary / Head of Legal",
    tag: "Legal & Secretarial",
    initials: "AA",
    image: "https://oduainvestment.com.ng/wp-content/uploads/2020/05/ajayi.jpg",
    bio: "Mrs. Abiola Olufunke Ajayi joined Odu’a in 2003 as legal manager and rose through the ranks to become Company Secretary/Head of Legal in 2008, bringing over 30 years of legal, compliance, and secretariat experience.",
    fullBioParagraphs: [
      "Mrs. Abiola Olufunke Ajayi joined the services of Odu’a in the year 2003 as legal manager and rose through the ranks until she became the Company Secretary/Head of Legal at 2008.",
      "Mrs Ajayi has over 30 years hands-on professional experience in core Legal Practice, Corporate Commercial Transactions, Corporate Secretariat Practice, Corporate Administration and Public Service having worked in reputable legal firms and at the Polytechnic Ibadan.",
      "Mrs. Abiola Olufunke Ajayi graduated from the University of Ibadan where she obtained a Bachelor and Master’s degree in Law, and was called to the Nigerian bar in 1989. She is also a Chartered Secretary and Administrator (ACIS).",
      "Mrs Ajayi has over 10 years cognate experience as Company Secretary. She is resourceful, dynamic and result oriented. She is a member of the Nigerian Bar Association (NBA), and the Institute of Chartered Secretaries and Administration of Nigeria."
    ],
    professionalMemberships: [
      "Nigerian Bar Association (NBA)",
      "Institute of Chartered Secretaries and Administration of Nigeria (ICSAN)"
    ],
    hobbies: [
      "Travelling",
      "Reading"
    ]
  },
  {
    name: "Mrs. Odunayo Adeniji",
    role: "Group Head, Human Resources",
    tag: "Human Resources",
    initials: "OA",
    image: "https://oduainvestment.com.ng/wp-content/uploads/2022/05/IMG-20220816-WA0058-2.jpg",
    bio: "Mrs. Odunayo Adeniji is an experienced and seasoned HR practitioner, Certified Coach, and strategy architect engaged as Group Head of Human Resources to drive Odu'a's ambitious 'SRC-2025 Strategy.'",
    fullBioParagraphs: [
      "Mrs. Odunayo Adeniji joined the service of Oduá Investment Company Limited as Group Head of Human Resources. She is being engaged to drive the Group’s people agenda in delivering the ambitious “SRC-2025 Strategy.”",
      "Mrs Odunayo is an experienced and seasoned HR practitioner, a Certified Coach, with a passion for people development, delivering Human Resource strategies, Organisational Change and Development strategies, and Performance and process improvement solutions that support the achievement of the Business goals.",
      "She has worked in different leadership capacities with both indigenous and multinational Companies in different sectors of Nigerian Business for over a decade.",
      "The new Group Head of Human Resources is a Strategy architect in the development of innovative HR and administrative initiatives designed to streamline processes and capitalize on organizational growth opportunities. A creative thinker, problem solver and decision maker who effectively balances the needs of employees with the vision of the organization and drives seamless and effective initiatives that impact on the bottom line of the business.",
      "She holds a master’s degree in Business Administration and Management from Lagos State University. She is a member of the Chartered Institute of Personnel Management of Nigeria and a Senior Professional in Human Resource Management International.",
      "Mrs Odunayo is passionate about knowledge impartation and the arts to work with individuals on establishing deeper connections with their daily work."
    ],
    professionalMemberships: [
      "Chartered Institute of Personnel Management of Nigeria (CIPM)",
      "Senior Professional in Human Resource Management International (SPHRi)"
    ],
    hobbies: [
      "Knowledge Impartation",
      "Arts & Creative Connections"
    ]
  },
  {
    name: "Engr. Olusoji Omoniyi Sangobiyi",
    role: "Project Evaluation Manager",
    tag: "Project Evaluation",
    initials: "OS",
    image: "https://oduainvestment.com.ng/wp-content/uploads/2020/05/sangobiyi.jpg",
    bio: "Engr. Sangobiyi joined Odu’a in 1997 and rose to Project Evaluation Manager in 2015. He coordinates agricultural portfolio tracking and growth delivery across target sectors.",
    fullBioParagraphs: [
      "Engr. Sangobiyi joined the services of Odu’a Investment Company Limited in 1997 as Management Executive. He rose through the ranks as Maintenance Engineer, Premier Hotel Ibadan, 1999-2004; Manager (Operations), Odua Investment Company Limited (2004-2010); Senior Manager (Planning), Odua Investment Company Limited (2010-2015) before joining the Odu’a Leadership Team as Project Evaluation Manager, Principal Manager Cadre in 2015.",
      "He is a graduate of Agricultural Engineering from University of Ibadan, 1986. Presently, Engr Sangobiyi is responsible for agriculture portfolio performance tracking, monitoring and reporting within the Odu’a Group. A member of the Odu’a Group Growth Delivery Team (GDT) whose role is to identify investment for growth in target sectors of the Nigerian Economy.",
      "He is a Registered Engineer with Council for the Regulation of Engineering in Nigeria (COREN), Corporate Member of Nigeria Society of Engineers (NSE), Nigeria Institution for Agricultural Engineers (NIAE) and Project Management Institute (PMI).",
      "Engr Sangobiyi’s hobbies and extra-curricular activities are playing table tennis and giving back to the society through Rotary International. He is a Past Assistant Governor and Paul Harris Fellow of Rotary International.",
      "He is happily married with Children."
    ],
    professionalMemberships: [
      "Registered Engineer (COREN)",
      "Corporate Member, Nigeria Society of Engineers (NSE)",
      "Nigeria Institution for Agricultural Engineers (NIAE)",
      "Project Management Institute (PMI)"
    ],
    hobbies: [
      "Playing Table Tennis",
      "Rotary International (Past Assistant Governor & Paul Harris Fellow)"
    ]
  },
  {
    name: "Mr. Victor Ayetoro",
    role: "Head, Corporate Affairs",
    tag: "Corporate Affairs",
    initials: "VA",
    image: "https://oduainvestment.com.ng/wp-content/uploads/2020/05/WhatsApp-Image-2024-01-24-at-6.03.48-PM.jpeg",
    bio: "Mr. Victor Ayetoro joined Odu’a in 2002 as Assistant Manager of Corporate Affairs and rose through the ranks to become Head of Corporate Affairs. He is a distinguished Public Relations practitioner and former business journalist.",
    fullBioParagraphs: [
      "Mr. Victor Ayetoro joined the services of Odu’a Investment Company Limited in October 2, 2002 as an Assistant Manager, Corporate Affairs. He rose through the ranks as an Assistant Manager to Manager, Corporate Affairs and was on secondment to Odu’a Telecoms, O’net, the telecommunication arm of the company before his re-deployment to the Group Headquarters in year 2005 as the Media Relations Manager. Presently, he is the Head, Corporate Affairs.",
      "Mr. Ayetoro is a distinguished Public Relations practitioner who started his media/PR career as a reporter with the Champion Newspaper Limited in 1998 covering Aviation, Capital Market, Business and Economy beats. He was later transferred to the State of Osun as the State’s Bureau Chief of the Newspaper before moving to Chestrad International as the Public Relations Executive.",
      "He holds two Master degrees, one in Communication and Language Art (MCA) and another in Managerial Psychology (MSC), both from the University of Ibadan in 2002 and 2012 respectively. His professional membership cuts across various institutes such as the Nigerian Union of Journalists (NUJ), the Nigeria Institute of Public Relations (NIPR) and the Nigeria Institute of Management (NIM) and has attended numerous training courses both in Communication and Public Relations.",
      "Mr. Ayetoro’s hobbies include photography and listening to good Music. He is happily married and blessed with children."
    ],
    professionalMemberships: [
      "Nigerian Union of Journalists (NUJ)",
      "Nigeria Institute of Public Relations (NIPR)",
      "Nigeria Institute of Management (NIM)"
    ],
    hobbies: [
      "Photography",
      "Listening to Good Music"
    ]
  }
];

interface LeadershipTeamProps {
  setCurrentPage: (page: string) => void;
  leadershipTeam?: Profile[];
}

export default function LeadershipTeam({ setCurrentPage, leadershipTeam }: LeadershipTeamProps) {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const activeTeam = React.useMemo(() => {
    if (leadershipTeam === undefined) return LEADERSHIP_TEAM;
    if (leadershipTeam.length === 0) return [];

    return leadershipTeam.map((m: any) => {
      const staticMember = LEADERSHIP_TEAM.find(sm => 
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

      const fullBio = Array.isArray(m.details) ? m.details : (staticMember?.fullBioParagraphs || [bioText]);

      return {
        id: m.id || staticMember?.id,
        name: m.name || staticMember?.name || '',
        role: m.role || staticMember?.role || '',
        tag: m.title || m.role || staticMember?.tag || '',
        initials: m.initials || (m.name ? m.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : 'OD'),
        image: m.image || staticMember?.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        bio: bioText,
        achievements: achievementsList,
        fullBioParagraphs: fullBio,
        professionalMemberships: m.professionalMemberships || staticMember?.professionalMemberships || [],
        hobbies: m.hobbies || staticMember?.hobbies || []
      };
    });
  }, [leadershipTeam]);

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
        title="Executive Leadership Team"
        subtitle="Operations at Odu'a are steered by seasoned corporate stewards coordinating subsidiary operations and strategic portfolio growth."
        badge="Executive Stewardship"
        breadcrumbs={[
          { label: 'Leadership', page: 'Our Leadership' },
          { label: 'Executive Management', active: true }
        ]}
        onNavigate={setCurrentPage}
        backgroundImage={HERO_BACKGROUNDS.leadershipTeam}
      />

      {/* LEADERSHIP LISTING */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-[#00a757] text-xs font-bold uppercase tracking-widest bg-[#00a757]/5 px-3 py-1 rounded-full">Executive Management</span>
          <h2 className="font-serif text-3xl font-bold text-neutral-900">Stewardship & Operations</h2>
          <p className="text-neutral-500 font-light text-xs sm:text-sm">
            Click on any member's card to view their core professional scope and strategic contributions to Odu'a Investment Group.
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
          {activeTeam.map((member) => (
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
                if (member.name === "Mr. Abdulrahman Yinusa") {
                  setCurrentPage("Abdulrahman Yinusa");
                } else if (member.name === "Mr. Yemi Ajao") {
                  setCurrentPage("Yemi Ajao");
                } else if (member.name === "Mrs. Abiola Olufunke Ajayi") {
                  setCurrentPage("Abiola Olufunke Ajayi");
                } else if (member.name === "Mrs. Odunayo Adeniji") {
                  setCurrentPage("Odunayo Adeniji");
                } else if (member.name === "Engr. Olusoji Omoniyi Sangobiyi") {
                  setCurrentPage("Olusoji Sangobiyi");
                } else if (member.name === "Mr. Victor Ayetoro") {
                  setCurrentPage("Victor Ayetoro");
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
                  <span>Read Full Biography</span>
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
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00a757]/10 to-[#00a757]/5 text-[#00a757] border border-[#00a757]/20 flex items-center justify-center font-bold font-serif text-2xl shadow-sm shrink-0 overflow-hidden">
                    {selectedProfile.image ? (
                      <img 
                        src={selectedProfile.image} 
                        alt={selectedProfile.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      selectedProfile.initials
                    )}
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

                <div className="space-y-6 pt-4 border-t border-neutral-100">
                  <div className="text-neutral-700 text-sm leading-relaxed font-light space-y-4">
                    <span className="font-bold text-neutral-900 block uppercase tracking-wider text-[10px]">Professional Biography</span>
                    {selectedProfile.fullBioParagraphs ? (
                      selectedProfile.fullBioParagraphs.map((para, index) => (
                        <p key={index}>{para}</p>
                      ))
                    ) : (
                      <p>{selectedProfile.bio}</p>
                    )}
                  </div>

                  {selectedProfile.professionalMemberships && selectedProfile.professionalMemberships.length > 0 && (
                    <div className="space-y-2">
                      <span className="font-bold text-neutral-900 block uppercase tracking-wider text-[10px]">Professional Memberships</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedProfile.professionalMemberships.map((membership, idx) => (
                          <span key={idx} className="text-xs bg-neutral-100 text-neutral-800 px-3 py-1.5 rounded-xl border border-neutral-200 font-medium">
                            {membership}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProfile.hobbies && selectedProfile.hobbies.length > 0 && (
                    <div className="space-y-2">
                      <span className="font-bold text-neutral-900 block uppercase tracking-wider text-[10px]">Hobbies & Interests</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedProfile.hobbies.map((hobby, idx) => (
                          <span key={idx} className="text-xs bg-emerald-50 text-[#00a757] px-3 py-1.5 rounded-xl border border-emerald-100 font-semibold font-mono uppercase tracking-wider text-[10px]">
                            {hobby}
                          </span>
                        ))}
                      </div>
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
