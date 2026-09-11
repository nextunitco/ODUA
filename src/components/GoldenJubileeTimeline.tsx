import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Calendar, 
  Building2, 
  ChevronRight, 
  Sparkles, 
  History, 
  Star,
  CheckCircle2
} from 'lucide-react';
import WordPressPageHeader from './WordPressPageHeader';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';

interface TimelineEvent {
  year: string;
  decade: string;
  title: string;
  subtitle: string;
  description: string;
  impact: string;
  image: string;
}

const JUBILEE_EVENTS: TimelineEvent[] = [
  {
    year: "1976",
    decade: "1970s",
    title: "Inception & Sovereign Charter",
    subtitle: "Birth of Odu'a Investment Company Limited",
    description: "Following the creation of Oyo, Ogun, and Ondo States out of the old Western State, Odu'a Investment Company Limited was incorporated on July 1, 1976, to hold and manage the commercial assets of the former Western Region.",
    impact: "Created Sub-Saharan Africa's premier state-owned commercial holding conglomerate.",
    image: "/uploads/cocoa_house_sharp.jpg"
  },
  {
    year: "1982",
    decade: "1980s",
    title: "Industrial & Agricultural Expansion",
    subtitle: "Establishing Manufacturing & Cocoa Supply Chains",
    description: "Expansion into large-scale cocoa processing (Cocoa Industry Ede), textile manufacturing (Asbestos & West African Batteries), and urban commercial real estate developments.",
    impact: "Pioneered industrial employment across Ibadan, Abeokuta, and Akure.",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "1997",
    decade: "1990s",
    title: "Financial Institutions & Risk Broking",
    subtitle: "Strengthening Financial Services & Insurance",
    description: "Consolidating major stakes in Glanvill Enthoven Insurance Brokers, National Bank of Nigeria, and regional development finance institutions to support Southwestern businesses.",
    impact: "Built durable risk-management buffers for Western regional commerce.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2005",
    decade: "2000s",
    title: "Telecommunications & Digital Networks",
    subtitle: "Pioneering O'Net Telecoms",
    description: "Odu'a launched O'Net Telecoms (Odu'a Telecoms), deploying CDMA broadband and landline infrastructure across Southwestern state capitals.",
    impact: "Pioneered early internet connectivity and voice telecommunication in Western Nigeria.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2020",
    decade: "2020s",
    title: "Admission of Lagos State & Board Restructuring",
    subtitle: "Unifying All 6 Southwestern States",
    description: "Lagos State officially joined as the 6th shareholder state in Odu'a Investment Company Limited, completing the unified economic block of South-West Nigeria.",
    impact: "Created an integrated 45-million population regional market.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2021-2025",
    decade: "2020s",
    title: "The Transformative SRC-2025 Strategy",
    subtitle: "Asset Optimization & SWAgCo Launch",
    description: "Implementation of the 'Strategy to Revitalize & Change' (SRC-2025) led by GMD Abdulrahman Yinusa and Group Chairman Otunba Bimbo Ashiru, launching SWAgCo, modernizing Wemabod, and establishing joint venture funds.",
    impact: "Positioned Odu'a as a world-class investment holding engine.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2026",
    decade: "2020s",
    title: "50-Year Golden Jubilee Jubilee",
    subtitle: "Half a Century of Economic Leadership",
    description: "Celebrating 50 years (1976-2026) of wealth creation, cultural heritage preservation, and sustainable growth across Oyo, Ogun, Ondo, Osun, Ekiti, and Lagos States.",
    impact: "Pledging a ₦500B regional asset portfolio by 2030.",
    image: "/uploads/cocoa_house_sharp.jpg"
  }
];

interface GoldenJubileeTimelineProps {
  milestones?: any[];
  onNavigate?: (page: string) => void;
}

export default function GoldenJubileeTimeline({ milestones, onNavigate = () => {} }: GoldenJubileeTimelineProps) {
  const [selectedDecade, setSelectedDecade] = useState('All');

  const activeMilestones = (milestones !== undefined && milestones !== null) ? milestones : JUBILEE_EVENTS;

  const filteredEvents = selectedDecade === 'All' 
    ? activeMilestones 
    : activeMilestones.filter((e: any) => e.decade === selectedDecade);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* WordPress-Style Header with Breadcrumbs */}
      <WordPressPageHeader
        title="1976 – 2026: 50 Years of Sovereign Heritage"
        subtitle="Journey through half a century of economic stewardship, industrialization, and regional transformation across Oyo, Ogun, Ondo, Osun, Ekiti, and Lagos States."
        badge="Golden Jubilee (1976 - 2026)"
        breadcrumbs={[
          { label: 'Our History', page: 'Our History' },
          { label: 'Golden Jubilee', active: true }
        ]}
        onNavigate={onNavigate}
        backgroundImage={HERO_BACKGROUNDS.goldenJubilee}
      />

      {/* Subnav Decades Filter Bar */}
      <div className="bg-white border-b border-neutral-200 sticky top-16 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden sm:inline">
              Filter By Era:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {['All', '1970s', '1980s', '1990s', '2000s', '2020s'].map((decade) => (
                <button
                  key={decade}
                  onClick={() => setSelectedDecade(decade)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedDecade === decade
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                  }`}
                >
                  {decade === 'All' ? 'Complete 50 Years' : decade}
                </button>
              ))}
            </div>
            <span className="text-xs font-mono text-neutral-400">
              {filteredEvents.length} milestones
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* TIMELINE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((evt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden hover:border-emerald-600/40 transition-all flex flex-col justify-between shadow-2xs hover:shadow-md group"
            >
              <div>
                <div className="h-44 relative overflow-hidden bg-neutral-100">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5 bg-emerald-800 text-white font-mono font-bold text-xs px-3 py-1 rounded-md shadow-xs">
                    {evt.year}
                  </div>
                </div>

                <div className="p-6 space-y-2.5">
                  <span className="text-[11px] font-mono text-emerald-700 uppercase tracking-wider block font-semibold">
                    {evt.subtitle}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-neutral-900 leading-snug">{evt.title}</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 text-emerald-950 text-xs leading-relaxed">
                  <strong className="text-emerald-800 font-semibold block mb-0.5">Regional Impact:</strong>
                  {evt.impact}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
