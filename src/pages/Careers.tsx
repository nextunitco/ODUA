import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  CheckCircle2, 
  Send, 
  ArrowRight, 
  Briefcase, 
  MapPin, 
  GraduationCap
} from 'lucide-react';
import WordPressPageHeader from '../components/WordPressPageHeader';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';

interface CareersProps {
  careers?: any[];
  onNavigate?: (page: string) => void;
}

export default function Careers({ careers, onNavigate = () => {} }: CareersProps) {
  const [careerForm, setCareerForm] = useState({
    fullName: '',
    emailAddress: '',
    discipline: 'Real Estate & Facility Engineering',
    experienceYears: '3-5 Years',
    coverNote: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
        title="Careers & Executive Talent Network"
        subtitle="Nurturing premier Southwest talent and global professionals. Discover rewarding career opportunities across our subsidiaries and holding company."
        badge="Join The Legacy"
        breadcrumbs={[
          { label: 'Careers', active: true }
        ]}
        onNavigate={onNavigate}
        backgroundImage={HERO_BACKGROUNDS.careers}
      />

      {/* RECRUITMENT PHILOSOPHY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Philosophy text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a757]/10 text-[10px] font-bold uppercase tracking-widest text-[#00a757]">
                <Users className="w-4 h-4" />
                <span>Our Talent Philosophy</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight leading-tight">
                Nurturing Southwest Talent & Global Pioneers
              </h2>
              <p className="text-neutral-700 text-sm font-light leading-relaxed">
                We recruit high-performing professionals and support rural farming outgrowers. Whether your background is in high-yield real estate architecture, agricultural agronomy, or digital venture capital, Odu’a offers secure pipelines to build institutional heritage.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-neutral-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#00a757]" />
                  <span>Executive Placement Opportunities</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#00a757]" />
                  <span>SWAgCo Outgrower Internships</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#00a757]" />
                  <span>Digital Tech Sandbox Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#00a757]" />
                  <span>Wemabod Facility Management Roles</span>
                </div>
              </div>
            </div>

            {/* Expression of Interest Form */}
            <div className="lg:col-span-6 bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-neutral-200/70 shadow-lg">
              <div className="space-y-2 mb-6">
                <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-widest font-mono">Active Inquiries</h3>
                <p className="text-xs text-neutral-500 font-light">
                  Are you looking to join our recruitment pool? Submit an expression of interest below to receive early notifications on open vacancies.
                </p>
              </div>

              {submitted ? (
                <div className="bg-[#00a757]/10 border border-[#00a757]/40 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-[#00a757] text-[#fce303] rounded-full flex items-center justify-center mx-auto shadow">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-neutral-900">Application Submitted</h4>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto font-light leading-relaxed">
                    Thank you. Your expression of interest has been loaded into our active talent pool database. Our HR secretariat team will contact you once a vacancy matching your profile is opened.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1 font-mono">Your Discipline</label>
                    <select 
                      value={careerForm.discipline}
                      onChange={(e) => setCareerForm({...careerForm, discipline: e.target.value})}
                      className="w-full p-3.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#00a757] focus:outline-none bg-white text-neutral-800 font-medium"
                    >
                      <option>Real Estate & Facility Engineering</option>
                      <option>Agronomy & Supply Chain Logistics</option>
                      <option>Fintech Investment Analysis</option>
                      <option>Legal Advisory & Corporate Governance</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1 font-mono">Your Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={careerForm.fullName}
                        onChange={(e) => setCareerForm({...careerForm, fullName: e.target.value})}
                        placeholder="Afolabi Johnson" 
                        className="w-full p-3.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#00a757] focus:outline-none bg-white" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1 font-mono">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={careerForm.emailAddress}
                        onChange={(e) => setCareerForm({...careerForm, emailAddress: e.target.value})}
                        placeholder="afolabi@domain.com" 
                        className="w-full p-3.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#00a757] focus:outline-none bg-white" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1 font-mono">Years of Relevant Experience</label>
                    <select
                      value={careerForm.experienceYears}
                      onChange={(e) => setCareerForm({...careerForm, experienceYears: e.target.value})}
                      className="w-full p-3.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#00a757] focus:outline-none bg-white text-neutral-800 font-medium"
                    >
                      <option>Entry Level (0-2 Years)</option>
                      <option>Mid-Senior (3-5 Years)</option>
                      <option>Senior Executive (6+ Years)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1 font-mono">Short Statement of Value (Optional)</label>
                    <textarea
                      rows={3}
                      value={careerForm.coverNote}
                      onChange={(e) => setCareerForm({...careerForm, coverNote: e.target.value})}
                      placeholder="Tell us briefly how your experience aligns with Southwest legacy growth..."
                      className="w-full p-3.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#00a757] focus:outline-none bg-white"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3.5 rounded-xl bg-[#00a757] text-white font-bold uppercase tracking-wider hover:bg-neutral-900 transition-colors cursor-pointer text-center select-none"
                  >
                    Submit Expression of Interest
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* VACANCIES DIRECTORY */}
      <section className="py-16 bg-[#fcfdfc] border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12">
            <span className="text-[#00a757] text-xs font-bold uppercase tracking-widest font-mono">Current Openings</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">Subsidiary Job Directory</h2>
            <p className="text-neutral-600 text-xs sm:text-sm font-light max-w-xl">
              We periodically launch competitive open vacancies across our primary operating portfolios. Explore typical active vacancies below:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(careers && careers.length > 0 ? careers : [
              {
                title: "Portfolio Asset Manager",
                division: "Wemabod Limited",
                location: "Ikoyi, Lagos State",
                type: "Full-Time",
                desc: "Responsible for commercial lease negotiations, tenant management protocols, and quarterly yield optimization calculations for high-rise assets."
              },
              {
                title: "Cassava Aggregation Lead",
                division: "SWAgCo Agriculture",
                location: "Owo, Ondo State",
                type: "Contract / Full-Time",
                desc: "Coordinates local smallholder farmer associations, seeds distribution hubs, and starch milling logistics."
              },
              {
                title: "Fintech Venture Analyst",
                division: "Odu'a Group Headquarters",
                location: "Dugbe, Ibadan (Oyo)",
                type: "Full-Time",
                desc: "Drives valuation audits, pitch desk reviews, and milestone monitoring for university startup sandbox allocations."
              },
              {
                title: "Legal Advisory Lead",
                division: "Odu'a Group Headquarters",
                location: "Dugbe, Ibadan (Oyo)",
                type: "Full-Time",
                desc: "Reviews state cabinet covenants, sovereign guarantee disclosures, and joint-venture corporate board contracts."
              }
            ]).map((job, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/70 shadow-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-neutral-900">{job.title}</h4>
                      <p className="text-xs text-[#00a757] font-semibold mt-0.5">{job.division}</p>
                    </div>
                    <span className="bg-neutral-100 text-neutral-800 text-[9px] uppercase tracking-widest font-black px-2.5 py-1 rounded">
                      {job.type || 'Full-Time'}
                    </span>
                  </div>
                  
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    {job.desc || job.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100 flex justify-between items-center text-xs">
                  <span className="text-neutral-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00a757]" /> {job.location}
                  </span>
                  <button 
                    onClick={() => {
                      setCareerForm({
                        ...careerForm,
                        discipline: job.title.includes('Real Estate') ? 'Real Estate & Facility Engineering' : (job.title.includes('Cassava') ? 'Agronomy & Supply Chain Logistics' : 'Fintech Investment Analysis')
                      });
                      // Scroll to form smoothly
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="text-[#00a757] font-bold hover:underline"
                  >
                    Apply Via Pool
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </motion.div>
  );
}
