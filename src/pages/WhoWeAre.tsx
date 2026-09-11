import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Target, Shield, MapPin, Landmark, Users, TrendingUp, Briefcase } from 'lucide-react';
import { StateMetadata } from '../types';
import WordPressPageHeader from '../components/WordPressPageHeader';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';

// Structured regional data for the 6 Southwest owner states of Odu'a Investment
const southwestStates: StateMetadata[] = [
  {
    id: 'oyo',
    name: 'Oyo State',
    capital: 'Ibadan',
    gdp: '$10.2 Billion',
    population: '7.8 Million',
    keySectors: ['Mechanized Agriculture', 'Agro-processing', 'Solid Minerals', 'Trade & Logistics'],
    description: 'The Pacesetter State. Home to the historical corporate headquarters of Odu’a Investment (Cocoa House, Ibadan). It serves as the primary agricultural and logistics hub of the group.',
    logo: 'https://i.postimg.cc/mktQk9JQ/images.jpg',
    coordinates: { x: 120, y: 80 } // Simplified coordinates for SVG layout
  },
  {
    id: 'ogun',
    name: 'Ogun State',
    capital: 'Abeokuta',
    gdp: '$11.5 Billion',
    population: '5.2 Million',
    keySectors: ['Manufacturing & Industrial Parks', 'Real Estate Development', 'Mining', 'Education'],
    description: 'The Gateway State. Boasting the highest concentration of industrial estates in Nigeria, Ogun is a critical manufacturing powerhouse and real estate development frontier.',
    logo: 'https://i.postimg.cc/C5BqSgnC/logo.png',
    coordinates: { x: 80, y: 160 }
  },
  {
    id: 'osun',
    name: 'Osun State',
    capital: 'Osogbo',
    gdp: '$5.1 Billion',
    population: '4.7 Million',
    keySectors: ['Cultural Tourism', 'Gold Mining', 'Food Crops', 'Renewable Energy Projects'],
    description: 'The State of the Living Spring. A cultural epicenter rich in mineral resources and heritage tourism, driving new-age renewable energy and ecological initiatives.',
    logo: 'https://i.postimg.cc/6pNvJFWn/images-(1).jpg',
    coordinates: { x: 180, y: 110 }
  },
  {
    id: 'ekiti',
    name: 'Ekiti State',
    capital: 'Ado-Ekiti',
    gdp: '$3.8 Billion',
    population: '3.3 Million',
    keySectors: ['Knowledge Economy & Tech Hubs', 'Forestry & Wood Processing', 'Rice & Cocoa Farming'],
    description: 'The Land of Honour. Transitioning aggressively into a knowledge-based economy with strong tech hubs, modern forestry practices, and institutional academic frameworks.',
    logo: 'https://i.postimg.cc/sgp5Ms67/setting-ekiti-logo.gif',
    coordinates: { x: 240, y: 100 }
  },
  {
    id: 'ondo',
    name: 'Ondo State',
    capital: 'Akure',
    gdp: '$8.4 Billion',
    population: '4.6 Million',
    keySectors: ['Bitumen & Oil / Gas', 'Blue Economy (Deep Sea Port)', 'Cocoa Cultivation', 'Power Generation'],
    description: 'The Sunshine State. Possessing Nigeria’s longest coastline, rich bitumen deposits, and massive deep-sea port potential, Ondo is central to Odu’a’s maritime and energy strategy.',
    logo: 'https://i.postimg.cc/L8f3jzXz/images.png',
    coordinates: { x: 230, y: 180 }
  },
  {
    id: 'lagos',
    name: 'Lagos State',
    capital: 'Ikeja',
    gdp: '$47.5 Billion',
    population: '15.5 Million',
    keySectors: ['Financial Services', 'Technology & Startups', 'Deepwater Ports', 'Commercial Real Estate'],
    description: 'The Centre of Excellence. Admitted as a shareholder-state in 2018, Lagos anchors the group’s financial market strategies, venture capital structures, and premium tech hub integrations.',
    logo: 'https://i.postimg.cc/yYRQsJR2/images-(2).jpg',
    coordinates: { x: 90, y: 220 }
  }
];

