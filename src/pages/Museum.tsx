import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  MapPin,
  Clock,
  Phone,
  Calendar,
  Users,
  Award,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  CheckCircle2,
  ArrowRight,
  Shield,
  Sparkles,
  Info,
  Building2,
  ExternalLink,
  Layers,
  Landmark,
  Share2
} from 'lucide-react';
import WordPressPageHeader from '../components/WordPressPageHeader';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';

export interface MuseumPhoto {
  id: number;
  url: string;
  title: string;
  category: 'gallery-overview' | 'warfare-treaty' | 'vintage-tech' | 'sound-archives' | 'hall-of-fame' | 'guided-tours' | 'royal-regalia';
  categoryLabel: string;
  locationInMuseum: string;
  era: string;
  caption: string;
  curatorNote: string;
  highlights: string[];
}

// Complete registry of all 8 authentic Odu'a Museum & Hall of Fame photographs with curated documentary descriptions
export const MUSEUM_PHOTOS: MuseumPhoto[] = [
  {
    id: 1,
    url: 'https://i.postimg.cc/wvbwK8k4/Whats-App-Image-2026-09-10-at-09-18-44.jpg',
    title: 'Grand Entrance Gallery & Cultural Antiquities Corridor',
    category: 'gallery-overview',
    categoryLabel: 'Main Gallery',
    locationInMuseum: 'Cocoa House 24th Floor — Central Exhibition Hall',
    era: 'Contemporary Heritage Architecture',
    caption: 'A wide-angle view of the main exhibition gallery featuring wooden floorboards, a woven bamboo ceiling, wall-mounted historical panels, angled display counters, and a central gourd art sculpture standing in the middle of the hall.',
    curatorNote: 'This main hall welcomes visitors with an organic architectural ambiance combining warm hardwood flooring and handcrafted bamboo ceiling lattices. Surrounding angled reading counters and wall panels guide visitors through the historical arc of Yoruba civilization around a magnificent central gourd art monument.',
    highlights: [
      'Artisanal bamboo ceiling lattice and polished wooden floorboards',
      'Monumental carved central gourd art sculpture',
      'Wall-mounted historical documentary panels & angled display counters',
      'Spacious chronological layout on Cocoa House 24th floor'
    ]
  },
  {
    id: 2,
    url: 'https://i.postimg.cc/Y9ydcKxs/Whats-App-Image-2026-09-10-at-09-18-47.jpg',
    title: 'Warfare Implements & The 1886 Kiriji Peace Treaty',
    category: 'warfare-treaty',
    categoryLabel: 'Warfare & Treaty',
    locationInMuseum: 'Cocoa House 24th Floor — Conflict Resolution & Treaty Wing',
    era: '19th Century (Kiriji/Ekiti-Parapo Era, 1877–1886)',
    caption: 'A two-tiered display casing highlighting the Yoruba Peace Treaty (1886) with historical records and artifacts on top, and 19th-century warfare implements including flintlock rifles and iron blades below.',
    curatorNote: 'The top tier documents the landmark 1886 Peace Treaty that brought an end to the 16-year Kiriji War through indigenous and British diplomatic arbitration, while the lower tier houses authentic 19th-century blacksmith-forged flintlock rifles, combat swords, and iron blades.',
    highlights: [
      'Top section: Official historical records on the 1886 Yoruba Peace Treaty',
      'Bottom section: "Warfare Implements" showcase case',
      'Authentic 19th-century flintlock muzzle-loading rifles',
      'Hand-forged iron combat blades and scabbards'
    ]
  },
  {
    id: 3,
    url: 'https://i.postimg.cc/Y9ydcKxn/Whats-App-Image-2026-09-10-at-09-18-48.jpg',
    title: 'Memories of the Past (Ohun Elo Igbà Atijó)',
    category: 'vintage-tech',
    categoryLabel: 'Vintage Technology',
    locationInMuseum: 'Cocoa House 24th Floor — Indigenous Technology & Domestic Heritage',
    era: 'Late 19th Century to Mid-20th Century',
    caption: 'A three-level recessed wall exhibit displaying vintage household technologies and communication devices, including an old television, typewriter, portable gramophone, rotary phones, and mechanical sewing machines.',
    curatorNote: 'This popular retrospective installation tracks the transition of Yoruba society into modern technology. The three illuminated shelves preserve early mechanical inventions that transformed commerce, documentation, communication, and home tailoring throughout the region.',
    highlights: [
      'Recessed three-level installation: "Ohun Elo Igbà Atijó"',
      'Early vacuum-tube / cathode television receiver and manual typewriter',
      'Antique rotary phones and desktop communication tools',
      'Vintage portable gramophone and cast-iron mechanical sewing machines'
    ]
  },
  {
    id: 4,
    url: 'https://i.postimg.cc/tTmB0Qzc/Whats-App-Image-2026-09-10-at-09-18-50.jpg',
    title: 'Sound Artifacts: Antique Gramophone',
    category: 'sound-archives',
    categoryLabel: 'Sound & Acoustic Archives',
    locationInMuseum: 'Cocoa House 24th Floor — Performing Arts & Audio Heritage',
    era: 'Early to Mid-20th Century (Shellac & Vinyl Era)',
    caption: 'A close-up view of an opened vintage portable hand-crank gramophone with a vinyl record set on the turntable platter and a clear plastic sign reading "GRAMOPHONE" in the foreground.',
    curatorNote: 'An intimate view of an authentic portable wind-up gramophone. This acoustic marvel enabled early Yoruba highlife, juju, and traditional oratory to be recorded on 78 RPM shellac and vinyl discs, playing a transformative role in regional music distribution.',
    highlights: [
      'Opened vintage portable hand-crank gramophone casing',
      'Turntable platter with authentic period vinyl record',
      'Hand-crank spring motor winding mechanism',
      'Clear plastic sign reading "GRAMOPHONE" in the foreground'
    ]
  },
  {
    id: 5,
    url: 'https://i.postimg.cc/QtnfLGqv/Whats-App-Image-2026-09-10-at-09-18-52.jpg',
    title: 'The Hall of Fame: Honoring Omoluabi Pioneers',
    category: 'hall-of-fame',
    categoryLabel: 'Hall of Fame',
    locationInMuseum: 'Cocoa House 24th Floor — Hall of Fame Exploratory Room',
    era: 'Modern Nigerian Political & Socioeconomic History',
    caption: 'A rear perspective of a visitor viewing wall-mounted biographical panels and photographic portraits of prominent figures, including Chief Moshood Kashimawo Olawale Abiola and Chief Obafemi Awolowo.',
    curatorNote: 'Visitors reflect before the monumental citations of two towering Western Nigerian figures: Premier Obafemi Awolowo, architect of free education and builder of Cocoa House, and Bashorun M.K.O. Abiola, international business titan and martyr of democratic governance.',
    highlights: [
      'Biographical wall panels for Chief Obafemi Awolowo and Chief M.K.O. Abiola',
      'Archival photographic portraits and pioneering leadership citations',
      'Rear perspective of visitor engaging with regional history',
      'Omoluabi leadership philosophy on full display'
    ]
  },
  {
    id: 6,
    url: 'https://i.postimg.cc/C16cyTNy/Whats-App-Image-2026-09-10-at-09-18-54.jpg',
    title: 'Educational Guided Tours & History Talks',
    category: 'guided-tours',
    categoryLabel: 'Guided Tours',
    locationInMuseum: 'Cocoa House 24th Floor — Institutional Heritage Corridor',
    era: 'Post-WWII / 1950s Medical & Institutional Foundations',
    caption: 'A museum tour guide gesturing toward a wall panel titled "University College Hospital, Ibadan" while speaking to a group of visitors listening inside the gallery.',
    curatorNote: 'Museum docents dressed in cultural attire lead school pupils, university scholars, and international dignitaries on immersive walkthroughs. Here, the guide details how the University College Hospital (UCH) Ibadan was established in 1952 as West Africa\'s premier teaching hospital.',
    highlights: [
      'Museum tour guide gesturing toward historical wall panels',
      'University College Hospital (UCH), Ibadan institutional history panel',
      'Interactive educational guided tours and history talks',
      'Group of visitors listening attentively inside the gallery'
    ]
  },
  {
    id: 7,
    url: 'https://i.postimg.cc/fytBD2Hq/Whats-App-Image-2026-09-10-at-09-18-55.jpg',
    title: 'Foundational Leaders & Political History',
    category: 'hall-of-fame',
    categoryLabel: 'Hall of Fame',
    locationInMuseum: 'Cocoa House 24th Floor — Hall of Fame Exploratory Room',
    era: 'Late 19th Century to 20th Century Pioneers',
    caption: 'A side-profile view of a visitor standing in front of historical wall exhibits dedicated to Herbert Samuel Macaulay, Lt. Colonel Francis Adekunle Fajuyi, and Christopher Sapara Williams.',
    curatorNote: 'A visitor engrossed in the heroic legacies of Herbert Samuel Macaulay (Father of Nigerian Nationalism), Lt. Colonel Francis Adekunle Fajuyi (first military governor of Western Region revered for supreme military honor), and Christopher Alexander Sapara Williams (first indigenous Nigerian lawyer called to the English Bar in 1888).',
    highlights: [
      'Herbert Samuel Macaulay: Founder of modern Nigerian anticolonial politics',
      'Lt. Col. Francis Adekunle Fajuyi: Legendary sacrifice and integrity in military statecraft',
      'Christopher Sapara Williams: Pioneer advocate and legal luminary (1888)',
      'Side-profile view of visitor exploring political history'
    ]
  },
  {
    id: 8,
    url: 'https://i.postimg.cc/qqhj4bmj/Whats-App-Image-2026-09-10-at-09-18-55-(1).jpg',
    title: 'Monarchical Crown Jewels & Royal Beaded Regalia',
    category: 'royal-regalia',
    categoryLabel: 'Royal Regalia',
    locationInMuseum: 'Cocoa House 24th Floor — Sacred Monarchical Insignia Wing',
    era: 'Classical Yoruba Kingship & Sacred Beadwork Tradition',
    caption: 'A detailed sculpture of a traditional Yoruba beaded crown (Ade) adorned with yellow and orange glass beads, bird motifs, a facial outline, and long hanging beaded veils.',
    curatorNote: 'This majestic Ade Nla represents the pinnacle of Yoruba royal investiture. The radiant yellow and orange glass beadwork incorporates protective bird figures (Okin/Eye) symbolizing spiritual vigilance and maternal ancestral power, while long beaded veil strands shield commoners from the King\'s sacred gaze.',
    highlights: [
      'Sculpture of traditional Yoruba beaded crown (Ade)',
      'Adorned with yellow and orange glass beads',
      'Sacred bird motifs and ancestral facial outline',
      'Long hanging beaded veil strands (Ikan Ade)'
    ]
  }
];

