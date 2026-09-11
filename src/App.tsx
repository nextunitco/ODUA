import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Menu, 
  X, 
  Globe, 
  Bookmark, 
  Share2, 
  ChevronRight, 
  ChevronDown, 
  ArrowRight, 
  Info, 
  Settings, 
  Sliders, 
  ExternalLink, 
  Check, 
  Plus, 
  Search, 
  BookOpen, 
  Layout, 
  Type, 
  Maximize, 
  Eye, 
  EyeOff, 
  Palette, 
  FileText, 
  User, 
  Users,
  CheckCircle2, 
  PhoneCall, 
  Mail, 
  Grid, 
  Facebook, 
  Twitter, 
  Linkedin, 
  RotateCcw, 
  MessageSquare, 
  Zap, 
  HardDrive, 
  Wrench, 
  Shield, 
  Tag, 
  Code,
  Layers,
  Edit3,
  Image as ImageIcon,
  LayoutGrid
} from 'lucide-react';

// Types
import { Project, NewsCard, StateMetadata, SectorDetail } from './types';

// Components & Modals
import PartnerModal from './components/PartnerModal';
import InvestmentCalculatorModal from './components/InvestmentCalculatorModal';
import GoldenJubileeTimeline from './components/GoldenJubileeTimeline';
import Footer, { FooterStyleType } from './components/Footer';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import WhoWeAre from './pages/WhoWeAre';
import OurHistory from './pages/OurHistory';
import BoardOfDirectors from './pages/BoardOfDirectors';
import LeadershipTeam from './pages/LeadershipTeam';
import BimboAshiruBio from './pages/BimboAshiruBio';
import AbdulrahmanYinusaBio from './pages/AbdulrahmanYinusaBio';
import ChiefSegunOjoBio from './pages/ChiefSegunOjoBio';
import SeniAdioBio from './pages/SeniAdioBio';
import AbiodunBamiduroBio from './pages/AbiodunBamiduroBio';
import TolaKasaliBio from './pages/TolaKasaliBio';
import SegunOlujobiBio from './pages/SegunOlujobiBio';
import LaiOriowoBio from './pages/LaiOriowoBio';
import DebolaOsibogunBio from './pages/DebolaOsibogunBio';
import FolushoOlaniyanBio from './pages/FolushoOlaniyanBio';
import YemiAjaoBio from './pages/YemiAjaoBio';
import AbiolaOlufunkeAjayiBio from './pages/AbiolaOlufunkeAjayiBio';
import OdunayoAdenijiBio from './pages/OdunayoAdenijiBio';
import OlusojiSangobiyiBio from './pages/OlusojiSangobiyiBio';
import VictorAyetoroBio from './pages/VictorAyetoroBio';
import Portfolio from './pages/Portfolio';
import Projects from './pages/Projects';
import Investors from './pages/Investors';
import Media from './pages/Media';
import Museum from './pages/Museum';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import GovernanceCompliance from './pages/GovernanceCompliance';
import OduaFoundation from './pages/OduaFoundation';
import SubsidiariesDirectory from './pages/SubsidiariesDirectory';
import { DynamicCustomPage } from './components/DynamicCustomPage';
import { LOCAL_IMAGES } from './assets/localImages';

// Static assets high-resolution alternative
const cocoaHouseImg = LOCAL_IMAGES.cocoaHouseSharp;

// Helper to resolve initial page from URL query, hash, or reload persistence
function getInitialPage(): string {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    
    // 1. Explicit admin/portal request in URL parameter
    if (urlParams.has('portal') || urlParams.get('admin') === 'true') {
      return 'Admin';
    }

    // 2. Explicit page query parameter (e.g., ?page=About+Us or ?p=Who+We+Are)
    const pageParam = urlParams.get('page') || urlParams.get('p');
    if (pageParam && pageParam.trim()) {
      return pageParam.trim();
    }

    // 3. Hash-based routing fallback (e.g., #About-Us, #portfolio, or #admin)
    if (window.location.hash) {
      const cleanHash = window.location.hash.replace(/^#[/]?/, '').trim();
      if (cleanHash) {
        const decoded = decodeURIComponent(cleanHash).replace(/-/g, ' ');
        if (decoded.toLowerCase() === 'admin' || decoded.toLowerCase() === 'portal') {
          return 'Admin';
        }
        return decoded;
      }
    }

    // If visiting the clean website URL without query params or hash, always land on Home!
    if (!urlParams.toString() && !window.location.hash) {
      try {
        localStorage.removeItem('odua_admin_portal_session');
      } catch (e) {}
      return 'Home';
    }

    // 4. Reload persistence within the same tab for deep subpages
    const sessionPage = sessionStorage.getItem('odua_current_page');
    if (sessionPage && sessionPage.trim() && sessionPage !== 'Admin') {
      return sessionPage.trim();
    }
  } catch (e) {
    // Ignore storage/URL exceptions
  }

  return 'Home';
}

