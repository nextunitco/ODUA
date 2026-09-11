import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Send,
  ExternalLink
} from 'lucide-react';
import WordPressPageHeader from '../components/WordPressPageHeader';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';

interface ContactProps {
  onNavigate?: (page: string) => void;
  generalSettings?: {
    siteName?: string;
    tagline?: string;
    phone?: string;
    email?: string;
    address?: string;
    assetValue?: string;
    keySectorsCount?: string;
  };
}

export default function Contact({ onNavigate = () => {}, generalSettings }: ContactProps) {
  const [form, setForm] = useState({
    fullName: '',
    emailAddress: '',
    subject: '',
    message: ''
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
        title="Contact & Secretariat Directory"
        subtitle="Reach out to our executive secretariat at Cocoa House, Dugbe, Ibadan for institutional inquiries, shareholder relations, and investment partnerships."
        badge="Secretariat Desk"
        breadcrumbs={[
          { label: 'Contact Us', active: true }
        ]}
        onNavigate={onNavigate}
        backgroundImage={HERO_BACKGROUNDS.contact}
      />

      {/* CORE CONTACT & DIRECTORIES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Office Addresses */}
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a757]/10 text-[10px] font-bold uppercase tracking-widest text-[#00a757]">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Physical Directories</span>
                </span>
                <h2 className="font-serif text-3xl font-bold text-neutral-900 tracking-tight">
                  Connect with Our Desk
                </h2>
                <p className="text-neutral-600 text-sm font-light leading-relaxed">
                  Our group administrative headquarters is housed inside West Africa's iconic Cocoa House tower, located in Ibadan, serving as the historic and economic nerve center of South West Nigeria.
                </p>
              </div>

              {/* HQ Card */}
              <div className="bg-[#f5f7f5] p-6 sm:p-8 rounded-3xl border border-neutral-200/70 space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-[#00a757] uppercase tracking-wider font-mono mb-3">Headquarters Location</h3>
                  <a 
                    href="https://maps.google.com/?q=Odu'a+Investment+Company+Limited,+Cocoa+House,+Ibadan,+Nigeria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 text-xs leading-relaxed text-neutral-700 hover:text-[#00a757] transition-colors group/address cursor-pointer"
                  >
                    <MapPin className="w-5 h-5 text-[#00a757] shrink-0 mt-0.5 group-hover/address:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="font-bold text-neutral-900 group-hover/address:text-[#00a757] transition-colors">Odu’a Investment Company Limited</p>
                      {generalSettings?.address ? (
                        <p>{generalSettings.address}</p>
                      ) : (
                        <>
                          <p>Floors 20-23, Cocoa House,</p>
                          <p>Oba Adebimpe Road,</p>
                          <p>P.M.B. 5435, Dugbe,</p>
                          <p className="flex items-center gap-1.5 flex-wrap">
                            <span>Ibadan, Oyo State, Nigeria.</span>
                          </p>
                        </>
                      )}
                      <span className="text-[10px] text-[#00a757] font-semibold underline opacity-0 group-hover/address:opacity-100 transition-opacity duration-300">
                        (View on Map ↗)
                      </span>
                    </div>
                  </a>
                </div>

                <div className="pt-5 border-t border-neutral-200/50 space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">Email Enquiry</span>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-neutral-400" />
                      <a href={`mailto:${generalSettings?.email || "info@oduainvestment.com.ng"}`} className="font-semibold text-neutral-800 hover:text-[#00a757] transition-colors">
                        {generalSettings?.email || "info@oduainvestment.com.ng"}
                      </a>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">Phone Lines</span>
                    <div className="flex gap-2">
                      <Phone className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                      <div className="font-semibold text-neutral-800 space-y-0.5">
                        {generalSettings?.phone ? (
                          generalSettings.phone.split(/[\n,;]+/).map((ph: string, i: number) => {
                            const trimmed = ph.trim();
                            if (!trimmed) return null;
                            return <p key={i}>{trimmed}</p>;
                          })
                        ) : (
                          <>
                            <p>+234 815 145 9359</p>
                            <p>+234 905 464 4944</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Network Links */}
                <div className="pt-5 border-t border-neutral-200/50">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-2">Follow Us on Social Media</span>
                  <div className="flex gap-3">
                    <a 
                      href="https://facebook.com/oduainvestmentcompany" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-[#00a757] hover:text-white hover:border-[#00a757] transition-all animate-none"
                      title="Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a 
                      href="https://twitter.com/oduainvestments" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-[#00a757] hover:text-white hover:border-[#00a757] transition-all animate-none"
                      title="Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a 
                      href="https://www.instagram.com/odua_group/channel" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-[#00a757] hover:text-white hover:border-[#00a757] transition-all animate-none"
                      title="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a 
                      href="mailto:info@oduainvestment.com.ng" 
                      className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-[#00a757] hover:text-white hover:border-[#00a757] transition-all animate-none"
                      title="Email Direct"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: General Enquiry Form */}
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
              className="lg:col-span-7 bg-[#fcfdfc] border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00a757]/5 rounded-bl-full" />
              
              <div className="space-y-2 mb-6">
                <h3 className="text-base font-bold text-neutral-900 uppercase tracking-wider">Leave us your info</h3>
                <p className="text-xs text-neutral-500 font-light">
                  and we will get back to you as soon as possible.
                </p>
              </div>

              {submitted ? (
                <div className="bg-[#00a757]/10 border border-[#00a757]/30 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-[#00a757] text-[#fce303] rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-neutral-900">Message Transmitted Successfully</h4>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto font-light leading-relaxed">
                    Thank you. Your message has been safely logged with our administrative team. A desk officer will review your enquiry and respond shortly.
                  </p>
                  <p className="text-[10px] text-neutral-400 font-mono">Dispatched: {new Date().toLocaleDateString()}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1 font-mono">Your Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={form.fullName}
                      onChange={(e) => setForm({...form, fullName: e.target.value})}
                      placeholder="e.g. Chief Adeleke Johnson" 
                      className="w-full p-3.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#00a757] focus:outline-none bg-white" 
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1 font-mono">Your Email *</label>
                    <input 
                      type="email" 
                      required 
                      value={form.emailAddress}
                      onChange={(e) => setForm({...form, emailAddress: e.target.value})}
                      placeholder="e.g. a.johnson@example.com" 
                      className="w-full p-3.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#00a757] focus:outline-none bg-white" 
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1 font-mono">Subject</label>
                    <input 
                      type="text" 
                      value={form.subject}
                      onChange={(e) => setForm({...form, subject: e.target.value})}
                      placeholder="e.g. Strategic Investment Opportunity" 
                      className="w-full p-3.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#00a757] focus:outline-none bg-white" 
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1 font-mono">Your Message *</label>
                    <textarea 
                      rows={5} 
                      required
                      value={form.message}
                      onChange={(e) => setForm({...form, message: e.target.value})}
                      placeholder="Specify your detailed inquiry or proposal details here..." 
                      className="w-full p-3.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#00a757] focus:outline-none bg-white"
                    />
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input type="checkbox" required id="agree" className="mt-1 w-4 h-4 text-[#00a757] rounded" />
                    <label htmlFor="agree" className="text-[11px] text-neutral-500 leading-snug font-light">
                      I agree that my submitted data is subject to Odu’a privacy guidelines and administrative protocols.
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4 mt-2 rounded-xl bg-[#00a757] hover:bg-neutral-900 text-white font-bold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer select-none text-xs"
                  >
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4 text-[#fce303]" />
                  </button>

                </form>
              )}

            </motion.div>

          </div>

          {/* INTERACTIVE HEADQUARTERS MAP */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
            className="mt-16 bg-white rounded-3xl border border-neutral-200/90 shadow-lg p-6 sm:p-10 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a757]/10 text-[10px] font-bold uppercase tracking-widest text-[#00a757]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Headquarters Map & Location</span>
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                  Locate Our Desk at Cocoa House, Dugbe
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-light">
                  {generalSettings?.address || "Floors 20-23, Cocoa House, Oba Adebimpe Road, Dugbe, Ibadan, Oyo State, Nigeria"}
                </p>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Cocoa+House,+Dugbe,+Ibadan,+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-900 hover:bg-[#00a757] text-white text-xs font-bold transition-all shadow-md shrink-0 hover:scale-105 cursor-pointer"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Google Maps Embed iframe */}
            <div className="w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden border border-neutral-200 shadow-inner bg-neutral-100 relative">
              <iframe
                title="Odu'a Investment Company Headquarters - Cocoa House"
                src="https://maps.google.com/maps?q=Cocoa+House,+Oba+Adebimpe+Road,+Dugbe,+Ibadan,+Nigeria&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-[1.02]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
              <div className="p-4 rounded-2xl bg-[#f5f7f5] border border-neutral-200/60">
                <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider block mb-1">Monument Landmark</span>
                <p className="font-bold text-neutral-800">Cocoa House (Floors 20-23)</p>
                <p className="text-[11px] text-neutral-500">Pioneer commercial high-rise in Sub-Saharan Africa</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#f5f7f5] border border-neutral-200/60">
                <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider block mb-1">Commercial Zone</span>
                <p className="font-bold text-neutral-800">Dugbe Central Business District</p>
                <p className="text-[11px] text-neutral-500">Ibadan financial and trade district</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#f5f7f5] border border-neutral-200/60">
                <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider block mb-1">Geographic Coordinates</span>
                <p className="font-bold text-neutral-800">7.3872° N, 3.8824° E</p>
                <p className="text-[11px] text-neutral-500">Southwest Nigeria Sovereign Hub</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

    </motion.div>
  );
}