interface MuseumProps {
  onNavigate?: (page: string) => void;
}

export default function Museum({ onNavigate }: MuseumProps = {}) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [bookingForm, setBookingForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    institutionOrOrg: '',
    groupType: 'School / Academic Group',
    attendeesCount: '15-30',
    preferredDate: '',
    specialInterests: 'General Cultural Tour'
  });
  const [isBooked, setIsBooked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter photos
  const filteredPhotos = MUSEUM_PHOTOS.filter((photo) => {
    if (selectedFilter === 'all') return true;
    return photo.category === selectedFilter;
  });

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < MUSEUM_PHOTOS.length - 1 ? prev + 1 : 0));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : MUSEUM_PHOTOS.length - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.fullName || !bookingForm.email || !bookingForm.phone) return;
    setIsBooked(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const currentLightboxPhoto = lightboxIndex !== null ? MUSEUM_PHOTOS[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-slate-50 text-neutral-900 pb-20">
      {/* WORDPRESS PAGE HEADER */}
      <WordPressPageHeader
        title="Odu'a Museum & Hall of Fame"
        subtitle="A Classical Sanctuary of Yoruba Cultural Ingenuity, Monarchical Insignia & Pioneer Omoluabi Achievements on the 24th Floor of Cocoa House, Ibadan"
        breadcrumbs={[
          { label: 'Home', page: 'Home' },
          { label: 'Media', page: 'Media' },
          { label: 'Museum & Hall of Fame', active: true }
        ]}
        onNavigate={onNavigate || (() => {})}
        backgroundImage={HERO_BACKGROUNDS.museum}
        action={
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href="#tour-booking"
              className="px-4 py-2 rounded-xl bg-[#fce303] text-neutral-950 font-bold text-xs uppercase tracking-wider hover:bg-[#ebd302] transition-colors shadow-md flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Guided Tour</span>
            </a>
            <a
              href="#gallery-section"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-colors flex items-center gap-1.5 backdrop-blur-xs"
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>View Artifacts</span>
            </a>
          </div>
        }
      />

      {/* QUICK METRICS & INSTITUTIONAL CONTEXT RIBBON */}
      <section className="bg-neutral-900 text-white border-b border-neutral-800 py-6 relative z-10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-[#00a757]/20 border border-[#00a757]/40 flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5 text-[#00a757]" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-black font-serif text-white">500+</p>
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Antiquities & Artifacts</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-[#fce303]/20 border border-[#fce303]/40 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-[#fce303]" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-black font-serif text-white">1886</p>
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Kiriji Peace Treaty Record</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-black font-serif text-white">Floor 24</p>
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Cocoa House, Dugbe, Ibadan</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-black font-serif text-white">Omoluabi</p>
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Pioneer Hall of Fame</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURATOR INTRODUCTION & HISTORICAL MANDATE */}
      <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Preserving Material Civilization & Heritage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-neutral-900 tracking-tight leading-[1.15]">
              Connecting Future Generations with Ancient Yoruba Ingenuity
            </h2>

            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
              Conceptualized by the Board and Management of <strong className="text-neutral-950 font-bold">Odu’a Investment Company Limited</strong>, the <span className="font-semibold text-emerald-800">Odu’a Museum & Hall of Fame</span> serves as a living testimony to the classical history, technology, monarchical statecraft, and industrial creativity of the Yoruba people.
            </p>

            <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-700" />
                <span>The Board’s Founding Philosophy</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed italic">
                “Recognizing that rapid urbanization risks severing our youth from the timeless values, customs, and technologies of their forebears, Odu’a established this center to preserve authentic objects of historical and aesthetic value bequeathed to us by our ancestors—serving as an eye-opener to school children, cultural scholars, and international dignitaries.”
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-emerald-950">Educational Tours</h4>
                  <p className="text-xs text-neutral-600 mt-0.5">Guided excursions for primary, secondary, and tertiary students across West Africa.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/60 border border-amber-100">
                <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-amber-950">Hall of Fame Inductions</h4>
                  <p className="text-xs text-neutral-600 mt-0.5">Permanent recognition of Yoruba achievers who exemplified Omoluabi integrity.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Visual Hero Montage */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] group">
              <img
                src={MUSEUM_PHOTOS[0].url}
                alt={MUSEUM_PHOTOS[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              
              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-2">
                <span className="inline-block px-2.5 py-1 rounded-md bg-[#00a757] text-white text-[10px] font-mono uppercase font-bold tracking-wider">
                  Inside Cocoa House, Ibadan
                </span>
                <h4 className="text-lg font-bold font-serif leading-snug">
                  {MUSEUM_PHOTOS[0].title}
                </h4>
                <p className="text-xs text-neutral-300 line-clamp-2">
                  {MUSEUM_PHOTOS[0].caption}
                </p>
                <button
                  onClick={() => setLightboxIndex(0)}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#fce303] hover:underline cursor-pointer"
                >
                  <span>Inspect in Full Lightbox</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-neutral-100 max-w-[210px] hidden sm:block">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00a757] animate-pulse" />
                <span className="text-[10px] uppercase font-mono font-bold text-neutral-600">Open to Visitors</span>
              </div>
              <p className="text-xs font-bold text-neutral-900">Mon – Fri: 9:00 AM – 4:00 PM</p>
              <p className="text-[11px] text-neutral-500 mt-0.5">Guided groups by reservation</p>
            </div>
          </div>
        </div>
      </section>

      {/* ALL 8 PHOTOGRAPHS: INTERACTIVE GALLERY & LIGHTBOX */}
      <section id="gallery-section" className="py-14 bg-white border-y border-neutral-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#00a757]">
                <Landmark className="w-4 h-4" />
                <span>The Permanent Collections</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-neutral-900">
                Visual Tour of Odu'a Museum Collections
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600">
                Explore high-resolution documentary captures of the museum galleries, including authentic regalia, historical weapons, master carvings, and Hall of Fame portraits.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Share Museum Link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied!' : 'Share Page'}</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-2">
            {[
              { id: 'all', label: 'All 8 Artifact Exhibits' },
              { id: 'gallery-overview', label: 'Main Gallery' },
              { id: 'warfare-treaty', label: 'Warfare & 1886 Treaty' },
              { id: 'vintage-tech', label: 'Memories of the Past' },
              { id: 'sound-archives', label: 'Sound & Gramophone' },
              { id: 'hall-of-fame', label: 'Hall of Fame Pioneers' },
              { id: 'guided-tours', label: 'Guided Tours' },
              { id: 'royal-regalia', label: 'Royal Beaded Crown' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-[#00a757] text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Photo Grid (Displaying All 8 Real Museum Photographs) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => {
              const fullIndex = MUSEUM_PHOTOS.findIndex((p) => p.id === photo.id);
              return (
                <div
                  key={photo.id}
                  onClick={() => setLightboxIndex(fullIndex)}
                  className="group bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                    
                    {/* Hover Inspect Icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    {/* Tag Badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <span className="px-2 py-0.5 rounded-md bg-[#00a757] text-[10px] font-mono font-bold uppercase tracking-wider">
                        {photo.categoryLabel}
                      </span>
                      <span className="text-[10px] font-medium text-neutral-300">
                        Exhibit #{photo.id}
                      </span>
                    </div>
                  </div>

                  {/* Photo Description Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-neutral-900 line-clamp-2 group-hover:text-emerald-800 transition-colors">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-neutral-600 line-clamp-2 mt-1.5 leading-relaxed">
                        {photo.caption}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[11px] font-semibold text-emerald-700">
                      <span>{photo.locationInMuseum.split('—')[0]}</span>
                      <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Inspect</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SIX CURATED EXHIBITION WINGS IN DETAIL */}
      <section className="py-16 max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a757]/10 text-[#00a757] text-xs font-bold font-mono uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            <span>Exhibition Layout</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-neutral-900">
            Curated Wings of the Odu'a Museum
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600">
            A structured walk through the gallery wings on the 24th Floor of Cocoa House. Each wing houses dedicated collections cataloged by professional museologists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Wing 1 */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Landmark className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-neutral-900">
                1. Sacred Beaded Regalia & Royal Crowns (Ade)
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Showcasing sacred crowns (Ade) embroidered with yellow and amber micro-beads, bird motifs symbolizing maternal vigilance, and cascading face veils representing traditional Yoruba monarchs.
              </p>
            </div>
            <div className="text-xs text-emerald-800 font-bold flex items-center gap-1.5 pt-2 border-t border-neutral-100">
              <span>Photo Exhibit: #7</span>
            </div>
          </div>

          {/* Wing 2 */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-neutral-900">
                2. Yoruba Warfare & Peace Treaty (1886)
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                A two-tier exhibition highlighting 19th-century blacksmith-forged flintlock rifles and combat blades, alongside official documentation of the historic 1886 Kiriji Peace Treaty.
              </p>
            </div>
            <div className="text-xs text-emerald-800 font-bold flex items-center gap-1.5 pt-2 border-t border-neutral-100">
              <span>Photo Exhibit: #2</span>
            </div>
          </div>

          {/* Wing 3 */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-neutral-900">
                3. Memories of the Past (Ohun Elo Igbà Atijó)
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                A retrospective display of early industrial and communication items including vintage televisions, mechanical typewriters, rotary dial telephones, bellows cameras, and manual sewing machines.
              </p>
            </div>
            <div className="text-xs text-emerald-800 font-bold flex items-center gap-1.5 pt-2 border-t border-neutral-100">
              <span>Photo Exhibit: #3</span>
            </div>
          </div>

          {/* Wing 4 */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-neutral-900">
                4. Acoustic Archives & Vintage Gramophones
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Featuring authentic hand-crank portable mechanical gramophones and vinyl turntable platters that captured early Yoruba highlife, juju recordings, and historical oratory.
              </p>
            </div>
            <div className="text-xs text-emerald-800 font-bold flex items-center gap-1.5 pt-2 border-t border-neutral-100">
              <span>Photo Exhibit: #4</span>
            </div>
          </div>

          {/* Wing 5 */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-neutral-900">
                5. The Hall of Fame: Yoruba Pioneers
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Biographical wall panels honoring pioneers of excellence including Premier Obafemi Awolowo, Bashorun M.K.O. Abiola, nationalist titan Herbert Macaulay, hero Lt. Col. Francis Adekunle Fajuyi, and legal luminary Christopher Sapara Williams.
              </p>
            </div>
            <div className="text-xs text-emerald-800 font-bold flex items-center gap-1.5 pt-2 border-t border-neutral-100">
              <span>Photo Exhibit: #5 & #8</span>
            </div>
          </div>

          {/* Wing 6 */}
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-neutral-900">
                6. Main Gallery & Educational Guided Tours
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                A grand exhibition hall featuring polished hardwood flooring, bamboo ceiling craftsmanship, a central gourd sculpture, and daily docent-guided tours covering regional landmarks like University College Hospital (UCH) Ibadan.
              </p>
            </div>
            <div className="text-xs text-emerald-800 font-bold flex items-center gap-1.5 pt-2 border-t border-neutral-100">
              <span>Photo Exhibit: #1 & #6</span>
            </div>
          </div>
        </div>
      </section>

      {/* HALL OF FAME INDUCTION CRITERIA SECTION */}
      <section className="py-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10 relative z-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#fce303] font-bold">
              The Omoluabi Standard
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight">
              Criteria for Induction into the Hall of Fame
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              The Hall of Fame is an exploratory room of attraction and information. Personalities enshrined in this sacred chamber must satisfy four non-negotiable conditions determined by the Museum Board:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#00a757] text-white flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h4 className="font-bold text-base text-white">Yoruba Achiever</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                An inductee must be of Yoruba heritage who has demonstrated extraordinary leadership and distinction in their calling.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#fce303] text-neutral-950 flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h4 className="font-bold text-base text-white">Pioneer in Chosen Career</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Must be an acknowledged trailblazer or first in their profession—breaking historic barriers in academia, commerce, statecraft, or science.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h4 className="font-bold text-base text-white">Societal Upliftment</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Their achievement must have directly and measurably uplifted the Yoruba nation in particular and Nigeria in general.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-neutral-950 flex items-center justify-center font-mono font-bold text-sm">
                04
              </div>
              <h4 className="font-bold text-base text-white">Omoluabi Concept</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                The classical “Omoluabi” ethos—high moral probity, integrity, selflessness, humility, and civic responsibility—must be self-evident.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISITING GUIDE & GUIDED TOUR BOOKING */}
      <section id="tour-booking" className="py-16 max-w-7xl mx-auto px-4 md:px-8 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Visitor Guide Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase font-bold tracking-widest text-[#00a757]">
                Visitor Information
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900">
                Plan Your Visit to Cocoa House
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                The Odu'a Museum & Hall of Fame welcomes schools, research institutions, royal delegations, tourists, and corporate organizations for guided experiential tours.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-neutral-200">
                <MapPin className="w-5 h-5 text-[#00a757] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-neutral-900 text-sm">Location</p>
                  <p className="text-neutral-600 leading-relaxed">
                    Floors 24 & 25, Cocoa House, Oba Adebimpe Road, Dugbe Commercial District, Ibadan, Oyo State, Nigeria.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-neutral-200">
                <Clock className="w-5 h-5 text-[#00a757] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-neutral-900 text-sm">Opening Hours</p>
                  <p className="text-neutral-600">
                    <strong className="text-neutral-800">Monday – Friday:</strong> 9:00 AM – 4:00 PM<br />
                    <strong className="text-neutral-800">Weekends & Holidays:</strong> Special group bookings by advance reservation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-neutral-200">
                <Phone className="w-5 h-5 text-[#00a757] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-neutral-900 text-sm">Curator & Booking Desks</p>
                  <p className="text-neutral-600">
                    Contact our museum tour coordinators directly:
                  </p>
                  <div className="pt-1 space-y-1 font-mono text-neutral-800">
                    <p>• Victor: <strong className="text-neutral-950 font-bold">0803 564 5584</strong></p>
                    <p>• Seun: <strong className="text-neutral-950 font-bold">0815 726 2452</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Booking Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-lg">
            <div className="space-y-2 mb-6">
              <h4 className="font-serif font-black text-xl sm:text-2xl text-neutral-900">
                Schedule a Guided Group Tour
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600">
                Fill out the booking form below. Our curation team will review your group requirements and confirm the tour schedule within 24 hours.
              </p>
            </div>

            {isBooked ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-[#00a757] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h5 className="font-serif font-bold text-xl text-neutral-900">
                  Tour Reservation Request Received!
                </h5>
                <p className="text-xs sm:text-sm text-neutral-700 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="font-bold text-neutral-950">{bookingForm.fullName}</strong>. Your educational visit for <strong className="font-bold text-neutral-950">{bookingForm.institutionOrOrg || 'your group'}</strong> has been registered. Our curator desk will contact you at <strong className="font-mono text-neutral-900">{bookingForm.phone}</strong>.
                </p>
                <button
                  onClick={() => setIsBooked(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#00a757] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#008f49] transition-colors cursor-pointer"
                >
                  Book Another Visit
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.fullName}
                      onChange={(e) => setBookingForm({ ...bookingForm, fullName: e.target.value })}
                      placeholder="e.g. Dr. Adeyemi Adeleke"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#00a757]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      placeholder="adeyemi@institution.edu.ng"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#00a757]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      placeholder="+234 803 000 0000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#00a757]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700">Institution / Organization</label>
                    <input
                      type="text"
                      value={bookingForm.institutionOrOrg}
                      onChange={(e) => setBookingForm({ ...bookingForm, institutionOrOrg: e.target.value })}
                      placeholder="e.g. University of Ibadan Dept of History"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#00a757]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700">Group Classification</label>
                    <select
                      value={bookingForm.groupType}
                      onChange={(e) => setBookingForm({ ...bookingForm, groupType: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#00a757] bg-white"
                    >
                      <option value="School / Academic Group">School / Academic Group</option>
                      <option value="International Visitors / Tourists">International Visitors</option>
                      <option value="Cultural / Research Delegation">Cultural / Research Delegation</option>
                      <option value="Corporate Retreat Group">Corporate Retreat Group</option>
                      <option value="Private Family Visit">Private Family Visit</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700">Attendees Count</label>
                    <select
                      value={bookingForm.attendeesCount}
                      onChange={(e) => setBookingForm({ ...bookingForm, attendeesCount: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#00a757] bg-white"
                    >
                      <option value="1-5">1 – 5 Visitors</option>
                      <option value="6-15">6 – 15 Visitors</option>
                      <option value="15-30">15 – 30 Students/Visitors</option>
                      <option value="31-50">31 – 50 Students</option>
                      <option value="50+">50+ (Multi-batch excursion)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={bookingForm.preferredDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#00a757] bg-white"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#00a757] hover:bg-[#008f49] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Tour Reservation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL DIALOG (For inspecting all 8 images in full resolution) */}
      <AnimatePresence>
        {currentLightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="relative max-w-5xl w-full max-h-[92vh] bg-neutral-950 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Top Header */}
              <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#00a757] text-[11px] font-mono uppercase font-bold text-white">
                    {currentLightboxPhoto.categoryLabel}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    Photo {lightboxIndex! + 1} of {MUSEUM_PHOTOS.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
                    aria-label="Close Lightbox"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Lightbox Main Content View */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
                {/* Large Photo Display */}
                <div className="lg:col-span-8 bg-black flex items-center justify-center relative min-h-[300px] lg:min-h-[500px]">
                  <img
                    src={currentLightboxPhoto.url}
                    alt={currentLightboxPhoto.title}
                    className="max-h-[68vh] w-auto max-w-full object-contain mx-auto"
                  />

                  {/* Previous / Next Arrow Buttons */}
                  <button
                    onClick={() => {
                      setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : MUSEUM_PHOTOS.length - 1));
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer"
                    aria-label="Previous Photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={() => {
                      setLightboxIndex((prev) => (prev !== null && prev < MUSEUM_PHOTOS.length - 1 ? prev + 1 : 0));
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer"
                    aria-label="Next Photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Photo Annotation Sidebar */}
                <div className="lg:col-span-4 p-5 sm:p-6 bg-neutral-900 text-white flex flex-col justify-between space-y-4 border-t lg:border-t-0 lg:border-l border-neutral-800">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold text-[#fce303] tracking-widest">
                        {currentLightboxPhoto.locationInMuseum}
                      </span>
                      <h4 className="text-lg sm:text-xl font-serif font-bold text-white mt-1">
                        {currentLightboxPhoto.title}
                      </h4>
                    </div>

                    <div className="space-y-2 text-xs text-neutral-300 leading-relaxed">
                      <p>{currentLightboxPhoto.caption}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-neutral-800/80 border border-neutral-700/80 space-y-1.5">
                      <p className="text-[11px] font-bold text-[#00a757] uppercase font-mono tracking-wider">
                        Curator's Analysis
                      </p>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {currentLightboxPhoto.curatorNote}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-[11px] font-bold text-neutral-400 uppercase font-mono">
                        Key Artifact Highlights
                      </p>
                      <ul className="space-y-1 text-xs text-neutral-300">
                        {currentLightboxPhoto.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#00a757] font-bold">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Thumbnail Strip of all 8 photos */}
                  <div className="pt-3 border-t border-neutral-800">
                    <p className="text-[10px] text-neutral-400 uppercase font-mono mb-2">
                      All 8 Museum Captures:
                    </p>
                    <div className="grid grid-cols-8 gap-1.5">
                      {MUSEUM_PHOTOS.map((p, idx) => (
                        <button
                          key={p.id}
                          onClick={() => setLightboxIndex(idx)}
                          className={`relative aspect-square rounded-md overflow-hidden border transition-all cursor-pointer ${
                            lightboxIndex === idx
                              ? 'border-[#00a757] scale-105 shadow-md'
                              : 'border-neutral-700 opacity-50 hover:opacity-100'
                          }`}
                        >
                          <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
