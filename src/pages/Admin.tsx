import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  Settings, 
  FileText, 
  Briefcase, 
  FolderGit, 
  Mail, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Check, 
  LogOut, 
  Eye, 
  AlertCircle,
  Calendar,
  Layers,
  MapPin,
  Building2,
  DollarSign,
  BriefcaseBusiness,
  Users,
  ShieldAlert,
  HeartHandshake,
  BookOpenCheck,
  HelpCircle,
  DownloadCloud,
  Scale,
  History,
  Sliders,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Heart,
  FileSpreadsheet,
  LayoutGrid,
  Menu,
  Image as ImageIcon,
  GripVertical,
  Home as HomeIcon,
  Sparkles,
  ArrowUpRight,
  Type
} from 'lucide-react';
import { NewsCard, Project } from '../types';
import { ImageUploader } from '../components/ImageUploader';
import { DragDropPageBuilder } from '../components/DragDropPageBuilder';
import { DragDropMenuBuilder, MenuItem, DEFAULT_MENU_ITEMS } from '../components/DragDropMenuBuilder';
import { DragDropMediaLibrary, MediaItem } from '../components/DragDropMediaLibrary';
import { DragDropDashboardWidgets, DashboardWidget, DEFAULT_DASHBOARD_WIDGETS } from '../components/DragDropDashboardWidgets';
import SiteWideTextEditor from '../components/SiteWideTextEditor';

interface AdminProps {
  setCurrentPage?: (page: string) => void;
  onExitPortal?: () => void;
  onContentChange?: (updatedDb: any) => void;
}

