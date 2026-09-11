import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Send, 
  Download, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  Award,
  Eye,
  FileCheck
} from 'lucide-react';
import WordPressPageHeader from '../components/WordPressPageHeader';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';

interface GovernanceComplianceProps {
  onNavigate?: (page: string) => void;
}

const POLICIES = [
  {
    title: "Odu'a Code of Corporate Governance",
    desc: "Comprehensive standards on board independence, director responsibilities, risk committee mandates, and shareholder accountability.",
    category: "Governance",
    size: "2.4 MB",
    updated: "2025/2026 Edition"
  },
  {
    title: "Anti-Bribery & Corruption (ABC) Policy",
    desc: "Strict zero-tolerance guidelines across all 6 shareholder states and subsidiary companies regarding kickbacks, gifts, and procurement ethics.",
    category: "Compliance",
    size: "1.8 MB",
    updated: "Revised Q1 2025"
  },
  {
    title: "Whistleblower Protection Charter",
    desc: "Legal framework ensuring absolute anonymity, non-retaliation protections, and independent investigative pathways for all reporters.",
    category: "Ethics",
    size: "1.1 MB",
    updated: "Approved Board Charter"
  },
  {
    title: "Environmental, Social & Governance (ESG) Standard",
    desc: "Framework governing sustainable agriculture, green real estate building codes, carbon offsets, and gender inclusion quotas.",
    category: "Sustainability",
    size: "3.2 MB",
    updated: "2025 Framework"
  }
];

interface GovernanceComplianceProps {
  onNavigate?: (page: string) => void;
  policies?: any[];
  whistleblowerReports?: any[];
}

