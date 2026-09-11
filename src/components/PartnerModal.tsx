import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: {
    fullName: string;
    emailAddress: string;
    organization: string;
    sectorOfInterest: string;
    message: string;
  };
  setForm: React.Dispatch<React.SetStateAction<{
    fullName: string;
    emailAddress: string;
    organization: string;
    sectorOfInterest: string;
    message: string;
  }>>;
  submitted: boolean;
}

export default function PartnerModal({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
  submitted
}: PartnerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 max-w-lg w-full text-left relative animate-scaleUp">
        
        <div className="bg-[#00a757] text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-1 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#fce303]">Institutional Gate</span>
          <h3 className="font-serif text-xl font-bold mt-1">Partnership & Joint-Venture Proposal</h3>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-[#00a757] text-[#fce303] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg font-bold">Proposal Lodged Successfully</h4>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                An officer representing Odu’a Group's portfolio desks will reach out to schedule an executive brief.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={form.fullName}
                  onChange={(e) => setForm({...form, fullName: e.target.value})}
                  placeholder="Chief Executive Officer" 
                  className="w-full p-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#00a757] focus:outline-none" 
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Corporate Email</label>
                <input 
                  type="email" 
                  required 
                  value={form.emailAddress}
                  onChange={(e) => setForm({...form, emailAddress: e.target.value})}
                  placeholder="executive@firm.com" 
                  className="w-full p-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#00a757] focus:outline-none" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Interested Sector</label>
                <select 
                  value={form.sectorOfInterest}
                  onChange={(e) => setForm({...form, sectorOfInterest: e.target.value})}
                  className="w-full p-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#00a757] focus:outline-none bg-white text-neutral-700 font-semibold"
                >
                  <option>Real Estate & Hospitality</option>
                  <option>Agriculture & Agro-Allied</option>
                  <option>Financial Services & Innovation</option>
                  <option>Direct Infrastructure Investment</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Value Proposition Outline</label>
                <textarea 
                  rows={3} 
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  placeholder="Outline your project scope, capital size, and target state location..." 
                  className="w-full p-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#00a757] focus:outline-none" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 rounded-xl bg-[#00a757] hover:bg-neutral-900 text-white font-bold uppercase tracking-wider transition-colors cursor-pointer select-none text-center"
              >
                Submit Prospectus Request
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
