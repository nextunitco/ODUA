import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Leaf, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  Handshake,
  ShieldCheck,
  Zap,
  Plane,
  Flame,
  Factory,
  Umbrella,
  Mail,
  Phone,
  MapPin,
  Award,
  Layers,
  Sparkles,
  Search,
  Briefcase,
  ExternalLink,
  Globe,
  X
} from 'lucide-react';
import { SectorDetail } from '../types';
import WordPressPageHeader from '../components/WordPressPageHeader';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';

interface PortfolioProps {
  sectorDetails: Record<string, SectorDetail>;
  activeSector: string;
  setActiveSector: (sector: string) => void;
  onOpenPartnerModal: () => void;
  initialTab?: 'approach' | 'thrust' | 'subsidiaries' | 'associates';
  onTabChange?: (tab: 'approach' | 'thrust' | 'subsidiaries' | 'associates') => void;
  onNavigate?: (page: string) => void;
}

export default function Portfolio({
  sectorDetails,
  activeSector,
  setActiveSector,
  onOpenPartnerModal,
  initialTab = 'approach',
  onTabChange,
  onNavigate = () => {}
}: PortfolioProps) {
  const [activeTab, setActiveTab] = useState<'approach' | 'thrust' | 'subsidiaries' | 'associates'>(initialTab);
  const [subsidiaryFilter, setSubsidiaryFilter] = useState<string>('All');
  const [selectedThrust, setSelectedThrust] = useState<any | null>(null);

  // Sync state with parent's tab choice (e.g. from header links)
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const tabs = [
    { id: 'approach', label: 'Investment Approach', icon: Handshake },
    { id: 'thrust', label: 'Strategic Thrust', icon: Sparkles },
    { id: 'subsidiaries', label: 'Our Subsidiaries', icon: Layers },
    { id: 'associates', label: 'Associate Companies', icon: Briefcase },
  ] as const;

  // Real Subsidiaries Data
  const subsidiaries = [
    {
      name: "Wemabod Limited",
      category: "Real Estate",
      origin: "Formerly Nabani Estates Limited, incorporated in Sept 1962 as a subsidiary of National Bank of Nigeria. Acquired by Western Nigeria Marketing Board (becoming Wemabod) and integrated into Odu'a in 1976.",
      desc: "One of Nigeria's premier real estate development and asset management firms, coordinating celebration-scale high-rises and residential estates.",
      features: ["Assets under management: N65B+", "1.2M+ sqm premium commercial real estate", "Iconic landmarks like Cocoa House and Sovereign Heights Ikoyi"],
      logoText: "WL",
      logo: "https://wemabod.com/wp-content/uploads/2021/04/wemabod-logo.png",
      website: "https://wemabod.com"
    },
    {
      name: "Cocoa Industries Limited",
      category: "Manufacturing",
      origin: "Incorporated as a private Limited Liability Company on August 28, 1965; commenced operations in 1967.",
      desc: "An industrial-scale cocoa processor specializing in producing and distributing high-yield cocoa butter, cake, powder, and cocoa-based consumer beverages.",
      features: ["Pioneer in regional cocoa-based beverage processing", "Premium export-grade butter and cocoa cake production", "Located in the Ikeja industrial corridor"],
      logoText: "CI",
      website: "https://oduainvestment.com.ng/portfolio"
    },
    {
      name: "Glanvill Enthoven Insurance Brokers",
      category: "Insurance",
      origin: "Established in Nigeria in 1957 as a pioneer firm of incorporated insurance and reinsurance brokers.",
      desc: "Pensions consultants and risk brokers licensed by NAICOM and registered with the NCRIB, supplying robust corporate security and risk management.",
      features: ["Over 65 years of risk brokerage excellence", "Comprehensive corporate reinsurance programs", "NCRIB registered pensions consultants"],
      logoText: "GE",
      logo: "https://glanvillenthoven.com.ng/wp-content/uploads/2021/06/glanvill-logo.png",
      website: "https://glanvillenthoven.com.ng"
    },
    {
      name: "Lagos Airport Hotel Limited",
      category: "Hospitality",
      origin: "Founded in 1942, serving as Nigeria's foremost and oldest indigenous grand hospitality venue.",
      desc: "A celebrated member of the Odu'a Group, recently repositioned with extensive room refurbishments, modern facilities, and a grand luxury service standard.",
      features: ["Over 80 years of premium hospitality heritage", "Newly refurbished Olympic-size swimming pools and banquet halls", "Strategic executive transit hub near Ikeja Airport"],
      logoText: "LA",
      logo: "https://lagosairporthotel.com.ng/wp-content/uploads/2021/08/lah-logo.png",
      website: "https://lagosairporthotel.com.ng"
    },
    {
      name: "Western Hotels (Premier & Lafia Hotels)",
      category: "Hospitality",
      origin: "Comprising Premier Hotel atop Mokola Hill and Lafia Hotel, Apata, Ibadan. Roots dating back to the early 1960s.",
      desc: "Renowned hotels representing the peak of Southwest cultural tourism, banquet setups, and serene hills-side accommodation.",
      features: ["Historic landmarks of Oyo State's political and tourist legacy", "Active refurbishment programs to deliver standard 4-star experiences", "Host to state cabinet dinners and high-profile regional congresses"],
      logoText: "WH",
      logo: "https://premierhotelibadan.com/wp-content/uploads/2020/07/logo.png",
      website: "https://premierhotelibadan.com"
    },
    {
      name: "E&O Power and Equipment Leasing Limited",
      category: "Engineering Services",
      origin: "Incorporated in 2005, with full industrial operations launched in 2006.",
      desc: "An engineering leader focused on the sales, leasing, and preventative maintenance of heavy-duty backup generators and electricity transformers.",
      features: ["Signed maintenance contracts with prominent multinationals", "Fleet lease options for critical industrial operations", "Rapid-response emergency repair engineers on-call 24/7"],
      logoText: "EO",
      website: "https://oduainvestment.com.ng/portfolio"
    },
    {
      name: "Westlink Integrated Agriculture Limited (WIAL)",
      category: "Agriculture",
      origin: "Wholly owned subsidiary of SWAgCo Limited, incorporated in April 2018 with offices in Cocoa House, Ibadan.",
      desc: "A commercial agribusiness giant operating end-to-end value chains from mechanization, seedling supply, primary farming, produce aggregation, and storage.",
      features: [
        "Commodity trading hub operated out of Eleyele Warehouse, Ibadan",
        "Imeko Farm Hub, Ogun State: 3,300 hectares of commercial maize and cassava",
        "Oke-Ako Farm Hub, Ekiti State: 4,283 hectares of commercial grain and soybean crops"
      ],
      contact: {
        email: "info@westlinkagric.com.ng",
        phone: "08111896184",
        address: "Floors 20-23, Cocoa House, Ibadan"
      },
      logoText: "WI",
      logo: "https://swagco.ng/wp-content/uploads/2021/05/swagco-logo.png",
      website: "https://swagco.ng"
    },
    {
      name: "South-West Innovation & Technology (SWIT)",
      category: "Engineering Services",
      origin: "Established in 2022 to incubate technology transformation across the 6 Southwest Nigerian states.",
      desc: "Propelling enterprise cloud systems, digital government automation, and smart agro-logistics trace engines for Odu'a subsidiaries and external clients.",
      features: ["Enterprise ERP core architecture", "Regional university tech incubator hubs", "Real-time agro-supply chain traceability"],
      logoText: "SWIT",
      website: "https://swit.odua.ng"
    }
  ];

  // Real Strategic Thrust Data
  const strategicThrusts = [
    {
      id: "oil-gas",
      title: "Oil & Gas (Upstream)",
      desc: "Expanding Southwest Nigeria's sovereign participation inside major upstream concessions, offshore exploration, marginal fields developments, and oilfield logistics pipelines.",
      icon: Flame,
      color: "from-amber-600 to-red-700",
      bgLight: "bg-red-500/10",
      tagline: "Energy Sovereignty, Upstream Concessions & Coastal Logistics",
      pillars: [
        "Participating in federal marginal oilfield bid rounds to build sovereign regional energy stakes.",
        "Developing pipeline rights-of-way, offshore marine support, and bulk oilfield storage logistics across the Ondo and Lagos coastal belts.",
        "Securing domestic gas commercialization projects to power industrial clusters and regional IPPs."
      ],
      initiatives: ["Marginal Field Development", "Southwest Coastal Supply Base", "Industrial Gas Reticulation"],
      impact: "Direct sovereign revenue generation for owner states and high-value technical job creation in petroleum engineering and maritime operations.",
      sectorKey: "real_estate"
    },
    {
      id: "aviation",
      title: "Aviation Services",
      desc: "Developing air logistics corridors, executive transit connectivity, aircraft hangar operations, and specialized aviation refueling assets to enhance commerce hubs.",
      icon: Plane,
      color: "from-blue-600 to-indigo-700",
      bgLight: "bg-blue-500/10",
      tagline: "Regional Cargo Corridors, MRO Infrastructure & Transit Logistics",
      pillars: [
        "Establishing specialized aircraft Maintenance, Repair & Overhaul (MRO) facilities in Southwest transit hubs.",
        "Expanding aviation fuel logistics and dedicated hydrant refuelling infrastructure for regional airlines.",
        "Partnering with state airports to build high-value agro-export freight corridors directly to international markets."
      ],
      initiatives: ["Southwest Agro-Cargo Air Freight", "Executive Fixed-Base Operations (FBO)", "Aviation Jet-A1 Logistics Hub"],
      impact: "Positions the region as West Africa's leading aerotropolis and high-speed perishables export gateway.",
      sectorKey: "real_estate"
    },
    {
      id: "agriculture",
      title: "Agriculture (Integrated End-to-End)",
      desc: "Driving regional food sovereignty, high-yield seed multiplication, mechanized crop preparation, outgrower networks, and direct international exports via SWAgCo.",
      icon: Leaf,
      color: "from-emerald-600 to-green-700",
      bgLight: "bg-emerald-500/10",
      tagline: "Food Sovereignty, Scientific Seed Multiplication & Outgrower Schemes",
      pillars: [
        "Operating over 10,000 hectares of commercial farmland through SWAgCo and Westlink Integrated Agriculture Ltd.",
        "State-of-the-art cocoa seed multiplication complexes producing millions of hybrid seedlings annually.",
        "Commercial cassava, maize, and soybean hubs feeding agro-processing plants and international export buyers."
      ],
      initiatives: ["SWAgCo Commercial Outgrowers", "Imeko Farm Hub (3,300 Hectares)", "Oke-Ako Grains Hub (4,283 Hectares)"],
      impact: "Empowers over 8,500 local farmers with guaranteed off-take contracts, mechanized land prep, and high-yield seeds.",
      sectorKey: "agriculture"
    },
    {
      id: "manufacturing",
      title: "Manufacturing & Brand Marketing",
      desc: "Revitalizing legacy consumer brands, launching local manufacturing lines, value-added crop processing, and streamlining regional distribution hubs.",
      icon: Factory,
      color: "from-purple-600 to-fuchsia-700",
      bgLight: "bg-fuchsia-500/10",
      tagline: "Industrial Re-Engineering & Consumer Brand Revitalization",
      pillars: [
        "Revitalizing legacy manufacturing leaders including Cocoa Industries Limited (CIL) and Tower Aluminium.",
        "Expanding pharmaceutical manufacturing via SKG Pharma and building materials via Ire Clay Products.",
        "Establishing modern industrial parks with dedicated power, transport access, and digital inventory warehousing."
      ],
      initiatives: ["CIL Ikeja Cocoa Processing Modernization", "Ire Clay Expansion", "Consumer FMCG Distribution Corridors"],
      impact: "Re-ignites indigenous Southwest manufacturing capacity, reduces import dependency, and creates thousands of factory jobs.",
      sectorKey: "real_estate"
    },
    {
      id: "infrastructure",
      title: "Infrastructure, Power & Digital Fiber",
      desc: "Powering the digital revolution with high-speed metro fiber networks, independent power plant generation (IPP), and technology clusters in owner states.",
      icon: Zap,
      color: "from-yellow-500 to-amber-600",
      bgLight: "bg-yellow-500/10",
      tagline: "Next-Generation Metro Fiber & Independent Power Utilities",
      pillars: [
        "Deploying metro fiber optic backbones across shareholder state capitals for ultra-high-speed corporate and public broadband.",
        "Developing Independent Power Plant (IPP) projects and industrial rooftop solar arrays.",
        "Heavy electrical power solutions and equipment leasing delivered through E&O Power and Equipment Leasing Ltd."
      ],
      initiatives: ["State Capital Fiber Ring", "Industrial Zone IPP Clean Power", "E&O Heavy Grid Transformer Leasing"],
      impact: "Provides uninterrupted electricity and world-class digital connectivity to tech hubs, schools, hospitals, and industrial parks.",
      sectorKey: "real_estate"
    }
  ];

  // Real Associate Companies Data
  const associates = [
    {
      name: "Wema Bank PLC",
      role: "Financial Services",
      desc: "Pioneer of ALAT, Africa’s first fully digital banking platform, representing over 78 years of resilient financial services and wealth creation.",
      logoText: "WEMA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Wema_Bank_logo.png",
      website: "https://wemabank.com"
    },
    {
      name: "Lafarge Africa Plc",
      role: "Building Materials",
      desc: "A publicly quoted subsidiary of the global LafargeHolcim group, leading regional production of concrete, cement, and eco-friendly building materials.",
      logoText: "LAFARGE",
      website: "https://www.lafarge.com.ng"
    },
    {
      name: "Nigerite Limited",
      role: "Construction Solutions",
      desc: "An undisputed market leader offering premium building, roofing, ceiling boards, wall cladding, and integrated architectural systems.",
      logoText: "NIGERITE",
      website: "https://nigerite.com"
    },
    {
      name: "Crittall-Hope Nigeria Limited",
      role: "Steel Fabrication",
      desc: "Established in 1958, producing a highly durable and celebrated range of security steel windows, commercial doors, and structural profiles.",
      logoText: "CRITTALL",
      website: "https://oduainvestment.com.ng/portfolio"
    },
    {
      name: "Great Nigeria Insurance Plc",
      role: "Insurance & Real Estate",
      desc: "With over 60 years of active insurance underwriting, GNI coordinates corporate pensions, financial advisory, and high-yield real estate assets.",
      logoText: "GNI",
      website: "https://greatnigeriaplc.com"
    },
    {
      name: "Tower Aluminium Nigeria Limited",
      role: "Industrial Manufacturing",
      desc: "One of West Africa's leading manufacturers of fabricated aluminum sheeting, household cookware, and commercial building coatings.",
      logoText: "TOWER",
      website: "https://toweraluminium.com"
    },
    {
      name: "Ire Clay Products Limited",
      role: "Fired Brick Production",
      desc: "Located in Ekiti State, producing premium load-bearing fired clay blocks, sun breakers, and high-strength floor deck pots.",
      logoText: "IRE",
      website: "https://oduainvestment.com.ng/portfolio"
    },
    {
      name: "SKG Pharma",
      role: "Pharmaceuticals",
      desc: "A GMP-compliant world-class pharmaceutical manufacturing center based in Lagos, producing trusted essential health medicines.",
      logoText: "SKG",
      website: "https://oduainvestment.com.ng/portfolio"
    },
    {
      name: "Westlink Todoconstruccion Limited",
      role: "Premium Construction Finishes",
      desc: "Established in 2015, importing and marketing premier high-end floor/wall tiles, bathroom finishes, and luxury building hardware.",
      logoText: "WESTLINK",
      website: "https://oduainvestment.com.ng/portfolio"
    }
  ];

  const subsidiaryCategories = ["All", "Real Estate", "Manufacturing", "Insurance", "Hospitality", "Engineering Services", "Agriculture"];
  const filteredSubsidiaries = subsidiaryFilter === 'All' 
    ? subsidiaries 
    : subsidiaries.filter(s => s.category === subsidiaryFilter);

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
        title="Investments & Capital Holdings"
        subtitle="Strategic holdings across real estate, agriculture, hospitality, manufacturing, and financial services, delivering long-term wealth stability and development across Western Nigeria."
        badge="Odu'a Investment Portfolio"
        breadcrumbs={[
          { label: 'Investments', page: 'Our Investment Approach' },
          { 
            label: activeTab === 'approach' ? 'Our Investment Approach' :
                   activeTab === 'thrust' ? 'Our Strategic Thrust' :
                   activeTab === 'subsidiaries' ? 'Our Subsidiaries' : 'Associate Companies',
            active: true 
          }
        ]}
        onNavigate={onNavigate}
        backgroundImage={HERO_BACKGROUNDS.portfolio}
      />

      {/* TAB CONTENTS CONTAINER */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: INVESTMENT APPROACH */}
          {activeTab === 'approach' && (
            <motion.div
              key="approach"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Intro Narrative */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-3">
                    <span className="text-[#00a757] text-xs font-mono uppercase tracking-widest font-bold">Partnership Philosophy</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
                      Our Investment Approach
                    </h2>
                  </div>

                  <p className="text-neutral-700 text-base leading-relaxed font-light">
                    We seek to enter new businesses in our chosen sectors with high potential for growth, profitability, and sustainability. The basis of these new entities is strategic partnership with technically proven and financially capable partners.
                  </p>

                  <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
                    <div className="flex gap-4">
                      <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl shrink-0 h-fit">
                        <Award className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-base font-bold text-neutral-950">Hotel Redevelopment & Expansion</h4>
                        <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                          We are actively discussing with International Brand Managers to redevelop our three landmark hotels—Lagos Airport Hotel Ikeja, Premier Hotel, and Lafia Hotel in Ibadan—into globally acceptable world-class hospitality standards.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-neutral-700 text-sm leading-relaxed font-light">
                    As an active key player in the competitive trade and business world, opportunities abound in the ODU’A Group to local and foreign investors/technical partners seeking reliable partners in new business opportunities viz; Independent Power Projects, Oil and Gas, Pharmaceuticals, and Packaging.
                  </p>

                  <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-3xl text-left space-y-2">
                    <p className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#00a757]">Active Negotiations</p>
                    <p className="text-neutral-800 text-xs sm:text-sm font-medium leading-relaxed">
                      Foreign and local investors are discussing regularly with ODU’A about joint venture partnerships for the expansion of other key subsidiaries like Cocoa Industries Limited in Ikeja, Epe Plywood Industries Limited, and Odu’a Printing & Publishing Co. Ltd.
                    </p>
                  </div>
                </div>

                {/* Checklist Panel */}
                <div className="lg:col-span-5 bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 border border-neutral-800">
                  <div className="space-y-1.5">
                    <span className="text-[#fce303] text-[10px] uppercase font-mono tracking-wider block font-bold">Mutual Commitment</span>
                    <h3 className="font-serif text-xl font-bold">Joint Venture Criteria</h3>
                    <p className="text-white/60 text-xs font-light">
                      Odu’a enforces strict standards of technical integrity and financial transparency across all JV programs.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { num: "1", title: "Joint Venture (JV) Partnership", desc: "Co-investments are organized strictly under unified corporate governance architectures." },
                      { num: "2", title: "Technical Expertise & Competency", desc: "Strategic partners must demonstrate leading-edge, verified technical credentials in their chosen vertical." },
                      { num: "3", title: "Profitability & Sustainability", desc: "All ventures must demonstrate transparent feasibility projections detailing economic and environmental sustainability." },
                      { num: "4", title: "Day-to-Day Management", desc: "Partners are actively involved in the executive and operational day-to-day coordination of the JV." },
                      { num: "5", title: "Equity Stake", desc: "All strategic partners must take a significant equity commitment inside the joint venture entity." }
                    ].map((step, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-[#00a757]/20 border border-[#00a757]/40 text-[#fce303] flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                          {step.num}
                        </div>
                        <div className="space-y-0.5 text-left">
                          <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide">{step.title}</h4>
                          <p className="text-[11px] text-white/50 leading-relaxed font-light">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={onOpenPartnerModal}
                    className="w-full bg-[#00a757] hover:bg-white hover:text-neutral-900 text-white font-bold py-3.5 rounded-2xl text-xs tracking-wider uppercase transition-all duration-300 shadow cursor-pointer"
                  >
                    Submit Partnership Proposal
                  </button>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: STRATEGIC THRUST */}
          {activeTab === 'thrust' && (
            <motion.div
              key="thrust"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3 mb-4">
                <span className="text-[#00a757] text-xs font-mono uppercase tracking-widest font-bold">Economic Accelerators</span>
                <h2 className="font-serif text-3xl font-bold text-neutral-900">Our Strategic Thrust</h2>
                <p className="text-neutral-600 font-light text-xs sm:text-sm">
                  We have mapped and allocated capital into five critical economic thrusts that present massive regional potentials, sustainable cash-yield pathways, and jobs creation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {strategicThrusts.map((thrust, idx) => {
                  const Icon = thrust.icon;
                  return (
                    <motion.button
                      type="button"
                      whileHover={{ y: -6, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ type: "spring", stiffness: 200, damping: 18 }}
                      key={idx}
                      onClick={() => setSelectedThrust(thrust)}
                      className="bg-white rounded-3xl border border-neutral-200/90 hover:border-[#00a757] p-6 shadow-sm hover:shadow-xl flex flex-col justify-between h-[300px] relative overflow-hidden text-left cursor-pointer group transition-all"
                      aria-label={`Explore ${thrust.title} focal growth area details`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-tr ${thrust.color} text-white shadow-sm group-hover:scale-110 transition-transform`}>
                            <Icon className="w-5.5 h-5.5" />
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-neutral-400 bg-neutral-100 group-hover:bg-[#00a757]/10 group-hover:text-[#00a757] px-2.5 py-1 rounded-full transition-colors">
                            Pillar 0{idx + 1}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <h3 className="font-serif text-lg font-bold text-neutral-950 leading-tight group-hover:text-[#00a757] transition-colors">
                            {thrust.title}
                          </h3>
                          <p className="text-xs text-neutral-500 font-light leading-relaxed line-clamp-3">
                            {thrust.desc}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-[#00a757] font-bold uppercase tracking-wider group-hover:text-[#008945]">
                        <span className="flex items-center gap-1.5">
                          <span>Explore Focal Area</span>
                          <span className="text-[10px] text-neutral-400 font-normal normal-case">(Click to view)</span>
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                      </div>
                    </motion.button>
                  );
                })}

                {/* Interactive Explorer Callout */}
                <motion.div 
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  onClick={() => {
                    setActiveSector('agriculture');
                    const element = document.getElementById('explore-panel');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-neutral-900 hover:bg-neutral-950 text-white rounded-3xl p-6 flex flex-col justify-between h-[300px] text-left md:col-span-2 lg:col-span-1 border border-neutral-800 hover:border-[#fce303]/40 shadow-sm hover:shadow-xl cursor-pointer group transition-all"
                  role="button"
                  tabIndex={0}
                  aria-label="Launch Sectors Visualizer"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#fce303] text-[9px] uppercase font-mono tracking-wider font-bold bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                        Interactive Toolkit
                      </span>
                      <Sparkles className="w-4 h-4 text-[#fce303]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#fce303] transition-colors">
                      Sectors Visualizer
                    </h3>
                    <p className="text-xs text-white/70 font-light leading-relaxed">
                      Explore deeper interactive state-by-state metrics, active agricultural hectares, asset allocation percentages, and operational subsidiaries.
                    </p>
                  </div>
                  
                  <div className="inline-flex items-center justify-between w-full bg-white/10 group-hover:bg-[#00a757] text-white px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors select-none">
                    <span>Launch Explorer</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </div>

              {/* FOCAL GROWTH AREA DETAIL MODAL */}
              <AnimatePresence>
                {selectedThrust && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelectedThrust(null)}
                      className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm transition-opacity"
                    />

                    {/* Modal Card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="relative bg-white rounded-3xl shadow-2xl border border-neutral-200 max-w-2xl w-full overflow-hidden z-10 my-auto text-left"
                    >
                      {/* Header with color gradient */}
                      <div className={`p-6 sm:p-8 bg-gradient-to-tr ${selectedThrust.color} text-white relative`}>
                        <button
                          type="button"
                          onClick={() => setSelectedThrust(null)}
                          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Close modal"
                        >
                          <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                            <selectedThrust.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-[11px] font-mono uppercase tracking-widest text-[#fce303] bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full font-bold">
                            Strategic Focal Area
                          </span>
                        </div>

                        <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                          {selectedThrust.title}
                        </h3>
                        <p className="text-white/90 text-xs sm:text-sm font-light mt-1 max-w-lg leading-relaxed">
                          {selectedThrust.tagline}
                        </p>
                      </div>

                      {/* Modal Body */}
                      <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                        <div>
                          <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold mb-2">
                            Strategic Thesis & Scope
                          </h4>
                          <p className="text-sm text-neutral-700 leading-relaxed font-light">
                            {selectedThrust.desc}
                          </p>
                        </div>

                        {selectedThrust.pillars && (
                          <div>
                            <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#00a757] font-bold mb-3 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Key Investment Pillars</span>
                            </h4>
                            <div className="space-y-2.5">
                              {selectedThrust.pillars.map((pillar: string, pIdx: number) => (
                                <div key={pIdx} className="flex items-start gap-3 bg-neutral-50 p-3.5 rounded-2xl border border-neutral-100">
                                  <CheckCircle2 className="w-4 h-4 text-[#00a757] shrink-0 mt-0.5" />
                                  <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                                    {pillar}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedThrust.initiatives && selectedThrust.initiatives.length > 0 && (
                          <div>
                            <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold mb-2.5">
                              Active Initiatives & Focus Clusters
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedThrust.initiatives.map((init: string, iIdx: number) => (
                                <span key={iIdx} className="text-xs font-medium bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-xl border border-neutral-200/80">
                                  {init}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedThrust.impact && (
                          <div className="bg-[#00a757]/5 border border-[#00a757]/20 p-4 rounded-2xl">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00a757] font-bold block mb-1">
                              Regional Economic Impact
                            </span>
                            <p className="text-xs text-neutral-700 leading-relaxed font-light">
                              {selectedThrust.impact}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Modal Footer Actions */}
                      <div className="p-4 sm:p-6 bg-neutral-50 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedThrust(null)}
                          className="w-full sm:w-auto px-5 py-2.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Close
                        </button>
                        
                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedThrust(null);
                              if (selectedThrust.sectorKey && sectorDetails[selectedThrust.sectorKey]) {
                                setActiveSector(selectedThrust.sectorKey);
                              } else {
                                setActiveSector('agriculture');
                              }
                              const element = document.getElementById('explore-panel');
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
                          >
                            <span>Explore Visualizer</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedThrust(null);
                              onOpenPartnerModal();
                            }}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#00a757] hover:bg-[#008945] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                          >
                            <span>Partner With Us</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* TAB 3: OUR SUBSIDIARIES */}
          {activeTab === 'subsidiaries' && (
            <motion.div
              key="subsidiaries"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-6">
                <div className="space-y-2">
                  <span className="text-[#00a757] text-xs font-mono uppercase tracking-widest font-bold">Asset Architecture</span>
                  <h2 className="font-serif text-3xl font-bold text-neutral-900">Our Subsidiaries</h2>
                  <p className="text-neutral-600 font-light text-xs sm:text-sm max-w-xl">
                    Odu’a holds wholly owned or majority-stake control in some of Nigeria's oldest, most resilient corporate institutions.
                  </p>
                </div>

                {/* Filter Selector */}
                <div className="flex flex-wrap gap-1.5 bg-neutral-100 p-1 rounded-2xl border border-neutral-200 self-start md:self-end">
                  {subsidiaryCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSubsidiaryFilter(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer select-none ${
                        subsidiaryFilter === cat 
                          ? 'bg-white text-neutral-950 shadow-sm' 
                          : 'text-neutral-500 hover:text-neutral-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Subsidiaries */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredSubsidiaries.map((sub, i) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    key={sub.name}
                    className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col justify-between"
                  >
                    <div className="p-6 sm:p-8 space-y-6 text-left">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#00a757] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                            {sub.category}
                          </span>
                          <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-950 pt-2 leading-tight">
                            {sub.name}
                          </h3>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center font-serif font-black tracking-widest text-sm shrink-0 border border-neutral-800">
                          {sub.logoText}
                        </div>
                      </div>

                      <div className="space-y-1 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                        <span className="text-[9px] uppercase font-mono font-bold text-neutral-400 block">Acquisition & Origin</span>
                        <p className="text-xs text-neutral-600 font-light leading-relaxed">
                          {sub.origin}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[9px] uppercase font-mono font-bold text-neutral-400 block">Corporate Mandate</span>
                        <p className="text-sm text-neutral-700 font-light leading-relaxed">
                          {sub.desc}
                        </p>
                      </div>

                      <div className="space-y-2.5 pt-2">
                        {sub.features.map((feat, idx) => (
                          <div key={idx} className="flex gap-2.5 items-start text-xs text-neutral-700 leading-relaxed font-medium">
                            <CheckCircle2 className="w-4.5 h-4.5 text-[#00a757] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Agriculture Extra Info */}
                      {sub.contact && (
                        <div className="pt-4 mt-2 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-600">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                            <a href={`mailto:${sub.contact.email}`} className="hover:text-[#00a757] font-mono truncate">{sub.contact.email}</a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                            <span className="font-mono">{sub.contact.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 sm:col-span-2">
                            <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                            <span className="font-light">{sub.contact.address}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: ASSOCIATE COMPANIES */}
          {activeTab === 'associates' && (
            <motion.div
              key="associates"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3 mb-4">
                <span className="text-[#00a757] text-xs font-mono uppercase tracking-widest font-bold">Corporate Investments</span>
                <h2 className="font-serif text-3xl font-bold text-neutral-900">Associate Company Investments</h2>
                <p className="text-neutral-600 font-light text-xs sm:text-sm">
                  We align with prominent multinational and national brands, maintaining strategic minority stakes to drive joint economic growth across our regions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {associates.map((assoc, idx) => (
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    key={idx}
                    className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-sm flex flex-col justify-between h-[230px] text-left relative overflow-hidden"
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#00a757] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          {assoc.role}
                        </span>
                        <span className="text-[10px] uppercase font-mono text-neutral-400 font-bold">
                          Associate Holding
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="font-serif text-lg font-bold text-neutral-950">
                          {assoc.name}
                        </h3>
                        <p className="text-xs text-neutral-500 font-light leading-relaxed">
                          {assoc.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <span className="font-mono text-[9px] uppercase font-bold text-neutral-400">Equity Asset Class</span>
                      <span className="text-[10px] text-[#00a757] font-bold uppercase tracking-wider bg-[#00a757]/5 px-2 py-1 rounded">
                        {assoc.logoText}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* DETAILED STATS EXPLORER (BACKWARD COMPATIBILITY FROM EXISTING PORTFOLIO) */}
      <section id="explore-panel" className="py-16 bg-[#f7f8f7] border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
            <span className="text-[#00a757] text-xs font-mono uppercase tracking-widest font-bold">Active Frameworks</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">Portfolio Metrics Overview</h2>
            <p className="text-neutral-500 font-light text-xs leading-relaxed">
              Explore dynamic resource maps, investment values, and asset metrics within the active sectors.
            </p>
          </div>

          {/* Interactive Toggle Selectors (NOW ON TOP) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.keys(sectorDetails).map((key) => {
              const active = activeSector === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveSector(key)}
                  className={`p-5 rounded-2xl text-left border flex items-center justify-between transition-all duration-300 cursor-pointer select-none group ${
                    active 
                      ? 'bg-neutral-950 border-[#00a757] border-2 text-white shadow-xl ring-1 ring-[#00a757]/25' 
                      : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 text-white/95 shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-10 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      active ? 'bg-[#00a757] text-white' : 'bg-neutral-800 text-[#00a757]'
                    }`}>
                      {key === 'real_estate' && <Building2 className="w-5 h-5" />}
                      {key === 'agriculture' && <Leaf className="w-5 h-5" />}
                      {key === 'financial' && <TrendingUp className="w-5 h-5" />}
                    </span>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider leading-tight text-white group-hover:text-[#fce303] transition-colors">
                        {sectorDetails[key].title}
                      </h3>
                      <p className="text-[10px] text-neutral-400 font-light truncate max-w-[150px] mt-0.5">
                        {sectorDetails[key].subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform ${active ? 'text-[#fce303] translate-x-1' : 'text-neutral-500 group-hover:text-white'}`} />
                </button>
              );
            })}
          </div>

          {/* Interactive Sector Presentation Panel */}
          <div className="bg-neutral-900 text-white rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl min-h-[500px]">
            <motion.div 
              key={activeSector}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 h-full"
            >
              
              {/* Left Column: Backdrop Image */}
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden">
                <img 
                  src={sectorDetails[activeSector]?.image} 
                  alt={sectorDetails[activeSector]?.title} 
                  className="absolute inset-0 w-full h-full object-cover filter brightness-50"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                
                {/* Overlay Text Details */}
                <div className="absolute bottom-8 left-8 right-8 text-left space-y-4">
                  <span className="text-[10px] font-bold tracking-widest text-[#fce303] uppercase bg-[#00a757]/80 px-3 py-1.5 rounded-md border border-[#00a757]/50 inline-block">
                    {sectorDetails[activeSector]?.tagline}
                  </span>
                  <div>
                    <p className="text-[10px] text-white/50 uppercase font-mono tracking-wider">Operating Division</p>
                    <h3 className="font-serif text-2xl font-black text-white mt-1 leading-snug">
                      {sectorDetails[activeSector]?.subtitle}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Details */}
              <div className="lg:col-span-7 p-8 sm:p-12 space-y-8 text-left">
                
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#00a757] uppercase tracking-widest font-mono">Sector Overview</h4>
                  <p className="text-white/80 text-sm leading-relaxed font-light">
                    {sectorDetails[activeSector]?.description}
                  </p>
                </div>

                {/* Bullets with checks */}
                <div className="space-y-3">
                  {sectorDetails[activeSector]?.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#fce303] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-white/95 font-medium leading-relaxed">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stats cards */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {sectorDetails[activeSector]?.stats?.map((stat, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                      <span className="text-lg font-bold text-[#fce303] block leading-none">{stat.value}</span>
                      <span className="text-[10px] text-white/50 block mt-1.5 uppercase font-semibold tracking-wider font-mono">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {/* Subsidiaries list */}
                <div className="pt-4 flex flex-wrap gap-2 items-center">
                  <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider mr-2 font-mono">Core Assets:</span>
                  {sectorDetails[activeSector]?.subs?.map((sub, key) => (
                    <span key={key} className="text-xs bg-[#00a757]/15 text-[#fce303] px-3.5 py-1 rounded-full border border-[#00a757]/30 font-semibold uppercase tracking-wider text-[9px]">
                      {sub}
                    </span>
                  ))}
                </div>

              </div>

            </motion.div>
          </div>

        </div>
      </section>

      {/* JOINT VENTURE CALL OUT */}
      <section className="py-16 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#00a757]/5 border border-[#00a757]/15 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h4 className="font-serif text-xl font-bold text-neutral-900">Propose Joint Venture or Outgrower Pipeline</h4>
              <p className="text-xs text-neutral-600 max-w-xl font-light">
                Odu'a provides premium de-risked portfolios, state cabinet sponsorships, and long-term asset stability. Get in touch with our portfolio coordinators today.
              </p>
            </div>
            <button
              onClick={onOpenPartnerModal}
              className="bg-[#00a757] hover:bg-neutral-900 text-white font-bold px-8 py-3.5 rounded-full text-xs tracking-wider uppercase transition-all duration-300 shadow cursor-pointer whitespace-nowrap shrink-0"
            >
              Request Prospectus
            </button>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