export default function Admin({ 
  setCurrentPage, 
  onExitPortal,
  onContentChange
}: AdminProps) {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('odua_admin_authenticated');
    return saved !== 'false';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Loaded database state
  const [db, setDb] = useState<any>(() => {
    const cached = localStorage.getItem('odua_cms_db');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fallback to default
      }
    }
    return {
      generalSettings: {
        siteName: "ODU'A",
        tagline: "The Engine Room for Economic Development in Southwest Nigeria",
        phone: "+234 815 145 9359 \n+234 905 464 4944",
        email: "info@oduainvestment.com.ng",
        address: "Floors 20-23, Cocoa House, Oba Adebimpe Road, P.M.B. 5435, Dugbe, Ibadan, Oyo State, Nigeria.",
        assetValue: "₦300B+",
        keySectorsCount: "9",
        vision: "To be a world-class conglomerate, delivering sustainable value to our stakeholders while remaining the undisputed engine of growth for Southwest Nigeria.",
        mission: "To run a commercially viable enterprise focused on high-yield sectors, optimizing asset performance, and creating generation-spanning economic value.",
        coreValues: "Guided strictly by the philosophy of \"Iwa Pele\" (Good Character), structured through Accountability, Enterprise, Integrity, and Collaboration.",
        heroTitle: "Enhancing the legacy for future generations",
        heroSubtitle: "Through strategic investments and efficient management of our diversified portfolio, we are enhancing our rich legacy and unlocking new opportunities that will thrive for generations to come.",
        establishedYear: "1976",
        ownerStatesCount: "6 States",
        coreSubsidiariesCount: "10+",
        facebookUrl: "https://facebook.com/oduainvestmentcompany",
        twitterUrl: "https://twitter.com/oduainvestments",
        linkedinUrl: "https://linkedin.com/company/odua-investment-company-limited",
        youtubeDocId: "eWX37F1H_ZM",
        docRuntime: "36 mins"
      },
      news: [],
      careers: [],
      projects: [],
      inquiries: [],
      subsidiaries: [],
      foundationPrograms: [],
      governancePolicies: [],
      whistleblowerReports: [],
      jubileeEvents: [],
      calculatorSettings: {},
      faqs: [],
      pressDownloads: []
    };
  });

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 
    'site-text-editor' |
    'drag-drop-pages' |
    'drag-drop-menu' |
    'drag-drop-media' |
    'drag-drop-widgets' |
    'home-page' | 
    'about-page' | 
    'who-page' | 
    'history-page' | 
    'portfolio-page' | 
    'news-page' | 
    'careers-page' | 
    'contact-page' | 
    'board-page' | 
    'leadership-page' | 
    'history-milestones-page' | 
    'southwest-states-page' |
    'subsidiaries-page' |
    'foundation-page' |
    'governance-page' |
    'whistleblower-page' |
    'jubilee-page' |
    'calculator-page' |
    'faqs-page' |
    'downloads-page'
  >('dashboard');

  // Stats
  const [stats, setStats] = useState({
    uniqueVisitors: 4520,
    pageViews: 18450,
    activeSessions: 34,
    totalInquiries: 0
  });

  // Editor states
  const [editGeneral, setEditGeneral] = useState({ ...db.generalSettings });
  
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [isNewsFormOpen, setIsNewsFormOpen] = useState(false);
  const [newsError, setNewsError] = useState('');

  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [jobError, setJobError] = useState('');

  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [projectError, setProjectError] = useState('');

  // Board & Leadership states
  const [selectedBoard, setSelectedBoard] = useState<any | null>(null);
  const [isBoardFormOpen, setIsBoardFormOpen] = useState(false);
  const [boardError, setBoardError] = useState('');

  const [selectedLeader, setSelectedLeader] = useState<any | null>(null);
  const [isLeaderFormOpen, setIsLeaderFormOpen] = useState(false);
  const [leaderError, setLeaderError] = useState('');

  // History Milestone states
  const [selectedMilestone, setSelectedMilestone] = useState<any | null>(null);
  const [isMilestoneFormOpen, setIsMilestoneFormOpen] = useState(false);
  const [milestoneError, setMilestoneError] = useState('');

  // Southwest State states
  const [selectedStateCMS, setSelectedStateCMS] = useState<any | null>(null);
  const [isStateFormOpen, setIsStateFormOpen] = useState(false);
  const [stateError, setStateError] = useState('');

  // Subsidiaries states
  const [selectedSubsidiary, setSelectedSubsidiary] = useState<any | null>(null);
  const [isSubsidiaryFormOpen, setIsSubsidiaryFormOpen] = useState(false);
  const [subsidiaryError, setSubsidiaryError] = useState('');

  // Foundation states
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null);
  const [isProgramFormOpen, setIsProgramFormOpen] = useState(false);
  const [programError, setProgramError] = useState('');

  // Governance policies states
  const [selectedPolicy, setSelectedPolicy] = useState<any | null>(null);
  const [isPolicyFormOpen, setIsPolicyFormOpen] = useState(false);
  const [policyError, setPolicyError] = useState('');

  // Whistleblower review states
  const [selectedWhistleblower, setSelectedWhistleblower] = useState<any | null>(null);
  const [isWhistleblowerReviewOpen, setIsWhistleblowerReviewOpen] = useState(false);

  // Jubilee milestones states
  const [selectedJubileeEvent, setSelectedJubileeEvent] = useState<any | null>(null);
  const [isJubileeEventFormOpen, setIsJubileeEventFormOpen] = useState(false);
  const [jubileeError, setJubileeError] = useState('');

  // Calculator macro settings
  const [editCalculator, setEditCalculator] = useState<any>(db.calculatorSettings || {});

  // FAQs states
  const [selectedFaq, setSelectedFaq] = useState<any | null>(null);
  const [isFaqFormOpen, setIsFaqFormOpen] = useState(false);
  const [faqError, setFaqError] = useState('');

  // Downloads states
  const [selectedDownload, setSelectedDownload] = useState<any | null>(null);
  const [isDownloadFormOpen, setIsDownloadFormOpen] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  // Drag & Drop Visual Builder States
  const [selectedBuilderPage, setSelectedBuilderPage] = useState<string>('Home');
  const [dashboardWidgets, setDashboardWidgets] = useState<DashboardWidget[]>(DEFAULT_DASHBOARD_WIDGETS);
  const [menuBuilderItems, setMenuBuilderItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('odua_custom_menu');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_MENU_ITEMS;
  });
  const [mediaLibraryItems, setMediaLibraryItems] = useState<MediaItem[]>([
    { id: 'm1', url: 'https://i.postimg.cc/gj0gKfZ7/cocoa-house.jpg', title: 'Cocoa House Headquarters', date: '2025-06-15', size: '1.2 MB' },
    { id: 'm2', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=800', title: 'WEMABOD Real Estate Estate Development', date: '2025-07-20', size: '940 KB' },
    { id: 'm3', url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800', title: 'SWAgCo Cashew Plantation Farm', date: '2025-08-11', size: '1.4 MB' },
    { id: 'm4', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', title: 'Lagos Island Corporate Tower', date: '2025-09-02', size: '820 KB' },
    { id: 'm5', url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800', title: 'Board of Directors Strategy Summit', date: '2025-10-18', size: '1.1 MB' },
    { id: 'm6', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800', title: 'Odu’a Foundation STEM Youth Hub', date: '2025-11-05', size: '750 KB' },
  ]);

  const [statusMessage, setStatusMessage] = useState({ text: '', isError: false });

  // Broadcast updates immediately to live website, other tabs, and parent application
  const broadcastCmsUpdate = (data: any) => {
    if (!data) return;
    try {
      localStorage.setItem('odua_cms_db', JSON.stringify(data));
      localStorage.setItem('odua_cms_timestamp', Date.now().toString());
    } catch (e) {}

    if (onContentChange) {
      onContentChange(data);
    }

    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const ch = new BroadcastChannel('odua_cms_sync');
        ch.postMessage({ type: 'CMS_UPDATED', payload: data, timestamp: Date.now() });
        ch.close();
      }
    } catch (e) {}

    try {
      window.dispatchEvent(new CustomEvent('odua_cms_updated', { detail: data }));
    } catch (e) {}
  };

  // Fetch full website content (always live, non-cached)
  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/content?t=' + Date.now(), { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setDb(data);
        setEditGeneral(data.generalSettings);
        if (data.calculatorSettings) setEditCalculator(data.calculatorSettings);
        broadcastCmsUpdate(data);
      } else {
        throw new Error('API responded with non-200');
      }
    } catch (err) {
      console.warn("Failed to load backend CMS data, checking localStorage fallback:", err);
      const cached = localStorage.getItem('odua_cms_db');
      if (cached) {
        try {
          const data = JSON.parse(cached);
          setDb(data);
          setEditGeneral(data.generalSettings);
          if (data.calculatorSettings) setEditCalculator(data.calculatorSettings);
          broadcastCmsUpdate(data);
        } catch (e) {
          console.error("Failed to parse cached database:", e);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to load statistics:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchContent();
      fetchStats();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIsAuthenticated(true);
          localStorage.setItem('odua_admin_authenticated', 'true');
          setPasscode('');
          return;
        } else {
          setAuthError(data.message || 'Access Denied.');
          return;
        }
      }
      throw new Error('Non-2xx status');
    } catch (err) {
      // Robust client-side fallback authentication so admin login always works
      // even in static/unreachable backend contexts like Vercel
      const correctPasscode = 'oduaadmin2026';
      if (passcode === correctPasscode) {
        setIsAuthenticated(true);
        localStorage.setItem('odua_admin_authenticated', 'true');
        setPasscode('');
        console.info("Authenticated successfully via client-side fallback.");
      } else {
        setAuthError('Invalid passcode. Access Denied.');
      }
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('odua_admin_authenticated');
    if (onExitPortal) {
      onExitPortal();
    }
  };

  // Trigger temporary status banner
  const triggerBanner = (text: string, isError = false) => {
    setStatusMessage({ text, isError });
    setTimeout(() => {
      setStatusMessage({ text: '', isError: false });
    }, 4000);
  };

  // Helper for falling back to default page blocks if not yet stored
  const getPageBlocksFallback = (pName: string, existingBlocks?: any[]) => {
    if (Array.isArray(existingBlocks) && existingBlocks.length > 0) return [...existingBlocks];
    if (pName.toLowerCase() === 'home') {
      return [
        { id: 'b_hero', type: 'hero', title: 'Hero Banner', visible: true, data: { badge: '', title: "Enhancing the legacy for future generations", subtitle: "Through strategic investments and efficient management of our diversified portfolio, we are enhancing our rich legacy and unlocking new opportunities that will thrive for generations to come.", bannerImage: 'https://i.postimg.cc/gj0gKfZ7/cocoa-house.jpg', primaryBtnText: 'Learn More', secondaryBtnText: '' } },
        { id: 'b_stats', type: 'stats', title: 'Sovereign Metrics Bar', visible: true, data: { stat1Value: '₦300B+', stat1Label: 'Asset Foundation', stat2Value: '6 States', stat2Label: 'Southwest Shareholders', stat3Value: '1976', stat3Label: '50-Year Heritage', stat4Value: '25+', stat4Label: 'Active Ventures' } },
        { id: 'b_states', type: 'states', title: 'SW Sovereign States Grid', visible: true, data: { title: 'The 6 Owner States of Southwest Nigeria' } },
        { id: 'b_strategy', type: 'strategy', title: 'Strategic Thrust & Mandate', visible: true, data: { title: 'Our Core Strategic Thrust', subtitle: 'Transforming legacy strengths into global market competitive advantages.' } },
        { id: 'b_projects', type: 'projects', title: 'Featured Projects Showcase', visible: true, data: { title: 'Flagship Strategic Projects' } },
        { id: 'b_cta', type: 'cta_banner', title: 'Joint Ventures CTA Banner', visible: true, data: { title: 'Co-Invest in Southwest Industrialization', subtitle: 'Partner with Odu\'a Group across high-yield infrastructure, agro-allied processing, and green energy.', primaryBtnText: 'Request Prospectus', secondaryBtnText: 'Contact Secretariat' } },
        { id: 'b_news', type: 'news', title: 'Latest Corporate News', visible: true, data: { title: 'Latest Group Developments' } }
      ];
    }
    return [
      { id: 'b_hero_' + Date.now(), type: 'hero', title: `${pName} Banner`, visible: true, data: { title: pName, subtitle: `Official executive portal for ${pName}.`, primaryBtnText: 'Learn More', secondaryBtnText: 'Contact Us' } },
      { id: 'b_content_' + Date.now(), type: 'rich_text', title: 'Executive Overview', visible: true, data: { title: `About ${pName}`, content: `Information regarding ${pName} under the Odu'a Group management mandate.` } },
      { id: 'b_contact_' + Date.now(), type: 'contact_box', title: 'Contact & Inquiries', visible: true, data: { title: `Inquire about ${pName}` } }
    ];
  };

  // Save General settings
  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/content/general', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editGeneral)
      });
      if (res.ok) {
        const data = await res.json();
        const updatedDb = { ...db, generalSettings: data.generalSettings };
        setDb(updatedDb);
        broadcastCmsUpdate(updatedDb);
        triggerBanner('General website metrics and descriptions updated successfully!');
      } else {
        throw new Error('Failed to save general settings');
      }
    } catch (err) {
      const updatedDb = { ...db, generalSettings: editGeneral };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('General metrics updated locally in browser storage (offline mode)!');
    }
  };

  // Save / Add News Article
  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsError('');
    if (!selectedNews.title) {
      setNewsError('Article title is required.');
      return;
    }
    try {
      const res = await fetch('/api/content/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedNews)
      });
      if (res.ok) {
        triggerBanner(selectedNews.id ? 'News article updated successfully!' : 'New news article published successfully!');
        setIsNewsFormOpen(false);
        setSelectedNews(null);
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updatedNews = [...(db.news || [])];
      const article = { ...selectedNews };
      if (!article.id) {
        article.id = 'news-' + Date.now();
        updatedNews.unshift(article);
      } else {
        const idx = updatedNews.findIndex((item: any) => String(item.id) === String(article.id));
        if (idx !== -1) {
          updatedNews[idx] = article;
        } else {
          updatedNews.unshift(article);
        }
      }
      const updatedDb = { ...db, news: updatedNews };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      
      triggerBanner(selectedNews.id ? 'News article updated locally!' : 'New news article published locally in browser storage!');
      setIsNewsFormOpen(false);
      setSelectedNews(null);
    }
  };

  // Delete news item
  const handleDeleteNews = async (id: string | number) => {
    if (!confirm('Are you absolutely sure you want to delete this news article?')) return;
    try {
      const res = await fetch(`/api/content/news/${id}`, { method: 'DELETE' });
      if (res.ok) {
        triggerBanner('Article deleted successfully.');
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updatedNews = (db.news || []).filter((item: any) => String(item.id) !== String(id));
      const updatedDb = { ...db, news: updatedNews };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Article deleted locally from browser storage.');
    }
  };

  // Save / Add Career Opening
  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setJobError('');
    if (!selectedJob.title || !selectedJob.division) {
      setJobError('Title and Division are required fields.');
      return;
    }
    try {
      const res = await fetch('/api/content/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedJob)
      });
      if (res.ok) {
        triggerBanner(selectedJob.id ? 'Job listing updated successfully!' : 'New job vacancy posted successfully!');
        setIsJobFormOpen(false);
        setSelectedJob(null);
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updatedCareers = [...(db.careers || [])];
      const job = { ...selectedJob };
      if (!job.id) {
        job.id = 'job-' + Date.now();
        updatedCareers.push(job);
      } else {
        const idx = updatedCareers.findIndex((item: any) => String(item.id) === String(job.id));
        if (idx !== -1) {
          updatedCareers[idx] = job;
        } else {
          updatedCareers.push(job);
        }
      }
      const updatedDb = { ...db, careers: updatedCareers };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      
      triggerBanner(selectedJob.id ? 'Job listing updated locally!' : 'New job vacancy posted locally in browser storage!');
      setIsJobFormOpen(false);
      setSelectedJob(null);
    }
  };

  // Delete career vacancy
  const handleDeleteJob = async (id: string | number) => {
    if (!confirm('Are you sure you want to remove this job vacancy listing?')) return;
    try {
      const res = await fetch(`/api/content/careers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        triggerBanner('Job listing deleted successfully.');
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updatedCareers = (db.careers || []).filter((item: any) => String(item.id) !== String(id));
      const updatedDb = { ...db, careers: updatedCareers };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Job listing removed locally from browser storage.');
    }
  };

  // Save / Add Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setProjectError('');
    if (!selectedProject.title || !selectedProject.sector) {
      setProjectError('Project title and sector category are required.');
      return;
    }
    try {
      const res = await fetch('/api/content/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedProject)
      });
      if (res.ok) {
        triggerBanner(selectedProject.id ? 'Project updated successfully!' : 'New project posted successfully!');
        setIsProjectFormOpen(false);
        setSelectedProject(null);
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updatedProjects = [...(db.projects || [])];
      const project = { ...selectedProject };
      if (!project.id) {
        project.id = 'project-' + Date.now();
        updatedProjects.push(project);
      } else {
        const idx = updatedProjects.findIndex((item: any) => String(item.id) === String(project.id));
        if (idx !== -1) {
          updatedProjects[idx] = project;
        } else {
          updatedProjects.push(project);
        }
      }
      const updatedDb = { ...db, projects: updatedProjects };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      
      triggerBanner(selectedProject.id ? 'Project updated locally!' : 'New project posted locally in browser storage!');
      setIsProjectFormOpen(false);
      setSelectedProject(null);
    }
  };

  // Delete project
  const handleDeleteProject = async (id: string | number) => {
    if (!confirm('Are you sure you want to remove this project?')) return;
    try {
      const res = await fetch(`/api/content/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        triggerBanner('Project deleted successfully.');
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updatedProjects = (db.projects || []).filter((item: any) => String(item.id) !== String(id));
      const updatedDb = { ...db, projects: updatedProjects };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Project removed locally from browser storage.');
    }
  };

  // Open news editor for create or update
  const openNewsEditor = (item: any | null = null) => {
    setNewsError('');
    if (item) {
      setSelectedNews({ ...item });
    } else {
      setSelectedNews({
        title: '',
        category: 'News & Events',
        date: new Date().toISOString().split('T')[0],
        summary: '',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
        content: '',
        author: 'Corporate Communications'
      });
    }
    setIsNewsFormOpen(true);
  };

  // Open job editor
  const openJobEditor = (item: any | null = null) => {
    setJobError('');
    if (item) {
      setSelectedJob({ ...item });
    } else {
      setSelectedJob({
        title: '',
        division: 'Wemabod Limited',
        location: 'Lagos State',
        type: 'Full-Time',
        desc: ''
      });
    }
    setIsJobFormOpen(true);
  };

  // Open project editor
  const openProjectEditor = (item: any | null = null) => {
    setProjectError('');
    if (item) {
      setSelectedProject({ ...item });
    } else {
      setSelectedProject({
        title: '',
        location: '',
        sector: 'Real Estate & Hospitality',
        status: 'Ongoing',
        description: '',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80'
      });
    }
    setIsProjectFormOpen(true);
  };

  // Board of Directors Editor Helpers
  const openBoardEditor = (item: any | null = null) => {
    setBoardError('');
    if (item) {
      setSelectedBoard({
        ...item,
        achievements: Array.isArray(item.achievements) ? item.achievements.join('\n') : (item.achievements || ''),
        details: Array.isArray(item.details) ? item.details.join('\n') : (item.details || '')
      });
    } else {
      setSelectedBoard({
        name: '',
        role: '',
        title: 'Director, Odu’a Board',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
        initials: '',
        achievements: '',
        details: ''
      });
    }
    setIsBoardFormOpen(true);
  };

  const handleSaveBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    setBoardError('');
    if (!selectedBoard.name || !selectedBoard.role) {
      setBoardError('Name and Role are required.');
      return;
    }

    const achievementsArray = typeof selectedBoard.achievements === 'string'
      ? selectedBoard.achievements.split('\n').map((line: string) => line.trim()).filter((line: string) => line.length > 0)
      : (selectedBoard.achievements || []);

    const detailsArray = typeof selectedBoard.details === 'string'
      ? selectedBoard.details.split('\n').map((line: string) => line.trim()).filter((line: string) => line.length > 0)
      : (selectedBoard.details || []);

    const payload = {
      ...selectedBoard,
      achievements: achievementsArray,
      details: detailsArray,
      initials: selectedBoard.initials || (selectedBoard.name ? selectedBoard.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : 'OD')
    };

    try {
      const res = await fetch('/api/content/board', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        triggerBanner(selectedBoard.id ? 'Board member updated successfully!' : 'New board member added successfully!');
        setIsBoardFormOpen(false);
        setSelectedBoard(null);
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = [...(db.boardMembers || [])];
      if (!payload.id) {
        payload.id = 'board-' + Date.now();
        updated.push(payload);
      } else {
        const idx = updated.findIndex((item: any) => String(item.id) === String(payload.id));
        if (idx !== -1) updated[idx] = payload;
        else updated.push(payload);
      }
      const updatedDb = { ...db, boardMembers: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Board member saved locally in browser storage!');
      setIsBoardFormOpen(false);
      setSelectedBoard(null);
    }
  };

  const handleDeleteBoard = async (id: string | number) => {
    if (!confirm('Are you sure you want to remove this board member?')) return;
    try {
      const res = await fetch(`/api/content/board/${id}`, { method: 'DELETE' });
      if (res.ok) {
        triggerBanner('Board member deleted successfully.');
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = (db.boardMembers || []).filter((item: any) => String(item.id) !== String(id));
      const updatedDb = { ...db, boardMembers: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Board member deleted locally from browser storage.');
    }
  };

  // Leadership Team Editor Helpers
  const openLeaderEditor = (item: any | null = null) => {
    setLeaderError('');
    if (item) {
      setSelectedLeader({
        ...item,
        achievements: Array.isArray(item.achievements) ? item.achievements.join('\n') : (item.achievements || ''),
        details: Array.isArray(item.details) ? item.details.join('\n') : (item.details || '')
      });
    } else {
      setSelectedLeader({
        name: '',
        role: '',
        title: 'Executive, Odu’a Group',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
        initials: '',
        achievements: '',
        details: ''
      });
    }
    setIsLeaderFormOpen(true);
  };

  const handleSaveLeader = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeaderError('');
    if (!selectedLeader.name || !selectedLeader.role) {
      setLeaderError('Name and Role are required.');
      return;
    }

    const achievementsArray = typeof selectedLeader.achievements === 'string'
      ? selectedLeader.achievements.split('\n').map((line: string) => line.trim()).filter((line: string) => line.length > 0)
      : (selectedLeader.achievements || []);

    const detailsArray = typeof selectedLeader.details === 'string'
      ? selectedLeader.details.split('\n').map((line: string) => line.trim()).filter((line: string) => line.length > 0)
      : (selectedLeader.details || []);

    const payload = {
      ...selectedLeader,
      achievements: achievementsArray,
      details: detailsArray,
      initials: selectedLeader.initials || (selectedLeader.name ? selectedLeader.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : 'OD')
    };

    try {
      const res = await fetch('/api/content/leadership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        triggerBanner(selectedLeader.id ? 'Leader profile updated successfully!' : 'New leader profile added successfully!');
        setIsLeaderFormOpen(false);
        setSelectedLeader(null);
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = [...(db.leadershipTeam || [])];
      if (!payload.id) {
        payload.id = 'leader-' + Date.now();
        updated.push(payload);
      } else {
        const idx = updated.findIndex((item: any) => String(item.id) === String(payload.id));
        if (idx !== -1) updated[idx] = payload;
        else updated.push(payload);
      }
      const updatedDb = { ...db, leadershipTeam: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Leader saved locally in browser storage!');
      setIsLeaderFormOpen(false);
      setSelectedLeader(null);
    }
  };

  const handleDeleteLeader = async (id: string | number) => {
    if (!confirm('Are you sure you want to remove this leader profile?')) return;
    try {
      const res = await fetch(`/api/content/leadership/${id}`, { method: 'DELETE' });
      if (res.ok) {
        triggerBanner('Leader deleted successfully.');
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = (db.leadershipTeam || []).filter((item: any) => String(item.id) !== String(id));
      const updatedDb = { ...db, leadershipTeam: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Leader deleted locally from browser storage.');
    }
  };

  // History Milestone Helpers
  const openMilestoneEditor = (item: any | null = null) => {
    setMilestoneError('');
    if (item) {
      setSelectedMilestone({
        ...item,
        details: Array.isArray(item.details) ? item.details.join('\n') : (item.details || ''),
        metricValue: item.metric?.value || '',
        metricLabel: item.metric?.label || ''
      });
    } else {
      setSelectedMilestone({
        year: '',
        title: '',
        tagline: '',
        summary: '',
        icon: 'building',
        badge: '',
        quote: '',
        details: '',
        metricValue: '',
        metricLabel: '',
        color: 'green'
      });
    }
    setIsMilestoneFormOpen(true);
  };

  const handleSaveMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    setMilestoneError('');
    if (!selectedMilestone.year || !selectedMilestone.title) {
      setMilestoneError('Year and Title are required.');
      return;
    }

    const detailsArray = typeof selectedMilestone.details === 'string'
      ? selectedMilestone.details.split('\n').map((line: string) => line.trim()).filter((line: string) => line.length > 0)
      : (selectedMilestone.details || []);

    const payload = {
      id: selectedMilestone.id,
      year: selectedMilestone.year,
      title: selectedMilestone.title,
      tagline: selectedMilestone.tagline,
      summary: selectedMilestone.summary,
      icon: selectedMilestone.icon || 'building',
      badge: selectedMilestone.badge,
      quote: selectedMilestone.quote,
      details: detailsArray,
      metric: (selectedMilestone.metricValue || selectedMilestone.metricLabel) ? {
        value: selectedMilestone.metricValue,
        label: selectedMilestone.metricLabel
      } : undefined,
      color: selectedMilestone.color || 'green'
    };

    try {
      const res = await fetch('/api/content/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        triggerBanner(selectedMilestone.id ? 'History milestone updated!' : 'New history milestone added!');
        setIsMilestoneFormOpen(false);
        setSelectedMilestone(null);
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = [...(db.historyMilestones || [])];
      if (!payload.id) {
        payload.id = 'milestone-' + Date.now();
        updated.push(payload);
      } else {
        const idx = updated.findIndex((item: any) => String(item.id) === String(payload.id));
        if (idx !== -1) updated[idx] = payload;
        else updated.push(payload);
      }
      const updatedDb = { ...db, historyMilestones: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Milestone saved locally in browser storage!');
      setIsMilestoneFormOpen(false);
      setSelectedMilestone(null);
    }
  };

  const handleDeleteMilestone = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this history milestone?')) return;
    try {
      const res = await fetch(`/api/content/history/${id}`, { method: 'DELETE' });
      if (res.ok) {
        triggerBanner('Milestone deleted successfully.');
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = (db.historyMilestones || []).filter((item: any) => String(item.id) !== String(id));
      const updatedDb = { ...db, historyMilestones: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Milestone deleted locally from browser storage.');
    }
  };

  // Southwest State Helpers
  const openStateEditor = (item: any | null = null) => {
    setStateError('');
    if (item) {
      setSelectedStateCMS({
        ...item,
        keySectors: Array.isArray(item.keySectors) ? item.keySectors.join('\n') : (item.keySectors || '')
      });
    } else {
      setSelectedStateCMS({
        name: '',
        capital: '',
        gdp: '',
        population: '',
        keySectors: '',
        description: ''
      });
    }
    setIsStateFormOpen(true);
  };

  const handleSaveState = async (e: React.FormEvent) => {
    e.preventDefault();
    setStateError('');
    if (!selectedStateCMS.name) {
      setStateError('State Name is required.');
      return;
    }

    const keySectorsArray = typeof selectedStateCMS.keySectors === 'string'
      ? selectedStateCMS.keySectors.split('\n').map((line: string) => line.trim()).filter((line: string) => line.length > 0)
      : (selectedStateCMS.keySectors || []);

    const payload = {
      ...selectedStateCMS,
      keySectors: keySectorsArray
    };

    try {
      const res = await fetch('/api/content/states', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        triggerBanner('Southwest state updated successfully!');
        setIsStateFormOpen(false);
        setSelectedStateCMS(null);
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = [...(db.southwestStates || [])];
      if (!payload.id) {
        payload.id = payload.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        updated.push(payload);
      } else {
        const idx = updated.findIndex((item: any) => String(item.id) === String(payload.id));
        if (idx !== -1) updated[idx] = payload;
        else updated.push(payload);
      }
      const updatedDb = { ...db, southwestStates: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('State metadata saved locally in browser storage!');
      setIsStateFormOpen(false);
      setSelectedStateCMS(null);
    }
  };

  const handleDeleteState = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this state metadata?')) return;
    try {
      const res = await fetch(`/api/content/states/${id}`, { method: 'DELETE' });
      if (res.ok) {
        triggerBanner('State deleted successfully.');
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = (db.southwestStates || []).filter((item: any) => String(item.id) !== String(id));
      const updatedDb = { ...db, southwestStates: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('State deleted locally from browser storage.');
    }
  };

  // Subsidiaries Helpers
  const openSubsidiaryEditor = (item: any | null = null) => {
    setSubsidiaryError('');
    if (item) {
      setSelectedSubsidiary({
        ...item,
        keyAssets: Array.isArray(item.keyAssets) ? item.keyAssets.join('\n') : (item.keyAssets || '')
      });
    } else {
      setSelectedSubsidiary({
        name: '',
        sector: 'Real Estate & Hospitality',
        type: 'Subsidiary (100% Owned)',
        ownership: '100%',
        description: '',
        md: '',
        headquarters: 'Cocoa House, Dugbe, Ibadan',
        website: 'https://',
        status: 'Active Operating',
        logo: 'https://i.postimg.cc/mg37tmcB/logo.png',
        keyAssets: ''
      });
    }
    setIsSubsidiaryFormOpen(true);
  };

  const handleSaveSubsidiary = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubsidiaryError('');
    if (!selectedSubsidiary.name || !selectedSubsidiary.sector) {
      setSubsidiaryError('Company Name and Sector are required.');
      return;
    }
    const assetsArray = typeof selectedSubsidiary.keyAssets === 'string'
      ? selectedSubsidiary.keyAssets.split('\n').map((s: string) => s.trim()).filter(Boolean)
      : (selectedSubsidiary.keyAssets || []);

    const payload = {
      ...selectedSubsidiary,
      keyAssets: assetsArray
    };

    try {
      const res = await fetch('/api/content/subsidiaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        triggerBanner(selectedSubsidiary.id ? 'Subsidiary updated successfully!' : 'New subsidiary added successfully!');
        setIsSubsidiaryFormOpen(false);
        setSelectedSubsidiary(null);
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = [...(db.subsidiaries || [])];
      if (!payload.id) {
        payload.id = 'sub-' + Date.now();
        updated.push(payload);
      } else {
        const idx = updated.findIndex((item: any) => String(item.id) === String(payload.id));
        if (idx !== -1) updated[idx] = payload;
        else updated.push(payload);
      }
      const updatedDb = { ...db, subsidiaries: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Subsidiary saved locally in browser storage!');
      setIsSubsidiaryFormOpen(false);
      setSelectedSubsidiary(null);
    }
  };

  const handleDeleteSubsidiary = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this subsidiary / associate?')) return;
    try {
      const res = await fetch(`/api/content/subsidiaries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        triggerBanner('Subsidiary removed.');
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = (db.subsidiaries || []).filter((item: any) => String(item.id) !== String(id));
      const updatedDb = { ...db, subsidiaries: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Subsidiary removed locally.');
    }
  };

  // Foundation Programs Helpers
  const openProgramEditor = (item: any | null = null) => {
    setProgramError('');
    if (item) {
      setSelectedProgram({ ...item });
    } else {
      setSelectedProgram({
        title: '',
        category: 'Education & Digital Skills',
        desc: '',
        stats: 'Target: 5,000 Beneficiaries',
        budget: '₦50 Million',
        status: 'Active / Open for Applications'
      });
    }
    setIsProgramFormOpen(true);
  };

  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    setProgramError('');
    if (!selectedProgram.title || !selectedProgram.category) {
      setProgramError('Program Title and Pillar Category are required.');
      return;
    }
    try {
      const res = await fetch('/api/content/foundation-programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedProgram)
      });
      if (res.ok) {
        triggerBanner(selectedProgram.id ? 'Foundation initiative updated!' : 'New foundation initiative launched!');
        setIsProgramFormOpen(false);
        setSelectedProgram(null);
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = [...(db.foundationPrograms || [])];
      const prog = { ...selectedProgram };
      if (!prog.id) {
        prog.id = 'prog-' + Date.now();
        updated.push(prog);
      } else {
        const idx = updated.findIndex((item: any) => String(item.id) === String(prog.id));
        if (idx !== -1) updated[idx] = prog;
        else updated.push(prog);
      }
      const updatedDb = { ...db, foundationPrograms: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Foundation program saved locally!');
      setIsProgramFormOpen(false);
      setSelectedProgram(null);
    }
  };

  const handleDeleteProgram = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this Foundation initiative?')) return;
    try {
      const res = await fetch(`/api/content/foundation-programs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        triggerBanner('Foundation program removed.');
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = (db.foundationPrograms || []).filter((item: any) => String(item.id) !== String(id));
      const updatedDb = { ...db, foundationPrograms: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Program deleted locally.');
    }
  };

  // Governance Policies Helpers
  const openPolicyEditor = (item: any | null = null) => {
    setPolicyError('');
    if (item) {
      setSelectedPolicy({ ...item });
    } else {
      setSelectedPolicy({
        title: '',
        category: 'Corporate Governance',
        code: 'ODUA-POL-' + Math.floor(100 + Math.random() * 900),
        effectiveDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        description: '',
        pdfUrl: 'https://oduainvestment.com.ng/governance-charter.pdf',
        status: 'Enforced'
      });
    }
    setIsPolicyFormOpen(true);
  };

  const handleSavePolicy = async (e: React.FormEvent) => {
    e.preventDefault();
    setPolicyError('');
    if (!selectedPolicy.title || !selectedPolicy.category) {
      setPolicyError('Policy Title and Category are required.');
      return;
    }
    try {
      const res = await fetch('/api/content/governance-policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedPolicy)
      });
      if (res.ok) {
        triggerBanner(selectedPolicy.id ? 'Compliance policy updated!' : 'New governance charter uploaded!');
        setIsPolicyFormOpen(false);
        setSelectedPolicy(null);
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = [...(db.governancePolicies || [])];
      const pol = { ...selectedPolicy };
      if (!pol.id) {
        pol.id = 'pol-' + Date.now();
        updated.push(pol);
      } else {
        const idx = updated.findIndex((item: any) => String(item.id) === String(pol.id));
        if (idx !== -1) updated[idx] = pol;
        else updated.push(pol);
      }
      const updatedDb = { ...db, governancePolicies: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Governance policy saved locally!');
      setIsPolicyFormOpen(false);
      setSelectedPolicy(null);
    }
  };

  const handleDeletePolicy = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this compliance policy?')) return;
    try {
      const res = await fetch(`/api/content/governance-policies/${id}`, { method: 'DELETE' });
      if (res.ok) {
        triggerBanner('Policy removed.');
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = (db.governancePolicies || []).filter((item: any) => String(item.id) !== String(id));
      const updatedDb = { ...db, governancePolicies: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Policy removed locally.');
    }
  };

  // Whistleblower Incident Status Updater
  const handleUpdateWhistleblowerStatus = async (id: string, newStatus: string, resolutionNotes?: string) => {
    try {
      const res = await fetch(`/api/whistleblower/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, resolutionNotes })
      });
      if (res.ok) {
        triggerBanner(`Incident #${id} updated to ${newStatus}`);
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = (db.whistleblowerReports || []).map((r: any) => {
        if (String(r.id) === String(id)) {
          return { ...r, status: newStatus, resolutionNotes: resolutionNotes || r.resolutionNotes, lastAuditedAt: new Date().toISOString() };
        }
        return r;
      });
      const updatedDb = { ...db, whistleblowerReports: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner(`Incident status updated locally to ${newStatus}`);
    }
  };

  // Jubilee Milestones Helpers
  const openJubileeEditor = (item: any | null = null) => {
    setJubileeError('');
    if (item) {
      setSelectedJubileeEvent({ ...item });
    } else {
      setSelectedJubileeEvent({
        year: '2026',
        decade: '2020s',
        title: '',
        subtitle: '',
        description: '',
        impact: '',
        image: 'https://i.postimg.cc/gj0gKfZ7/cocoa-house.jpg'
      });
    }
    setIsJubileeEventFormOpen(true);
  };

  const handleSaveJubilee = async (e: React.FormEvent) => {
    e.preventDefault();
    setJubileeError('');
    if (!selectedJubileeEvent.year || !selectedJubileeEvent.title) {
      setJubileeError('Year and Milestone Title are required.');
      return;
    }
    try {
      const res = await fetch('/api/content/jubilee-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedJubileeEvent)
      });
      if (res.ok) {
        triggerBanner('50th Jubilee Milestone updated successfully!');
        setIsJubileeEventFormOpen(false);
        setSelectedJubileeEvent(null);
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = [...(db.jubileeEvents || [])];
      const ev = { ...selectedJubileeEvent };
      if (!ev.id) {
        ev.id = 'jub-' + Date.now();
        updated.push(ev);
      } else {
        const idx = updated.findIndex((item: any) => String(item.id) === String(ev.id));
        if (idx !== -1) updated[idx] = ev;
        else updated.push(ev);
      }
      const updatedDb = { ...db, jubileeEvents: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Jubilee milestone saved locally!');
      setIsJubileeEventFormOpen(false);
      setSelectedJubileeEvent(null);
    }
  };

  const handleDeleteJubilee = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this jubilee milestone?')) return;
    try {
      const res = await fetch(`/api/content/jubilee-events/${id}`, { method: 'DELETE' });
      if (res.ok) {
        triggerBanner('Jubilee milestone removed.');
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = (db.jubileeEvents || []).filter((item: any) => String(item.id) !== String(id));
      const updatedDb = { ...db, jubileeEvents: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Jubilee milestone deleted locally.');
    }
  };

  // Calculator Settings Saver
  const handleSaveCalculatorSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/content/calculator-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCalculator)
      });
      if (res.ok) {
        triggerBanner('Investment Calculator formula & parameters updated!');
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updatedDb = { ...db, calculatorSettings: editCalculator };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Calculator parameters saved locally!');
    }
  };

  // FAQ Helpers
  const openFaqEditor = (item: any | null = null) => {
    setFaqError('');
    if (item) {
      setSelectedFaq({ ...item });
    } else {
      setSelectedFaq({
        question: '',
        answer: '',
        category: 'General & History',
        order: (db.faqs || []).length + 1
      });
    }
    setIsFaqFormOpen(true);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    setFaqError('');
    if (!selectedFaq.question || !selectedFaq.answer) {
      setFaqError('Question and Answer are required.');
      return;
    }
    try {
      const res = await fetch('/api/content/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedFaq)
      });
      if (res.ok) {
        triggerBanner(selectedFaq.id ? 'FAQ updated successfully!' : 'New FAQ added to knowledgebase!');
        setIsFaqFormOpen(false);
        setSelectedFaq(null);
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = [...(db.faqs || [])];
      const faq = { ...selectedFaq };
      if (!faq.id) {
        faq.id = 'faq-' + Date.now();
        updated.push(faq);
      } else {
        const idx = updated.findIndex((item: any) => String(item.id) === String(faq.id));
        if (idx !== -1) updated[idx] = faq;
        else updated.push(faq);
      }
      const updatedDb = { ...db, faqs: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('FAQ saved locally!');
      setIsFaqFormOpen(false);
      setSelectedFaq(null);
    }
  };

  const handleDeleteFaq = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this FAQ entry?')) return;
    try {
      const res = await fetch(`/api/content/faqs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        triggerBanner('FAQ entry removed.');
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = (db.faqs || []).filter((item: any) => String(item.id) !== String(id));
      const updatedDb = { ...db, faqs: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('FAQ removed locally.');
    }
  };

  // Download Helpers
  const openDownloadEditor = (item: any | null = null) => {
    setDownloadError('');
    if (item) {
      setSelectedDownload({ ...item });
    } else {
      setSelectedDownload({
        title: '',
        category: 'Financial Report',
        fileSize: '4.2 MB',
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        fileType: 'PDF Document',
        fileUrl: 'https://oduainvestment.com.ng/downloads/report.pdf',
        description: ''
      });
    }
    setIsDownloadFormOpen(true);
  };

  const handleSaveDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setDownloadError('');
    if (!selectedDownload.title || !selectedDownload.fileUrl) {
      setDownloadError('Document Title and File Download URL are required.');
      return;
    }
    try {
      const res = await fetch('/api/content/downloads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedDownload)
      });
      if (res.ok) {
        triggerBanner(selectedDownload.id ? 'Download item updated!' : 'New file published to download repository!');
        setIsDownloadFormOpen(false);
        setSelectedDownload(null);
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = [...(db.pressDownloads || [])];
      const dl = { ...selectedDownload };
      if (!dl.id) {
        dl.id = 'dl-' + Date.now();
        updated.push(dl);
      } else {
        const idx = updated.findIndex((item: any) => String(item.id) === String(dl.id));
        if (idx !== -1) updated[idx] = dl;
        else updated.push(dl);
      }
      const updatedDb = { ...db, pressDownloads: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Download item saved locally!');
      setIsDownloadFormOpen(false);
      setSelectedDownload(null);
    }
  };

  const handleDeleteDownload = async (id: string | number) => {
    if (!confirm('Are you sure you want to remove this document from downloads?')) return;
    try {
      const res = await fetch(`/api/content/downloads/${id}`, { method: 'DELETE' });
      if (res.ok) {
        triggerBanner('Document removed.');
        fetchContent();
      } else {
        throw new Error('Server non-2xx');
      }
    } catch (err) {
      const updated = (db.pressDownloads || []).filter((item: any) => String(item.id) !== String(id));
      const updatedDb = { ...db, pressDownloads: updated };
      setDb(updatedDb);
      broadcastCmsUpdate(updatedDb);
      triggerBanner('Document removed locally.');
    }
  };

  // Auth lock screen overlay
  if (!isAuthenticated) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center bg-neutral-950 text-white pt-28 pb-16 px-4 relative overflow-hidden font-sans">
        {/* Abstract design elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00a757_1px,transparent_1px),linear-gradient(to_bottom,#00a757_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.05] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00a757]/10 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#fce303]/5 blur-3xl rounded-full" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl relative z-10"
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[#00a757]/20 border border-[#00a757]/40 rounded-full flex items-center justify-center mx-auto text-[#00a757] shadow-inner mb-2">
              <Lock className="w-8 h-8 text-[#00a757]" />
            </div>
            <h1 className="font-serif text-2xl font-black tracking-tight text-white uppercase">ODU'A Portal</h1>
            <p className="text-neutral-400 text-xs font-light max-w-xs mx-auto">
              Welcome to the Odu'a Corporate Content Management portal. Enter your security passcode to proceed.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1.5 font-mono">Administrative Passcode</label>
              <input 
                type="password" 
                required 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••••" 
                className="w-full p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00a757] focus:border-[#00a757] text-center tracking-widest text-sm"
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/40 border border-red-900/50 text-red-400 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full py-4 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
            <button 
              onClick={() => {
                if (setCurrentPage) {
                  setCurrentPage('Home');
                }
              }}
              className="text-neutral-400 hover:text-white text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer font-semibold"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Back to Live Website</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full h-screen overflow-hidden bg-neutral-100/70 flex flex-col lg:flex-row text-left font-sans">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-72 bg-neutral-950 text-white shrink-0 flex flex-col border-r border-neutral-900 p-4 lg:p-5 h-full overflow-hidden z-20">
        {/* Admin Header */}
        <div className="flex items-center gap-3 shrink-0 pb-3.5 mb-2 border-b border-neutral-900">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 border border-neutral-800 shadow-sm">
            <img src="https://i.postimg.cc/mg37tmcB/logo.png" alt="Odu'a" className="object-contain w-full h-full" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h2 className="font-serif font-black text-sm tracking-widest text-white">ODU'A CMS</h2>
            <span className="text-[9px] font-mono text-emerald-400 tracking-wider font-bold">ADMIN PORTAL</span>
          </div>
        </div>

        {/* Navigation links - extended full height */}
        {/* Navigation links - clean, organized, simple */}
        <nav className="flex-1 min-h-0 overflow-y-auto pr-1.5 space-y-4 text-xs font-bold uppercase tracking-wider text-neutral-400 admin-scrollbar">
          
          {/* PRIMARY TOOLS: Words, Images, News */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono text-emerald-400 px-3 py-1 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              CONTENT EDITING
            </div>

            <button
              onClick={() => {
                setActiveTab("site-text-editor");
                setIsNewsFormOpen(false);
                setIsJobFormOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-bold text-xs cursor-pointer ${
                activeTab === "site-text-editor"
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-neutral-900/90 text-amber-300 hover:bg-neutral-800 hover:text-white border border-amber-500/30"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Type className="w-4 h-4 text-amber-400" />
                <span className="truncate">Edit All Words</span>
              </div>
              <span className="text-[9px] font-mono font-black px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                WORDS
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("drag-drop-media");
                setIsNewsFormOpen(false);
                setIsJobFormOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-bold text-xs cursor-pointer ${
                activeTab === "drag-drop-media"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-neutral-900/90 text-neutral-200 hover:bg-neutral-800 hover:text-white border border-neutral-800"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span className="truncate">Media & Images</span>
              </div>
              <span className="text-[9px] font-mono font-black px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                UPLOAD
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("news-page");
                setIsNewsFormOpen(false);
                setIsJobFormOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-bold text-xs cursor-pointer ${
                activeTab === "news-page"
                  ? "bg-[#00a757] text-white shadow-md"
                  : "bg-neutral-900/90 text-neutral-200 hover:bg-neutral-800 hover:text-white border border-neutral-800"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-sky-400" />
                <span className="truncate">News & Press</span>
              </div>
              <span className="text-[9px] font-mono font-black px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
                {db.news?.length || 0}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("drag-drop-pages");
                setIsNewsFormOpen(false);
                setIsJobFormOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all font-semibold text-xs cursor-pointer ${
                activeTab === "drag-drop-pages"
                  ? "bg-[#00a757] text-white shadow"
                  : "hover:bg-neutral-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutGrid className="w-4 h-4 text-indigo-400" />
                <span className="truncate">Visual Page Builder</span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab("drag-drop-menu");
                setIsNewsFormOpen(false);
                setIsJobFormOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all font-semibold text-xs cursor-pointer ${
                activeTab === "drag-drop-menu"
                  ? "bg-[#00a757] text-white shadow"
                  : "hover:bg-neutral-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Menu className="w-4 h-4 text-emerald-400" />
                <span className="truncate">Navigation Menu</span>
              </div>
            </button>
          </div>

          {/* PAGE BY PAGE CONTENT */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-neutral-600 px-3 py-1 font-bold">PAGE CONTENT</div>
            {[
              { id: "home-page", label: "Home Page", icon: Building2 },
              { id: "about-page", label: "About Us", icon: Layers },
              { id: "who-page", label: "Who We Are & States", icon: Users },
              { id: "history-page", label: "Our History", icon: Calendar },
              { id: "history-milestones-page", label: "Timeline Milestones", icon: Calendar },
              { id: "board-page", label: "Board of Directors", icon: Users },
              { id: "leadership-page", label: "Leadership Team", icon: Users },
              { id: "subsidiaries-page", label: `Subsidiaries (${(db.subsidiaries || []).length})`, icon: Building2 },
              { id: "portfolio-page", label: "Portfolio & Ventures", icon: FolderGit },
              { id: "jubilee-page", label: "50th Jubilee Archive", icon: History },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setIsNewsFormOpen(false);
                    setIsJobFormOpen(false);
                    setIsProjectFormOpen(false);
                    setIsMilestoneFormOpen(false);
                    setIsStateFormOpen(false);
                    setIsSubsidiaryFormOpen(false);
                    setIsProgramFormOpen(false);
                    setIsPolicyFormOpen(false);
                    setIsJubileeEventFormOpen(false);
                    setIsFaqFormOpen(false);
                    setIsDownloadFormOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all font-semibold text-xs ${
                    activeTab === tab.id 
                      ? "bg-[#00a757] text-white shadow" 
                      : "hover:bg-neutral-900 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* MESSAGES & TOOLS */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-neutral-600 px-3 pt-2 pb-1 font-bold">MESSAGES & UTILITIES</div>
            {[
              { id: "contact-page", label: `Contact Inbox (${(db.inquiries || []).length})`, icon: Mail },
              { id: "careers-page", label: `Careers & Jobs (${(db.careers || []).length})`, icon: Briefcase },
              { id: "faqs-page", label: "FAQs & Knowledge", icon: HelpCircle },
              { id: "dashboard", label: "Dashboard Overview", icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setIsNewsFormOpen(false);
                    setIsJobFormOpen(false);
                    setIsProjectFormOpen(false);
                    setIsMilestoneFormOpen(false);
                    setIsStateFormOpen(false);
                    setIsSubsidiaryFormOpen(false);
                    setIsProgramFormOpen(false);
                    setIsPolicyFormOpen(false);
                    setIsJubileeEventFormOpen(false);
                    setIsFaqFormOpen(false);
                    setIsDownloadFormOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all font-semibold text-xs ${
                    activeTab === tab.id 
                      ? "bg-[#00a757] text-white shadow" 
                      : "hover:bg-neutral-900 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer actions */}
        <div className="pt-3 mt-1.5 border-t border-neutral-900 shrink-0 space-y-2">
          <button 
            onClick={() => {
              if (setCurrentPage) {
                setCurrentPage('Home');
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Live Site Preview</span>
          </button>

          <button 
            onClick={() => {
              if (setCurrentPage) {
                setCurrentPage('Home');
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-neutral-900 text-neutral-300 font-bold text-xs uppercase tracking-wider hover:bg-neutral-850 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
          >
            <HomeIcon className="w-4 h-4" />
            <span>Visit Homepage</span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-red-950/20 text-red-400 font-bold text-xs uppercase tracking-wider hover:bg-red-950/40 border border-red-900/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN MAIN CONTENT CONTAINER */}
      <main className="flex-1 h-full p-5 sm:p-8 lg:p-10 space-y-6 overflow-y-auto max-w-7xl w-full">
        
        {/* Admin Top App Bar */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00a757] border border-emerald-200 flex items-center justify-center shadow-inner shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-serif font-bold text-base text-neutral-900">ODU'A Enterprise CMS Studio</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  SYNCED & LIVE
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-light mt-0.5">
                Full-stack content management system with interactive drag-and-drop visual builders.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setActiveTab('site-text-editor')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer ${
                activeTab === 'site-text-editor'
                  ? 'bg-amber-600 text-white ring-2 ring-amber-300'
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
              title="Edit every single place where there's words on the site"
            >
              <Type className="w-3.5 h-3.5" />
              <span>Edit All Words</span>
            </button>

            <button
              onClick={() => {
                if (setCurrentPage) {
                  setCurrentPage('Home');
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00a757] hover:bg-[#008f49] text-white text-xs font-bold transition-all shadow hover:shadow-md cursor-pointer"
              title="Open public website in live preview mode"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Site Preview</span>
            </button>

            <a
              href={`${window.location.origin}${window.location.pathname}?preview=website`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow hover:shadow-md cursor-pointer"
              title="Open website in a separate browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Website (New Tab)</span>
            </a>

            <button
              onClick={() => {
                if (setCurrentPage) {
                  setCurrentPage('Home');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300 text-xs font-semibold transition-all cursor-pointer"
            >
              <HomeIcon className="w-3.5 h-3.5" />
              <span>Homepage</span>
            </button>

            <button
              onClick={() => setActiveTab('drag-drop-pages' as any)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-emerald-400" />
              <span>Visual Builder</span>
            </button>
          </div>
        </div>
        
        {/* Banner notifications */}
        <AnimatePresence>
          {statusMessage.text && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-semibold shadow-lg ${
                statusMessage.isError 
                  ? 'bg-red-50 border-red-200 text-red-800' 
                  : 'bg-green-50 border-green-200 text-green-800'
              }`}
            >
              <Check className={`w-4.5 h-4.5 ${statusMessage.isError ? 'text-red-600' : 'text-green-600'}`} />
              <span>{statusMessage.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex-1 h-96 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-t-[#00a757] border-neutral-200 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* 1. DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="font-serif text-3xl font-black text-neutral-900 leading-tight">Executive CMS Dashboard</h1>
                      <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1">Overview of real-time metrics, system health, content inventory, and interactive studios.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setActiveTab('news');
                          setIsNewsFormOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Publish Article</span>
                      </button>
                      <button 
                        onClick={() => {
                          setActiveTab('projects');
                          setIsProjectFormOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>New Project</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 1. Key Metrics Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Unique Visitors (30d)', value: stats.uniqueVisitors.toLocaleString(), desc: '+14.2% engagement growth', icon: Users, color: '#00a757', bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
                    { label: 'Page Views (30d)', value: stats.pageViews.toLocaleString(), desc: '+8.3% monthly reads', icon: FileText, color: '#2563eb', bg: 'bg-blue-50 text-blue-600 border-blue-100' },
                    { label: 'Active Sessions', value: stats.activeSessions.toLocaleString(), desc: 'Real-time client connections', icon: TrendingUp, color: '#9333ea', bg: 'bg-purple-50 text-purple-600 border-purple-100' },
                    { label: 'Submissions Inbox', value: db.inquiries.length.toString(), desc: `${db.inquiries.length} unread inquiries`, icon: Mail, color: '#d97706', bg: 'bg-amber-50 text-amber-600 border-amber-100' },
                  ].map((card, idx) => {
                    const Icon = card.icon;
                    return (
                      <div key={idx} className="bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-sm space-y-3 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">{card.label}</span>
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${card.bg}`}>
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                        </div>
                        <div>
                          <p className="text-2xl font-black text-neutral-900 tracking-tight leading-none">{card.value}</p>
                          <span className="text-[11px] font-medium text-neutral-500 mt-1.5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                            {card.desc}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 2. Streamlined Studio & Assistant Tools */}
                <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        Quick Studio & Content Tools
                      </h3>
                      <p className="text-xs text-neutral-500 font-light mt-0.5">
                        Access intelligent assistants and visual layout builders directly.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <button
                      onClick={() => setActiveTab('site-text-editor')}
                      className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 hover:bg-amber-50/50 border border-neutral-200/80 hover:border-amber-300 transition-all text-left group cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <Type className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-xs font-bold text-neutral-900 group-hover:text-amber-700 transition-colors">Edit All Words</p>
                          <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-amber-600 transition-colors" />
                        </div>
                        <p className="text-[11px] text-neutral-500 line-clamp-2 mt-0.5">Edit words, headings, body text & slogans</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab('drag-drop-pages')}
                      className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 hover:bg-emerald-50/50 border border-neutral-200/80 hover:border-emerald-300 transition-all text-left group cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <LayoutGrid className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-xs font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">Page Studio</p>
                          <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-emerald-600 transition-colors" />
                        </div>
                        <p className="text-[11px] text-neutral-500 line-clamp-2 mt-0.5">Visual drag & drop section builder</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab('drag-drop-menu')}
                      className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 hover:bg-blue-50/50 border border-neutral-200/80 hover:border-blue-300 transition-all text-left group cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <Menu className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-xs font-bold text-neutral-900 group-hover:text-blue-700 transition-colors">Menu Builder</p>
                          <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <p className="text-[11px] text-neutral-500 line-clamp-2 mt-0.5">Organize site navigation & links</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab('drag-drop-media')}
                      className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 hover:bg-amber-50/50 border border-neutral-200/80 hover:border-amber-300 transition-all text-left group cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-xs font-bold text-neutral-900 group-hover:text-amber-700 transition-colors">Media Library</p>
                          <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-amber-600 transition-colors" />
                        </div>
                        <p className="text-[11px] text-neutral-500 line-clamp-2 mt-0.5">Drag & drop photo and asset library</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 3. Live Content Inventory */}
                <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-neutral-800 font-mono">Live Content Inventory</span>
                    <span className="text-[11px] text-neutral-400">Database Records in `db.json`</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                      { label: 'News Articles', count: db.news.length, tab: 'news', icon: FileText, color: 'text-emerald-600' },
                      { label: 'Projects', count: db.projects.length, tab: 'projects', icon: FolderGit, color: 'text-blue-600' },
                      { label: 'Subsidiaries', count: (db.subsidiaries || []).length, tab: 'subsidiaries-page', icon: Building2, color: 'text-purple-600' },
                      { label: 'Board & Execs', count: (db.boardMembers || []).length, tab: 'board-page', icon: Users, color: 'text-amber-600' },
                      { label: 'Milestones', count: (db.historyMilestones || []).length, tab: 'history-milestones-page', icon: Calendar, color: 'text-indigo-600' },
                      { label: 'States', count: (db.southwestStates || []).length, tab: 'southwest-states-page', icon: MapPin, color: 'text-teal-600' },
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveTab(item.tab as any)}
                          className="p-3 rounded-xl bg-neutral-50 hover:bg-emerald-50/60 border border-neutral-200/80 hover:border-emerald-200 transition-all text-left group cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <Icon className={`w-4 h-4 ${item.color}`} />
                            <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-emerald-600 transition-colors" />
                          </div>
                          <p className="text-lg font-black text-neutral-900 mt-2 leading-none">{item.count}</p>
                          <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mt-1 truncate">{item.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Inline recent inbox preview */}
                <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-6 sm:p-8 space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-bold text-neutral-900">Recent Customer Submissions</h3>
                      <p className="text-neutral-500 text-xs font-light">Direct entries received from partner requests and expressions of interest.</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('inquiries')}
                      className="text-[#00a757] font-bold text-xs uppercase tracking-wider hover:underline"
                    >
                      View All Inbox
                    </button>
                  </div>

                  <div className="divide-y divide-neutral-100 max-h-[300px] overflow-y-auto">
                    {db.inquiries.length === 0 ? (
                      <div className="py-8 text-center text-xs text-neutral-400 font-light">
                        No sub-missions currently received in inbox.
                      </div>
                    ) : (
                      db.inquiries.slice(0, 4).map((inq: any) => (
                        <div key={inq.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                          <div>
                            <p className="text-xs font-bold text-neutral-950">{inq.fullName} <span className="text-[10px] text-neutral-400 font-light font-mono">({inq.organization})</span></p>
                            <p className="text-xs text-neutral-500 mt-0.5 max-w-xl font-light line-clamp-1 italic">"{inq.message}"</p>
                          </div>
                          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
                            <span className="bg-[#00a757]/10 text-[#00a757] text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full font-mono">
                              {inq.type}
                            </span>
                            <span className="text-[10px] text-neutral-400 font-mono font-medium">{inq.date}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* System variables notice */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex gap-3 text-xs leading-relaxed text-amber-800">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 font-light">
                    <p className="font-bold">Persistent Storage Notice</p>
                    <p>All modifications will instantly rewrite `src/data/db.json` inside the full-stack system container and reflect immediately across all connected frontend browsers.</p>
                  </div>
                </div>

              </div>
            )}

            {/* 2. HOME PAGE TAB */}
            {activeTab === 'home-page' && (
              <div className="space-y-6">
                <div>
                  <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">Home Page Settings</h1>
                  <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Manage branding, main tagline, hero section text, and key stats shown on the homepage.</p>
                </div>

                <form onSubmit={handleSaveGeneral} className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-6 sm:p-8 space-y-8">
                  <div className="space-y-6">
                    <h3 className="font-serif text-md font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-3">
                      <Building2 className="w-4 h-4 text-[#00a757]" /> 1. Home Page Branding & Identity
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Corporate Group Brand Name</label>
                        <input 
                          type="text" 
                          required 
                          value={editGeneral.siteName || ''}
                          onChange={(e) => setEditGeneral({ ...editGeneral, siteName: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Slogan Tagline</label>
                        <input 
                          type="text" 
                          required 
                          value={editGeneral.tagline || ''}
                          onChange={(e) => setEditGeneral({ ...editGeneral, tagline: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-neutral-100 pt-6 space-y-6">
                    <h3 className="font-serif text-md font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-3">
                      <Layers className="w-4 h-4 text-[#00a757]" /> 2. Homepage Hero Section Text
                    </h3>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Hero Main Headline</label>
                      <input 
                        type="text" 
                        required 
                        value={editGeneral.heroTitle || ''}
                        onChange={(e) => setEditGeneral({ ...editGeneral, heroTitle: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Hero Descriptive Sub-text</label>
                      <textarea 
                        rows={3}
                        required 
                        value={editGeneral.heroSubtitle || ''}
                        onChange={(e) => setEditGeneral({ ...editGeneral, heroSubtitle: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="border-t border-neutral-100 pt-6 space-y-6">
                    <h3 className="font-serif text-md font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-3">
                      <Calendar className="w-4 h-4 text-[#00a757]" /> 3. Homepage Counter Metrics
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Owner States Count Metric</label>
                        <input 
                          type="text" 
                          required 
                          value={editGeneral.ownerStatesCount || ''}
                          onChange={(e) => setEditGeneral({ ...editGeneral, ownerStatesCount: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                          placeholder="6 States"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Established Year Metric (Used for counter math)</label>
                        <input 
                          type="text" 
                          required 
                          value={editGeneral.establishedYear || ''}
                          onChange={(e) => setEditGeneral({ ...editGeneral, establishedYear: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                          placeholder="1976"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-100 flex justify-end">
                    <button 
                      type="submit" 
                      className="px-6 py-3.5 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Home Page Config</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 3. ABOUT US PAGE TAB */}
            {activeTab === 'about-page' && (
              <div className="space-y-6">
                <div>
                  <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">About Us Page Settings</h1>
                  <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Manage historical counter milestones, asset metrics, and subsidiaries counters rendered on the About Us screen.</p>
                </div>

                <form onSubmit={handleSaveGeneral} className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-6 sm:p-8 space-y-8">
                  <div className="space-y-6">
                    <h3 className="font-serif text-md font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-3">
                      <Layers className="w-4 h-4 text-[#00a757]" /> 1. Overview Legacy Statistics & Counter Assets
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Established Year Metric</label>
                        <input 
                          type="text" 
                          required 
                          value={editGeneral.establishedYear || ''}
                          onChange={(e) => setEditGeneral({ ...editGeneral, establishedYear: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                          placeholder="1976"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Owner States Description</label>
                        <input 
                          type="text" 
                          required 
                          value={editGeneral.ownerStatesCount || ''}
                          onChange={(e) => setEditGeneral({ ...editGeneral, ownerStatesCount: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                          placeholder="6 States"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Subsidiaries Count Metric</label>
                        <input 
                          type="text" 
                          required 
                          value={editGeneral.coreSubsidiariesCount || ''}
                          onChange={(e) => setEditGeneral({ ...editGeneral, coreSubsidiariesCount: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                          placeholder="10+"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Asset Value Base (₦)</label>
                        <input 
                          type="text" 
                          required 
                          value={editGeneral.assetValue || ''}
                          onChange={(e) => setEditGeneral({ ...editGeneral, assetValue: e.target.value })}
                          placeholder="₦300B+"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Driving Key Sectors Count</label>
                        <input 
                          type="text" 
                          required 
                          value={editGeneral.keySectorsCount || ''}
                          onChange={(e) => setEditGeneral({ ...editGeneral, keySectorsCount: e.target.value })}
                          placeholder="9"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-100 flex justify-end">
                    <button 
                      type="submit" 
                      className="px-6 py-3.5 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save About Us Config</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 4. WHO WE ARE PAGE TAB */}
            {activeTab === 'who-page' && (
              <div className="space-y-6">
                <div>
                  <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">Who We Are Settings</h1>
                  <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Manage the corporate mission statements, group vision, and ethical core values of "Iwa Pele" (Good Character).</p>
                </div>

                <form onSubmit={handleSaveGeneral} className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-6 sm:p-8 space-y-8">
                  <div className="space-y-6">
                    <h3 className="font-serif text-md font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-3">
                      <Users className="w-4 h-4 text-[#00a757]" /> 1. Core Vision, Mission & Values
                    </h3>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Our Vision Statement</label>
                      <textarea 
                        rows={3}
                        required 
                        value={editGeneral.vision || ''}
                        onChange={(e) => setEditGeneral({ ...editGeneral, vision: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Our Mission Statement</label>
                      <textarea 
                        rows={3}
                        required 
                        value={editGeneral.mission || ''}
                        onChange={(e) => setEditGeneral({ ...editGeneral, mission: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Core Values Description ("Iwa Pele")</label>
                      <textarea 
                        rows={3}
                        required 
                        value={editGeneral.coreValues || ''}
                        onChange={(e) => setEditGeneral({ ...editGeneral, coreValues: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-100 flex justify-end">
                    <button 
                      type="submit" 
                      className="px-6 py-3.5 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Who We Are Config</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 5. OUR HISTORY PAGE TAB */}
            {activeTab === 'history-page' && (
              <div className="space-y-6">
                <div>
                  <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">Our History Settings</h1>
                  <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Configure cinematic history documentary video links, runtimes, and milestone counter anchors.</p>
                </div>

                <form onSubmit={handleSaveGeneral} className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-6 sm:p-8 space-y-8">
                  <div className="space-y-6">
                    <h3 className="font-serif text-md font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-3">
                      <Calendar className="w-4 h-4 text-[#00a757]" /> 1. History Documentary Video Configuration
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">YouTube Video ID</label>
                        <input 
                          type="text" 
                          required 
                          value={editGeneral.youtubeDocId || ''}
                          onChange={(e) => setEditGeneral({ ...editGeneral, youtubeDocId: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                          placeholder="E.g., eWX37F1H_ZM"
                        />
                        <p className="text-[10px] text-neutral-400 mt-1 font-mono font-light">E.g., "eWX37F1H_ZM". Renders directly in the cinematic history player.</p>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Documentary Runtime</label>
                        <input 
                          type="text" 
                          required 
                          value={editGeneral.docRuntime || ''}
                          onChange={(e) => setEditGeneral({ ...editGeneral, docRuntime: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                          placeholder="E.g., 36 mins"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Established Year Anchor</label>
                      <input 
                        type="text" 
                        required 
                        value={editGeneral.establishedYear || ''}
                        onChange={(e) => setEditGeneral({ ...editGeneral, establishedYear: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                        placeholder="1976"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-100 flex justify-end">
                    <button 
                      type="submit" 
                      className="px-6 py-3.5 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save History Config</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 6. PORTFOLIO & VENTURES PAGE TAB */}
            {activeTab === 'portfolio-page' && (
              <div className="space-y-6">
                <div>
                  <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">Portfolio & Ongoing Ventures Settings</h1>
                  <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Manage portfolio statistics, key asset volumes, and directory of ongoing infrastructural, real estate, and agricultural projects.</p>
                </div>

                {/* Sub-section 1: Portfolio stats config */}
                {!isProjectFormOpen && (
                  <form onSubmit={handleSaveGeneral} className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-6 sm:p-8 space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-serif text-sm font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-2">
                        <FolderGit className="w-4 h-4 text-[#00a757]" /> Portfolio High-Level Statistics
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Asset Value Base (₦)</label>
                          <input 
                            type="text" 
                            required 
                            value={editGeneral.assetValue || ''}
                            onChange={(e) => setEditGeneral({ ...editGeneral, assetValue: e.target.value })}
                            className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Driving Key Sectors Count</label>
                          <input 
                            type="text" 
                            required 
                            value={editGeneral.keySectorsCount || ''}
                            onChange={(e) => setEditGeneral({ ...editGeneral, keySectorsCount: e.target.value })}
                            className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Subsidiaries Count Metric</label>
                          <input 
                            type="text" 
                            required 
                            value={editGeneral.coreSubsidiariesCount || ''}
                            onChange={(e) => setEditGeneral({ ...editGeneral, coreSubsidiariesCount: e.target.value })}
                            className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end">
                      <button 
                        type="submit" 
                        className="px-5 py-2.5 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Portfolio Metrics</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Sub-section 2: Ongoing Ventures directory */}
                <div className="space-y-6 pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-neutral-900 leading-none">Ventures & Project Directories</h3>
                      <p className="text-neutral-500 text-xs font-light mt-1">Manage physical projects showing on the Portfolio and Projects pages.</p>
                    </div>
                    {!isProjectFormOpen && (
                      <button 
                        onClick={() => openProjectEditor()}
                        className="px-4 py-2.5 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow"
                      >
                        <Plus className="w-4.5 h-4.5" />
                        <span>Post Project Update</span>
                      </button>
                    )}
                  </div>

                  {isProjectFormOpen && selectedProject && (
                    <form onSubmit={handleSaveProject} className="bg-white rounded-3xl border border-neutral-200/80 shadow-md p-6 sm:p-8 space-y-6">
                      <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                        <h3 className="font-serif text-lg font-bold text-neutral-900">{selectedProject.id ? 'Edit Project Details' : 'Post New Project'}</h3>
                        <button 
                          type="button" 
                          onClick={() => { setIsProjectFormOpen(false); setSelectedProject(null); }}
                          className="text-neutral-400 hover:text-neutral-600 text-xs uppercase tracking-wider font-bold"
                        >
                          Cancel
                        </button>
                      </div>

                      {projectError && (
                        <div className="p-3 bg-red-50 text-red-800 text-xs font-semibold rounded-lg border border-red-100">
                          {projectError}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Project / Asset Name</label>
                          <input 
                            type="text" 
                            required 
                            value={selectedProject.title}
                            onChange={(e) => setSelectedProject({ ...selectedProject, title: e.target.value })}
                            placeholder="E.g., Sovereign Heights Ikoyi"
                            className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Key Sector</label>
                          <select 
                            value={selectedProject.sector}
                            onChange={(e) => setSelectedProject({ ...selectedProject, sector: e.target.value })}
                            className="w-full p-3.5 bg-white rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                          >
                            <option>Real Estate & Hospitality</option>
                            <option>Agriculture & Agro-Allied</option>
                            <option>Financial Services & Innovation</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Physical Location</label>
                          <input 
                            type="text" 
                            required 
                            value={selectedProject.location}
                            onChange={(e) => setSelectedProject({ ...selectedProject, location: e.target.value })}
                            placeholder="E.g., Ikoyi, Lagos State"
                            className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Development Status</label>
                          <select 
                            value={selectedProject.status}
                            onChange={(e) => setSelectedProject({ ...selectedProject, status: e.target.value })}
                            className="w-full p-3.5 bg-white rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                          >
                            <option>Ongoing</option>
                            <option>Completed</option>
                            <option>Pipeline</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <ImageUploader
                          value={selectedProject.image}
                          onChange={(url) => setSelectedProject({ ...selectedProject, image: url })}
                          label="Header Image Accent / Photo"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Description / Objectives</label>
                        <textarea 
                          rows={4}
                          required 
                          value={selectedProject.description}
                          onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}
                          placeholder="Provide details about the scale, square-footage, structural capacity, and strategic relevance..."
                          className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-light leading-relaxed font-sans"
                        />
                      </div>

                      <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
                        <button 
                          type="button" 
                          onClick={() => { setIsProjectFormOpen(false); setSelectedProject(null); }}
                          className="px-5 py-3 rounded-xl hover:bg-neutral-100 text-neutral-600 font-bold text-xs uppercase tracking-wider transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="px-6 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Project</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {!isProjectFormOpen && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {db.projects.map((proj: Project) => (
                        <div key={proj.id} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col justify-between">
                          <div>
                            <div className="h-40 bg-neutral-100 overflow-hidden relative">
                              <img src={proj.image} alt="" className="w-full h-full object-cover" />
                              <span className="absolute top-3 right-3 bg-neutral-900/90 backdrop-blur text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded">
                                {proj.status}
                              </span>
                            </div>
                            <div className="p-5 space-y-2">
                              <span className="text-[10px] text-[#00a757] font-semibold">{proj.sector}</span>
                              <h4 className="font-serif text-md font-bold text-neutral-950">{proj.title}</h4>
                              <p className="text-[10px] text-neutral-500 font-mono font-medium flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-[#00a757]" /> {proj.location}
                              </p>
                              <p className="text-xs text-neutral-600 leading-relaxed font-light mt-2 line-clamp-3">{proj.description}</p>
                            </div>
                          </div>

                          <div className="p-5 border-t border-neutral-100 bg-neutral-50/50 flex justify-end gap-2">
                            <button 
                              onClick={() => openProjectEditor(proj)}
                              className="px-3.5 py-2.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                            >
                              <Edit3 className="w-4 h-4 mr-1.5" /> Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteProject(proj.id!)}
                              className="px-3.5 py-2.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                            >
                              <Trash2 className="w-4 h-4 mr-1.5" /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 7. NEWS & MEDIA PAGE TAB */}
            {activeTab === 'news-page' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">News & Media Page Settings</h1>
                    <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Publish and manage press statements, disclaimers, and history museum publications rendered on the Media screen.</p>
                  </div>
                  {!isNewsFormOpen && (
                    <button 
                      onClick={() => openNewsEditor()}
                      className="px-4 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow"
                    >
                      <Plus className="w-4.5 h-4.5" />
                      <span>Publish Article</span>
                    </button>
                  )}
                </div>

                {isNewsFormOpen && selectedNews && (
                  <form onSubmit={handleSaveNews} className="bg-white rounded-3xl border border-neutral-200/80 shadow-md p-6 sm:p-8 space-y-6">
                    <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                      <h3 className="font-serif text-lg font-bold text-neutral-900">{selectedNews.id ? 'Edit News Article' : 'Publish New Article'}</h3>
                      <button 
                        type="button" 
                        onClick={() => { setIsNewsFormOpen(false); setSelectedNews(null); }}
                        className="text-neutral-400 hover:text-neutral-600 text-xs uppercase tracking-wider font-bold"
                      >
                        Cancel
                      </button>
                    </div>

                    {newsError && (
                      <div className="p-3 bg-red-50 text-red-800 text-xs font-semibold rounded-lg border border-red-100">
                        {newsError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Article Title</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedNews.title}
                          onChange={(e) => setSelectedNews({ ...selectedNews, title: e.target.value })}
                          placeholder="E.g., Odu’a upgrades regional agricultural structures"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Category / Channel</label>
                        <select 
                          value={selectedNews.category}
                          onChange={(e) => setSelectedNews({ ...selectedNews, category: e.target.value })}
                          className="w-full p-3.5 bg-white rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                        >
                          <option>News & Events</option>
                          <option>Disclaimers</option>
                          <option>Museum & Hall of Fame</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Publication Date</label>
                        <input 
                          type="date" 
                          required 
                          value={selectedNews.date}
                          onChange={(e) => setSelectedNews({ ...selectedNews, date: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Author / Source</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedNews.author || ''}
                          onChange={(e) => setSelectedNews({ ...selectedNews, author: e.target.value })}
                          placeholder="Corporate Communications"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Brief Excerpt / Summary</label>
                      <input 
                        type="text" 
                        required 
                        value={selectedNews.summary || selectedNews.excerpt || ''}
                        onChange={(e) => setSelectedNews({ ...selectedNews, summary: e.target.value, excerpt: e.target.value })}
                        placeholder="A short single-sentence summary showing on preview cards"
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-light"
                      />
                    </div>

                    <div>
                      <ImageUploader
                        value={selectedNews.image}
                        onChange={(url) => setSelectedNews({ ...selectedNews, image: url })}
                        label="Image Accent / Feature Photo"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Full Press Release Body Content</label>
                      <textarea 
                        rows={10}
                        required 
                        value={selectedNews.content}
                        onChange={(e) => setSelectedNews({ ...selectedNews, content: e.target.value })}
                        placeholder="Write or paste your full editorial or corporate warning content here..."
                        className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs leading-relaxed font-light font-sans"
                      />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
                      <button 
                        type="button" 
                        onClick={() => { setIsNewsFormOpen(false); setSelectedNews(null); }}
                        className="px-5 py-3 rounded-xl hover:bg-neutral-100 text-neutral-600 font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Discard
                      </button>
                      <button 
                        type="submit" 
                        className="px-6 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save & Publish Article</span>
                      </button>
                    </div>
                  </form>
                )}

                {!isNewsFormOpen && (
                  <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm overflow-hidden divide-y divide-neutral-100">
                    {db.news.length === 0 ? (
                      <div className="p-10 text-center text-xs text-neutral-400 font-light">No articles published currently.</div>
                    ) : (
                      db.news.map((item: NewsCard) => (
                        <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-neutral-50/50 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-xl bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200/50">
                              <img src={item.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-1">
                              <span className="bg-neutral-100 text-neutral-700 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded font-mono">
                                {item.category}
                              </span>
                              <h4 className="font-serif text-sm font-bold text-neutral-900 leading-snug line-clamp-2">{item.title}</h4>
                              <p className="text-[10px] text-neutral-400 flex items-center gap-1 font-mono font-medium">
                                <Calendar className="w-3.5 h-3.5 text-[#00a757]" /> {item.date} • Author: {item.author || 'Communications'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                            <button 
                              onClick={() => openNewsEditor(item)}
                              className="w-9 h-9 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                              title="Edit Article"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteNews(item.id)}
                              className="w-9 h-9 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                              title="Delete Article"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 8. CAREERS PAGE TAB */}
            {activeTab === 'careers-page' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">Careers Page Settings</h1>
                    <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Manage job openings, vacancies, and subsidiary hiring descriptions displayed on the Careers page.</p>
                  </div>
                  {!isJobFormOpen && (
                    <button 
                      onClick={() => openJobEditor()}
                      className="px-4 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow"
                    >
                      <Plus className="w-4.5 h-4.5" />
                      <span>Post Open Vacancy</span>
                    </button>
                  )}
                </div>

                {isJobFormOpen && selectedJob && (
                  <form onSubmit={handleSaveJob} className="bg-white rounded-3xl border border-neutral-200/80 shadow-md p-6 sm:p-8 space-y-6">
                    <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                      <h3 className="font-serif text-lg font-bold text-neutral-900">{selectedJob.id ? 'Edit Vacancy Listing' : 'Post New Vacancy'}</h3>
                      <button 
                        type="button" 
                        onClick={() => { setIsJobFormOpen(false); setSelectedJob(null); }}
                        className="text-neutral-400 hover:text-neutral-600 text-xs uppercase tracking-wider font-bold"
                      >
                        Cancel
                      </button>
                    </div>

                    {jobError && (
                      <div className="p-3 bg-red-50 text-red-800 text-xs font-semibold rounded-lg border border-red-100">
                        {jobError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Job Title</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedJob.title}
                          onChange={(e) => setSelectedJob({ ...selectedJob, title: e.target.value })}
                          placeholder="E.g., Senior Starch Agronomist"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Division / Subsidiary</label>
                        <select 
                          value={selectedJob.division}
                          onChange={(e) => setSelectedJob({ ...selectedJob, division: e.target.value })}
                          className="w-full p-3.5 bg-white rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                        >
                          <option>Wemabod Limited</option>
                          <option>SWAgCo Agriculture</option>
                          <option>Glore Capital Venture</option>
                          <option>Odu'a Group Headquarters</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Location</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedJob.location}
                          onChange={(e) => setSelectedJob({ ...selectedJob, location: e.target.value })}
                          placeholder="E.g., Ikoyi, Lagos State"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Employment Type</label>
                        <select 
                          value={selectedJob.type}
                          onChange={(e) => setSelectedJob({ ...selectedJob, type: e.target.value })}
                          className="w-full p-3.5 bg-white rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                        >
                          <option>Full-Time</option>
                          <option>Contract</option>
                          <option>Contract / Full-Time</option>
                          <option>Internship</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Brief Job Summary Description</label>
                      <textarea 
                        rows={4}
                        required 
                        value={selectedJob.desc}
                        onChange={(e) => setSelectedJob({ ...selectedJob, desc: e.target.value })}
                        placeholder="E.g., Coordinates Outgrower partnerships, maize hub supplies, and seeds distribution..."
                        className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-light leading-relaxed font-sans"
                      />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
                      <button 
                        type="button" 
                        onClick={() => { setIsJobFormOpen(false); setSelectedJob(null); }}
                        className="px-5 py-3 rounded-xl hover:bg-neutral-100 text-neutral-600 font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-6 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow"
                      >
                        <Save className="w-4 h-4" />
                        <span>Publish Vacancy</span>
                      </button>
                    </div>
                  </form>
                )}

                {!isJobFormOpen && (
                  <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm divide-y divide-neutral-100">
                    {db.careers.length === 0 ? (
                      <div className="p-10 text-center text-xs text-neutral-400 font-light">No active vacancies.</div>
                    ) : (
                      db.careers.map((job: any) => (
                        <div key={job.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-neutral-50/50 transition-colors">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <h4 className="font-serif text-sm font-bold text-neutral-950">{job.title}</h4>
                              <span className="bg-neutral-100 text-neutral-800 text-[8px] uppercase tracking-widest font-mono font-black px-1.5 py-0.5 rounded">
                                {job.type}
                              </span>
                            </div>
                            <p className="text-[10px] text-[#00a757] font-semibold">{job.division} • <span className="text-neutral-500 font-normal">{job.location}</span></p>
                            <p className="text-xs text-neutral-500 max-w-xl font-light line-clamp-2 mt-1">{job.desc}</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                            <button 
                              onClick={() => openJobEditor(job)}
                              className="w-9 h-9 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteJob(job.id)}
                              className="w-9 h-9 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 9. CONTACT PAGE & INBOX TAB */}
            {activeTab === 'contact-page' && (
              <div className="space-y-6">
                <div>
                  <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">Contact Page Settings & Inbox</h1>
                  <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Configure address details, telephone numbers, social links, and review submissions received from clients and partners.</p>
                </div>

                <form onSubmit={handleSaveGeneral} className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-6 sm:p-8 space-y-8">
                  <div className="space-y-6">
                    <h3 className="font-serif text-md font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-3">
                      <MapPin className="w-4 h-4 text-[#00a757]" /> 1. Headquarter Address & Contact Coordinates
                    </h3>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">HQ Clickable Street Address</label>
                      <textarea 
                        rows={2}
                        required 
                        value={editGeneral.address || ''}
                        onChange={(e) => setEditGeneral({ ...editGeneral, address: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Contact Phone Numbers (One per line)</label>
                        <textarea 
                          rows={2}
                          required 
                          value={editGeneral.phone || ''}
                          onChange={(e) => setEditGeneral({ ...editGeneral, phone: e.target.value })}
                          placeholder="E.g.,&#10;+234 815 145 9359&#10;+234 905 464 4944"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold leading-relaxed"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Contact Email Address</label>
                        <input 
                          type="email" 
                          required 
                          value={editGeneral.email || ''}
                          onChange={(e) => setEditGeneral({ ...editGeneral, email: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-neutral-100 pt-6 space-y-6">
                    <h3 className="font-serif text-md font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-3">
                      <Lock className="w-4 h-4 text-[#00a757]" /> 2. Social Media Handles
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Facebook Page URL</label>
                        <input 
                          type="url" 
                          value={editGeneral.facebookUrl || ''}
                          onChange={(e) => setEditGeneral({ ...editGeneral, facebookUrl: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                          placeholder="https://facebook.com/..."
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Twitter / X URL</label>
                        <input 
                          type="url" 
                          value={editGeneral.twitterUrl || ''}
                          onChange={(e) => setEditGeneral({ ...editGeneral, twitterUrl: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                          placeholder="https://twitter.com/..."
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">LinkedIn Profile URL</label>
                        <input 
                          type="url" 
                          value={editGeneral.linkedinUrl || ''}
                          onChange={(e) => setEditGeneral({ ...editGeneral, linkedinUrl: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold"
                          placeholder="https://linkedin.com/company/..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex justify-end">
                    <button 
                      type="submit" 
                      className="px-5 py-2.5 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Contact Coordinates</span>
                    </button>
                  </div>
                </form>

                {/* Sub-section 2: Customer Submissions Inbox */}
                <div className="space-y-4 pt-6">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-neutral-900 leading-none">Inbound Submissions Inbox</h3>
                    <p className="text-neutral-500 text-xs font-light mt-1">Review live submissions, expressions of interest, and complaints sent via the Contact page forms.</p>
                  </div>

                  <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-6 sm:p-8">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-neutral-700">
                        <thead className="text-[10px] uppercase font-black tracking-widest font-mono text-neutral-400 bg-neutral-50 rounded-lg">
                          <tr>
                            <th className="p-4 rounded-l-lg">Sender / Date</th>
                            <th className="p-4">Message / Request</th>
                            <th className="p-4">Sector interest</th>
                            <th className="p-4 rounded-r-lg text-right">Inquiry Channel</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                          {db.inquiries.length === 0 ? (
                            <tr>
                              <td colSpan={4} className="p-8 text-center text-xs text-neutral-400 font-light">
                                No inbound inquiries currently received in database.
                              </td>
                            </tr>
                          ) : (
                            db.inquiries.map((inq: any) => (
                              <tr key={inq.id} className="hover:bg-neutral-50/50 transition-colors">
                                <td className="p-4 space-y-1">
                                  <p className="font-bold text-neutral-950">{inq.fullName}</p>
                                  <p className="text-[10px] text-neutral-500 font-mono font-medium">{inq.emailAddress}</p>
                                  <p className="text-[10px] text-neutral-400 font-mono">{inq.date}</p>
                                </td>
                                <td className="p-4 max-w-sm">
                                  <p className="font-bold text-neutral-900 text-[10px] uppercase tracking-wider font-mono">{inq.organization || 'Individual'}</p>
                                  <p className="text-neutral-600 mt-1 leading-relaxed font-light font-sans break-words italic">"{inq.message}"</p>
                                </td>
                                <td className="p-4">
                                  <span className="font-medium text-neutral-600 bg-neutral-100 px-2 py-1 rounded font-mono text-[9px] uppercase tracking-wider">
                                    {inq.sectorOfInterest || 'Unspecified'}
                                  </span>
                                </td>
                                <td className="p-4 text-right">
                                  <span className="bg-[#00a757]/10 text-[#00a757] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full font-mono">
                                    {inq.type}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BOARD OF DIRECTORS MANAGEMENT */}
            {activeTab === 'board-page' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">Board of Directors Settings</h1>
                    <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Manage member cards, roles, display titles, and detailed biographical records for Odu'a Group directors.</p>
                  </div>
                  {!isBoardFormOpen && (
                    <button 
                      onClick={() => openBoardEditor()}
                      className="px-4 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow transition-all"
                    >
                      <Plus className="w-4.5 h-4.5" />
                      <span>Add Board Member</span>
                    </button>
                  )}
                </div>

                {isBoardFormOpen && selectedBoard && (
                  <form onSubmit={handleSaveBoard} className="bg-white rounded-3xl border border-neutral-200/80 shadow-md p-6 sm:p-8 space-y-6">
                    <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                      <h3 className="font-serif text-lg font-bold text-neutral-900">{selectedBoard.id ? 'Edit Board Member Profile' : 'Add New Board Member'}</h3>
                      <button 
                        type="button" 
                        onClick={() => { setIsBoardFormOpen(false); setSelectedBoard(null); }}
                        className="text-neutral-400 hover:text-neutral-600 text-xs uppercase tracking-wider font-bold"
                      >
                        Cancel
                      </button>
                    </div>

                    {boardError && (
                      <div className="p-3 bg-red-50 text-red-800 text-xs font-semibold rounded-lg border border-red-100">
                        {boardError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Full Name</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedBoard.name}
                          onChange={(e) => setSelectedBoard({ ...selectedBoard, name: e.target.value })}
                          placeholder="E.g., Otunba Bimbo Ashiru"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Role</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedBoard.role}
                          onChange={(e) => setSelectedBoard({ ...selectedBoard, role: e.target.value })}
                          placeholder="E.g., Chairman, Group Managing Director, Non-Executive Director"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Display Title / Tag</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedBoard.title}
                          onChange={(e) => setSelectedBoard({ ...selectedBoard, title: e.target.value })}
                          placeholder="E.g., Chairman of the Board / Non-Executive Director"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Initials (Optional)</label>
                        <input 
                          type="text" 
                          value={selectedBoard.initials || ''}
                          onChange={(e) => setSelectedBoard({ ...selectedBoard, initials: e.target.value.toUpperCase().slice(0, 3) })}
                          placeholder="E.g., BA"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-mono font-black"
                        />
                      </div>
                    </div>

                    <div>
                      <ImageUploader
                        value={selectedBoard.image}
                        onChange={(url) => setSelectedBoard({ ...selectedBoard, image: url })}
                        label="Profile Photo / Portrait"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Key Accomplishments / Credentials (One per line)</label>
                      <textarea 
                        rows={4}
                        value={selectedBoard.achievements}
                        onChange={(e) => setSelectedBoard({ ...selectedBoard, achievements: e.target.value })}
                        placeholder="E.g.,&#10;Fellow of the Institute of Directors&#10;Over 30 years of corporate finance expertise"
                        className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-light leading-relaxed font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Biography Paragraphs / Details (One per line)</label>
                      <textarea 
                        rows={6}
                        value={selectedBoard.details}
                        onChange={(e) => setSelectedBoard({ ...selectedBoard, details: e.target.value })}
                        placeholder="Paste full details of board member biography..."
                        className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-light leading-relaxed font-sans"
                      />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
                      <button 
                        type="button" 
                        onClick={() => { setIsBoardFormOpen(false); setSelectedBoard(null); }}
                        className="px-5 py-3 rounded-xl hover:bg-neutral-100 text-neutral-600 font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-6 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Board Member</span>
                      </button>
                    </div>
                  </form>
                )}

                {!isBoardFormOpen && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(db.boardMembers || []).length === 0 ? (
                      <div className="col-span-2 p-10 text-center text-xs text-neutral-400 font-light bg-white rounded-3xl border border-neutral-200">
                        No board members defined. Hit 'Add Board Member' above to register profiles.
                      </div>
                    ) : (
                      db.boardMembers.map((member: any) => (
                        <div key={member.id} className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:border-neutral-300 transition-all">
                          <div className="p-5 flex gap-4">
                            <div className="w-16 h-16 rounded-xl bg-neutral-100 overflow-hidden border border-neutral-200 shrink-0">
                              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-serif text-sm font-bold text-neutral-950">{member.name}</h4>
                              <p className="text-[10px] text-[#00a757] font-semibold uppercase tracking-wider font-mono">{member.role}</p>
                              <p className="text-[11px] text-neutral-500 leading-none">{member.title}</p>
                            </div>
                          </div>

                          <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex justify-end gap-2">
                            <button 
                              onClick={() => openBoardEditor(member)}
                              className="px-3 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                            >
                              <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteBoard(member.id)}
                              className="px-3 py-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* LEADERSHIP TEAM MANAGEMENT */}
            {activeTab === 'leadership-page' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">Leadership Team Settings</h1>
                    <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Manage executive officers, general managers, and key management staff for Odu'a Investment Group.</p>
                  </div>
                  {!isLeaderFormOpen && (
                    <button 
                      onClick={() => openLeaderEditor()}
                      className="px-4 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow transition-all"
                    >
                      <Plus className="w-4.5 h-4.5" />
                      <span>Add Leadership Member</span>
                    </button>
                  )}
                </div>

                {isLeaderFormOpen && selectedLeader && (
                  <form onSubmit={handleSaveLeader} className="bg-white rounded-3xl border border-neutral-200/80 shadow-md p-6 sm:p-8 space-y-6">
                    <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                      <h3 className="font-serif text-lg font-bold text-neutral-900">{selectedLeader.id ? 'Edit Leadership Profile' : 'Add New Leadership Member'}</h3>
                      <button 
                        type="button" 
                        onClick={() => { setIsLeaderFormOpen(false); setSelectedLeader(null); }}
                        className="text-neutral-400 hover:text-neutral-600 text-xs uppercase tracking-wider font-bold"
                      >
                        Cancel
                      </button>
                    </div>

                    {leaderError && (
                      <div className="p-3 bg-red-50 text-red-800 text-xs font-semibold rounded-lg border border-red-100">
                        {leaderError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Full Name</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedLeader.name}
                          onChange={(e) => setSelectedLeader({ ...selectedLeader, name: e.target.value })}
                          placeholder="E.g., Dr. Abdulrahman Yinusa"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Role</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedLeader.role}
                          onChange={(e) => setSelectedLeader({ ...selectedLeader, role: e.target.value })}
                          placeholder="E.g., Group Managing Director, Group Chief Financial Officer"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Display Title / Tag</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedLeader.title}
                          onChange={(e) => setSelectedLeader({ ...selectedLeader, title: e.target.value })}
                          placeholder="E.g., Group Chief Executive Officer / Group Head of HR"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Initials (Optional)</label>
                        <input 
                          type="text" 
                          value={selectedLeader.initials || ''}
                          onChange={(e) => setSelectedLeader({ ...selectedLeader, initials: e.target.value.toUpperCase().slice(0, 3) })}
                          placeholder="E.g., AY"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-mono font-black"
                        />
                      </div>
                    </div>

                    <div>
                      <ImageUploader
                        value={selectedLeader.image}
                        onChange={(url) => setSelectedLeader({ ...selectedLeader, image: url })}
                        label="Profile Photo / Portrait"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Key Accomplishments / Credentials (One per line)</label>
                      <textarea 
                        rows={4}
                        value={selectedLeader.achievements}
                        onChange={(e) => setSelectedLeader({ ...selectedLeader, achievements: e.target.value })}
                        placeholder="E.g.,&#10;Fellow of the Institute of Chartered Accountants&#10;Over 25 years of treasury experience"
                        className="w-full p-4 rounded-xl border border-neutral-200/80 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-light leading-relaxed font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Biography Paragraphs / Details (One per line)</label>
                      <textarea 
                        rows={6}
                        value={selectedLeader.details}
                        onChange={(e) => setSelectedLeader({ ...selectedLeader, details: e.target.value })}
                        placeholder="Paste full details of leadership member biography..."
                        className="w-full p-4 rounded-xl border border-neutral-200/80 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-light leading-relaxed font-sans"
                      />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
                      <button 
                        type="button" 
                        onClick={() => { setIsLeaderFormOpen(false); setSelectedLeader(null); }}
                        className="px-5 py-3 rounded-xl hover:bg-neutral-100 text-neutral-600 font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-6 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Leadership Member</span>
                      </button>
                    </div>
                  </form>
                )}

                {!isLeaderFormOpen && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(db.leadershipTeam || []).length === 0 ? (
                      <div className="col-span-2 p-10 text-center text-xs text-neutral-400 font-light bg-white rounded-3xl border border-neutral-200">
                        No leadership team members defined. Hit 'Add Leadership Member' above to register profiles.
                      </div>
                    ) : (
                      db.leadershipTeam.map((member: any) => (
                        <div key={member.id} className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:border-neutral-300 transition-all">
                          <div className="p-5 flex gap-4">
                            <div className="w-16 h-16 rounded-xl bg-neutral-100 overflow-hidden border border-neutral-200 shrink-0">
                              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-serif text-sm font-bold text-neutral-950">{member.name}</h4>
                              <p className="text-[10px] text-[#00a757] font-semibold uppercase tracking-wider font-mono">{member.role}</p>
                              <p className="text-[11px] text-neutral-500 leading-none">{member.title}</p>
                            </div>
                          </div>

                          <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex justify-end gap-2">
                            <button 
                              onClick={() => openLeaderEditor(member)}
                              className="px-3 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                            >
                              <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteLeader(member.id)}
                              className="px-3 py-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* HISTORY TIMELINE MILESTONES MANAGEMENT */}
            {activeTab === 'history-milestones-page' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">History Timeline Milestones</h1>
                    <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Manage key corporate milestones, years of operation, metrics, and narrative highlights.</p>
                  </div>
                  {!isMilestoneFormOpen && (
                    <button 
                      onClick={() => openMilestoneEditor()}
                      className="px-4 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow transition-all"
                    >
                      <Plus className="w-4.5 h-4.5" />
                      <span>Add Milestone</span>
                    </button>
                  )}
                </div>

                {isMilestoneFormOpen && selectedMilestone && (
                  <form onSubmit={handleSaveMilestone} className="bg-white rounded-3xl border border-neutral-200/80 shadow-md p-6 sm:p-8 space-y-6">
                    <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                      <h3 className="font-serif text-lg font-bold text-neutral-900">{selectedMilestone.id ? 'Edit History Milestone' : 'Add New Milestone'}</h3>
                      <button 
                        type="button" 
                        onClick={() => { setIsMilestoneFormOpen(false); setSelectedMilestone(null); }}
                        className="text-neutral-400 hover:text-neutral-600 text-xs uppercase tracking-wider font-bold"
                      >
                        Cancel
                      </button>
                    </div>

                    {milestoneError && (
                      <div className="p-3 bg-red-50 text-red-800 text-xs font-semibold rounded-lg border border-red-100">
                        {milestoneError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Milestone Year</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedMilestone.year}
                          onChange={(e) => setSelectedMilestone({ ...selectedMilestone, year: e.target.value })}
                          placeholder="E.g., 1976 or 2024"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Milestone Title</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedMilestone.title}
                          onChange={(e) => setSelectedMilestone({ ...selectedMilestone, title: e.target.value })}
                          placeholder="E.g., Incorporation of Odu’a Investment"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Tagline / Short Subtitle</label>
                        <input 
                          type="text" 
                          value={selectedMilestone.tagline || ''}
                          onChange={(e) => setSelectedMilestone({ ...selectedMilestone, tagline: e.target.value })}
                          placeholder="E.g., Laying the Foundation of Southwest Conglomerate"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Badge / Stage Tag</label>
                        <input 
                          type="text" 
                          value={selectedMilestone.badge || ''}
                          onChange={(e) => setSelectedMilestone({ ...selectedMilestone, badge: e.target.value })}
                          placeholder="E.g., Foundation, expansion, modernization"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Icon ID</label>
                        <select 
                          value={selectedMilestone.icon || 'building'}
                          onChange={(e) => setSelectedMilestone({ ...selectedMilestone, icon: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        >
                          <option value="building">Building (Corporate)</option>
                          <option value="award">Award (Triumph)</option>
                          <option value="globe">Globe (Global)</option>
                          <option value="users">Users (Group)</option>
                          <option value="landmark">Landmark (Sovereign)</option>
                          <option value="factory">Factory (Industrial)</option>
                          <option value="trending">Trending Up (Growth)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Theme Color</label>
                        <select 
                          value={selectedMilestone.color || 'green'}
                          onChange={(e) => setSelectedMilestone({ ...selectedMilestone, color: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        >
                          <option value="green">Emerald Green</option>
                          <option value="gold">Golden Yellow</option>
                          <option value="blue">Royal Blue</option>
                          <option value="amber">Warm Amber</option>
                          <option value="purple">Noble Purple</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Quote or Motto</label>
                        <input 
                          type="text" 
                          value={selectedMilestone.quote || ''}
                          onChange={(e) => setSelectedMilestone({ ...selectedMilestone, quote: e.target.value })}
                          placeholder="E.g., Built for generation-spanning wealth"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Metric Value (Optional)</label>
                        <input 
                          type="text" 
                          value={selectedMilestone.metricValue || ''}
                          onChange={(e) => setSelectedMilestone({ ...selectedMilestone, metricValue: e.target.value })}
                          placeholder="E.g., ₦300B+ or 10+"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-mono font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Metric Label (Optional)</label>
                        <input 
                          type="text" 
                          value={selectedMilestone.metricLabel || ''}
                          onChange={(e) => setSelectedMilestone({ ...selectedMilestone, metricLabel: e.target.value })}
                          placeholder="E.g., Net Asset Base or Subsidiary Companies"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Milestone Summary Paragraph</label>
                      <textarea 
                        rows={3}
                        value={selectedMilestone.summary || ''}
                        onChange={(e) => setSelectedMilestone({ ...selectedMilestone, summary: e.target.value })}
                        placeholder="Provide a concise one-paragraph summary of this historic milestone..."
                        className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-light leading-relaxed font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Detailed Highlights / Lists (One per line)</label>
                      <textarea 
                        rows={4}
                        value={selectedMilestone.details || ''}
                        onChange={(e) => setSelectedMilestone({ ...selectedMilestone, details: e.target.value })}
                        placeholder="E.g.,&#10;Acquired prime heritage properties in Cocoa House, Dugbe&#10;Inbound capital allocation from Western State governors"
                        className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-light leading-relaxed font-sans"
                      />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
                      <button 
                        type="button" 
                        onClick={() => { setIsMilestoneFormOpen(false); setSelectedMilestone(null); }}
                        className="px-5 py-3 rounded-xl hover:bg-neutral-100 text-neutral-600 font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-6 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Milestone</span>
                      </button>
                    </div>
                  </form>
                )}

                {!isMilestoneFormOpen && (
                  <div className="grid grid-cols-1 gap-4">
                    {(db.historyMilestones || []).length === 0 ? (
                      <div className="p-10 text-center text-xs text-neutral-400 font-light bg-white rounded-3xl border border-neutral-200">
                        No milestones defined yet. Click 'Add Milestone' to seed your timeline.
                      </div>
                    ) : (
                      db.historyMilestones.map((milestone: any) => (
                        <div key={milestone.id} className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:border-neutral-300 transition-all gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-[#00a757]/10 flex flex-col items-center justify-center border border-[#00a757]/20 text-[#00a757] shrink-0">
                              <span className="text-sm font-black font-serif leading-none">{milestone.year}</span>
                              <span className="text-[8px] font-mono uppercase tracking-wider font-bold mt-1 text-neutral-500">{milestone.badge || 'Event'}</span>
                            </div>
                            <div className="space-y-1 text-left">
                              <h4 className="font-serif text-sm font-bold text-neutral-950">{milestone.title}</h4>
                              <p className="text-xs text-neutral-500 font-light leading-snug line-clamp-1">{milestone.summary}</p>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 shrink-0">
                            <button 
                              onClick={() => openMilestoneEditor(milestone)}
                              className="px-3 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                            >
                              <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteMilestone(milestone.id)}
                              className="px-3 py-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* SOUTHWEST STATES MANAGEMENT */}
            {activeTab === 'southwest-states-page' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">Southwest Owner States</h1>
                    <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Manage the capital cities, sovereign wealth GDPs, populations, and strategic priority sectors of our owner States.</p>
                  </div>
                  {!isStateFormOpen && (
                    <button 
                      onClick={() => openStateEditor()}
                      className="px-4 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow transition-all"
                    >
                      <Plus className="w-4.5 h-4.5" />
                      <span>Add Owner State</span>
                    </button>
                  )}
                </div>

                {isStateFormOpen && selectedStateCMS && (
                  <form onSubmit={handleSaveState} className="bg-white rounded-3xl border border-neutral-200/80 shadow-md p-6 sm:p-8 space-y-6">
                    <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                      <h3 className="font-serif text-lg font-bold text-neutral-900">{selectedStateCMS.id ? 'Edit State Profile' : 'Add New Owner State'}</h3>
                      <button 
                        type="button" 
                        onClick={() => { setIsStateFormOpen(false); setSelectedStateCMS(null); }}
                        className="text-neutral-400 hover:text-neutral-600 text-xs uppercase tracking-wider font-bold"
                      >
                        Cancel
                      </button>
                    </div>

                    {stateError && (
                      <div className="p-3 bg-red-50 text-red-800 text-xs font-semibold rounded-lg border border-red-100">
                        {stateError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">State Name</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedStateCMS.name}
                          onChange={(e) => setSelectedStateCMS({ ...selectedStateCMS, name: e.target.value })}
                          placeholder="E.g., Oyo State, Lagos State"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">State Capital City</label>
                        <input 
                          type="text" 
                          value={selectedStateCMS.capital || ''}
                          onChange={(e) => setSelectedStateCMS({ ...selectedStateCMS, capital: e.target.value })}
                          placeholder="E.g., Ibadan, Ikeja, Abeokuta"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">State Logo / Crest Image URL</label>
                      <input 
                        type="url" 
                        value={selectedStateCMS.logo || ''}
                        onChange={(e) => setSelectedStateCMS({ ...selectedStateCMS, logo: e.target.value })}
                        placeholder="https://..."
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-mono text-neutral-900"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">State GDP Estimate</label>
                        <input 
                          type="text" 
                          value={selectedStateCMS.gdp || ''}
                          onChange={(e) => setSelectedStateCMS({ ...selectedStateCMS, gdp: e.target.value })}
                          placeholder="E.g., $8.50 Billion or $102.01 Billion"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">State Population Estimate</label>
                        <input 
                          type="text" 
                          value={selectedStateCMS.population || ''}
                          onChange={(e) => setSelectedStateCMS({ ...selectedStateCMS, population: e.target.value })}
                          placeholder="E.g., 7.8 Million or 15.3 Million"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">State Description Profile</label>
                      <textarea 
                        rows={4}
                        required
                        value={selectedStateCMS.description || ''}
                        onChange={(e) => setSelectedStateCMS({ ...selectedStateCMS, description: e.target.value })}
                        placeholder="Provide a comprehensive profile of this state's contribution to Odu'a investment group..."
                        className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-light leading-relaxed font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Key Strategic Priority Sectors (One per line)</label>
                      <textarea 
                        rows={4}
                        value={selectedStateCMS.keySectors || ''}
                        onChange={(e) => setSelectedStateCMS({ ...selectedStateCMS, keySectors: e.target.value })}
                        placeholder="E.g.,&#10;Agriculture & Agribusiness&#10;Real Estate Development&#10;Solid Minerals Extraction"
                        className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-light leading-relaxed font-sans"
                      />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
                      <button 
                        type="button" 
                        onClick={() => { setIsStateFormOpen(false); setSelectedStateCMS(null); }}
                        className="px-5 py-3 rounded-xl hover:bg-neutral-100 text-neutral-600 font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-6 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save State</span>
                      </button>
                    </div>
                  </form>
                )}

                {!isStateFormOpen && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(db.southwestStates || []).length === 0 ? (
                      <div className="col-span-2 p-10 text-center text-xs text-neutral-400 font-light bg-white rounded-3xl border border-neutral-200">
                        No owner states metadata defined in database. Click 'Add Owner State' above.
                      </div>
                    ) : (
                      db.southwestStates.map((state: any) => (
                        <div key={state.id} className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:border-neutral-300 transition-all">
                          <div className="p-5 space-y-3">
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif text-md font-bold text-neutral-950">{state.name}</h4>
                              <span className="text-[9px] font-mono bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                                ID: {state.id}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2 text-left bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                              <div>
                                <span className="text-[8px] font-mono text-neutral-400 uppercase font-bold block">Capital</span>
                                <span className="text-[11px] font-bold text-neutral-800">{state.capital || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-[8px] font-mono text-neutral-400 uppercase font-bold block">GDP</span>
                                <span className="text-[11px] font-bold text-[#00a757]">{state.gdp || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="text-[8px] font-mono text-neutral-400 uppercase font-bold block">Population</span>
                                <span className="text-[11px] font-bold text-blue-600">{state.population || 'N/A'}</span>
                              </div>
                            </div>
                            
                            <p className="text-xs text-neutral-500 font-light leading-snug line-clamp-2">{state.description}</p>
                          </div>

                          <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex justify-end gap-2">
                            <button 
                              onClick={() => openStateEditor(state)}
                              className="px-3 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                            >
                              <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteState(state.id)}
                              className="px-3 py-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 14. SUBSIDIARIES & ASSOCIATES TAB */}
            {activeTab === 'subsidiaries-page' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">Subsidiaries & Associates Directory</h1>
                    <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Manage operating subsidiary entities, associate investments, equity share, and managing directors.</p>
                  </div>
                  {!isSubsidiaryFormOpen && (
                    <button 
                      onClick={() => openSubsidiaryEditor()}
                      className="px-5 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Subsidiary / Associate</span>
                    </button>
                  )}
                </div>

                {isSubsidiaryFormOpen && selectedSubsidiary && (
                  <form onSubmit={handleSaveSubsidiary} className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6 animate-in fade-in duration-150">
                    <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                      <h3 className="font-serif text-lg font-bold text-neutral-900">
                        {selectedSubsidiary.id ? 'Edit Subsidiary Profile' : 'Add New Operating Company'}
                      </h3>
                      <button 
                        type="button" 
                        onClick={() => { setIsSubsidiaryFormOpen(false); setSelectedSubsidiary(null); }}
                        className="text-neutral-400 hover:text-neutral-600 text-xs font-bold uppercase tracking-wider"
                      >
                        Cancel
                      </button>
                    </div>

                    {subsidiaryError && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{subsidiaryError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Company Name *</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedSubsidiary.name}
                          onChange={(e) => setSelectedSubsidiary({ ...selectedSubsidiary, name: e.target.value })}
                          placeholder="E.g., Wemabod Limited, SWAgCo"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Industry / Sector *</label>
                        <select 
                          value={selectedSubsidiary.sector}
                          onChange={(e) => setSelectedSubsidiary({ ...selectedSubsidiary, sector: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900 bg-white"
                        >
                          <option value="Real Estate & Hospitality">Real Estate & Hospitality</option>
                          <option value="Agriculture & Agribusiness">Agriculture & Agribusiness</option>
                          <option value="Financial Services & Insurance">Financial Services & Insurance</option>
                          <option value="Energy & Infrastructure">Energy & Infrastructure</option>
                          <option value="Healthcare & Logistics">Healthcare & Logistics</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Holding Type</label>
                        <select 
                          value={selectedSubsidiary.type}
                          onChange={(e) => setSelectedSubsidiary({ ...selectedSubsidiary, type: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900 bg-white"
                        >
                          <option value="Subsidiary (100% Owned)">Subsidiary (100% Owned)</option>
                          <option value="Subsidiary (Majority Stake)">Subsidiary (Majority Stake)</option>
                          <option value="Associate Company (Strategic Minority)">Associate Company (Strategic Minority)</option>
                          <option value="Joint Venture Enterprise">Joint Venture Enterprise</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Equity Ownership %</label>
                        <input 
                          type="text" 
                          value={selectedSubsidiary.ownership || ''}
                          onChange={(e) => setSelectedSubsidiary({ ...selectedSubsidiary, ownership: e.target.value })}
                          placeholder="E.g., 100%, 51%, 20%"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Operating Status</label>
                        <select 
                          value={selectedSubsidiary.status}
                          onChange={(e) => setSelectedSubsidiary({ ...selectedSubsidiary, status: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900 bg-white"
                        >
                          <option value="Active Operating">Active Operating</option>
                          <option value="Strategic Restructuring">Strategic Restructuring</option>
                          <option value="Under Revitalization">Under Revitalization</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Managing Director / CEO</label>
                        <input 
                          type="text" 
                          value={selectedSubsidiary.md || ''}
                          onChange={(e) => setSelectedSubsidiary({ ...selectedSubsidiary, md: e.target.value })}
                          placeholder="E.g., Bashir Oladunni, MD/CEO"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Official Website URL</label>
                        <input 
                          type="text" 
                          value={selectedSubsidiary.website || ''}
                          onChange={(e) => setSelectedSubsidiary({ ...selectedSubsidiary, website: e.target.value })}
                          placeholder="https://wemabod.com"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Company Description & Mission</label>
                      <textarea 
                        rows={3}
                        value={selectedSubsidiary.description || ''}
                        onChange={(e) => setSelectedSubsidiary({ ...selectedSubsidiary, description: e.target.value })}
                        placeholder="Comprehensive summary of subsidiary's market role, mandate, and achievements..."
                        className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-light leading-relaxed font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Key Portfolio Assets / Landmarks (One per line)</label>
                      <textarea 
                        rows={3}
                        value={selectedSubsidiary.keyAssets || ''}
                        onChange={(e) => setSelectedSubsidiary({ ...selectedSubsidiary, keyAssets: e.target.value })}
                        placeholder="E.g.,&#10;Cocoa House (Dugbe, Ibadan)&#10;Western House (Broad St, Lagos)&#10;Unity House (Marina, Lagos)"
                        className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-light leading-relaxed font-sans"
                      />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
                      <button 
                        type="button" 
                        onClick={() => { setIsSubsidiaryFormOpen(false); setSelectedSubsidiary(null); }}
                        className="px-5 py-3 rounded-xl hover:bg-neutral-100 text-neutral-600 font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-6 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Subsidiary</span>
                      </button>
                    </div>
                  </form>
                )}

                {!isSubsidiaryFormOpen && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(db.subsidiaries || []).length === 0 ? (
                      <div className="col-span-2 p-10 text-center text-xs text-neutral-400 font-light bg-white rounded-3xl border border-neutral-200">
                        No subsidiaries defined in database. Click 'Add Subsidiary' above.
                      </div>
                    ) : (
                      db.subsidiaries.map((sub: any) => (
                        <div key={sub.id} className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:border-neutral-300 transition-all">
                          <div className="p-5 space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-serif text-base font-bold text-neutral-950">{sub.name}</h4>
                                <span className="text-[10px] font-mono text-[#00a757] font-bold block">{sub.sector}</span>
                              </div>
                              <span className="text-[9px] font-mono bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">
                                {sub.ownership || '100%'}
                              </span>
                            </div>

                            <p className="text-xs text-neutral-500 font-light leading-snug line-clamp-2">{sub.description}</p>

                            <div className="bg-neutral-50 rounded-xl p-3 text-[11px] space-y-1 text-neutral-600 font-medium">
                              <div className="flex justify-between">
                                <span className="text-neutral-400 font-mono text-[9px] uppercase font-bold">Leadership</span>
                                <span>{sub.md || 'Managing Director'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-neutral-400 font-mono text-[9px] uppercase font-bold">Status</span>
                                <span className="text-emerald-700 font-bold">{sub.status || 'Active'}</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
                            {sub.website && (
                              <a href={sub.website} target="_blank" rel="noreferrer" className="text-[11px] font-bold text-[#00a757] hover:underline flex items-center gap-1">
                                <span>Website</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            <div className="flex gap-2 ml-auto">
                              <button 
                                onClick={() => openSubsidiaryEditor(sub)}
                                className="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                              >
                                <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteSubsidiary(sub.id)}
                                className="px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                              >
                                <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 15. FOUNDATION (CSR) TAB */}
            {activeTab === 'foundation-page' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">The Odu'a Foundation (CSR)</h1>
                    <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Manage social investment initiatives, student scholarship grants, and agricultural youth programs.</p>
                  </div>
                  {!isProgramFormOpen && (
                    <button 
                      onClick={() => openProgramEditor()}
                      className="px-5 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Foundation Program</span>
                    </button>
                  )}
                </div>

                {isProgramFormOpen && selectedProgram && (
                  <form onSubmit={handleSaveProgram} className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6 animate-in fade-in duration-150">
                    <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                      <h3 className="font-serif text-lg font-bold text-neutral-900">
                        {selectedProgram.id ? 'Edit Foundation Initiative' : 'Launch New Foundation Program'}
                      </h3>
                      <button 
                        type="button" 
                        onClick={() => { setIsProgramFormOpen(false); setSelectedProgram(null); }}
                        className="text-neutral-400 hover:text-neutral-600 text-xs font-bold uppercase tracking-wider"
                      >
                        Cancel
                      </button>
                    </div>

                    {programError && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{programError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Program Title *</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedProgram.title}
                          onChange={(e) => setSelectedProgram({ ...selectedProgram, title: e.target.value })}
                          placeholder="E.g., Byte-Sized Scholars Tech Bootcamp"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Strategic Pillar Category *</label>
                        <select 
                          value={selectedProgram.category}
                          onChange={(e) => setSelectedProgram({ ...selectedProgram, category: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900 bg-white"
                        >
                          <option value="Education & Digital Skills">Education & Digital Skills</option>
                          <option value="Youth Agribusiness & Farming">Youth Agribusiness & Farming</option>
                          <option value="Healthcare & Community Outreach">Healthcare & Community Outreach</option>
                          <option value="Yoruba Heritage & Cultural Preservation">Yoruba Heritage & Cultural Preservation</option>
                          <option value="Women Economic Empowerment">Women Economic Empowerment</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Impact Metric / Stats Summary</label>
                        <input 
                          type="text" 
                          value={selectedProgram.stats || ''}
                          onChange={(e) => setSelectedProgram({ ...selectedProgram, stats: e.target.value })}
                          placeholder="E.g., 15,000+ Students Trained across 6 States"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Annual Program Budget</label>
                        <input 
                          type="text" 
                          value={selectedProgram.budget || ''}
                          onChange={(e) => setSelectedProgram({ ...selectedProgram, budget: e.target.value })}
                          placeholder="E.g., ₦150 Million Allocated"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Initiative Scope & Description</label>
                      <textarea 
                        rows={4}
                        required
                        value={selectedProgram.desc || ''}
                        onChange={(e) => setSelectedProgram({ ...selectedProgram, desc: e.target.value })}
                        placeholder="Detail the beneficiaries, qualification criteria, implementation timeline, and partner institutions..."
                        className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-light leading-relaxed font-sans"
                      />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
                      <button 
                        type="button" 
                        onClick={() => { setIsProgramFormOpen(false); setSelectedProgram(null); }}
                        className="px-5 py-3 rounded-xl hover:bg-neutral-100 text-neutral-600 font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-6 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Program</span>
                      </button>
                    </div>
                  </form>
                )}

                {!isProgramFormOpen && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(db.foundationPrograms || []).length === 0 ? (
                      <div className="col-span-2 p-10 text-center text-xs text-neutral-400 font-light bg-white rounded-3xl border border-neutral-200">
                        No foundation initiatives registered. Click 'Add Foundation Program' above.
                      </div>
                    ) : (
                      db.foundationPrograms.map((prog: any) => (
                        <div key={prog.id} className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:border-neutral-300 transition-all p-6 space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <span className="text-[9px] font-mono bg-emerald-50 text-[#00a757] px-2.5 py-1 rounded-full uppercase font-bold tracking-wider border border-emerald-100">
                                {prog.category}
                              </span>
                              <span className="text-xs font-mono font-bold text-neutral-700">{prog.budget}</span>
                            </div>
                            <h4 className="font-serif text-lg font-bold text-neutral-950">{prog.title}</h4>
                            <p className="text-xs text-neutral-500 font-light leading-relaxed">{prog.desc}</p>
                          </div>

                          <div className="pt-3 border-t border-neutral-100 flex justify-between items-center">
                            <span className="text-xs font-bold text-[#00a757]">{prog.stats}</span>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => openProgramEditor(prog)}
                                className="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                              >
                                <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteProgram(prog.id)}
                                className="px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                              >
                                <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 16. GOVERNANCE & CHARTERS TAB */}
            {activeTab === 'governance-page' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">Governance Charters & Policies</h1>
                    <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Manage published compliance policies, audit committee charters, code of ethics, and statutory disclosures.</p>
                  </div>
                  {!isPolicyFormOpen && (
                    <button 
                      onClick={() => openPolicyEditor()}
                      className="px-5 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Upload Governance Policy</span>
                    </button>
                  )}
                </div>

                {isPolicyFormOpen && selectedPolicy && (
                  <form onSubmit={handleSavePolicy} className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6 animate-in fade-in duration-150">
                    <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                      <h3 className="font-serif text-lg font-bold text-neutral-900">
                        {selectedPolicy.id ? 'Edit Policy Document' : 'Register Governance Charter'}
                      </h3>
                      <button 
                        type="button" 
                        onClick={() => { setIsPolicyFormOpen(false); setSelectedPolicy(null); }}
                        className="text-neutral-400 hover:text-neutral-600 text-xs font-bold uppercase tracking-wider"
                      >
                        Cancel
                      </button>
                    </div>

                    {policyError && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{policyError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Policy / Charter Name *</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedPolicy.title}
                          onChange={(e) => setSelectedPolicy({ ...selectedPolicy, title: e.target.value })}
                          placeholder="E.g., Board Governance Charter, Anti-Bribery Policy"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Classification Category *</label>
                        <select 
                          value={selectedPolicy.category}
                          onChange={(e) => setSelectedPolicy({ ...selectedPolicy, category: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900 bg-white"
                        >
                          <option value="Corporate Governance">Corporate Governance</option>
                          <option value="Ethics & Compliance">Ethics & Compliance</option>
                          <option value="Financial & Audit">Financial & Audit</option>
                          <option value="Sustainability (ESG)">Sustainability (ESG)</option>
                          <option value="Human Capital & Conduct">Human Capital & Conduct</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Document Tracking Code</label>
                        <input 
                          type="text" 
                          value={selectedPolicy.code || ''}
                          onChange={(e) => setSelectedPolicy({ ...selectedPolicy, code: e.target.value })}
                          placeholder="E.g., ODUA-POL-001"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-mono font-medium text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Effective / Revision Date</label>
                        <input 
                          type="text" 
                          value={selectedPolicy.effectiveDate || ''}
                          onChange={(e) => setSelectedPolicy({ ...selectedPolicy, effectiveDate: e.target.value })}
                          placeholder="E.g., January 2026"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Enforcement Status</label>
                        <select 
                          value={selectedPolicy.status}
                          onChange={(e) => setSelectedPolicy({ ...selectedPolicy, status: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900 bg-white"
                        >
                          <option value="Enforced">Enforced</option>
                          <option value="Under Board Review">Under Board Review</option>
                          <option value="Superseded">Superseded</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Downloadable PDF Charter Document URL</label>
                      <input 
                        type="text" 
                        value={selectedPolicy.pdfUrl || ''}
                        onChange={(e) => setSelectedPolicy({ ...selectedPolicy, pdfUrl: e.target.value })}
                        placeholder="https://oduainvestment.com.ng/charters/board-charter-2026.pdf"
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-mono text-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Policy Objective & Overview</label>
                      <textarea 
                        rows={3}
                        value={selectedPolicy.description || ''}
                        onChange={(e) => setSelectedPolicy({ ...selectedPolicy, description: e.target.value })}
                        placeholder="Summary of the policy mandate, adherence rules, and regulatory statutory anchors..."
                        className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-light leading-relaxed font-sans"
                      />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
                      <button 
                        type="button" 
                        onClick={() => { setIsPolicyFormOpen(false); setSelectedPolicy(null); }}
                        className="px-5 py-3 rounded-xl hover:bg-neutral-100 text-neutral-600 font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-6 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Policy</span>
                      </button>
                    </div>
                  </form>
                )}

                {!isPolicyFormOpen && (
                  <div className="space-y-4">
                    {(db.governancePolicies || []).length === 0 ? (
                      <div className="p-10 text-center text-xs text-neutral-400 font-light bg-white rounded-3xl border border-neutral-200">
                        No governance policies registered. Click 'Upload Governance Policy' above.
                      </div>
                    ) : (
                      db.governancePolicies.map((pol: any) => (
                        <div key={pol.id} className="bg-white rounded-2xl border border-neutral-200/80 p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-neutral-300 transition-all shadow-sm">
                          <div className="space-y-1 max-w-2xl">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-mono bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded font-bold uppercase">
                                {pol.code || 'ODUA-POL'}
                              </span>
                              <span className="text-[9px] font-mono text-emerald-700 font-bold uppercase bg-emerald-50 px-2 py-0.5 rounded">
                                {pol.category}
                              </span>
                              <span className="text-[9px] font-mono text-neutral-400">Effective: {pol.effectiveDate}</span>
                            </div>
                            <h4 className="font-serif text-base font-bold text-neutral-950">{pol.title}</h4>
                            <p className="text-xs text-neutral-500 font-light leading-snug">{pol.description}</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button 
                              onClick={() => openPolicyEditor(pol)}
                              className="px-3 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                            >
                              <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
                            </button>
                            <button 
                              onClick={() => handleDeletePolicy(pol.id)}
                              className="px-3 py-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 17. WHISTLEBLOWER REPORTS TAB */}
            {activeTab === 'whistleblower-page' && (
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 text-rose-600 bg-rose-50 border border-rose-200/60 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase w-fit mb-2">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Confidential Governance Channel</span>
                  </div>
                  <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">Whistleblower Incident Log</h1>
                  <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">
                    Encrypted and anonymous reports submitted directly to the Board Audit & Compliance Committee.
                  </p>
                </div>

                <div className="space-y-4">
                  {(db.whistleblowerReports || []).length === 0 ? (
                    <div className="p-10 text-center text-xs text-neutral-400 font-light bg-white rounded-3xl border border-neutral-200">
                      No whistleblower incident reports currently lodged.
                    </div>
                  ) : (
                    db.whistleblowerReports.map((report: any) => (
                      <div key={report.id} className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-sm space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b border-neutral-100">
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-black text-sm text-neutral-900 bg-neutral-100 px-3 py-1 rounded-xl">
                              {report.id}
                            </span>
                            <span className={`text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full border ${
                              report.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              report.status === 'Under Active Investigation' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              'bg-rose-50 text-rose-700 border-rose-200'
                            }`}>
                              {report.status}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-neutral-400">{new Date(report.timestamp).toLocaleString()}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-neutral-50 p-4 rounded-2xl text-xs">
                          <div>
                            <span className="text-[9px] font-mono text-neutral-400 uppercase font-bold block">Incident Category</span>
                            <span className="font-bold text-neutral-800">{report.category}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-mono text-neutral-400 uppercase font-bold block">Subsidiary / Entity</span>
                            <span className="font-bold text-neutral-800">{report.subsidiary}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-mono text-neutral-400 uppercase font-bold block">Complainant Contact</span>
                            <span className="font-bold text-neutral-800">{report.reporterEmail || 'Anonymous'}</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1">Incident Report Details</span>
                          <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed bg-neutral-50/50 p-4 rounded-2xl border border-neutral-100">
                            {report.details}
                          </p>
                        </div>

                        {report.resolutionNotes && (
                          <div>
                            <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold block mb-1">Board Compliance Resolution Notes</span>
                            <p className="text-xs text-emerald-900 bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 font-medium">
                              {report.resolutionNotes}
                            </p>
                          </div>
                        )}

                        <div className="pt-4 border-t border-neutral-100 flex flex-wrap justify-between items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-neutral-500">Update Status:</span>
                            <button 
                              onClick={() => handleUpdateWhistleblowerStatus(report.id, 'Under Active Investigation', 'Assigned to External Forensic Auditor')}
                              className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 font-bold text-[11px] border border-amber-200 transition-colors"
                            >
                              Investigate
                            </button>
                            <button 
                              onClick={() => handleUpdateWhistleblowerStatus(report.id, 'Resolved', 'Audit completed; corrective compliance measures instituted.')}
                              className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px] border border-emerald-200 transition-colors"
                            >
                              Mark Resolved
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* 18. JUBILEE EVENTS TAB */}
            {activeTab === 'jubilee-page' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">50-Year Golden Jubilee Archive</h1>
                    <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Manage 1976-2026 historical anniversary milestones and celebration retrospective archives.</p>
                  </div>
                  {!isJubileeEventFormOpen && (
                    <button 
                      onClick={() => openJubileeEditor()}
                      className="px-5 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Jubilee Milestone</span>
                    </button>
                  )}
                </div>

                {isJubileeEventFormOpen && selectedJubileeEvent && (
                  <form onSubmit={handleSaveJubilee} className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6 animate-in fade-in duration-150">
                    <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                      <h3 className="font-serif text-lg font-bold text-neutral-900">
                        {selectedJubileeEvent.id ? 'Edit Jubilee Milestone' : 'Add Golden Jubilee Milestone'}
                      </h3>
                      <button 
                        type="button" 
                        onClick={() => { setIsJubileeEventFormOpen(false); setSelectedJubileeEvent(null); }}
                        className="text-neutral-400 hover:text-neutral-600 text-xs font-bold uppercase tracking-wider"
                      >
                        Cancel
                      </button>
                    </div>

                    {jubileeError && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{jubileeError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Milestone Year *</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedJubileeEvent.year}
                          onChange={(e) => setSelectedJubileeEvent({ ...selectedJubileeEvent, year: e.target.value })}
                          placeholder="E.g., 1976, 2026"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-bold text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Decade Group *</label>
                        <select 
                          value={selectedJubileeEvent.decade}
                          onChange={(e) => setSelectedJubileeEvent({ ...selectedJubileeEvent, decade: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900 bg-white"
                        >
                          <option value="1970s">1970s</option>
                          <option value="1980s">1980s</option>
                          <option value="1990s">1990s</option>
                          <option value="2000s">2000s</option>
                          <option value="2010s">2010s</option>
                          <option value="2020s">2020s</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Milestone Title *</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedJubileeEvent.title}
                          onChange={(e) => setSelectedJubileeEvent({ ...selectedJubileeEvent, title: e.target.value })}
                          placeholder="E.g., 50-Year Golden Jubilee"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Subtitle / Header Tagline</label>
                        <input 
                          type="text" 
                          value={selectedJubileeEvent.subtitle || ''}
                          onChange={(e) => setSelectedJubileeEvent({ ...selectedJubileeEvent, subtitle: e.target.value })}
                          placeholder="Half a Century of Economic Leadership"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Historical Narrative</label>
                      <textarea 
                        rows={3}
                        required
                        value={selectedJubileeEvent.description || ''}
                        onChange={(e) => setSelectedJubileeEvent({ ...selectedJubileeEvent, description: e.target.value })}
                        placeholder="Detail the significance of this milestone in South-West economic history..."
                        className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-light leading-relaxed font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Long-Term Impact Legacy</label>
                      <input 
                        type="text" 
                        value={selectedJubileeEvent.impact || ''}
                        onChange={(e) => setSelectedJubileeEvent({ ...selectedJubileeEvent, impact: e.target.value })}
                        placeholder="E.g., Created Sub-Saharan Africa's premier state-owned holding conglomerate."
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Milestone Archival Photograph</label>
                      <ImageUploader 
                        value={selectedJubileeEvent.image}
                        onChange={(url) => setSelectedJubileeEvent({ ...selectedJubileeEvent, image: url })}
                      />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
                      <button 
                        type="button" 
                        onClick={() => { setIsJubileeEventFormOpen(false); setSelectedJubileeEvent(null); }}
                        className="px-5 py-3 rounded-xl hover:bg-neutral-100 text-neutral-600 font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-6 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Jubilee Milestone</span>
                      </button>
                    </div>
                  </form>
                )}

                {!isJubileeEventFormOpen && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(db.jubileeEvents || []).length === 0 ? (
                      <div className="col-span-2 p-10 text-center text-xs text-neutral-400 font-light bg-white rounded-3xl border border-neutral-200">
                        No Jubilee milestones registered. Click 'Add Jubilee Milestone' above.
                      </div>
                    ) : (
                      db.jubileeEvents.map((ev: any) => (
                        <div key={ev.id} className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:border-neutral-300 transition-all">
                          <div className="p-5 space-y-3">
                            <div className="flex justify-between items-start">
                              <span className="font-serif text-2xl font-black text-[#00a757]">{ev.year}</span>
                              <span className="text-[9px] font-mono bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded uppercase font-bold">
                                {ev.decade}
                              </span>
                            </div>
                            <h4 className="font-serif text-base font-bold text-neutral-950">{ev.title}</h4>
                            <p className="text-xs text-neutral-500 font-light leading-snug">{ev.description}</p>
                            <div className="text-[11px] font-medium text-emerald-800 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                              <span className="font-bold">Impact: </span>{ev.impact}
                            </div>
                          </div>

                          <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex justify-end gap-2">
                            <button 
                              onClick={() => openJubileeEditor(ev)}
                              className="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                            >
                              <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteJubilee(ev.id)}
                              className="px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 19. CALCULATOR SETTINGS TAB */}
            {activeTab === 'calculator-page' && (
              <div className="space-y-8">
                <div>
                  <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">Investment Yield Calculator Engine</h1>
                  <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Configure macroeconomic IRR hurdles, co-investment sovereign thresholds, and direct employment multipliers.</p>
                </div>

                <form onSubmit={handleSaveCalculatorSettings} className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Agribusiness Base IRR (%)</label>
                      <input 
                        type="number" 
                        value={editCalculator.agribusinessBaseIrr || 22}
                        onChange={(e) => setEditCalculator({ ...editCalculator, agribusinessBaseIrr: Number(e.target.value) })}
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-bold text-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Real Estate Base IRR (%)</label>
                      <input 
                        type="number" 
                        value={editCalculator.realEstateBaseIrr || 18}
                        onChange={(e) => setEditCalculator({ ...editCalculator, realEstateBaseIrr: Number(e.target.value) })}
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-bold text-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Financial Services Base IRR (%)</label>
                      <input 
                        type="number" 
                        value={editCalculator.financialBaseIrr || 24}
                        onChange={(e) => setEditCalculator({ ...editCalculator, financialBaseIrr: Number(e.target.value) })}
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-bold text-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Energy & Infra Base IRR (%)</label>
                      <input 
                        type="number" 
                        value={editCalculator.energyBaseIrr || 16}
                        onChange={(e) => setEditCalculator({ ...editCalculator, energyBaseIrr: Number(e.target.value) })}
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-bold text-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Tech & Digital Base IRR (%)</label>
                      <input 
                        type="number" 
                        value={editCalculator.techBaseIrr || 28}
                        onChange={(e) => setEditCalculator({ ...editCalculator, techBaseIrr: Number(e.target.value) })}
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-bold text-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Agri Direct Jobs Multiplier (per ₦100M)</label>
                      <input 
                        type="number" 
                        value={editCalculator.agriJobMultiplier || 85}
                        onChange={(e) => setEditCalculator({ ...editCalculator, agriJobMultiplier: Number(e.target.value) })}
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-bold text-neutral-900"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex justify-end">
                    <button 
                      type="submit" 
                      className="px-6 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Calculator Parameters</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 20. FAQS TAB */}
            {activeTab === 'faqs-page' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">Frequently Asked Questions & Knowledgebase</h1>
                    <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Manage public FAQs regarding group ownership, investment criteria, and subsidiary operations.</p>
                  </div>
                  {!isFaqFormOpen && (
                    <button 
                      onClick={() => openFaqEditor()}
                      className="px-5 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New FAQ</span>
                    </button>
                  )}
                </div>

                {isFaqFormOpen && selectedFaq && (
                  <form onSubmit={handleSaveFaq} className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6 animate-in fade-in duration-150">
                    <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                      <h3 className="font-serif text-lg font-bold text-neutral-900">
                        {selectedFaq.id ? 'Edit FAQ Entry' : 'Create Knowledgebase FAQ'}
                      </h3>
                      <button 
                        type="button" 
                        onClick={() => { setIsFaqFormOpen(false); setSelectedFaq(null); }}
                        className="text-neutral-400 hover:text-neutral-600 text-xs font-bold uppercase tracking-wider"
                      >
                        Cancel
                      </button>
                    </div>

                    {faqError && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{faqError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Category Pillar</label>
                        <select 
                          value={selectedFaq.category}
                          onChange={(e) => setSelectedFaq({ ...selectedFaq, category: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900 bg-white"
                        >
                          <option value="General & History">General & History</option>
                          <option value="Investments & Joint Ventures">Investments & Joint Ventures</option>
                          <option value="Subsidiaries & Real Estate">Subsidiaries & Real Estate</option>
                          <option value="Governance & Careers">Governance & Careers</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Display Display Priority Order</label>
                        <input 
                          type="number" 
                          value={selectedFaq.order || 1}
                          onChange={(e) => setSelectedFaq({ ...selectedFaq, order: Number(e.target.value) })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Question *</label>
                      <input 
                        type="text" 
                        required 
                        value={selectedFaq.question}
                        onChange={(e) => setSelectedFaq({ ...selectedFaq, question: e.target.value })}
                        placeholder="E.g., How can foreign institutional investors partner with Odu'a Group?"
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Answer *</label>
                      <textarea 
                        rows={4}
                        required 
                        value={selectedFaq.answer}
                        onChange={(e) => setSelectedFaq({ ...selectedFaq, answer: e.target.value })}
                        placeholder="Provide an authoritative and comprehensive answer..."
                        className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-light leading-relaxed font-sans"
                      />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
                      <button 
                        type="button" 
                        onClick={() => { setIsFaqFormOpen(false); setSelectedFaq(null); }}
                        className="px-5 py-3 rounded-xl hover:bg-neutral-100 text-neutral-600 font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-6 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save FAQ</span>
                      </button>
                    </div>
                  </form>
                )}

                {!isFaqFormOpen && (
                  <div className="space-y-4">
                    {(db.faqs || []).length === 0 ? (
                      <div className="p-10 text-center text-xs text-neutral-400 font-light bg-white rounded-3xl border border-neutral-200">
                        No FAQs in knowledgebase. Click 'Add New FAQ' above.
                      </div>
                    ) : (
                      db.faqs.map((faq: any) => (
                        <div key={faq.id} className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-sm space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-mono bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded font-bold uppercase">
                              {faq.category}
                            </span>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => openFaqEditor(faq)}
                                className="px-2.5 py-1 rounded border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 text-xs font-bold"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteFaq(faq.id)}
                                className="px-2.5 py-1 rounded border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          <h4 className="font-serif text-sm font-bold text-neutral-900">{faq.question}</h4>
                          <p className="text-xs text-neutral-500 font-light leading-relaxed">{faq.answer}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 21. DOWNLOADS TAB */}
            {activeTab === 'downloads-page' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="font-serif text-3xl font-black text-neutral-900 leading-none">Press Kit & Corporate Downloads</h1>
                    <p className="text-neutral-500 text-xs sm:text-sm font-light mt-1.5">Manage published annual audit reports, investor presentation decks, and credit rating certificates.</p>
                  </div>
                  {!isDownloadFormOpen && (
                    <button 
                      onClick={() => openDownloadEditor()}
                      className="px-5 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Upload Document</span>
                    </button>
                  )}
                </div>

                {isDownloadFormOpen && selectedDownload && (
                  <form onSubmit={handleSaveDownload} className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6 animate-in fade-in duration-150">
                    <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                      <h3 className="font-serif text-lg font-bold text-neutral-900">
                        {selectedDownload.id ? 'Edit Download Entry' : 'Publish New Corporate Document'}
                      </h3>
                      <button 
                        type="button" 
                        onClick={() => { setIsDownloadFormOpen(false); setSelectedDownload(null); }}
                        className="text-neutral-400 hover:text-neutral-600 text-xs font-bold uppercase tracking-wider"
                      >
                        Cancel
                      </button>
                    </div>

                    {downloadError && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{downloadError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Document Title *</label>
                        <input 
                          type="text" 
                          required 
                          value={selectedDownload.title}
                          onChange={(e) => setSelectedDownload({ ...selectedDownload, title: e.target.value })}
                          placeholder="E.g., 2025 Annual Financial Report & Audit Statements"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Category</label>
                        <select 
                          value={selectedDownload.category}
                          onChange={(e) => setSelectedDownload({ ...selectedDownload, category: e.target.value })}
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-semibold text-neutral-900 bg-white"
                        >
                          <option value="Financial Report">Financial Report</option>
                          <option value="Credit Rating">Credit Rating</option>
                          <option value="Corporate Governance">Corporate Governance</option>
                          <option value="Brand Assets & Press Kit">Brand Assets & Press Kit</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">File Format</label>
                        <input 
                          type="text" 
                          value={selectedDownload.fileType || 'PDF Document'}
                          onChange={(e) => setSelectedDownload({ ...selectedDownload, fileType: e.target.value })}
                          placeholder="PDF Document, ZIP Archive"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">File Size</label>
                        <input 
                          type="text" 
                          value={selectedDownload.fileSize || '3.5 MB'}
                          onChange={(e) => setSelectedDownload({ ...selectedDownload, fileSize: e.target.value })}
                          placeholder="E.g., 4.2 MB"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Publication Date</label>
                        <input 
                          type="text" 
                          value={selectedDownload.date || ''}
                          onChange={(e) => setSelectedDownload({ ...selectedDownload, date: e.target.value })}
                          placeholder="July 2025"
                          className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-medium text-neutral-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 font-mono">Direct Download URL *</label>
                      <input 
                        type="text" 
                        required 
                        value={selectedDownload.fileUrl}
                        onChange={(e) => setSelectedDownload({ ...selectedDownload, fileUrl: e.target.value })}
                        placeholder="https://oduainvestment.com.ng/downloads/annual-report-2025.pdf"
                        className="w-full p-3.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[#00a757] focus:outline-none text-xs font-mono text-neutral-900"
                      />
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
                      <button 
                        type="button" 
                        onClick={() => { setIsDownloadFormOpen(false); setSelectedDownload(null); }}
                        className="px-5 py-3 rounded-xl hover:bg-neutral-100 text-neutral-600 font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-6 py-3 rounded-xl bg-[#00a757] hover:bg-[#008c48] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Download</span>
                      </button>
                    </div>
                  </form>
                )}

                {!isDownloadFormOpen && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(db.pressDownloads || []).length === 0 ? (
                      <div className="col-span-2 p-10 text-center text-xs text-neutral-400 font-light bg-white rounded-3xl border border-neutral-200">
                        No downloads listed. Click 'Upload Document' above.
                      </div>
                    ) : (
                      db.pressDownloads.map((dl: any) => (
                        <div key={dl.id} className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-sm space-y-3 flex flex-col justify-between">
                          <div className="space-y-1">
                            <div className="flex justify-between items-start">
                              <span className="text-[9px] font-mono bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded font-bold uppercase">
                                {dl.category}
                              </span>
                              <span className="text-[10px] font-mono text-neutral-400">{dl.fileSize} • {dl.fileType}</span>
                            </div>
                            <h4 className="font-serif text-sm font-bold text-neutral-900">{dl.title}</h4>
                            <p className="text-[11px] font-mono text-neutral-400">{dl.date}</p>
                          </div>

                          <div className="pt-3 border-t border-neutral-100 flex justify-between items-center">
                            <a href={dl.fileUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-[#00a757] hover:underline flex items-center gap-1">
                              <DownloadCloud className="w-3.5 h-3.5" />
                              <span>Download</span>
                            </a>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => openDownloadEditor(dl)}
                                className="px-2.5 py-1 rounded border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 text-xs font-bold"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteDownload(dl.id)}
                                className="px-2.5 py-1 rounded border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* DRAG & DROP BUILDER 1: Visual Page Builder */}
            {activeTab === 'drag-drop-pages' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-neutral-900 flex items-center gap-2">
                      <LayoutGrid className="w-5 h-5 text-emerald-600" /> Visual Page Builder Canvas
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Select any corporate page to visually drag, reorder, configure, or insert new section blocks.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-neutral-600 uppercase font-mono">Target Page:</label>
                    <select 
                      value={selectedBuilderPage}
                      onChange={(e) => setSelectedBuilderPage(e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-neutral-300 text-xs font-bold bg-neutral-50 focus:ring-2 focus:ring-[#00a757] focus:outline-none"
                    >
                      {['Home', 'About Us', 'Who We Are', 'Our History', 'Portfolio', 'Our Subsidiaries', 'Ongoing Projects', 'Governance', 'Odu\'a Foundation', 'Golden Jubilee', 'Media', 'Careers', 'Contact'].map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <DragDropPageBuilder 
                  pageId={selectedBuilderPage}
                  pageTitle={selectedBuilderPage}
                  initialBlocks={db.pageBlocks?.[selectedBuilderPage] || []}
                  onSave={async (blocks, pageMeta) => {
                    const updatedDb = {
                      ...db,
                      pageBlocks: {
                        ...(db.pageBlocks || {}),
                        [selectedBuilderPage]: blocks
                      }
                    };
                    if (selectedBuilderPage === 'Home' && pageMeta) {
                      updatedDb.generalSettings = {
                        ...updatedDb.generalSettings,
                        heroBadge: pageMeta.heroBadge || updatedDb.generalSettings?.heroBadge,
                        heroTitle: pageMeta.heroTitle || updatedDb.generalSettings?.heroTitle,
                        heroSubtitle: pageMeta.heroSubtitle || updatedDb.generalSettings?.heroSubtitle,
                        bannerImage: pageMeta.bannerImage || updatedDb.generalSettings?.bannerImage,
                        primaryButtonText: pageMeta.primaryButtonText || updatedDb.generalSettings?.primaryButtonText,
                        secondaryButtonText: pageMeta.secondaryButtonText || updatedDb.generalSettings?.secondaryButtonText,
                        introTitle: pageMeta.introTitle || updatedDb.generalSettings?.introTitle,
                        introText: pageMeta.introText || updatedDb.generalSettings?.introText,
                      };
                    }
                    setDb(updatedDb);
                    broadcastCmsUpdate(updatedDb);
                    try {
                      await fetch('/api/content/full-db', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedDb)
                      });
                    } catch (e) {}
                    triggerBanner(`Page "${selectedBuilderPage}" structure saved and published!`);
                  }}
                  onClose={() => setActiveTab('dashboard')}
                  onPreview={() => {
                    if (setCurrentPage) {
                      setCurrentPage(selectedBuilderPage);
                    }
                  }}
                  showNotification={(msg) => triggerBanner(msg)}
                />
              </div>
            )}

            {/* DRAG & DROP BUILDER 2: Navigation Menu Builder */}
            {activeTab === 'drag-drop-menu' && (
              <div className="space-y-6">
                <DragDropMenuBuilder 
                  initialMenuItems={menuBuilderItems}
                  availablePages={[
                    { id: 'Home', title: 'Home' },
                    { id: 'About Us', title: 'About Us' },
                    { id: 'Who We Are', title: 'Who We Are' },
                    { id: 'Our History', title: 'Our History' },
                    { id: 'Board of Directors', title: 'Board of Directors' },
                    { id: 'Leadership Team', title: 'Leadership Team' },
                    { id: 'Portfolio', title: 'Portfolio' },
                    { id: 'Our Subsidiaries', title: 'Our Subsidiaries' },
                    { id: 'Ongoing Projects', title: 'Ongoing Projects' },
                    { id: 'Governance', title: 'Governance' },
                    { id: 'Odu\'a Foundation', title: 'Odu\'a Foundation' },
                    { id: 'Golden Jubilee', title: 'Golden Jubilee' },
                    { id: 'Media', title: 'Media & News' },
                    { id: 'Careers', title: 'Careers' },
                    { id: 'Contact', title: 'Contact' }
                  ]}
                  onSaveMenu={async (items) => {
                    setMenuBuilderItems(items);
                    localStorage.setItem('odua_custom_menu', JSON.stringify(items));
                    triggerBanner('Navigation menu published live across the website!');
                  }}
                  showNotification={(msg) => triggerBanner(msg)}
                />
              </div>
            )}

            {/* DRAG & DROP BUILDER 3: Media Library & Dropper */}
            {activeTab === 'drag-drop-media' && (
              <div className="space-y-6">
                <DragDropMediaLibrary 
                  mediaItems={mediaLibraryItems}
                  setMediaItems={setMediaLibraryItems}
                  showNotification={(msg) => triggerBanner(msg)}
                />
              </div>
            )}

            {/* DRAG & DROP BUILDER 4: Dashboard Widget Customizer */}
            {activeTab === 'drag-drop-widgets' && (
              <div className="space-y-6">
                <DragDropDashboardWidgets 
                  widgets={dashboardWidgets}
                  setWidgets={setDashboardWidgets}
                  showNotification={(msg) => triggerBanner(msg)}
                />

                {/* Render active dashboard widgets live */}
                <div className="space-y-4 pt-4 border-t border-neutral-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider font-mono">
                      Live Dashboard Widget Arrangement
                    </h3>
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
                      {dashboardWidgets.filter(w => w.visible).length} Widgets Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dashboardWidgets.filter(w => w.visible).map((widget) => {
                      const IconComp = widget.icon;
                      return (
                        <div 
                          key={widget.id} 
                          className={`bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm space-y-3 ${
                            widget.colSpan === 'full' ? 'md:col-span-2' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-bold text-xs text-neutral-900">{widget.title}</h4>
                                <span className="text-[10px] font-mono text-neutral-400">{widget.category}</span>
                              </div>
                            </div>
                            <span className="text-[9px] font-mono bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded font-bold">
                              LIVE
                            </span>
                          </div>

                          {widget.id === 'w_health' && (
                            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-100 text-center">
                              <div className="p-2 bg-emerald-50 rounded-xl">
                                <p className="text-[9px] font-bold text-emerald-700 font-mono">STATUS</p>
                                <p className="text-xs font-black text-emerald-900">Online 100%</p>
                              </div>
                              <div className="p-2 bg-blue-50 rounded-xl">
                                <p className="text-[9px] font-bold text-blue-700 font-mono">LATENCY</p>
                                <p className="text-xs font-black text-blue-900">24ms</p>
                              </div>
                              <div className="p-2 bg-purple-50 rounded-xl">
                                <p className="text-[9px] font-bold text-purple-700 font-mono">DATABASE</p>
                                <p className="text-xs font-black text-purple-900">Synchronized</p>
                              </div>
                            </div>
                          )}

                          {widget.id === 'w_stats' && (
                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100 text-center">
                              <div className="p-2 bg-neutral-50 rounded-xl">
                                <p className="text-[9px] font-bold text-neutral-500 font-mono">ASSET BASE</p>
                                <p className="text-sm font-black text-neutral-900">₦300 Billion+</p>
                              </div>
                              <div className="p-2 bg-neutral-50 rounded-xl">
                                <p className="text-[9px] font-bold text-neutral-500 font-mono">KEY SECTORS</p>
                                <p className="text-sm font-black text-[#00a757]">9 High-Yield</p>
                              </div>
                            </div>
                          )}

                          {widget.id === 'w_states' && (
                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-100">
                              {['Oyo', 'Ogun', 'Ondo', 'Osun', 'Ekiti', 'Lagos'].map((state) => (
                                <span key={state} className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 text-[11px] font-bold">
                                  🏛️ {state} State
                                </span>
                              ))}
                            </div>
                          )}

                          {widget.id === 'w_draft' && (
                            <div className="space-y-2 pt-2 border-t border-neutral-100">
                              <input 
                                type="text" 
                                placeholder="Quick article title..." 
                                className="w-full p-2 text-xs border border-neutral-200 rounded-lg"
                              />
                              <textarea 
                                rows={2} 
                                placeholder="Write quick memo..." 
                                className="w-full p-2 text-xs border border-neutral-200 rounded-lg"
                              />
                            </div>
                          )}

                          {widget.id === 'w_news' && (
                            <div className="space-y-1.5 pt-2 border-t border-neutral-100 text-xs">
                              <p className="font-semibold text-neutral-800">• 50th Golden Jubilee preparation announced across 6 states</p>
                              <p className="font-semibold text-neutral-800">• SWAgCo expands 10,000 hectare agricultural cluster in Southwest</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 25. SITE-WIDE TEXT & WORDS EDITOR */}
            {activeTab === 'site-text-editor' && (
              <SiteWideTextEditor
                db={db}
                onSaveDb={async (updatedDb) => {
                  try {
                    const res = await fetch('/api/content/full-db', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(updatedDb)
                    });
                    const data = await res.json();
                    if (data.success) {
                      setDb(updatedDb);
                      broadcastCmsUpdate(updatedDb);
                      return true;
                    }
                    return false;
                  } catch {
                    return false;
                  }
                }}
                onNavigateToPreview={(page) => {
                  if (setCurrentPage) {
                    setCurrentPage(page);
                  }
                  if (onExitPortal) {
                    onExitPortal();
                  }
                }}
              />
            )}

          </div>
        )}

      </main>

    </div>
  );
}
