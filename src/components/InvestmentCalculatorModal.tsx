import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  X, 
  TrendingUp, 
  Building2, 
  CheckCircle2, 
  DollarSign, 
  Briefcase, 
  Download, 
  PieChart, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  Send,
  Sparkles
} from 'lucide-react';

interface InvestmentCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPartnerModal?: () => void;
}

const SECTORS = [
  { id: 'real_estate', name: 'Real Estate & Hospitality', defaultIrr: 18, jobMultiplier: 45, icon: Building2 },
  { id: 'agriculture', name: 'Agribusiness (SWAgCo)', defaultIrr: 22, jobMultiplier: 85, icon: Briefcase },
  { id: 'financial', name: 'Financial Services & Fintech', defaultIrr: 24, jobMultiplier: 25, icon: TrendingUp },
  { id: 'energy', name: 'Energy & Infrastructure', defaultIrr: 16, jobMultiplier: 60, icon: ShieldCheck },
  { id: 'tech', name: 'Digital Economy & Tech', defaultIrr: 28, jobMultiplier: 35, icon: Sparkles }
];

const STATES = [
  { name: 'Oyo State', capital: 'Ibadan', priority: 'Cocoa House Hub & Agribusiness Processing' },
  { name: 'Ogun State', capital: 'Abeokuta', priority: 'Industrial Manufacturing & SAPZ Corridor' },
  { name: 'Ondo State', capital: 'Akure', priority: 'Bitumen, Deep Seaport & Cocoa Regeneration' },
  { name: 'Osun State', capital: 'Osogbo', priority: 'Agro-Allied & Heritage Eco-Tourism' },
  { name: 'Ekiti State', capital: 'Ado-Ekiti', priority: 'Knowledge Zone & Smart Irrigation' },
  { name: 'Lagos State', capital: 'Ikeja', priority: 'Financial Center & High-Rise Commercial Assets' }
];