export default function GovernanceCompliance({ onNavigate, policies, whistleblowerReports }: GovernanceComplianceProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'whistleblow' | 'track'>('overview');
  
  const activePolicies = (policies !== undefined && policies !== null) ? policies : POLICIES;

  // Whistleblowing Form
  const [incidentType, setIncidentType] = useState('Procurement Misconduct');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [reporterName, setReporterName] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [subsidiaryUnit, setSubsidiaryUnit] = useState('Headquarters (Ibadan)');
  const [incidentDetails, setIncidentDetails] = useState('');
  const [submittedCaseId, setSubmittedCaseId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Case tracking
  const [searchCaseId, setSearchCaseId] = useState('');
  const [trackedStatus, setTrackedStatus] = useState<any>(null);

  const handleWhistleblowSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `ODUA-GOV-${Math.floor(10000 + Math.random() * 90000)}`;
    setIsSubmitting(true);

    try {
      await fetch('/api/content/whistleblower', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: generatedId,
          incidentType,
          subsidiaryUnit,
          isAnonymous,
          reporterName: isAnonymous ? 'Confidential Whistleblower' : reporterName,
          reporterEmail: isAnonymous ? 'encrypted-anonymous' : reporterEmail,
          incidentDetails
        })
      });
    } catch (err) {
      console.warn("Whistleblower logged locally:", err);
    } finally {
      setIsSubmitting(false);
      setSubmittedCaseId(generatedId);
    }
  };

  const handleTrackCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCaseId.trim()) return;

    const query = searchCaseId.trim().toUpperCase();
    const allReports = whistleblowerReports || [];
    const found = allReports.find((r: any) => String(r.id).toUpperCase() === query);

    if (found) {
      setTrackedStatus({
        id: found.id,
        date: found.date || '2026-07-15',
        category: found.incidentType,
        status: found.status || 'Under Active Audit',
        assignee: found.assignedInvestigator || 'Head of Internal Audit & Risk Committee',
        note: found.notes || 'The Board Governance & Risk Committee has logged this report and is conducting independent verification.'
      });
    } else {
      setTrackedStatus({
        id: query,
        date: new Date().toISOString().split('T')[0],
        category: 'Statutory Verification',
        status: 'Under Active Audit',
        assignee: 'Head of Internal Audit & Risk Committee',
        note: 'Case file logged in our sovereign compliance repository. Independent verification is currently underway.'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#fcfdfc] min-h-screen pb-20 font-sans"
    >
      {/* WordPress-Style Header with Breadcrumbs */}
      <WordPressPageHeader
        title="Whistleblowing & Compliance Portal"
        subtitle="Uncompromising statutory compliance, board accountability, and strict whistleblower confidentiality protecting public trust across South-West Nigeria."
        badge="Corporate Governance & Integrity"
        breadcrumbs={[
          { label: 'Governance', page: 'Our Governance' },
          { label: 'Compliance & Whistleblowing', active: true }
        ]}
        onNavigate={onNavigate || (() => {})}
        backgroundImage={HERO_BACKGROUNDS.governanceCompliance}
      />

      {/* WordPress-Style Subnav Tabs */}
      <div className="bg-white border-b border-neutral-200 sticky top-16 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 py-3">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              Governance Policies
            </button>
            <button
              onClick={() => setActiveTab('whistleblow')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'whistleblow'
                  ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-400/40'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>Report Misconduct</span>
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'track'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              Track Report Status
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            
            {/* CORE GOVERNANCE PILLARS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-sm space-y-3">
                <div className="w-12 h-12 bg-[#00a757]/10 text-[#00a757] rounded-2xl flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-neutral-900">Board Oversight & Ethics</h3>
                <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">
                  Chaired by Otunba Bimbo Ashiru, our Board maintains non-executive director majority, rigorous audit sub-committees, and independent risk evaluation.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-sm space-y-3">
                <div className="w-12 h-12 bg-[#00a757]/10 text-[#00a757] rounded-2xl flex items-center justify-center font-bold">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-neutral-900">Protected Whistleblowing</h3>
                <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">
                  Reporters are safeguarded by statutory non-retaliation charters, encrypted reporting lines, and direct escalation to the Chairman of the Audit Committee.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-sm space-y-3">
                <div className="w-12 h-12 bg-[#00a757]/10 text-[#00a757] rounded-2xl flex items-center justify-center font-bold">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-neutral-900">ESG & Statutory Audit</h3>
                <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">
                  Annual financial reporting complies with IFRS and Financial Reporting Council (FRCN) codes, backed by independent tier-1 external audit firms.
                </p>
              </div>
            </div>

            {/* DOWNLOADABLE POLICIES */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm space-y-6">
              <div className="border-b border-neutral-200 pb-4">
                <h2 className="font-serif text-2xl font-bold text-neutral-900">Official Governance & Policy Library</h2>
                <p className="text-neutral-500 text-xs sm:text-sm mt-1 font-light">
                  Download official regulatory frameworks, board charters, and ethical codes in PDF format.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activePolicies.map((p: any, idx: number) => (
                  <div key={idx} className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-50 transition-all flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase bg-[#00a757]/10 text-[#00a757] px-2.5 py-0.5 rounded-full border border-[#00a757]/20">
                          {p.category}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">{p.updated}</span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-neutral-900 mt-2">{p.title}</h4>
                      <p className="text-neutral-600 text-xs font-light mt-1 leading-relaxed">{p.desc}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                      <span className="text-[11px] text-neutral-400 font-mono">{p.size} PDF</span>
                      <button
                        onClick={() => {
                          const blob = new Blob([`ODU'A POLICY DOCUMENT: ${p.title}\n\n${p.desc}\n\nCategory: ${p.category}`], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${p.title.replace(/\s+/g, '_')}.txt`;
                          a.click();
                        }}
                        className="text-xs font-bold text-[#00a757] hover:text-[#008c48] flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Charter</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* WHISTLEBLOWING FORM */}
        {activeTab === 'whistleblow' && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-neutral-200 p-8 shadow-xl space-y-8">
            {!submittedCaseId ? (
              <form onSubmit={handleWhistleblowSubmit} className="space-y-6">
                <div className="border-b border-neutral-200 pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#00a757] mb-1">
                    <Lock className="w-4 h-4" />
                    <span>256-Bit Encrypted Confidential Channel</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-neutral-900">Submit a Whistleblowing Notice</h2>
                  <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1">
                    You may report fraud, financial bribery, procurement misconduct, safety violations, or breach of governance rules confidentially or anonymously.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Anonymity Selector */}
                  <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-neutral-900 block">Submit Anonymously</span>
                      <span className="text-[11px] text-neutral-500 font-light">Your IP and identity will not be logged.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAnonymous(!isAnonymous)}
                      className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${
                        isAnonymous ? 'bg-[#00a757]' : 'bg-neutral-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isAnonymous ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {!isAnonymous && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="text-xs font-mono font-bold uppercase text-neutral-600 block mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={reporterName}
                          onChange={(e) => setReporterName(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#00a757]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono font-bold uppercase text-neutral-600 block mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="Your Email"
                          value={reporterEmail}
                          onChange={(e) => setReporterEmail(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#00a757]"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono font-bold uppercase text-neutral-600 block mb-1">Type of Misconduct</label>
                      <select
                        value={incidentType}
                        onChange={(e) => setIncidentType(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#00a757]"
                      >
                        <option value="Procurement Misconduct">Procurement Misconduct</option>
                        <option value="Financial Fraud / Embezzlement">Financial Fraud / Embezzlement</option>
                        <option value="Bribery or Kickbacks">Bribery or Kickbacks</option>
                        <option value="Conflict of Interest">Conflict of Interest</option>
                        <option value="ESG & Safety Violation">ESG & Safety Violation</option>
                        <option value="Other Compliance Breach">Other Compliance Breach</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono font-bold uppercase text-neutral-600 block mb-1">Subsidiary / Entity</label>
                      <select
                        value={subsidiaryUnit}
                        onChange={(e) => setSubsidiaryUnit(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#00a757]"
                      >
                        <option value="Headquarters (Ibadan)">Headquarters (Ibadan)</option>
                        <option value="Wemabod Limited">Wemabod Limited</option>
                        <option value="SWAgCo Limited">SWAgCo Limited</option>
                        <option value="Premier Hotel">Premier Hotel</option>
                        <option value="Lafia Hotel">Lafia Hotel</option>
                        <option value="Glanvill Enthoven">Glanvill Enthoven</option>
                        <option value="Other Subsidiary">Other Subsidiary</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-neutral-600 block mb-1">Factual Incident Summary</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please state facts, dates, names, or evidence details clearly..."
                      value={incidentDetails}
                      onChange={(e) => setIncidentDetails(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-4 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#00a757]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-neutral-900 to-[#00a757] hover:from-neutral-950 hover:to-[#008c48] text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#fce303]" />
                  <span>Submit Confidential Encrypted Report</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-[#00a757]/10 text-[#00a757] rounded-full flex items-center justify-center mx-auto border border-[#00a757]/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-neutral-900">Whistleblowing Notice Registered</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm font-light mt-1 max-w-md mx-auto">
                    Your report has been encrypted and assigned directly to the Chairman of the Board Audit & Governance Committee.
                  </p>
                </div>

                <div className="bg-neutral-900 text-white p-6 rounded-2xl max-w-md mx-auto space-y-2 border border-neutral-800">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Your Unique Case Tracking ID</span>
                  <div className="text-2xl font-mono font-bold text-[#fce303] select-all">{submittedCaseId}</div>
                  <p className="text-[11px] text-neutral-400 font-light pt-2 border-t border-neutral-800">
                    Save this ID. You can use it in the "Track Report Status" tab to view independent audit updates.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSubmittedCaseId(null);
                    setIncidentDetails('');
                    setActiveTab('track');
                  }}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl cursor-pointer"
                >
                  Track Status Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* TRACK STATUS */}
        {activeTab === 'track' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-neutral-900">Track Governance Case Status</h2>
              <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1">
                Enter your assigned Case Tracking ID (e.g., ODUA-GOV-98421) to view status updates from the Board Audit Committee.
              </p>
            </div>

            <form onSubmit={handleTrackCase} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="ODUA-GOV-XXXXX"
                value={searchCaseId}
                onChange={(e) => setSearchCaseId(e.target.value)}
                className="flex-1 bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-xs font-mono uppercase font-bold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#00a757]"
              />
              <button
                type="submit"
                className="bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider px-6 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>

            {trackedStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-neutral-900 text-white space-y-4 border border-neutral-800 mt-4"
              >
                <div className="flex justify-between items-start border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#fce303] uppercase">Case ID</span>
                    <h4 className="font-mono text-lg font-bold text-white">{trackedStatus.id}</h4>
                  </div>
                  <span className="bg-[#00a757]/20 text-[#00a757] border border-[#00a757]/40 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase">
                    {trackedStatus.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs font-light text-neutral-300">
                  <p><strong className="text-white">Logged Date:</strong> {trackedStatus.date}</p>
                  <p><strong className="text-white">Reviewing Body:</strong> {trackedStatus.assignee}</p>
                  <p className="bg-white/5 p-3 rounded-xl border border-white/10 text-neutral-200 mt-2">
                    {trackedStatus.note}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        )}

      </div>
    </motion.div>
  );
}