interface WhoWeAreProps {
  onNavigate?: (page: string) => void;
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
  };
  southwestStates?: StateMetadata[];
  selectedState?: StateMetadata;
  setSelectedState?: (state: StateMetadata) => void;
}

export default function WhoWeAre({ onNavigate = () => {}, generalSettings, southwestStates: customStates }: WhoWeAreProps) {
  const finalStates = (customStates && customStates.length > 0) ? customStates : southwestStates;
  const [activeState, setActiveState] = useState<StateMetadata>(finalStates[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 pb-16"
    >
      {/* WordPress-Style Header with Breadcrumbs */}
      <WordPressPageHeader
        title="Who We Are & Sovereign Equity"
        subtitle={`Established in ${generalSettings?.establishedYear || "1976"} to manage the sovereign commercial, industrial, and financial assets of Southwest Nigeria's 6 owner states.`}
        badge="Our Heritage & Identity"
        breadcrumbs={[
          { label: 'About Us', page: 'About Us' },
          { label: 'Who We Are', active: true }
        ]}
        onNavigate={onNavigate}
        backgroundImage={HERO_BACKGROUNDS.whoWeAre}
      />

      {/* Vision, Mission, Values Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 sm:py-16">

        {/* Vision, Mission, Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-xs border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg w-fit mb-6">
                <Eye size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {generalSettings?.vision || "To be a world-class conglomerate, delivering sustainable value to our stakeholders while remaining the undisputed engine of growth for Southwest Nigeria."}
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xs border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="p-3 bg-blue-50 text-blue-700 rounded-lg w-fit mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {generalSettings?.mission || "To run a commercially viable enterprise focused on high-yield sectors, optimizing asset performance, and creating generation-spanning economic value."}
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xs border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="p-3 bg-amber-50 text-amber-700 rounded-lg w-fit mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Core Values</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {generalSettings?.coreValues || "Guided strictly by the philosophy of \"Iwa Pele\" (Good Character), structured through Accountability, Enterprise, Integrity, and Collaboration."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Southwest Map Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Map Controls & SVG Graphic */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="text-center lg:text-left w-full mb-8">
                <h2 className="text-3xl font-bold tracking-tight mb-2">Our Sovereign Territories</h2>
                <p className="text-slate-400 text-sm">
                  Click or hover on a state to explore its economic profile and Odu'a investment presence.
                </p>
              </div>

              {/* Styled SVG Map Wrapper */}
              <div className="relative bg-slate-850 p-6 rounded-2xl border border-slate-800 w-full max-w-[450px] aspect-square flex items-center justify-center">
                <svg viewBox="0 0 350 300" className="w-full h-full max-h-[350px]">
                  {/* Geometric stylized approximations of Southwest States */}
                  <g className="cursor-pointer select-none">
                    {/* OYO */}
                    <path
                      d="M 50,70 L 150,40 L 190,80 L 160,130 L 90,130 L 50,70 Z"
                      fill={activeState.id === 'oyo' ? '#047857' : '#1e293b'}
                      stroke="#475569"
                      strokeWidth="2"
                      className="transition-all duration-300 hover:fill-emerald-800"
                      onClick={() => setActiveState(finalStates.find(s => s.id === 'oyo') || finalStates[0])}
                    />
                    
                    {/* OSUN */}
                    <path
                      d="M 160,130 L 190,80 L 220,100 L 210,140 L 160,130 Z"
                      fill={activeState.id === 'osun' ? '#047857' : '#1e293b'}
                      stroke="#475569"
                      strokeWidth="2"
                      className="transition-all duration-300 hover:fill-emerald-800"
                      onClick={() => setActiveState(finalStates.find(s => s.id === 'osun') || finalStates[0])}
                    />

                    {/* EKITI */}
                    <path
                      d="M 220,100 L 270,90 L 280,120 L 210,140 L 220,100 Z"
                      fill={activeState.id === 'ekiti' ? '#047857' : '#1e293b'}
                      stroke="#475569"
                      strokeWidth="2"
                      className="transition-all duration-300 hover:fill-emerald-800"
                      onClick={() => setActiveState(finalStates.find(s => s.id === 'ekiti') || finalStates[0])}
                    />

                    {/* OGUN */}
                    <path
                      d="M 50,70 L 90,130 L 160,130 L 160,180 L 60,190 L 50,70 Z"
                      fill={activeState.id === 'ogun' ? '#047857' : '#1e293b'}
                      stroke="#475569"
                      strokeWidth="2"
                      className="transition-all duration-300 hover:fill-emerald-800"
                      onClick={() => setActiveState(finalStates.find(s => s.id === 'ogun') || finalStates[0])}
                    />

                    {/* ONDO */}
                    <path
                      d="M 210,140 L 280,120 L 290,180 L 240,230 L 180,180 L 210,140 Z"
                      fill={activeState.id === 'ondo' ? '#047857' : '#1e293b'}
                      stroke="#475569"
                      strokeWidth="2"
                      className="transition-all duration-300 hover:fill-emerald-800"
                      onClick={() => setActiveState(finalStates.find(s => s.id === 'ondo') || finalStates[0])}
                    />

                    {/* LAGOS */}
                    <path
                      d="M 60,190 L 160,180 L 140,210 L 60,210 L 60,190 Z"
                      fill={activeState.id === 'lagos' ? '#047857' : '#1e293b'}
                      stroke="#475569"
                      strokeWidth="2"
                      className="transition-all duration-300 hover:fill-emerald-800"
                      onClick={() => setActiveState(finalStates.find(s => s.id === 'lagos') || finalStates[0])}
                    />
                  </g>

                  {/* Dynamic map text tags */}
                  <g pointerEvents="none" className="text-[10px] font-bold fill-slate-300 select-none">
                    <text x="100" y="85">OYO</text>
                    <text x="100" y="165">OGUN</text>
                    <text x="175" y="120">OSUN</text>
                    <text x="235" y="115">EKITI</text>
                    <text x="230" y="175">ONDO</text>
                    <text x="90" y="202" className="fill-slate-100">LAGOS</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Right: Dynamic Metadata Dashboard */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeState.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-xl"
                >
                  {/* State Identity */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center border border-emerald-500/30 shadow-md shrink-0">
                      {activeState.logo ? (
                        <img 
                          src={activeState.logo} 
                          alt={`${activeState.name} Seal`} 
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <MapPin size={24} className="text-emerald-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{activeState.name}</h3>
                      <p className="text-sm text-slate-400">Capital: <strong className="text-slate-200">{activeState.capital}</strong></p>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-8">
                    {activeState.description}
                  </p>

                  {/* Core Metrics */}
                  <div className="grid grid-cols-2 gap-6 mb-8 border-t border-b border-slate-700/50 py-6">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Estimated GDP</span>
                      <span className="text-lg font-bold text-emerald-400 flex items-center gap-1.5">
                        <TrendingUp size={16} />
                        {activeState.gdp || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">State Population</span>
                      <span className="text-lg font-bold text-blue-400 flex items-center gap-1.5">
                        <Users size={16} />
                        {activeState.population || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Focus Sectors */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                      <Briefcase size={14} /> Key Strategic Sectors
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeState.keySectors.map((sector, index) => (
                        <span 
                          key={index} 
                          className="bg-slate-750 border border-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Corporate Governance Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full inline-block mb-4">
              Structural Excellence
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
              A Legacy Rooted in Strong Governance
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Our business operations are divided into core investment verticals, monitored by top-tier professionals and backed by representative state governance structures. Each of the six states maintains equal shareholding, ensuring neutral, high-standard commercial viability.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-emerald-50 text-emerald-700 rounded-md mt-1">
                  <Landmark size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">State Sovereign Trust</h4>
                  <p className="text-slate-600 text-xs mt-0.5">Dual-layer corporate governance combining sovereign representation and independent commercial boards.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 bg-emerald-50 text-emerald-700 rounded-md mt-1">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Wealth Retention Focus</h4>
                  <p className="text-slate-600 text-xs mt-0.5">Retaining local investment yields to continuously support structural development in host regions.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
              alt="Odu'a corporate building architecture" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
}