export default function App() {
  // Navigation Routing States - Persistent across reloads
  const [currentPage, setCurrentPage] = useState<string>(() => getInitialPage());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const [isPortfolioDropdownOpen, setIsPortfolioDropdownOpen] = useState(false);
  const [isMobilePortfolioOpen, setIsMobilePortfolioOpen] = useState(false);
  const portfolioDropdownRef = useRef<HTMLDivElement>(null);
  const [isGovernanceDropdownOpen, setIsGovernanceDropdownOpen] = useState(false);
  const [isMobileGovernanceOpen, setIsMobileGovernanceOpen] = useState(false);
  const governanceDropdownRef = useRef<HTMLDivElement>(null);
  const [isFoundationDropdownOpen, setIsFoundationDropdownOpen] = useState(false);
  const [isMobileFoundationOpen, setIsMobileFoundationOpen] = useState(false);
  const foundationDropdownRef = useRef<HTMLDivElement>(null);
  const [isInvestorsDropdownOpen, setIsInvestorsDropdownOpen] = useState(false);
  const [isMobileInvestorsOpen, setIsMobileInvestorsOpen] = useState(false);
  const investorsDropdownRef = useRef<HTMLDivElement>(null);
  const [isMediaDropdownOpen, setIsMediaDropdownOpen] = useState(false);
  const [isMobileMediaOpen, setIsMobileMediaOpen] = useState(false);
  const mediaDropdownRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Dedicated Portal Mode for Administration Security
  const [isPortalMode, setIsPortalMode] = useState<boolean>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isPortalQuery = urlParams.has('portal') || urlParams.get('admin') === 'true';
    if (isPortalQuery) {
      localStorage.setItem('odua_admin_portal_session', 'true');
      return true;
    }
    return false;
  });

  const handleExitPortal = () => {
    localStorage.removeItem('odua_admin_portal_session');
    localStorage.removeItem('odua_admin_authenticated');
    try {
      sessionStorage.setItem('odua_current_page', 'Home');
      localStorage.setItem('odua_current_page', 'Home');
    } catch (e) {}
    setIsPortalMode(false);
    setCurrentPage('Home');
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('portal');
      url.searchParams.delete('admin');
      url.searchParams.delete('page');
      url.searchParams.delete('p');
      window.history.pushState({}, '', url.pathname);
    } catch (e) {}
  };

  const navigateToPage = (page: string) => {
    if (page !== currentPage) {
      try {
        sessionStorage.setItem('odua_prev_page', currentPage);
      } catch (e) {}
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Synchronize currentPage with URL and storage so reloads and browser Back/Forward work perfectly
  useEffect(() => {
    if (!currentPage) return;

    // 1. Save to sessionStorage for reliable reloads of public pages
    try {
      if (currentPage !== 'Admin') {
        sessionStorage.setItem('odua_current_page', currentPage);
        localStorage.setItem('odua_current_page', currentPage);
        localStorage.removeItem('odua_admin_portal_session');
      }
    } catch (e) {}

    // 2. Keep the browser URL and hash in sync without triggering full page reload
    try {
      const url = new URL(window.location.href);
      if (currentPage === 'Admin') {
        url.searchParams.set('portal', 'true');
        url.searchParams.delete('page');
        url.searchParams.delete('p');
        setIsPortalMode(true);
      } else {
        url.searchParams.delete('portal');
        url.searchParams.delete('admin');
        if (currentPage === 'Home') {
          url.searchParams.delete('page');
          url.searchParams.delete('p');
        } else {
          url.searchParams.set('page', currentPage);
        }
      }
      
      const targetHash = (currentPage !== 'Home' && currentPage !== 'Admin')
        ? '#' + encodeURIComponent(currentPage.replace(/\s+/g, '-'))
        : '';

      window.history.replaceState({ page: currentPage }, '', url.pathname + (url.search ? url.search : '') + targetHash);
    } catch (e) {
      // In sandboxed iframes where replaceState may be restricted, fallback to hash
      try {
        if (currentPage !== 'Home' && currentPage !== 'Admin') {
          window.location.hash = encodeURIComponent(currentPage.replace(/\s+/g, '-'));
        } else if (currentPage === 'Home' && window.location.hash) {
          window.location.hash = '';
        }
      } catch (err) {}
    }
  }, [currentPage]);

  // Support browser Back and Forward buttons seamlessly
  useEffect(() => {
    const handlePopState = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('portal') || urlParams.get('admin') === 'true') {
          setCurrentPage('Admin');
          setIsPortalMode(true);
          return;
        }
        const pageFromParam = urlParams.get('page') || urlParams.get('p');
        if (pageFromParam) {
          setCurrentPage(pageFromParam);
          return;
        }
        if (window.location.hash) {
          const hashPage = decodeURIComponent(window.location.hash.replace(/^#[/]?/, '').replace(/-/g, ' '));
          if (hashPage) {
            setCurrentPage(hashPage);
            return;
          }
        }
        const sessionPage = sessionStorage.getItem('odua_current_page');
        if (sessionPage && sessionPage !== 'Admin') {
          setCurrentPage(sessionPage);
          return;
        }
        setCurrentPage('Home');
      } catch (e) {}
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // WordPress Live Theme Customizer & Customizer Panel States
  const [wpAdminBar, setWpAdminBar] = useState<boolean>(() => {
    const saved = localStorage.getItem('wp_admin_bar');
    return saved !== null ? saved === 'true' : true;
  });
  const [wpPrimaryColor, setWpPrimaryColor] = useState<string>(() => {
    return localStorage.getItem('wp_primary_color') || 'green';
  });
  const [wpHeaderStyle, setWpHeaderStyle] = useState<string>(() => {
    const saved = localStorage.getItem('wp_header_style');
    // Default to 'translucent' so the navbar seamlessly blends with the background image across all pages
    if (!saved || saved === 'white-topbar') {
      return 'translucent';
    }
    return saved;
  });
  const [wpFooterStyle, setWpFooterStyle] = useState<FooterStyleType>(() => {
    return (localStorage.getItem('wp_footer_style') as FooterStyleType) || 'corporate-dark';
  });
  const [wpLayout, setWpLayout] = useState<string>(() => {
    return localStorage.getItem('wp_layout') || 'full';
  });
  const [wpFontPairing, setWpFontPairing] = useState<string>(() => {
    return localStorage.getItem('wp_font_pairing') || 'serif';
  });
  const [wpSidebarEnabled, setWpSidebarEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('wp_sidebar_enabled');
    return saved !== null ? saved === 'true' : true;
  });

  // Persistent local storage update for a true theme customizer persistence
  useEffect(() => {
    localStorage.setItem('wp_admin_bar', String(wpAdminBar));
    localStorage.setItem('wp_primary_color', wpPrimaryColor);
    localStorage.setItem('wp_header_style', wpHeaderStyle);
    localStorage.setItem('wp_footer_style', wpFooterStyle);
    localStorage.setItem('wp_layout', wpLayout);
    localStorage.setItem('wp_font_pairing', wpFontPairing);
    localStorage.setItem('wp_sidebar_enabled', String(wpSidebarEnabled));
  }, [wpAdminBar, wpPrimaryColor, wpHeaderStyle, wpFooterStyle, wpLayout, wpFontPairing, wpSidebarEnabled]);

  const colorThemes: Record<string, { name: string; primary: string; primaryHover: string; secondary: string; secondaryHover: string }> = {
    green: {
      name: 'Odu’a Heritage Green',
      primary: '#00a757',
      primaryHover: '#008c48',
      secondary: '#fce303',
      secondaryHover: '#e5ce00'
    },
    blue: {
      name: 'Corporate Royal Blue',
      primary: '#0073aa',
      primaryHover: '#005a87',
      secondary: '#ffb900',
      secondaryHover: '#e0a300'
    },
    purple: {
      name: 'Executive Royal Purple',
      primary: '#722ed1',
      primaryHover: '#5b1da6',
      secondary: '#fadb14',
      secondaryHover: '#d8c110'
    },
    crimson: {
      name: 'Corporate Crimson Red',
      primary: '#b32025',
      primaryHover: '#8c1418',
      secondary: '#f08283',
      secondaryHover: '#e06667'
    },
    charcoal: {
      name: 'Tech Modern Charcoal',
      primary: '#1f2937',
      primaryHover: '#111827',
      secondary: '#10b981',
      secondaryHover: '#059669'
    }
  };

  const currentTheme = colorThemes[wpPrimaryColor] || colorThemes.green;
  
  // Dynamic CMS content loaded from server db.json database
  const [cmsData, setCmsData] = useState<any>(() => {
    const cached = localStorage.getItem('odua_cms_db');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fallback
      }
    }
    return null;
  });

  const fetchCMSContent = (silent = false) => {
    fetch('/api/content?t=' + Date.now(), { cache: 'no-store' })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Could not contact backend CMS service');
      })
      .then((data) => {
        setCmsData(data);
        try {
          localStorage.setItem('odua_cms_db', JSON.stringify(data));
        } catch (e) {}
      })
      .catch((err) => {
        if (!silent) {
          console.warn('CMS server-side database is unreachable or offline (running in static context):', err);
        }
        const cached = localStorage.getItem('odua_cms_db');
        if (cached) {
          try {
            setCmsData(JSON.parse(cached));
          } catch (e) {
            // Keep default
          }
        }
      });
  };

  // Real-time synchronization across all tabs, windows, and administrative actions
  useEffect(() => {
    fetchCMSContent();

    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        channel = new BroadcastChannel('odua_cms_sync');
        channel.onmessage = (event) => {
          if (event?.data?.payload) {
            setCmsData(event.data.payload);
          }
        };
      }
    } catch (e) {}

    const handleCustomSync = (e: any) => {
      if (e?.detail) {
        setCmsData(e.detail);
      }
    };
    window.addEventListener('odua_cms_updated', handleCustomSync);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'odua_cms_db' && e.newValue) {
        try {
          setCmsData(JSON.parse(e.newValue));
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorage);

    const handleFocus = () => fetchCMSContent(true);
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchCMSContent(true);
      }
    };
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);

    // Fast polling every 2.5s to ensure live website always reflects server changes without reload
    const pollInterval = setInterval(() => {
      fetchCMSContent(true);
    }, 2500);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('odua_cms_updated', handleCustomSync);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
      clearInterval(pollInterval);
    };
  }, []);

  useEffect(() => {
    fetchCMSContent(true);
  }, [currentPage]);

  // Interactive Section Sub-states
  const [activeSector, setActiveSector] = useState<string>('real_estate');
  const [selectedState, setSelectedState] = useState<string>('Oyo');
  
  // Interactive Modal / Form States
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [partnerForm, setPartnerForm] = useState({
    fullName: '',
    emailAddress: '',
    organization: '',
    sectorOfInterest: 'Real Estate & Hospitality',
    message: '',
  });
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  
  // Newsletter Sign-up
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Automatically scroll to the top of the viewport on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setIsScrolled(false);
    setIsMobileMenuOpen(false);
    setIsAboutDropdownOpen(false);
    setIsMobileAboutOpen(false);
    setIsPortfolioDropdownOpen(false);
    setIsMobilePortfolioOpen(false);
    setIsGovernanceDropdownOpen(false);
    setIsMobileGovernanceOpen(false);
    setIsFoundationDropdownOpen(false);
    setIsMobileFoundationOpen(false);
    setIsInvestorsDropdownOpen(false);
    setIsMobileInvestorsOpen(false);
    setIsMediaDropdownOpen(false);
    setIsMobileMediaOpen(false);
  }, [currentPage]);

  // Listen to window scroll position to toggle header state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run initial check
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle click outside of the desktop dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setIsAboutDropdownOpen(false);
      }
      if (portfolioDropdownRef.current && !portfolioDropdownRef.current.contains(event.target as Node)) {
        setIsPortfolioDropdownOpen(false);
      }
      if (governanceDropdownRef.current && !governanceDropdownRef.current.contains(event.target as Node)) {
        setIsGovernanceDropdownOpen(false);
      }
      if (foundationDropdownRef.current && !foundationDropdownRef.current.contains(event.target as Node)) {
        setIsFoundationDropdownOpen(false);
      }
      if (investorsDropdownRef.current && !investorsDropdownRef.current.contains(event.target as Node)) {
        setIsInvestorsDropdownOpen(false);
      }
      if (mediaDropdownRef.current && !mediaDropdownRef.current.contains(event.target as Node)) {
        setIsMediaDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Southwest States Metadata
  const southwestStates: Record<string, StateMetadata> = {
    Oyo: {
      name: "Oyo State",
      capital: "Ibadan",
      tagline: "The Pace Setter State",
      importance: "Host to the iconic Cocoa House (the group's headquarters and West Africa's first skyscraper). It serves as the historic and administrative epicenter of Odu'a Group.",
      projects: ["Cocoa House Restoration", "SWAgCo Cassava Processing Plant", "Lafia Hotel Upgrades"],
      logo: "https://i.postimg.cc/mktQk9JQ/images.jpg"
    },
    Ogun: {
      name: "Ogun State",
      capital: "Abeokuta",
      tagline: "The Gateway State",
      importance: "The industrial power-engine of Southwest Nigeria. Odu'a drives collaborative manufacturing, logistics infrastructure, and special agro-industrial processing zones here.",
      projects: ["Special Agro-Industrial Processing Zone (SAPZ)", "Wemabod Residential Estate", "Logistics Corridor Projects"],
      logo: "https://i.postimg.cc/C5BqSgnC/logo.png"
    },
    Ondo: {
      name: "Ondo State",
      capital: "Akure",
      tagline: "The Sunshine State",
      importance: "Rich in bitumen, deep seaport prospects, and massive cocoa cultivation belts. Odu'a coordinates large-scale hybrid seed multiplication and marine logistics partnerships.",
      projects: ["Ondo Cocoa Seedling Multiplication Center", "SWAgCo Grain Storage Facility", "Coastal Seaport Pre-feasibility Study"],
      logo: "https://i.postimg.cc/L8f3jzXz/images.png"
    },
    Osun: {
      name: "Osun State",
      capital: "Osogbo",
      tagline: "State of the Virtuous",
      importance: "Rich agricultural lands and high tourism potential. Odu'a leverages Osun's heritage to pilot food-security systems, youth empowerment initiatives, and modern hospitality.",
      projects: ["Youth Agro-Entrepreneurship Hub", "Osun Organic Fertilizer Farm", "Heritage Tourism Masterplan"],
      logo: "https://i.postimg.cc/6pNvJFWn/images-(1).jpg"
    },
    Ekiti: {
      name: "Ekiti State",
      capital: "Ado-Ekiti",
      tagline: "Land of Honour",
      importance: "A state distinguished by academic excellence. Odu'a leads in modern knowledge-economy zones, tech clusters, and smart irrigation frameworks to bolster local production.",
      projects: ["Ekiti Knowledge Zone Power Partnership", "Smart Irrigation Paddy Field Project", "Wemabod Commercial Hub"],
      logo: "https://i.postimg.cc/sgp5Ms67/setting-ekiti-logo.gif"
    },
    Lagos: {
      name: "Lagos State",
      capital: "Ikeja",
      tagline: "Centre of Excellence",
      importance: "The financial metropolis of Sub-Saharan Africa. High-yield commercial assets managed by Wemabod, luxury residential towers, and venture capital allocations reside here.",
      projects: ["Sovereign Heights Ikoyi", "Wemabod Tower Refurbishment", "Venture Capital Tech Sandboxes"],
      logo: "https://i.postimg.cc/yYRQsJR2/images-(2).jpg"
    }
  };

  const sectorDetails: Record<string, SectorDetail> = {
    real_estate: {
      title: "Real Estate & Hospitality",
      subtitle: "Premium Urban Assets & Iconic Landmarks",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      description: "Through our premier real estate subsidiary Wemabod, we manage some of Nigeria's most celebrated corporate skyscrapers and high-yield residential complexes. We are redesigning urban spaces with modern smart-green integrations and state-of-the-art hospitality venues.",
      bullets: [
        "Sovereign management of Cocoa House, Dugbe, Ibadan (standing 105 meters tall).",
        "Pioneering 'Sovereign Heights' in Ikoyi, Lagos featuring eco-friendly smart automation.",
        "Comprehensive hospitality upgrades to Premier Hotel and Lafia Hotel into standard 4-star landmarks."
      ],
      tagline: "Shaping the Skyline, Preserving the Heritage",
      stats: [
        { label: "Assets Value", value: "N65B+" },
        { label: "Properties Managed", value: "200+" },
        { label: "Sqm Premium Office", value: "1.2M+" }
      ],
      subs: ["Wemabod Limited", "Premier Hotel", "Lafia Hotel"]
    },
    agriculture: {
      title: "Agriculture & Agro-Allied",
      subtitle: "Securing Food Systems & Value-Chain Expansion",
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80",
      description: "Our agricultural arm, SWAgCo (South-West Agriculture Company), is actively revitalizing large agricultural land holdings. By channeling professional capital and scientific inputs, we empower local farming clusters and drive industrial-scale processing.",
      bullets: [
        "Rehabilitating 10,000+ hectares of abandoned cocoa plantations with hybrid seeds.",
        "Developing state-of-the-art cassava-to-starch processing infrastructure supplying international clients.",
        "Securing stable out-grower pricing structures to benefit over 8,500 local farmers directly."
      ],
      tagline: "Empowering Rural Farms, Building Food Sovereignty",
      stats: [
        { label: "Hectares Secured", value: "12,000+" },
        { label: "Farmers Engaged", value: "8,500+" },
        { label: "Processing Units", value: "4 Plants" }
      ],
      subs: ["SWAgCo Limited", "South-West Cassava Corp", "Odu'a Cocoa Regeneration Project"]
    },
    financial: {
      title: "Financial Services & Innovation",
      subtitle: "Capital Optimization & High-Growth Venture Pipelines",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      description: "We orchestrate regional capital allocation. From micro-financing setups that keep local markets thriving to seed funding for tech startups in our regional sandbox, we promote digital financial integration and solid compound capital returns.",
      bullets: [
        "Strategic minority interest stakes in Tier-1 national banking and insurance institutions.",
        "Nurturing technology incubator pipelines focused on Agri-Tech and FinTech hubs across Southwest universities.",
        "Delivering accessible SME micro-loans to keep local traders and retail merchants liquid."
      ],
      tagline: "Fueling Enterprise, Engineering Fiscal Stability",
      stats: [
        { label: "SME Fund Capital", value: "N15B+" },
        { label: "Venture Investments", value: "12 Hubs" },
        { label: "Equity Yield", value: "14.5% YoY" }
      ],
      subs: ["Odu'a Capital", "Southwest Microfinance Corp", "Odu'a Tech Ventures"]
    }
  };

  const newsCards: NewsCard[] = [
    {
      id: 1,
      title: "Odu’a Investment Announces Strategic 10% Minority Stake Acquisition in FCMB Pensions",
      excerpt: "Completing the acquisition of a 10% minority equity stake in FCMB Pensions Limited from FCMB Group Plc, following regulatory approvals from PenCom and the Central Bank of Nigeria.",
      category: "Financial Services",
      date: "March 17, 2026",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Odu’a Investment Appoints Abiodun Bamiduro as Executive Director & Group Chief Financial Officer (GCFO)",
      excerpt: "Former Group Financial Controller Abiodun Bamiduro is promoted to Executive Director and GCFO, effective January 2, 2026, to steer financial planning and capital strategies.",
      category: "Corporate",
      date: "January 2, 2026",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Agusto & Co Upgrades Odu’a Investment Company Limited’s Credit Rating to ‘Aa-’",
      excerpt: "Agusto & Co has upgraded Odu’a's rating to 'Aa-' with a Stable Outlook, reflecting improved operating income, optimized rental earnings, and strong asset management portfolios.",
      category: "Finance",
      date: "July 17, 2025",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const projectsList: Project[] = [
    {
      title: "Sovereign Heights Ikoyi",
      location: "Ikoyi, Lagos State",
      sector: "Real Estate & Hospitality",
      status: "Ongoing",
      description: "Ultra-luxury 14-storey eco-friendly residential high-rise featuring advanced automation and solar roofs.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "SWAgCo Cassava Milling Hub",
      location: "Oyo State",
      sector: "Agriculture & Agro-Allied",
      status: "Completed",
      description: "Industrial cassava starch extraction plant directly powering local packaging supply chains.",
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Cocoa House Structural Revitalization",
      location: "Dugbe, Ibadan",
      sector: "Real Estate & Hospitality",
      status: "Completed",
      description: "Preservation and structural upgrade of West Africa's first administrative skyscraper with smart metrics.",
      image: cocoaHouseImg
    },
    {
      title: "Southwest Tech Incubator Clusters",
      location: "Regional (6 Owner States)",
      sector: "Financial Services & Innovation",
      status: "Ongoing",
      description: "Tech centers linking university research labs to venture funding and business optimization mentors.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Premier Hotel 4-Star Expansion",
      location: "Mokola Hill, Ibadan",
      sector: "Real Estate & Hospitality",
      status: "Ongoing",
      description: "Transformative modernization of Premier Hotel to standard luxury status including world-class event centers.",
      image: "https://i.postimg.cc/L5XY9Zhj/hospitality.jpg"
    },
    {
      title: "Ondo Cocoa Seed Multiplication Complex",
      location: "Ondo State",
      sector: "Agriculture & Agro-Allied",
      status: "Completed",
      description: "State-of-the-art greenhouse facility producing 2.5 million high-yield hybrid seedlings annually.",
      image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const activeNews = cmsData?.news !== undefined ? cmsData.news : newsCards;
  const activeProjects = cmsData?.projects !== undefined ? cmsData.projects : projectsList;
  const activeCareers = cmsData?.careers !== undefined ? cmsData.careers : [];

  const defaultGeneralSettings = {
    siteName: "ODU'A",
    tagline: "The Engine Room for Economic Development in Southwest Nigeria",
    phone: "+234 2 241 0835",
    email: "info@oduainvestment.com.ng",
    address: "Floors 20-23, Cocoa House, Oba Adebimpe Road, P.M.B. 5435, Dugbe, Ibadan, Oyo State, Nigeria.",
    assetValue: "₦300B+",
    keySectorsCount: "9"
  };

  const activeGeneralSettings = cmsData?.generalSettings || defaultGeneralSettings;

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.fullName || !partnerForm.emailAddress) return;
    setPartnerSubmitted(true);
    setTimeout(() => {
      setPartnerSubmitted(false);
      setIsPartnerModalOpen(false);
      setPartnerForm({
        fullName: '',
        emailAddress: '',
        organization: '',
        sectorOfInterest: 'Real Estate & Hospitality',
        message: '',
      });
    }, 2500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterSubscribed(false);
      setNewsletterEmail('');
    }, 3000);
  };

  // Render Page Switcher
  const renderPage = () => {
    const activePageContent = cmsData?.pagesContent?.[currentPage] || cmsData?.pagesContent?.['Home'];

    // 1. Dedicated Official Home Page
    if (currentPage === 'Home') {
      return (
        <Home 
          cocoaHouseImg={cocoaHouseImg}
          onNavigate={navigateToPage}
          onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
          projects={activeProjects}
          news={activeNews}
          pageContent={activePageContent}
          generalSettings={activeGeneralSettings}
        />
      );
    }

    // Check if other custom pages have AI-restructured or custom Drag & Drop blocks
    const customPageBlocks = cmsData?.pageBlocks?.[currentPage] || (currentPage === 'Contact' ? cmsData?.pageBlocks?.['Contact Us'] : undefined);
    if (currentPage !== 'Admin' && Array.isArray(customPageBlocks) && customPageBlocks.length > 0) {
      return (
        <DynamicCustomPage 
          pageName={currentPage}
          blocks={customPageBlocks}
          generalSettings={activeGeneralSettings}
          onNavigate={navigateToPage}
          onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
          cmsData={cmsData}
        />
      );
    }

    switch (currentPage) {
      case 'Home':
        return (
          <Home 
            cocoaHouseImg={cocoaHouseImg}
            onNavigate={navigateToPage}
            onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
            projects={activeProjects}
            news={activeNews}
            pageContent={activePageContent}
            generalSettings={activeGeneralSettings}
          />
        );
      case 'About Us':
        return (
          <AboutUs 
            onNavigate={navigateToPage} 
            generalSettings={activeGeneralSettings} 
            pageContent={cmsData?.pagesContent?.['About Us']}
            customTextBlocks={cmsData?.customTextBlocks?.['About Us']}
          />
        );
      case 'Who We Are':
        return (
          <WhoWeAre 
            onNavigate={navigateToPage}
            generalSettings={activeGeneralSettings}
            southwestStates={cmsData?.southwestStates}
          />
        );
      case 'Our History':
        return <OurHistory onNavigate={navigateToPage} generalSettings={activeGeneralSettings} historyMilestones={cmsData?.historyMilestones} />;
      case 'Board of Directors':
        return <BoardOfDirectors setCurrentPage={navigateToPage} boardMembers={cmsData?.boardMembers} />;
      case 'Bimbo Ashiru':
        return <BimboAshiruBio setCurrentPage={navigateToPage} />;
      case 'Abdulrahman Yinusa':
        return <AbdulrahmanYinusaBio setCurrentPage={navigateToPage} />;
      case 'Chief Segun Ojo':
        return <ChiefSegunOjoBio setCurrentPage={navigateToPage} />;
      case 'Seni Adio':
        return <SeniAdioBio setCurrentPage={navigateToPage} />;
      case 'Abiodun Bamiduro':
        return <AbiodunBamiduroBio setCurrentPage={navigateToPage} />;
      case 'Tola Kasali':
        return <TolaKasaliBio setCurrentPage={navigateToPage} />;
      case 'Segun Olujobi':
        return <SegunOlujobiBio setCurrentPage={navigateToPage} />;
      case 'Lai Oriowo':
        return <LaiOriowoBio setCurrentPage={navigateToPage} />;
      case 'Adebola Osibogun':
        return <DebolaOsibogunBio setCurrentPage={navigateToPage} />;
      case 'Folusho Olaniyan':
        return <FolushoOlaniyanBio setCurrentPage={navigateToPage} />;
      case 'Yemi Ajao':
        return <YemiAjaoBio setCurrentPage={navigateToPage} />;
      case 'Abiola Olufunke Ajayi':
        return <AbiolaOlufunkeAjayiBio setCurrentPage={navigateToPage} />;
      case 'Odunayo Adeniji':
        return <OdunayoAdenijiBio setCurrentPage={navigateToPage} />;
      case 'Olusoji Sangobiyi':
        return <OlusojiSangobiyiBio setCurrentPage={navigateToPage} />;
      case 'Victor Ayetoro':
        return <VictorAyetoroBio setCurrentPage={navigateToPage} />;
      case 'Leadership Team':
        return <LeadershipTeam setCurrentPage={navigateToPage} leadershipTeam={cmsData?.leadershipTeam} />;
      case 'Portfolio':
      case 'Our Subsidiaries':
      case 'Our Associate Companies':
      case 'Our Strategic Thrust':
      case 'Our Investment Approach': {
        let initialTab: 'approach' | 'thrust' | 'subsidiaries' | 'associates' = 'approach';
        if (currentPage === 'Our Subsidiaries') {
          initialTab = 'subsidiaries';
        } else if (currentPage === 'Our Associate Companies') {
          initialTab = 'associates';
        } else if (currentPage === 'Our Strategic Thrust') {
          initialTab = 'thrust';
        } else if (currentPage === 'Our Investment Approach') {
          initialTab = 'approach';
        }

        return (
          <Portfolio 
            sectorDetails={sectorDetails}
            activeSector={activeSector}
            setActiveSector={setActiveSector}
            onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
            onNavigate={navigateToPage}
            initialTab={initialTab}
            onTabChange={(tab) => {
              if (tab === 'subsidiaries') setCurrentPage('Our Subsidiaries');
              else if (tab === 'associates') setCurrentPage('Our Associate Companies');
              else if (tab === 'thrust') setCurrentPage('Our Strategic Thrust');
              else if (tab === 'approach') setCurrentPage('Our Investment Approach');
            }}
          />
        );
      }
      case 'Ongoing Projects':
        return <Projects onNavigate={navigateToPage} projects={activeProjects} />;
      case 'Investors':
      case 'Our Governance':
      case 'Managing Risk':
      case 'Managing Risks': {
        let initialTab: 'governance' | 'risk' = 'governance';
        if (currentPage === 'Managing Risk' || currentPage === 'Managing Risks') {
          initialTab = 'risk';
        }
        return (
          <Investors 
            onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
            onNavigate={navigateToPage}
            initialTab={initialTab}
            onTabChange={(tab) => {
              if (tab === 'governance') navigateToPage('Our Governance');
              else if (tab === 'risk') navigateToPage('Managing Risk');
            }}
          />
        );
      }
      case 'Museum':
      case 'Museum and Hall Of Fame':
      case 'Museum & Hall of Fame':
        return <Museum onNavigate={navigateToPage} />;
      case 'Media':
      case 'News & Events':
      case 'DISCLAIMERS': {
        let initialCategory = 'All';
        if (currentPage === 'News & Events') initialCategory = 'News & Events';
        else if (currentPage === 'DISCLAIMERS') initialCategory = 'Disclaimers';

        return (
          <Media 
            news={activeNews} 
            sidebarEnabled={wpSidebarEnabled}
            onNavigate={navigateToPage}
            primaryColor={currentTheme.primary}
            initialCategory={initialCategory}
            onCategoryChange={(cat) => {
              if (cat === 'All') navigateToPage('Media');
              else if (cat === 'News & Events') navigateToPage('News & Events');
              else if (cat === 'Museum & Hall of Fame' || cat === 'Museum') navigateToPage('Museum and Hall Of Fame');
              else if (cat === 'Disclaimers') navigateToPage('DISCLAIMERS');
            }}
          />
        );
      }
      case 'Careers':
        return <Careers onNavigate={navigateToPage} careers={activeCareers} />;
      case 'Contact Us':
      case 'Contact':
        return <Contact onNavigate={navigateToPage} generalSettings={activeGeneralSettings} />;
      case 'Governance & Whistleblowing':
        return (
          <GovernanceCompliance 
            onNavigate={navigateToPage} 
            policies={cmsData?.governancePolicies}
            whistleblowerReports={cmsData?.whistleblowerReports}
          />
        );
      case 'Odu\'a Foundation':
      case 'Foundation':
      case 'Foundation & Impact':
      case 'Impact':
        return (
          <OduaFoundation 
            onNavigate={navigateToPage} 
            onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
            initiatives={cmsData?.foundationPrograms}
          />
        );
      case 'Subsidiaries Directory':
        return <SubsidiariesDirectory onNavigate={navigateToPage} subsidiaries={cmsData?.subsidiaries} />;
      case 'Golden Jubilee':
        return <GoldenJubileeTimeline onNavigate={navigateToPage} milestones={cmsData?.jubileeEvents} />;
      case 'Admin':
        return (
          <Admin 
            setCurrentPage={navigateToPage} 
            onExitPortal={handleExitPortal}
            onContentChange={(newDb) => setCmsData(newDb)}
          />
        );
      default:
        return (
          <Home 
            cocoaHouseImg={cocoaHouseImg}
            onNavigate={navigateToPage} 
            onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
            projects={activeProjects}
            news={activeNews}
            generalSettings={activeGeneralSettings}
          />
        );
    }
  };

  // Navigation Links - Streamlined 8 items for a decluttered, perfectly spaced navbar
  const navLinks = [
    'Home', 
    'About Us', 
    'Portfolio', 
    'Governance',
    'Foundation',
    'Media', 
    'Careers', 
    'Contact'
  ];

  const isBioPage = [
    'Bimbo Ashiru', 'Abdulrahman Yinusa', 'Chief Segun Ojo', 'Seni Adio',
    'Abiodun Bamiduro', 'Tola Kasali', 'Segun Olujobi', 'Lai Oriowo',
    'Adebola Osibogun', 'Folusho Olaniyan', 'Yemi Ajao', 'Abiola Olufunke Ajayi',
    'Odunayo Adeniji', 'Olusoji Sangobiyi', 'Victor Ayetoro'
  ].includes(currentPage);

  const isNonHomePage = currentPage !== 'Home';
  const effectiveScrolled = isScrolled;
  const isHeaderLight = effectiveScrolled && (wpHeaderStyle === 'white-topbar');

  return (
    <div className="min-h-screen text-neutral-800 font-sans flex flex-col antialiased transition-colors duration-300 bg-[#fcfdfc]">
      

      {/* Typography and Primary Theme Color stylesheet injection */}
      <style>{`
        :root {
          --wp-primary: ${currentTheme.primary};
          --wp-primary-hover: ${currentTheme.primaryHover};
          --wp-secondary: ${currentTheme.secondary};
          --wp-secondary-hover: ${currentTheme.secondaryHover};
        }
        
        /* Interactive element style bindings */
        .wp-badge-primary {
          background-color: ${currentTheme.primary} !important;
          color: white !important;
        }
        
        .wp-text-primary {
          color: ${currentTheme.primary} !important;
        }
        
        .wp-border-primary {
          border-color: ${currentTheme.primary} !important;
        }
        
        .wp-hover-text-primary:hover {
          color: ${currentTheme.primary} !important;
        }

        /* Dynamic Typography Pairings */
        ${wpFontPairing === 'serif' ? `
          h1, h2, h3, h4, h5, h6, .font-serif {
            font-family: 'Playfair Display', Georgia, Cambria, "Times New Roman", Times, serif !important;
            letter-spacing: -0.02em !important;
          }
          body, .font-sans {
            font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
          }
        ` : wpFontPairing === 'mono' ? `
          h1, h2, h3, h4, h5, h6, .font-serif, .font-sans, body {
            font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace !important;
            letter-spacing: -0.01em !important;
          }
        ` : `
          h1, h2, h3, h4, h5, h6, .font-serif, .font-sans, body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
            letter-spacing: -0.015em !important;
          }
        `}
      `}</style>

      {/* Boxed Layout Frame wrapper */}
      <div className={`flex flex-col flex-1 w-full mx-auto transition-all duration-300 ${wpLayout === 'boxed' ? 'max-w-6xl bg-white shadow-2xl rounded-none md:rounded-3xl border border-neutral-200/50 overflow-hidden' : ''}`}>

        {/* Sticky Header */}
        {currentPage !== 'Admin' && (
          <header 
            className={`z-40 fixed left-0 right-0 w-full transition-all duration-500 ease-in-out top-0 ${
              effectiveScrolled 
                ? `${
                  wpHeaderStyle === 'white-topbar' 
                     ? 'bg-white/95 backdrop-blur-md text-neutral-900 border-b border-neutral-200/80 shadow-md'
                    : wpHeaderStyle === 'translucent'
                    ? 'bg-neutral-950/85 backdrop-blur-md text-white border-b border-white/10 shadow-lg'
                    : 'text-white shadow-lg border-b border-white/5'
                }`
                : 'bg-gradient-to-b from-neutral-950/80 via-neutral-950/35 to-transparent text-white border-b-0 shadow-none'
            }`}
            style={effectiveScrolled && wpHeaderStyle === 'solid' ? { backgroundColor: currentTheme.primary } : undefined}
          >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex justify-between items-center transition-all duration-300 ${
              effectiveScrolled ? 'h-18 sm:h-20 md:h-22' : 'h-24 sm:h-28 md:h-32'
            }`}>
              
              {/* Prominent & Majestic Emblem Logo Badge Card */}
              <button 
                onClick={() => setCurrentPage('Home')} 
                className="group focus:outline-none cursor-pointer shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95 py-1 z-10 my-auto"
                aria-label="Odu'a Investment Company Limited - Home"
              >
                <div 
                  className={`relative flex items-center justify-center bg-white rounded-2xl sm:rounded-3xl border-[2.5px] sm:border-[3px] border-[#fce303] ring-2 ring-amber-400/40 shadow-xl shadow-black/25 p-1.5 sm:p-2.5 transition-all duration-300 group-hover:shadow-2xl group-hover:border-[#ebd302] ${
                    effectiveScrolled 
                      ? 'w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18' 
                      : 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32'
                  }`}
                >
                  <img 
                    src={activeGeneralSettings?.logo || "https://i.postimg.cc/mg37tmcB/logo.png"} 
                    alt="Odu'a Investment Company Limited Logo" 
                    className="w-full h-full object-contain filter drop-shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </button>

              {/* Desktop Navigation Links - Clean, uncluttered and responsive */}
              <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 text-[11px] xl:text-xs font-bold uppercase tracking-normal xl:tracking-wider">
                {navLinks.map((link) => {
                  if (link === 'About Us') {
                    const isAboutActive = ['About Us', 'Who We Are', 'Our History', 'Board of Directors', 'Leadership Team'].includes(currentPage);
                    return (
                      <div 
                        key={link} 
                        ref={aboutDropdownRef}
                        className="relative"
                        onMouseEnter={() => setIsAboutDropdownOpen(true)}
                        onMouseLeave={() => setIsAboutDropdownOpen(false)}
                      >
                        <button
                          onClick={() => {
                            setCurrentPage('About Us');
                            setIsAboutDropdownOpen(false);
                          }}
                          className={`px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                            isAboutActive 
                              ? isHeaderLight
                                ? 'bg-neutral-100/90 text-neutral-950 font-black shadow-xs'
                                : 'bg-white/20 text-white shadow-xs'
                              : isHeaderLight
                              ? 'text-neutral-700 hover:bg-neutral-100/70 hover:text-neutral-950'
                              : 'text-neutral-200 hover:bg-white/10 hover:text-white'
                          }`}
                          style={isAboutActive ? { color: isHeaderLight ? currentTheme.primary : currentTheme.secondary } : undefined}
                        >
                          <span>{link}</span>
                          <ChevronDown className={`w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-200 opacity-70 ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isAboutDropdownOpen && (
                          <div className="absolute left-0 top-full pt-1 w-52 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                            <div className="rounded-xl bg-white text-neutral-800 shadow-xl border border-neutral-100 py-1.5">
                              {[
                                { id: 'Who We Are', label: 'Who We Are' },
                                { id: 'Our History', label: 'Our History' },
                                { id: 'Board of Directors', label: 'Board of Directors' },
                                { id: 'Leadership Team', label: 'Leadership Team' }
                              ].map((item) => (
                                <button
                                  key={item.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentPage(item.id);
                                    setIsAboutDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold transition-all hover:bg-neutral-50 flex items-center justify-between ${
                                    currentPage === item.id 
                                      ? 'bg-neutral-50 font-bold' 
                                      : 'text-neutral-700 hover:text-neutral-950'
                                  }`}
                                  style={currentPage === item.id ? { color: currentTheme.primary } : undefined}
                                >
                                  <span>{item.label}</span>
                                  {currentPage === item.id && (
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                  
                  if (link === 'Portfolio') {
                    const isPortfolioActive = ['Portfolio', 'Our Subsidiaries', 'Our Associate Companies', 'Ongoing Projects', 'Our Strategic Thrust', 'Our Investment Approach', 'Subsidiaries Directory'].includes(currentPage);
                    return (
                      <div 
                        key={link} 
                        ref={portfolioDropdownRef}
                        className="relative"
                        onMouseEnter={() => setIsPortfolioDropdownOpen(true)}
                        onMouseLeave={() => setIsPortfolioDropdownOpen(false)}
                      >
                        <button
                          onClick={() => {
                            setCurrentPage('Portfolio');
                            setIsPortfolioDropdownOpen(false);
                          }}
                          className={`px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                            isPortfolioActive 
                              ? isHeaderLight
                                ? 'bg-neutral-100/90 text-neutral-950 font-black shadow-xs'
                                : 'bg-white/20 text-white shadow-xs'
                              : isHeaderLight
                              ? 'text-neutral-700 hover:bg-neutral-100/70 hover:text-neutral-950'
                              : 'text-neutral-200 hover:bg-white/10 hover:text-white'
                          }`}
                          style={isPortfolioActive ? { color: isHeaderLight ? currentTheme.primary : currentTheme.secondary } : undefined}
                        >
                          <span>{link}</span>
                          <ChevronDown className={`w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-200 opacity-70 ${isPortfolioDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isPortfolioDropdownOpen && (
                          <div className="absolute left-0 top-full pt-1 w-56 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                            <div className="rounded-xl bg-white text-neutral-800 shadow-xl border border-neutral-100 py-1.5">
                              {[
                                { id: 'Our Subsidiaries', label: 'Our Subsidiaries' },
                                { id: 'Our Associate Companies', label: 'Our Associate Companies' },
                                { id: 'Ongoing Projects', label: 'Ongoing Projects' },
                                { id: 'Our Strategic Thrust', label: 'Strategic Thrust' },
                                { id: 'Our Investment Approach', label: 'Investment Approach' },
                                { id: 'Subsidiaries Directory', label: 'Subsidiaries Directory' }
                              ].map((item) => (
                                <button
                                  key={item.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentPage(item.id);
                                    setIsPortfolioDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold transition-all hover:bg-neutral-50 flex items-center justify-between ${
                                    currentPage === item.id 
                                      ? 'bg-neutral-50 font-bold' 
                                      : 'text-neutral-700 hover:text-neutral-950'
                                  }`}
                                  style={currentPage === item.id ? { color: currentTheme.primary } : undefined}
                                >
                                  <span>{item.label}</span>
                                  {currentPage === item.id && (
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (link === 'Governance') {
                    const isGovernanceActive = ['Governance', 'Investors', 'Our Governance', 'Governance & Whistleblowing', 'Managing Risk', 'Managing Risks'].includes(currentPage);
                    return (
                      <div 
                        key={link} 
                        ref={governanceDropdownRef}
                        className="relative"
                        onMouseEnter={() => setIsGovernanceDropdownOpen(true)}
                        onMouseLeave={() => setIsGovernanceDropdownOpen(false)}
                      >
                        <button
                          onClick={() => {
                            setCurrentPage('Our Governance');
                            setIsGovernanceDropdownOpen(false);
                          }}
                          className={`px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                            isGovernanceActive 
                              ? isHeaderLight
                                ? 'bg-neutral-100/90 text-neutral-950 font-black shadow-xs'
                                : 'bg-white/20 text-white shadow-xs'
                              : isHeaderLight
                              ? 'text-neutral-700 hover:bg-neutral-100/70 hover:text-neutral-950'
                              : 'text-neutral-200 hover:bg-white/10 hover:text-white'
                          }`}
                          style={isGovernanceActive ? { color: isHeaderLight ? currentTheme.primary : currentTheme.secondary } : undefined}
                        >
                          <span>{link}</span>
                          <ChevronDown className={`w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-200 opacity-70 ${isGovernanceDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isGovernanceDropdownOpen && (
                          <div className="absolute left-0 top-full pt-1 w-60 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                            <div className="rounded-xl bg-white text-neutral-800 shadow-xl border border-neutral-100 py-1.5">
                              {[
                                { id: 'Our Governance', label: 'Corporate Governance' },
                                { id: 'Governance & Whistleblowing', label: 'Whistleblowing & Integrity' },
                                { id: 'Managing Risk', label: 'Enterprise Risk Management' }
                              ].map((item) => (
                                <button
                                  key={item.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentPage(item.id);
                                    setIsGovernanceDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold transition-all hover:bg-neutral-50 flex items-center justify-between ${
                                    currentPage === item.id 
                                      ? 'bg-neutral-50 font-bold' 
                                      : 'text-neutral-700 hover:text-neutral-950'
                                  }`}
                                  style={currentPage === item.id ? { color: currentTheme.primary } : undefined}
                                >
                                  <span>{item.label}</span>
                                  {currentPage === item.id && (
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (link === 'Foundation') {
                    const isFoundationActive = ['Foundation', 'Foundation & Impact', 'Odu\'a Foundation', 'Impact', 'Golden Jubilee'].includes(currentPage);
                    return (
                      <div 
                        key={link} 
                        ref={foundationDropdownRef}
                        className="relative"
                        onMouseEnter={() => setIsFoundationDropdownOpen(true)}
                        onMouseLeave={() => setIsFoundationDropdownOpen(false)}
                      >
                        <button
                          onClick={() => {
                            setCurrentPage('Odu\'a Foundation');
                            setIsFoundationDropdownOpen(false);
                          }}
                          className={`px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                            isFoundationActive 
                              ? isHeaderLight
                                ? 'bg-neutral-100/90 text-neutral-950 font-black shadow-xs'
                                : 'bg-white/20 text-white shadow-xs'
                              : isHeaderLight
                              ? 'text-neutral-700 hover:bg-neutral-100/70 hover:text-neutral-950'
                              : 'text-neutral-200 hover:bg-white/10 hover:text-white'
                          }`}
                          style={isFoundationActive ? { color: isHeaderLight ? currentTheme.primary : currentTheme.secondary } : undefined}
                        >
                          <span>{link}</span>
                          <ChevronDown className={`w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-200 opacity-70 ${isFoundationDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isFoundationDropdownOpen && (
                          <div className="absolute left-0 top-full pt-1 w-56 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                            <div className="rounded-xl bg-white text-neutral-800 shadow-xl border border-neutral-100 py-1.5">
                              {[
                                { id: 'Odu\'a Foundation', label: 'The Odu\'a Foundation' },
                                { id: 'Golden Jubilee', label: '50-Year Golden Jubilee' }
                              ].map((item) => (
                                <button
                                  key={item.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentPage(item.id);
                                    setIsFoundationDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold transition-all hover:bg-neutral-50 flex items-center justify-between ${
                                    currentPage === item.id 
                                      ? 'bg-neutral-50 font-bold' 
                                      : 'text-neutral-700 hover:text-neutral-950'
                                  }`}
                                  style={currentPage === item.id ? { color: currentTheme.primary } : undefined}
                                >
                                  <span>{item.label}</span>
                                  {currentPage === item.id && (
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                                  )}
                                </button>
                              ))}

                              {/* Official External Link to odif.ng */}
                              <div className="border-t border-neutral-100 my-1" />
                              <a
                                href="https://www.odif.ng/"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsFoundationDropdownOpen(false)}
                                className="w-full text-left px-3.5 py-2 text-xs font-semibold text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 transition-all flex items-center justify-between group"
                              >
                                <span className="flex items-center gap-1.5">
                                  <span>Official Portal (odif.ng)</span>
                                </span>
                                <ExternalLink className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (link === 'Media') {
                    const isMediaActive = ['Media', 'News & Events', 'Museum and Hall Of Fame', 'DISCLAIMERS'].includes(currentPage);
                    return (
                      <div 
                        key={link} 
                        ref={mediaDropdownRef}
                        className="relative"
                        onMouseEnter={() => setIsMediaDropdownOpen(true)}
                        onMouseLeave={() => setIsMediaDropdownOpen(false)}
                      >
                        <button
                          onClick={() => {
                            setCurrentPage('Media');
                            setIsMediaDropdownOpen(false);
                          }}
                          className={`px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                            isMediaActive 
                              ? isHeaderLight
                                ? 'bg-neutral-100/90 text-neutral-950 font-black shadow-xs'
                                : 'bg-white/20 text-white shadow-xs'
                              : isHeaderLight
                              ? 'text-neutral-700 hover:bg-neutral-100/70 hover:text-neutral-950'
                              : 'text-neutral-200 hover:bg-white/10 hover:text-white'
                          }`}
                          style={isMediaActive ? { color: isHeaderLight ? currentTheme.primary : currentTheme.secondary } : undefined}
                        >
                          <span>{link}</span>
                          <ChevronDown className={`w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-200 opacity-70 ${isMediaDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isMediaDropdownOpen && (
                          <div className="absolute left-0 top-full pt-1 w-56 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                            <div className="rounded-xl bg-white text-neutral-800 shadow-xl border border-neutral-100 py-1.5">
                              {[
                                { id: 'News & Events', label: 'News & Events' },
                                { id: 'Museum and Hall Of Fame', label: 'Museum & Hall of Fame' },
                                { id: 'DISCLAIMERS', label: 'Disclaimers' }
                              ].map((item) => (
                                <button
                                  key={item.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentPage(item.id);
                                    setIsMediaDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold transition-all hover:bg-neutral-50 flex items-center justify-between ${
                                    currentPage === item.id 
                                      ? 'bg-neutral-50 font-bold' 
                                      : 'text-neutral-700 hover:text-neutral-950'
                                  }`}
                                  style={currentPage === item.id ? { color: currentTheme.primary } : undefined}
                                >
                                  <span>{item.label}</span>
                                  {currentPage === item.id && (
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  const targetPage = link === 'Contact' ? 'Contact Us' : link;
                  const isActive = currentPage === targetPage || currentPage === link;
                  return (
                    <button
                      key={link}
                      onClick={() => setCurrentPage(targetPage)}
                      className={`px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        isActive 
                          ? isHeaderLight
                            ? 'bg-neutral-100/90 text-neutral-950 font-black shadow-xs'
                            : 'bg-white/20 text-white shadow-xs'
                          : isHeaderLight
                          ? 'text-neutral-700 hover:bg-neutral-100/70 hover:text-neutral-950'
                          : 'text-neutral-200 hover:bg-white/10 hover:text-white'
                      }`}
                      style={isActive ? { color: isHeaderLight ? currentTheme.primary : currentTheme.secondary } : undefined}
                    >
                      {link}
                    </button>
                  );
                })}
              </nav>

              {/* Right Side Header Action CTA */}
              <div className="hidden lg:flex items-center shrink-0 pl-1 xl:pl-2">
                <button 
                  onClick={() => setIsPartnerModalOpen(true)}
                  className="font-extrabold text-[11px] xl:text-xs uppercase tracking-wider px-3.5 py-2 xl:px-5 xl:py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                  style={{ 
                    backgroundColor: isHeaderLight ? currentTheme.primary : currentTheme.secondary,
                    color: isHeaderLight ? '#ffffff' : '#0a0a0a'
                  }}
                >
                  Partner With Us
                </button>
              </div>

              {/* Mobile Hamburger Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-xl transition-colors focus:outline-none ${
                  isHeaderLight ? 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>
          </div>

          {/* Mobile Slide-down Navigation Overlay */}
          {isMobileMenuOpen && (
            <div 
              className="lg:hidden absolute right-4 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl border bg-white text-neutral-800 p-4 z-50 animate-in fade-in slide-in-from-top-3 duration-200"
              style={{ 
                borderColor: wpHeaderStyle === 'white-topbar' ? '#e4e4e7' : 'rgba(0,0,0,0.08)',
                backgroundColor: '#ffffff'
              }}
            >
              <nav className="space-y-1.5 flex flex-col text-left text-xs uppercase font-bold tracking-wider">
                {navLinks.map((link) => {
                  if (link === 'About Us') {
                    const isAboutActive = ['About Us', 'Who We Are', 'Our History', 'Board of Directors', 'Leadership Team'].includes(currentPage);
                    return (
                      <div key={link} className="space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 w-full">
                          <button
                            onClick={() => {
                              setCurrentPage('About Us');
                              setIsMobileMenuOpen(false);
                            }}
                            className={`p-2.5 rounded-xl transition-all flex-grow text-left cursor-pointer ${
                              isAboutActive 
                                ? 'bg-neutral-100 font-extrabold shadow-sm' 
                                : 'text-neutral-700 hover:bg-neutral-50'
                            }`}
                            style={isAboutActive ? { color: currentTheme.primary } : undefined}
                          >
                            {link}
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMobileAboutOpen(!isMobileAboutOpen);
                            }}
                            className="p-2.5 rounded-xl bg-neutral-50 text-neutral-500 hover:bg-neutral-100 cursor-pointer border border-neutral-100/50 flex items-center justify-center shrink-0 w-11 h-10"
                            aria-label="Toggle Submenu"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileAboutOpen ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                        
                        {/* Mobile Expandable Sub-items */}
                        {isMobileAboutOpen && (
                          <div className="pl-3 pr-1 py-1 space-y-1 rounded-xl bg-neutral-50 border border-neutral-100 animate-in fade-in slide-in-from-top-1 duration-150">
                            {[
                              { id: 'Who We Are', label: 'Who We Are' },
                              { id: 'Our History', label: 'Our History' },
                              { id: 'Board of Directors', label: 'Board of Directors' },
                              { id: 'Leadership Team', label: 'Leadership Team' }
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  setCurrentPage(item.id);
                                  setIsMobileMenuOpen(false);
                                  setIsMobileAboutOpen(false);
                                }}
                                className={`p-2 rounded-lg text-[10px] font-bold w-full text-left cursor-pointer transition-colors block ${
                                  currentPage === item.id
                                    ? 'bg-white text-neutral-950 font-black border border-neutral-200/50'
                                    : 'text-neutral-600 hover:bg-neutral-100'
                                }`}
                                style={currentPage === item.id ? { color: currentTheme.primary } : undefined}
                              >
                                — {item.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  
                  if (link === 'Portfolio') {
                    const isPortfolioActive = ['Portfolio', 'Our Subsidiaries', 'Our Associate Companies', 'Ongoing Projects', 'Our Strategic Thrust', 'Our Investment Approach', 'Subsidiaries Directory'].includes(currentPage);
                    return (
                      <div key={link} className="space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 w-full">
                          <button
                            onClick={() => {
                              setCurrentPage('Portfolio');
                              setIsMobileMenuOpen(false);
                            }}
                            className={`p-2.5 rounded-xl transition-all flex-grow text-left cursor-pointer ${
                              isPortfolioActive 
                                ? 'bg-neutral-100 font-extrabold shadow-sm' 
                                : 'text-neutral-700 hover:bg-neutral-50'
                            }`}
                            style={isPortfolioActive ? { color: currentTheme.primary } : undefined}
                          >
                            {link}
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMobilePortfolioOpen(!isMobilePortfolioOpen);
                            }}
                            className="p-2.5 rounded-xl bg-neutral-50 text-neutral-500 hover:bg-neutral-100 cursor-pointer border border-neutral-100/50 flex items-center justify-center shrink-0 w-11 h-10"
                            aria-label="Toggle Submenu"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobilePortfolioOpen ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                        
                        {/* Mobile Expandable Sub-items */}
                        {isMobilePortfolioOpen && (
                          <div className="pl-3 pr-1 py-1 space-y-1 rounded-xl bg-neutral-50 border border-neutral-100 animate-in fade-in slide-in-from-top-1 duration-150">
                            {[
                              { id: 'Our Subsidiaries', label: 'Our Subsidiaries' },
                              { id: 'Our Associate Companies', label: 'Our Associate Companies' },
                              { id: 'Ongoing Projects', label: 'Ongoing Projects' },
                              { id: 'Our Strategic Thrust', label: 'Strategic Thrust' },
                              { id: 'Our Investment Approach', label: 'Investment Approach' },
                              { id: 'Subsidiaries Directory', label: 'Subsidiaries Directory' }
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  setCurrentPage(item.id);
                                  setIsMobileMenuOpen(false);
                                  setIsMobilePortfolioOpen(false);
                                }}
                                className={`p-2 rounded-lg text-[10px] font-bold w-full text-left cursor-pointer transition-colors block ${
                                  currentPage === item.id
                                    ? 'bg-white text-neutral-950 font-black border border-neutral-200/50'
                                    : 'text-neutral-600 hover:bg-neutral-100'
                                }`}
                                style={currentPage === item.id ? { color: currentTheme.primary } : undefined}
                              >
                                — {item.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (link === 'Governance') {
                    const isGovernanceActive = ['Governance', 'Investors', 'Our Governance', 'Governance & Whistleblowing', 'Managing Risk', 'Managing Risks'].includes(currentPage);
                    return (
                      <div key={link} className="space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 w-full">
                          <button
                            onClick={() => {
                              setCurrentPage('Our Governance');
                              setIsMobileMenuOpen(false);
                            }}
                            className={`p-2.5 rounded-xl transition-all flex-grow text-left cursor-pointer ${
                              isGovernanceActive 
                                ? 'bg-neutral-100 font-extrabold shadow-sm' 
                                : 'text-neutral-700 hover:bg-neutral-50'
                            }`}
                            style={isGovernanceActive ? { color: currentTheme.primary } : undefined}
                          >
                            {link}
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMobileGovernanceOpen(!isMobileGovernanceOpen);
                            }}
                            className="p-2.5 rounded-xl bg-neutral-50 text-neutral-500 hover:bg-neutral-100 cursor-pointer border border-neutral-100/50 flex items-center justify-center shrink-0 w-11 h-10"
                            aria-label="Toggle Submenu"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileGovernanceOpen ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                        
                        {/* Mobile Expandable Sub-items */}
                        {isMobileGovernanceOpen && (
                          <div className="pl-3 pr-1 py-1 space-y-1 rounded-xl bg-neutral-50 border border-neutral-100 animate-in fade-in slide-in-from-top-1 duration-150">
                            {[
                              { id: 'Our Governance', label: 'Corporate Governance' },
                              { id: 'Governance & Whistleblowing', label: 'Whistleblowing & Integrity' },
                              { id: 'Managing Risk', label: 'Enterprise Risk Management' }
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  setCurrentPage(item.id);
                                  setIsMobileMenuOpen(false);
                                  setIsMobileGovernanceOpen(false);
                                }}
                                className={`p-2 rounded-lg text-[10px] font-bold w-full text-left cursor-pointer transition-colors block ${
                                  currentPage === item.id
                                    ? 'bg-white text-neutral-950 font-black border border-neutral-200/50'
                                    : 'text-neutral-600 hover:bg-neutral-100'
                                }`}
                                style={currentPage === item.id ? { color: currentTheme.primary } : undefined}
                              >
                                — {item.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (link === 'Foundation') {
                    const isFoundationActive = ['Foundation', 'Foundation & Impact', 'Odu\'a Foundation', 'Impact', 'Golden Jubilee'].includes(currentPage);
                    return (
                      <div key={link} className="space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 w-full">
                          <button
                            onClick={() => {
                              setCurrentPage('Odu\'a Foundation');
                              setIsMobileMenuOpen(false);
                            }}
                            className={`p-2.5 rounded-xl transition-all flex-grow text-left cursor-pointer ${
                              isFoundationActive 
                                ? 'bg-neutral-100 font-extrabold shadow-sm' 
                                : 'text-neutral-700 hover:bg-neutral-50'
                            }`}
                            style={isFoundationActive ? { color: currentTheme.primary } : undefined}
                          >
                            {link}
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMobileFoundationOpen(!isMobileFoundationOpen);
                            }}
                            className="p-2.5 rounded-xl bg-neutral-50 text-neutral-500 hover:bg-neutral-100 cursor-pointer border border-neutral-100/50 flex items-center justify-center shrink-0 w-11 h-10"
                            aria-label="Toggle Submenu"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileFoundationOpen ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                        
                        {/* Mobile Expandable Sub-items */}
                        {isMobileFoundationOpen && (
                          <div className="pl-3 pr-1 py-1 space-y-1 rounded-xl bg-neutral-50 border border-neutral-100 animate-in fade-in slide-in-from-top-1 duration-150">
                            {[
                              { id: 'Odu\'a Foundation', label: 'The Odu\'a Foundation' },
                              { id: 'Golden Jubilee', label: '50-Year Golden Jubilee' }
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  setCurrentPage(item.id);
                                  setIsMobileMenuOpen(false);
                                  setIsMobileFoundationOpen(false);
                                }}
                                className={`p-2 rounded-lg text-[10px] font-bold w-full text-left cursor-pointer transition-colors block ${
                                  currentPage === item.id
                                    ? 'bg-white text-neutral-950 font-black border border-neutral-200/50'
                                    : 'text-neutral-600 hover:bg-neutral-100'
                                }`}
                                style={currentPage === item.id ? { color: currentTheme.primary } : undefined}
                              >
                                — {item.label}
                              </button>
                            ))}
                            <a
                              href="https://www.odif.ng/"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileFoundationOpen(false);
                              }}
                              className="p-2 rounded-lg text-[10px] font-bold w-full text-left cursor-pointer transition-colors flex items-center justify-between text-emerald-700 bg-emerald-50/70 border border-emerald-200/60"
                            >
                              <span>↗ Official Portal (odif.ng)</span>
                              <ExternalLink className="w-3 h-3 text-emerald-600" />
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (link === 'Media') {
                    const isMediaActive = ['Media', 'News & Events', 'Museum and Hall Of Fame', 'DISCLAIMERS'].includes(currentPage);
                    return (
                      <div key={link} className="space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 w-full">
                          <button
                            onClick={() => {
                              setCurrentPage('Media');
                              setIsMobileMenuOpen(false);
                            }}
                            className={`p-2.5 rounded-xl transition-all flex-grow text-left cursor-pointer ${
                              isMediaActive 
                                ? 'bg-neutral-100 font-extrabold shadow-sm' 
                                : 'text-neutral-700 hover:bg-neutral-50'
                            }`}
                            style={isMediaActive ? { color: currentTheme.primary } : undefined}
                          >
                            {link}
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMobileMediaOpen(!isMobileMediaOpen);
                            }}
                            className="p-2.5 rounded-xl bg-neutral-50 text-neutral-500 hover:bg-neutral-100 cursor-pointer border border-neutral-100/50 flex items-center justify-center shrink-0 w-11 h-10"
                            aria-label="Toggle Submenu"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileMediaOpen ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                        
                        {/* Mobile Expandable Sub-items */}
                        {isMobileMediaOpen && (
                          <div className="pl-3 pr-1 py-1 space-y-1 rounded-xl bg-neutral-50 border border-neutral-100 animate-in fade-in slide-in-from-top-1 duration-150">
                            {[
                              { id: 'News & Events', label: 'News & Events' },
                              { id: 'Museum and Hall Of Fame', label: 'Museum & Hall of Fame' },
                              { id: 'DISCLAIMERS', label: 'Disclaimers' }
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  setCurrentPage(item.id);
                                  setIsMobileMenuOpen(false);
                                  setIsMobileMediaOpen(false);
                                }}
                                className={`p-2 rounded-lg text-[10px] font-bold w-full text-left cursor-pointer transition-colors block ${
                                  currentPage === item.id
                                    ? 'bg-white text-neutral-950 font-black border border-neutral-200/50'
                                    : 'text-neutral-600 hover:bg-neutral-100'
                                }`}
                                style={currentPage === item.id ? { color: currentTheme.primary } : undefined}
                              >
                                — {item.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  
                  const targetPage = link === 'Contact' ? 'Contact Us' : link;
                  const isActive = currentPage === targetPage || currentPage === link;
                  return (
                    <button
                      key={link}
                      onClick={() => {
                        setCurrentPage(targetPage);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`p-2.5 rounded-xl transition-all w-full text-left cursor-pointer ${
                        isActive 
                          ? 'bg-neutral-100 font-extrabold shadow-sm' 
                          : 'text-neutral-700 hover:bg-neutral-50'
                      }`}
                      style={isActive ? { color: currentTheme.primary } : undefined}
                    >
                      {link}
                    </button>
                  );
                })}
                <div className="pt-2.5 border-t border-neutral-100">
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsPartnerModalOpen(true);
                    }}
                    className="w-full text-center py-2.5 rounded-xl block tracking-wider shadow-sm cursor-pointer font-black text-xs"
                    style={{ 
                      backgroundColor: currentTheme.primary,
                      color: '#ffffff'
                    }}
                  >
                    Partner With Us
                  </button>
                </div>
              </nav>
            </div>
          )}
        </header>
        )}

        {/* 4. RENDER ACTIVE DYNAMIC PAGE IN MULTI-PAGE ROUTER */}
        <main className={`flex-1 flex flex-col ${currentPage === 'Admin' ? 'h-screen overflow-hidden' : 'overflow-x-hidden'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={`flex-1 flex flex-col ${currentPage === 'Admin' ? 'h-full overflow-hidden' : ''}`}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* 5. DYNAMIC MODULAR FOOTER (Supports 5 Architectures: Corporate Dark, Executive Heritage, Minimal Clean, Sovereign Mega, Modern Bento) */}
        {currentPage !== 'Admin' && (
          <Footer 
            footerStyle={wpFooterStyle}
            currentTheme={currentTheme}
            activeGeneralSettings={activeGeneralSettings}
            navLinks={navLinks}
            isPortalMode={isPortalMode}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            navigateToPage={navigateToPage}
            setIsCalculatorOpen={setIsCalculatorOpen}
            southwestStates={southwestStates}
          />
        )}

      </div> {/* End Boxed Layout Frame wrapper */}

      {/* Floating Return to Admin ribbon when in Live Preview / Site mode */}
      {isPortalMode && currentPage !== 'Admin' && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-neutral-950/95 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-neutral-800 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-neutral-300">Live Preview: <strong className="text-white">{currentPage}</strong></span>
          </div>
          <div className="w-px h-4 bg-neutral-800"></div>
          <button
            onClick={() => navigateToPage('Admin')}
            className="px-3.5 py-1.5 bg-[#00a757] hover:bg-[#008f49] text-white rounded-xl text-xs font-bold transition-all shadow flex items-center gap-1.5 cursor-pointer"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Admin Console</span>
          </button>
        </div>
      )}

      {/* 6. GENERAL INVESTMENT PARTNERSHIP MODAL */}
      <PartnerModal 
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        onSubmit={handlePartnerSubmit}
        form={partnerForm}
        setForm={setPartnerForm}
        submitted={partnerSubmitted}
      />

      {/* 6B. INVESTMENT YIELD & CO-CAPITAL CALCULATOR MODAL */}
      <InvestmentCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onOpenPartnerModal={() => {
          setIsCalculatorOpen(false);
          setIsPartnerModalOpen(true);
        }}
      />


    </div>
  );
}
