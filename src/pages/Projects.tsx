import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  MapPin, 
  Search, 
  SlidersHorizontal,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Project } from '../types';
import WordPressPageHeader from '../components/WordPressPageHeader';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';

interface ProjectsProps {
  projects: Project[];
  onNavigate?: (page: string) => void;
}

export default function Projects({ projects, onNavigate = () => {} }: ProjectsProps) {
  const [filter, setFilter] = useState<'All' | 'Ongoing' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering logic
  const filtered = projects.filter((proj) => {
    const matchesFilter = filter === 'All' || proj.status === filter;
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.sector.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col text-left"
    >
      {/* WordPress-Style Header with Breadcrumbs */}
      <WordPressPageHeader
        title="Major Infrastructure & Real Estate Projects"
        subtitle="Tracking the transformation of capital and sovereign equity into physical developments, agro-processing facilities, and commercial landmarks."
        badge="Physical Milestones"
        breadcrumbs={[
          { label: 'Investments', page: 'Our Investment Approach' },
          { label: 'Ongoing Projects', active: true }
        ]}
        onNavigate={onNavigate}
        backgroundImage={HERO_BACKGROUNDS.projects}
      />

      {/* FILTER & SEARCH BLOCK */}
      <section className="py-12 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Status Pills */}
            <div className="flex items-center gap-1.5 bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200/50 w-full md:w-auto overflow-x-auto">
              {(['All', 'Ongoing', 'Completed'] as const).map((filterKey) => (
                <button
                  key={filterKey}
                  onClick={() => setFilter(filterKey)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap select-none ${
                    filter === filterKey 
                      ? 'bg-[#00a757] text-white shadow-sm' 
                      : 'text-neutral-700 hover:bg-neutral-200/60'
                  }`}
                >
                  {filterKey}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-neutral-400">
                <Search className="w-4 h-4" />
              </span>
              <input 
                type="text"
                placeholder="Search projects, location, sector..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#00a757] focus:bg-white transition-all"
              />
            </div>

          </div>
        </div>
      </section>

      {/* PROJECTS LISTING */}
      <section className="py-16 bg-[#fcfdfc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200/60 space-y-3">
              <span className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center mx-auto text-neutral-500">
                <Search className="w-6 h-6" />
              </span>
              <h3 className="font-serif text-lg font-bold text-neutral-800">No matching projects found</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto font-light">
                Try loosening your filters or search keywords to locate active Wemabod properties or SWAgCo operations.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((proj, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-3xl overflow-hidden border border-neutral-200/60 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Photo with hover scale */}
                  <div className="relative h-56 bg-neutral-900 overflow-hidden">
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 filter saturate-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80";
                      }}
                    />
                    
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    
                    {/* Status label */}
                    <span className={`absolute top-4 right-4 text-[9px] uppercase tracking-widest font-black px-2.5 py-1 rounded-full shadow-md ${
                      proj.status === 'Completed' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-[#fce303] text-neutral-900'
                    }`}>
                      {proj.status}
                    </span>

                    {/* Sector tag label */}
                    <span className="absolute bottom-4 left-4 text-[10px] font-bold text-[#fce303] uppercase tracking-widest bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                      {proj.sector}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#00a757] font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{proj.location}</span>
                    </div>
                    
                    <h3 className="font-serif text-lg font-bold text-neutral-900 group-hover:text-[#00a757] transition-colors leading-snug">
                      {proj.title}
                    </h3>
                    
                    <p className="text-xs text-neutral-600 leading-relaxed font-light min-h-[48px]">
                      {proj.description}
                    </p>

                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-900">
                      <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Operating Unit</span>
                      <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-[#00a757]">
                        Wemabod / SWAgCo <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

    </motion.div>
  );
}
