import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Search, 
  MapPin, 
  Globe, 
  ExternalLink, 
  PhoneCall, 
  Mail, 
  Briefcase, 
  Layers, 
  ArrowRight,
  CheckCircle2,
  Filter
} from 'lucide-react';
import WordPressPageHeader from '../components/WordPressPageHeader';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';
import wemabodLogo from '../assets/images/subsidiaries/wemabod.jpg';
import lagosAirportHotelLogo from '../assets/images/subsidiaries/lagos-airport-hotel.jpg';
import glanvillsLogo from '../assets/images/subsidiaries/glanvills.png';
import westernHotelLogo from '../assets/images/subsidiaries/western-hotel.png';

interface Subsidiary {
  name: string;
  category: 'Subsidiary' | 'Associate';
  sector: 'Real Estate & Hospitality' | 'Agribusiness' | 'Financial Services' | 'Energy & Logistics' | 'Manufacturing';
  state: string;
  location: string;
  established: string;
  description: string;
  keyAssets: string[];
  website?: string;
  image: string;
  logo?: string;
  logoText: string;
}

const SUBSIDIARIES_DATA: Subsidiary[] = [
  {
    name: "Wemabod Limited",
    category: "Subsidiary",
    sector: "Real Estate & Hospitality",
    state: "Lagos / Oyo / Ogun",
    location: "Wemabod Towers, 8/10 Broad Street, Lagos",
    established: "1962",
    description: "One of West Africa's oldest and most prestigious property development and estate management enterprises, owning landmark skyscrapers and luxury residential towers across Southwestern Nigeria.",
    keyAssets: ["Cocoa House (Ibadan)", "Wemabod Towers (Broad Street Lagos)", "Sovereign Heights (Ikoyi)", "Western House"],
    website: "https://wemabod.com",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    logo: wemabodLogo,
    logoText: "WL"
  },
  {
    name: "SWAgCo Limited (South-West Agriculture Company)",
    category: "Subsidiary",
    sector: "Agribusiness",
    established: "2019",
    state: "Oyo / Ondo / Osun / Ekiti",
    location: "Cocoa House, Dugbe, Ibadan",
    description: "The agricultural engine of Odu'a Group, established to unlock commercial farming, rehabilitate abandoned cocoa estates, and spearhead large-scale cassava-to-starch processing.",
    keyAssets: ["12,000+ Hectares Secured Farmland", "Cassava Processing Plants", "Ondo Cocoa Regeneration Hub"],
    website: "https://swagco.com.ng",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80",
    logoText: "SW"
  },
  {
    name: "Premier Hotel Ibadan",
    category: "Subsidiary",
    sector: "Real Estate & Hospitality",
    state: "Oyo State",
    established: "1966",
    location: "Mokola Hill, Ibadan, Oyo State",
    description: "Sitting majestically atop Mokola Hill, Premier Hotel is West Africa's iconic 4-star hospitality resort undergoing a comprehensive 5-star modernization in partnership with international operators.",
    keyAssets: ["Banquet Halls (1,000+ Capacity)", "Hilltop Olympic Pool", "Presidents Suite Complex"],
    website: "https://www.premierhotelibadan.com",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    logo: westernHotelLogo,
    logoText: "PH"
  },
  {
    name: "Lafia Hotel Ibadan",
    category: "Subsidiary",
    sector: "Real Estate & Hospitality",
    state: "Oyo State",
    location: "Apata, Ibadan, Oyo State",
    established: "1973",
    description: "Renowned garden hotel offering business accommodations, corporate event centers, and serene greenery near the Abeokuta-Ibadan industrial axis.",
    keyAssets: ["Garden Lodges", "Corporate Conference Suites"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    logo: westernHotelLogo,
    logoText: "LH"
  },
  {
    name: "Lagos Airport Hotel",
    category: "Subsidiary",
    sector: "Real Estate & Hospitality",
    state: "Lagos State",
    location: "111 Obafemi Awolowo Way, Ikeja, Lagos",
    established: "1942",
    description: "A flagship hospitality landmark situated in the heart of Ikeja, Lagos, serving international travelers, aviation crews, and major regional corporate summits.",
    keyAssets: ["250+ Luxury Rooms", "Monarch Banquet Complex", "Executive Boardrooms"],
    website: "https://lagosairporthotel.com.ng",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    logo: lagosAirportHotelLogo,
    logoText: "LAH"
  },
  {
    name: "Glanvill Enthoven Insurance Brokers & Pensions",
    category: "Subsidiary",
    sector: "Financial Services",
    state: "Lagos / Oyo",
    location: "Glanvill House, Lagos",
    established: "1957",
    description: "Pioneer risk management and insurance broking firm serving oil & gas upstream fields, maritime cargo, corporate assets, and group life pensions.",
    keyAssets: ["Energy Risk Division", "Corporate Reinsurance Services"],
    website: "https://glanvillenthoven.com.ng",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    logo: glanvillsLogo,
    logoText: "GE"
  },
  {
    name: "South-West Innovation & Technology (SWIT)",
    category: "Subsidiary",
    sector: "Energy & Logistics",
    state: "Lagos / Oyo / Ogun",
    location: "Innovation Hub, Cocoa House, Ibadan",
    established: "2022",
    description: "Strategic technology incubator driving enterprise ERP solutions, smart agro-logistics tracking, and university tech research commercialization across the 6 Southwest states.",
    keyAssets: ["Digital ERP Backbone", "University Sandbox Labs", "Agro-Traceability Platform"],
    website: "https://s-wit.com",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    logoText: "SWIT"
  },
  {
    name: "Westlink Integrated Agriculture Limited (WIAL)",
    category: "Subsidiary",
    sector: "Agribusiness",
    state: "Ogun / Ekiti / Oyo",
    location: "Floors 20-23, Cocoa House, Ibadan",
    established: "2018",
    description: "Wholly owned agricultural operator managing extensive mechanized grain, maize, and cassava farmlands across Ogun and Ekiti States.",
    keyAssets: ["3,300ha Imeko Farm Hub", "4,283ha Oke-Ako Grain Farm", "Eleyele Agro Warehouse Hub"],
    website: "https://swagco.com.ng/wp-portfolio/westlink-integrated-agriculture-limited/",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    logoText: "WIAL"
  },
  {
    name: "Cocoa Industry Ede",
    category: "Subsidiary",
    sector: "Manufacturing",
    state: "Osun State",
    location: "Ede, Osun State",
    established: "1977",
    description: "Historical cocoa butter, liquor, and cake processing factory undergoing repositioning to export fine cocoa derivative products to international confectionery markets.",
    keyAssets: ["Cocoa Bean Processing Line", "Export Warehouses"],
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
    logoText: "CIL"
  },
  {
    name: "Wema Bank PLC",
    category: "Associate",
    sector: "Financial Services",
    state: "National / Southwest Nigeria",
    location: "Wema Towers, 54 Marina, Lagos",
    established: "1945",
    description: "Pioneer of ALAT, Africa’s first fully digital banking platform, representing over 78 years of resilient financial services, retail banking, and commercial capital creation.",
    keyAssets: ["ALAT Digital Banking", "150+ Branch Network", "Tier-1 Capital Reserves"],
    website: "https://wemabank.com",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Wema_Bank_logo.png",
    logoText: "WEMA"
  },
  {
    name: "Great Nigeria Insurance Plc",
    category: "Associate",
    sector: "Financial Services",
    state: "Lagos / National",
    location: "GNI House, 8 Opebi Road, Ikeja, Lagos",
    established: "1960",
    description: "A premier insurance underwriting enterprise with over 60 years of active operations providing non-life, life assurance, pensions, and specialized risk solutions.",
    keyAssets: ["Non-Life & Life Underwriting", "Corporate Pensions", "Nationwide Branch Network"],
    website: "https://www.gni.com.ng",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    logoText: "GNI"
  },
  {
    name: "FCMB Pensions Limited",
    category: "Associate",
    sector: "Financial Services",
    state: "National / Lagos",
    location: "Plot 21, Marina, Lagos",
    established: "2005",
    description: "A leading licensed Pension Fund Administrator (PFA) with over ₦1.1 Trillion in Assets Under Management (AUM), regulated by PenCom and the Central Bank of Nigeria.",
    keyAssets: ["₦1.1T+ AUM", "500,000+ RSA Contributors", "PenCom Aa- Grade"],
    website: "https://fcmbpensions.com",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    logoText: "FCMB"
  }
];

interface SubsidiariesDirectoryProps {
  subsidiaries?: any[];
  onNavigate?: (page: string) => void;
}

export default function SubsidiariesDirectory({ subsidiaries, onNavigate = () => {} }: SubsidiariesDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSectorFilter, setSelectedSectorFilter] = useState('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  const activeSubs = (subsidiaries !== undefined && subsidiaries !== null) ? subsidiaries : SUBSIDIARIES_DATA;

  const filteredData = activeSubs.filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sub.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (sub.location && sub.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSector = selectedSectorFilter === 'All' || sub.sector === selectedSectorFilter;
    const matchesCategory = selectedCategoryFilter === 'All' || sub.category === selectedCategoryFilter;
    return matchesSearch && matchesSector && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#fcfdfc] min-h-screen pb-20 font-sans"
    >
      {/* WordPress-Style Header with Breadcrumbs */}
      <WordPressPageHeader
        title="Subsidiaries & Operating Companies"
        subtitle="Explore our ecosystem of market-leading operating subsidiaries, real estate icons, agro-allied processors, and associated financial institutions."
        badge="Group Corporate Architecture"
        breadcrumbs={[
          { label: 'Investments', page: 'Our Investment Approach' },
          { label: 'Our Subsidiaries', active: true }
        ]}
        onNavigate={onNavigate}
        backgroundImage={HERO_BACKGROUNDS.subsidiaries}
      />

      {/* FILTER & SEARCH CONTROLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 absolute left-4 top-3.5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search subsidiary by name, asset, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl pl-11 pr-4 py-3 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#00a757]"
              />
            </div>

            {/* Sector Dropdown */}
            <div className="md:col-span-4">
              <select
                value={selectedSectorFilter}
                onChange={(e) => setSelectedSectorFilter(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#00a757]"
              >
                <option value="All">All Investment Sectors</option>
                <option value="Real Estate & Hospitality">Real Estate & Hospitality</option>
                <option value="Agribusiness">Agribusiness</option>
                <option value="Financial Services">Financial Services</option>
                <option value="Manufacturing">Manufacturing</option>
              </select>
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#00a757]"
              >
                <option value="All">All Ownership Types</option>
                <option value="Subsidiary">Direct Subsidiary (100% / Majority)</option>
                <option value="Associate">Associate Company (Equity Stake)</option>
              </select>
            </div>

          </div>
        </div>
      </section>

      {/* DIRECTORY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((sub, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 relative overflow-hidden bg-neutral-950">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-neutral-900/85 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full border border-white/20 shadow-xs">
                      {sub.category}
                    </span>
                    <span className="bg-[#00a757]/90 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full border border-white/20 shadow-xs">
                      Est. {sub.established}
                    </span>
                  </div>

                  {/* Prominent Subsidiary Company Logo Badge */}
                  <div className="absolute -bottom-5 left-6 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-2 border border-neutral-200/90 shadow-md flex items-center justify-center overflow-hidden z-10">
                    {sub.logo ? (
                      <img
                        src={sub.logo}
                        alt={`${sub.name} logo`}
                        className="w-full h-full object-contain filter contrast-105"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback') as HTMLElement | null;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`logo-fallback ${sub.logo ? 'hidden' : 'flex'} w-full h-full items-center justify-center rounded-xl bg-gradient-to-br from-[#00a757] via-emerald-800 to-neutral-900 font-serif font-bold text-white text-xs sm:text-sm tracking-wider shadow-inner`}
                    >
                      {sub.logoText || sub.name.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-9 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#00a757] tracking-wider block mb-1">
                      {sub.sector}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-neutral-900 group-hover:text-[#00a757] transition-colors">
                      {sub.name}
                    </h3>
                  </div>

                  <p className="text-neutral-600 text-xs font-light leading-relaxed">
                    {sub.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                    <MapPin className="w-3.5 h-3.5 text-[#00a757] shrink-0" />
                    <span className="truncate">{sub.location}</span>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block">Key Assets / Mandate</span>
                    <div className="flex flex-wrap gap-1.5">
                      {sub.keyAssets.map((asset, aIdx) => (
                        <span key={aIdx} className="bg-neutral-100 text-neutral-700 text-[10px] px-2.5 py-0.5 rounded-md font-medium">
                          {asset}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-neutral-100">
                {sub.website ? (
                  <a
                    href={sub.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#00a757] hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer mt-4"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#fce303]" />
                  </a>
                ) : (
                  <div className="w-full bg-neutral-100 text-neutral-500 font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl text-center mt-4 border border-neutral-200/60">
                    Managed via Headquarters
                  </div>
                )}
              </div>

            </motion.div>
          ))}
        </div>
      </section>

    </motion.div>
  );
}