export default function InvestmentCalculatorModal({ isOpen, onClose, onOpenPartnerModal }: InvestmentCalculatorModalProps) {
  const [amountMillion, setAmountMillion] = useState<number>(500); // in NGN Millions (default 500M)
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [selectedSector, setSelectedSector] = useState<string>('agriculture');
  const [selectedState, setSelectedState] = useState<string>('Oyo State');
  const [jointVenturesShare, setJointVenturesShare] = useState<number>(60); // 60% partner, 40% Odu'a
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [proposalData, setProposalData] = useState({ name: '', email: '', phone: '', org: '' });

  const activeSectorObj = SECTORS.find(s => s.id === selectedSector) || SECTORS[0];

  // Calculations
  const totalCapitalNaira = amountMillion * 1_000_000;
  const partnerCapital = totalCapitalNaira * (jointVenturesShare / 100);
  const oduaEquity = totalCapitalNaira * ((100 - jointVenturesShare) / 100);

  // Projected Return after tenure
  const annualIrrDecimal = activeSectorObj.defaultIrr / 100;
  const projectedValue = totalCapitalNaira * Math.pow(1 + annualIrrDecimal, tenureYears);
  const netProfit = projectedValue - totalCapitalNaira;
  const projectedJobs = Math.round((amountMillion / 10) * (activeSectorObj.jobMultiplier / 10));

  const handleDownloadSummary = () => {
    const summaryText = `
ODU'A INVESTMENT COMPANY LIMITED
PROSPECTIVE INVESTMENT MODELING PROPOSAL
--------------------------------------------------
Date: ${new Date().toLocaleDateString()}
Target Sector: ${activeSectorObj.name}
Preferred Region: ${selectedState}

FINANCIAL BREAKDOWN:
- Proposed Total Project Capital: NGN ${amountMillion.toLocaleString()} Million
- Investor Joint-Venture Share (${jointVenturesShare}%): NGN ${(partnerCapital / 1_000_000).toLocaleString()} Million
- Odu'a Co-Equity/Land Grant (${100 - jointVenturesShare}%): NGN ${(oduaEquity / 1_000_000).toLocaleString()} Million
- Target Horizon: ${tenureYears} Years
- Estimated IRR: ${activeSectorObj.defaultIrr}% p.a.
- Projected Gross Value (Year ${tenureYears}): NGN ${(projectedValue / 1_000_000).toFixed(2)} Million
- Estimated Regional Jobs Created: ${projectedJobs.toLocaleString()} Direct/Indirect Jobs

Next Steps: Submit this modeling outline directly to Mr. Yemi Ajao (Group Chief Investment & Business Development Officer) via our official portal.
    `.trim();

    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Odua_Investment_Proposal_${selectedSector}_${selectedState.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-neutral-200 relative"
        >
          {/* HEADER */}
          <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-[#00a757] text-white p-6 sm:p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="inline-flex items-center gap-2 bg-[#fce303]/15 text-[#fce303] border border-[#fce303]/30 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>Investment & Yield Simulator</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Odu'a Co-Investment & Yield Calculator
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm font-light mt-1 max-w-2xl">
              Model Joint-Venture capital deployment, estimate Internal Rate of Return (IRR), and evaluate socio-economic impact across South-West Nigeria.
            </p>
          </div>

          {/* CONTENT GRID */}
          <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
            {!submitted ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* INPUT CONTROLS */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Sector Selection */}
                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-neutral-500 tracking-wider block mb-2">
                      1. Select Sector of Interest
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SECTORS.map((s) => {
                        const Icon = s.icon;
                        const isSelected = selectedSector === s.id;
                        return (
                          <button
                            key={s.id}
                            onClick={() => setSelectedSector(s.id)}
                            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                              isSelected
                                ? 'bg-[#00a757]/10 border-[#00a757] ring-2 ring-[#00a757]/30 text-[#00a757]'
                                : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${isSelected ? 'text-[#00a757]' : 'text-neutral-400'}`} />
                            <span className="text-xs font-bold leading-tight block">{s.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Target Shareholder State */}
                  <div>
                    <label className="text-xs font-mono font-bold uppercase text-neutral-500 tracking-wider block mb-2">
                      2. Target Shareholder State
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#00a757]"
                    >
                      {STATES.map((st) => (
                        <option key={st.name} value={st.name}>
                          {st.name} ({st.priority})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Investment Amount Slider */}
                  <div className="space-y-2 bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-mono font-bold uppercase text-neutral-600 tracking-wider">
                        Total Project Capital
                      </label>
                      <span className="font-serif text-lg font-bold text-[#00a757]">
                        ₦{amountMillion >= 1000 ? `${(amountMillion / 1000).toFixed(1)} Billion` : `${amountMillion} Million`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="10000"
                      step="100"
                      value={amountMillion}
                      onChange={(e) => setAmountMillion(Number(e.target.value))}
                      className="w-full accent-[#00a757] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                      <span>₦100 Million</span>
                      <span>₦5.0 Billion</span>
                      <span>₦10.0 Billion</span>
                    </div>
                  </div>

                  {/* Tenure & Equity Shares */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-mono font-bold uppercase text-neutral-600">Horizon</label>
                        <span className="font-bold text-neutral-900 text-sm">{tenureYears} Years</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="15"
                        step="1"
                        value={tenureYears}
                        onChange={(e) => setTenureYears(Number(e.target.value))}
                        className="w-full accent-[#00a757] cursor-pointer"
                      />
                    </div>

                    <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-mono font-bold uppercase text-neutral-600">Investor Share</label>
                        <span className="font-bold text-[#00a757] text-sm">{jointVenturesShare}% / {100 - jointVenturesShare}% Odu'a</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="90"
                        step="5"
                        value={jointVenturesShare}
                        onChange={(e) => setJointVenturesShare(Number(e.target.value))}
                        className="w-full accent-[#00a757] cursor-pointer"
                      />
                    </div>
                  </div>

                </div>

                {/* RESULTS SUMMARY SIDEBAR */}
                <div className="lg:col-span-5 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white p-6 rounded-3xl space-y-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00a757]/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-[#fce303]" />
                        <span>Projected Output</span>
                      </h3>
                      <span className="text-[10px] uppercase font-mono font-bold text-[#fce303] bg-[#fce303]/10 px-2 py-0.5 rounded border border-[#fce303]/30">
                        {activeSectorObj.defaultIrr}% IRR
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-neutral-400 block">Estimated Gross Value (Yr {tenureYears})</span>
                        <p className="text-2xl sm:text-3xl font-serif font-bold text-[#fce303] mt-0.5">
                          ₦{(projectedValue / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 1 })}M
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                        <div>
                          <span className="text-[10px] font-mono text-neutral-400 block">Investor Equity</span>
                          <span className="text-sm font-bold text-white">₦{(partnerCapital / 1_000_000).toLocaleString()}M</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-neutral-400 block">Odu'a Co-Equity</span>
                          <span className="text-sm font-bold text-[#00a757]">₦{(oduaEquity / 1_000_000).toLocaleString()}M</span>
                        </div>
                      </div>

                      <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3">
                        <Users className="w-6 h-6 text-[#00a757] shrink-0" />
                        <div>
                          <span className="text-[10px] font-mono text-neutral-300 uppercase block font-bold">Community Impact</span>
                          <p className="text-xs text-neutral-200 font-light">
                            Est. <strong className="text-white font-bold">{projectedJobs.toLocaleString()}</strong> regional jobs & supply chain opportunities in {selectedState}.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <button
                      onClick={handleDownloadSummary}
                      className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#fce303]" />
                      <span>Download Modeling Summary</span>
                    </button>

                    <form onSubmit={handleFormSubmit} className="space-y-2 pt-2">
                      <p className="text-[11px] text-neutral-300 font-light">Enter contact to forward proposal to Odu'a Directorate:</p>
                      <input
                        type="email"
                        required
                        placeholder="Business Email Address"
                        value={proposalData.email}
                        onChange={(e) => setProposalData({ ...proposalData, email: e.target.value })}
                        className="w-full bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#00a757]"
                      />
                      <button
                        type="submit"
                        className="w-full bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit Proposal to Investment Team</span>
                      </button>
                    </form>
                  </div>

                </div>

              </div>
            ) : (
              <div className="text-center py-12 space-y-4 max-w-lg mx-auto">
                <div className="w-16 h-16 bg-[#00a757]/10 text-[#00a757] rounded-full flex items-center justify-center mx-auto border border-[#00a757]/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900">Proposal Dispatched</h3>
                <p className="text-neutral-600 text-sm font-light leading-relaxed">
                  Thank you! Your investment modeling sheet for <strong className="text-neutral-900">{activeSectorObj.name}</strong> in <strong className="text-neutral-900">{selectedState}</strong> has been routed directly to Mr. Yemi Ajao and the Investment Directorate.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      onClose();
                    }}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl cursor-pointer"
                  >
                    Close Simulator
                  </button>
                </div>
              </div>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
