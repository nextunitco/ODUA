import React, { useState, useMemo } from 'react';
import { 
  Type, 
  Search, 
  Save, 
  Trash2, 
  Plus, 
  Check, 
  RotateCcw, 
  FileText, 
  Sparkles, 
  Eye, 
  Folder, 
  AlertCircle, 
  HelpCircle, 
  Layers, 
  ArrowRight, 
  Code2, 
  Edit3, 
  BookOpen, 
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Filter,
  RefreshCw,
  SlidersHorizontal,
  FileCheck
} from 'lucide-react';

export interface TextItemDefinition {
  id: string;
  page: string;
  section: string;
  label: string;
  description?: string;
  type: 'text' | 'textarea';
  rows?: number;
  dbPath: {
    target: 'pagesContent' | 'generalSettings' | 'southwestStates' | 'customBlock';
    pageId?: string;
    field: string;
    subKey?: string;
  };
  defaultValue: string;
}

interface SiteWideTextEditorProps {
  db: any;
  onSaveDb: (newDb: any) => Promise<boolean>;
  onNavigateToPreview?: (page: string) => void;
}

// Master list of all editable text slots across every page on the site
const SITE_TEXT_SCHEMA: TextItemDefinition[] = [
  // ================= HOME PAGE =================
  {
    id: 'home-hero-badge',
    page: 'Home',
    section: 'Hero Banner',
    label: 'Hero Badge Tagline',
    description: 'Small pill emblem above the main title',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Home', field: 'heroBadge' },
    defaultValue: 'The Engine Room of Southwest Nigeria'
  },
  {
    id: 'home-hero-title',
    page: 'Home',
    section: 'Hero Banner',
    label: 'Hero Main Headline',
    description: 'The primary headline displayed over the Cocoa House cityscape',
    type: 'textarea',
    rows: 2,
    dbPath: { target: 'pagesContent', pageId: 'Home', field: 'heroTitle' },
    defaultValue: 'Enhancing the legacy for future generations'
  },
  {
    id: 'home-hero-subtitle',
    page: 'Home',
    section: 'Hero Banner',
    label: 'Hero Subtitle Narrative',
    description: 'The descriptive paragraph explaining Odu\'a Group\'s overarching mission',
    type: 'textarea',
    rows: 3,
    dbPath: { target: 'pagesContent', pageId: 'Home', field: 'heroSubtitle' },
    defaultValue: 'Through strategic investments and efficient management of our diversified portfolio, we are enhancing our rich legacy and unlocking new opportunities that will thrive for generations to come.'
  },
  {
    id: 'home-primary-btn',
    page: 'Home',
    section: 'Hero Banner',
    label: 'Primary CTA Button Text',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Home', field: 'primaryButtonText' },
    defaultValue: 'Explore Portfolio'
  },
  {
    id: 'home-secondary-btn',
    page: 'Home',
    section: 'Hero Banner',
    label: 'Secondary CTA Button Text',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Home', field: 'secondaryButtonText' },
    defaultValue: 'Co-Invest with Us'
  },
  {
    id: 'home-stat-states',
    page: 'Home',
    section: 'Sovereign Metrics Banner',
    label: 'Owner States Metric Count',
    type: 'text',
    dbPath: { target: 'generalSettings', field: 'ownerStatesCount' },
    defaultValue: '6 States'
  },
  {
    id: 'home-stat-established',
    page: 'Home',
    section: 'Sovereign Metrics Banner',
    label: 'Founding Year',
    type: 'text',
    dbPath: { target: 'generalSettings', field: 'establishedYear' },
    defaultValue: '1976'
  },
  {
    id: 'home-stat-assets',
    page: 'Home',
    section: 'Sovereign Metrics Banner',
    label: 'Total Asset Valuation',
    type: 'text',
    dbPath: { target: 'generalSettings', field: 'assetValue' },
    defaultValue: '₦300B+'
  },
  {
    id: 'home-stat-sectors',
    page: 'Home',
    section: 'Sovereign Metrics Banner',
    label: 'Key Sectors Count',
    type: 'text',
    dbPath: { target: 'generalSettings', field: 'keySectorsCount' },
    defaultValue: '9'
  },
  {
    id: 'home-fiduciary-badge',
    page: 'Home',
    section: 'Sovereign Fiduciary Brief',
    label: 'Fiduciary Section Badge',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Home', field: 'fiduciaryBadge' },
    defaultValue: 'Sovereign Fiduciary'
  },
  {
    id: 'home-fiduciary-title',
    page: 'Home',
    section: 'Sovereign Fiduciary Brief',
    label: 'Fiduciary Section Headline',
    type: 'textarea',
    rows: 2,
    dbPath: { target: 'pagesContent', pageId: 'Home', field: 'fiduciaryTitle' },
    defaultValue: 'Catalyzing Wealth & Development Across South-Western Nigeria'
  },
  {
    id: 'home-fiduciary-desc',
    page: 'Home',
    section: 'Sovereign Fiduciary Brief',
    label: 'Fiduciary Section Narrative Paragraph',
    type: 'textarea',
    rows: 4,
    dbPath: { target: 'pagesContent', pageId: 'Home', field: 'fiduciaryDesc' },
    defaultValue: 'As the sovereign asset hub representing Western Nigeria, we optimize and grow a highly diversified portfolio. Over the last five decades, we have converted our collective heritage into industry-leading operating subsidiaries in Real Estate, Agronomy, and Sovereign Financial Instruments.'
  },
  {
    id: 'home-pillars-badge',
    page: 'Home',
    section: 'Investment Pillars',
    label: 'Investment Pillars Badge',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Home', field: 'pillarsBadge' },
    defaultValue: 'Core Investment Engines'
  },
  {
    id: 'home-pillars-title',
    page: 'Home',
    section: 'Investment Pillars',
    label: 'Investment Pillars Title',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Home', field: 'pillarsTitle' },
    defaultValue: 'Strategic Investment Pillars'
  },
  {
    id: 'home-jv-badge',
    page: 'Home',
    section: 'Joint Ventures Desk',
    label: 'Joint Ventures Section Badge',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Home', field: 'jvBadge' },
    defaultValue: 'Joint Ventures Desk'
  },
  {
    id: 'home-jv-title',
    page: 'Home',
    section: 'Joint Ventures Desk',
    label: 'Joint Ventures Headline',
    type: 'textarea',
    rows: 2,
    dbPath: { target: 'pagesContent', pageId: 'Home', field: 'jvTitle' },
    defaultValue: 'Accelerating Southwest Nigeria\'s Industrial Processing Zones'
  },
  {
    id: 'home-jv-desc',
    page: 'Home',
    section: 'Joint Ventures Desk',
    label: 'Joint Ventures Invitation Narrative',
    type: 'textarea',
    rows: 3,
    dbPath: { target: 'pagesContent', pageId: 'Home', field: 'jvDesc' },
    defaultValue: 'We invite institutional players, domestic fund managers, and global diaspora networks to join our stable co-investment pool. Our secure sovereign framework is backed directly by state cabinet guarantees.'
  },
  {
    id: 'home-jv-primary-btn',
    page: 'Home',
    section: 'Joint Ventures Desk',
    label: 'Prospectus Button Text',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Home', field: 'jvPrimaryBtn' },
    defaultValue: 'Request Group Prospectus'
  },
  {
    id: 'home-jv-secondary-btn',
    page: 'Home',
    section: 'Joint Ventures Desk',
    label: 'Secretariat Button Text',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Home', field: 'jvSecondaryBtn' },
    defaultValue: 'Connect with Secretariat'
  },
  {
    id: 'home-media-badge',
    page: 'Home',
    section: 'Media & News Highlights',
    label: 'Media Section Badge',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Home', field: 'mediaBadge' },
    defaultValue: 'Corporate Communications'
  },
  {
    id: 'home-media-title',
    page: 'Home',
    section: 'Media & News Highlights',
    label: 'Media Section Headline',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Home', field: 'mediaTitle' },
    defaultValue: 'Media Highlights'
  },

  // ================= ABOUT US =================
  {
    id: 'about-hero-badge',
    page: 'About Us',
    section: 'Header Banner',
    label: 'Header Badge',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'About Us', field: 'heroBadge' },
    defaultValue: 'Heritage & Strategic Mandate'
  },
  {
    id: 'about-hero-title',
    page: 'About Us',
    section: 'Header Banner',
    label: 'Page Main Headline',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'About Us', field: 'heroTitle' },
    defaultValue: 'Five Decades of Resilient Economic Stewardship'
  },
  {
    id: 'about-hero-subtitle',
    page: 'About Us',
    section: 'Header Banner',
    label: 'Header Subtitle Narrative',
    type: 'textarea',
    rows: 3,
    dbPath: { target: 'pagesContent', pageId: 'About Us', field: 'heroSubtitle' },
    defaultValue: 'Established in 1976 to manage the commercial legacy assets of the Western State, Odu\'a Investment Company Limited has evolved into an agile, modern holding enterprise.'
  },
  {
    id: 'about-intro-title',
    page: 'About Us',
    section: 'Corporate Renaissance',
    label: 'Renaissance Section Title',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'About Us', field: 'introTitle' },
    defaultValue: 'Championing Southwest Nigeria\'s Commercial Renaissance'
  },
  {
    id: 'about-intro-text',
    page: 'About Us',
    section: 'Corporate Renaissance',
    label: 'Renaissance Narrative Description',
    type: 'textarea',
    rows: 4,
    dbPath: { target: 'pagesContent', pageId: 'About Us', field: 'introText' },
    defaultValue: 'Odu\'a Investment Company Limited operates at the intersection of public-interest sovereign stewardship and world-class commercial competitiveness.'
  },
  {
    id: 'about-vision-title',
    page: 'About Us',
    section: 'Vision & Mission',
    label: 'Vision Section Label',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'About Us', field: 'visionTitle' },
    defaultValue: 'Our Vision'
  },
  {
    id: 'about-vision-text',
    page: 'About Us',
    section: 'Vision & Mission',
    label: 'Vision Statement Words',
    type: 'textarea',
    rows: 3,
    dbPath: { target: 'generalSettings', field: 'vision' },
    defaultValue: 'To be a world-class conglomerate, delivering sustainable value to our stakeholders while remaining the undisputed engine of growth for Southwest Nigeria.'
  },
  {
    id: 'about-mission-title',
    page: 'About Us',
    section: 'Vision & Mission',
    label: 'Mission Section Label',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'About Us', field: 'missionTitle' },
    defaultValue: 'Our Mission'
  },
  {
    id: 'about-mission-text',
    page: 'About Us',
    section: 'Vision & Mission',
    label: 'Mission Statement Words',
    type: 'textarea',
    rows: 3,
    dbPath: { target: 'generalSettings', field: 'mission' },
    defaultValue: 'To run a commercially viable enterprise focused on high-yield sectors, optimizing asset performance, and creating generation-spanning economic value.'
  },
  {
    id: 'about-core-values',
    page: 'About Us',
    section: 'Core Ethos & Values',
    label: 'Philosophy of Iwa Pele (Core Values)',
    type: 'textarea',
    rows: 3,
    dbPath: { target: 'generalSettings', field: 'coreValues' },
    defaultValue: 'Guided strictly by the philosophy of "Iwa Pele" (Good Character), structured through Accountability, Enterprise, Integrity, and Collaboration.'
  },
  {
    id: 'about-strategy-title',
    page: 'About Us',
    section: 'Strategic Thrust (SRC)',
    label: 'Strategy Roadmap Title',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'About Us', field: 'strategyTitle' },
    defaultValue: 'Strategic Transformation (SRC 2.0)'
  },
  {
    id: 'about-strategy-text',
    page: 'About Us',
    section: 'Strategic Thrust (SRC)',
    label: 'Strategy Three Pillars (Sweat, Revive, Create)',
    type: 'textarea',
    rows: 3,
    dbPath: { target: 'pagesContent', pageId: 'About Us', field: 'strategyText' },
    defaultValue: 'Sweat under-utilized legacy assets, Revive dormant historical commercial engines, and Create new high-yield enterprises across high-growth frontier sectors.'
  },

  // ================= WHO WE ARE =================
  {
    id: 'who-hero-badge',
    page: 'Who We Are',
    section: 'Header Banner',
    label: 'Header Badge',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Who We Are', field: 'heroBadge' },
    defaultValue: 'Regional Unification & Identity'
  },
  {
    id: 'who-hero-title',
    page: 'Who We Are',
    section: 'Header Banner',
    label: 'Main Headline',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Who We Are', field: 'heroTitle' },
    defaultValue: 'Jointly Owned by the Six Southwest States of Nigeria'
  },
  {
    id: 'who-hero-subtitle',
    page: 'Who We Are',
    section: 'Header Banner',
    label: 'Header Subtitle',
    type: 'textarea',
    rows: 3,
    dbPath: { target: 'pagesContent', pageId: 'Who We Are', field: 'heroSubtitle' },
    defaultValue: 'A collective sovereign investment vehicle connecting Oyo, Ogun, Ondo, Osun, Ekiti, and Lagos States in economic synergy.'
  },
  {
    id: 'who-mandate-text',
    page: 'Who We Are',
    section: 'Sovereign Mandate',
    label: 'Shareholder Mandate Narrative',
    type: 'textarea',
    rows: 4,
    dbPath: { target: 'pagesContent', pageId: 'Who We Are', field: 'mandateText' },
    defaultValue: 'Empowered by 6 state governments to drive private sector partnerships, industrialization, job creation, and sustainable prosperity for over 45 million citizens.'
  },
  {
    id: 'who-state-oyo',
    page: 'Who We Are',
    section: 'State Shareholder Profiles',
    label: 'Oyo State Narrative & Mandate',
    type: 'textarea',
    rows: 2,
    dbPath: { target: 'southwestStates', field: 'oyo', subKey: 'description' },
    defaultValue: 'Pacesetter State, Home to Cocoa House, Headquarters of Odu\'a Group, and prime agribusiness logistics corridor.'
  },
  {
    id: 'who-state-ogun',
    page: 'Who We Are',
    section: 'State Shareholder Profiles',
    label: 'Ogun State Narrative & Mandate',
    type: 'textarea',
    rows: 2,
    dbPath: { target: 'southwestStates', field: 'ogun', subKey: 'description' },
    defaultValue: 'The industrial heartbeat of Nigeria, boasting the largest manufacturing cluster, special economic processing zones, and mineral deposits.'
  },
  {
    id: 'who-state-ondo',
    page: 'Who We Are',
    section: 'State Shareholder Profiles',
    label: 'Ondo State Narrative & Mandate',
    type: 'textarea',
    rows: 2,
    dbPath: { target: 'southwestStates', field: 'ondo', subKey: 'description' },
    defaultValue: 'Sunshine State, Nigeria\'s largest cocoa producer, bitumen reserves, and a burgeoning deep-sea port corridor.'
  },
  {
    id: 'who-state-osun',
    page: 'Who We Are',
    section: 'State Shareholder Profiles',
    label: 'Osun State Narrative & Mandate',
    type: 'textarea',
    rows: 2,
    dbPath: { target: 'southwestStates', field: 'osun', subKey: 'description' },
    defaultValue: 'Land of Virtue, cultural heritage epicenter, rich commercial agriculture, and extensive gold mining concessions.'
  },
  {
    id: 'who-state-ekiti',
    page: 'Who We Are',
    section: 'State Shareholder Profiles',
    label: 'Ekiti State Narrative & Mandate',
    type: 'textarea',
    rows: 2,
    dbPath: { target: 'southwestStates', field: 'ekiti', subKey: 'description' },
    defaultValue: 'Land of Honour, pioneering knowledge economy, biomedical and digital technology talent incubation hub.'
  },
  {
    id: 'who-state-lagos',
    page: 'Who We Are',
    section: 'State Shareholder Profiles',
    label: 'Lagos State Narrative & Mandate',
    type: 'textarea',
    rows: 2,
    dbPath: { target: 'southwestStates', field: 'lagos', subKey: 'description' },
    defaultValue: 'Center of Excellence, commercial powerhouse of West Africa, financial capital, and prime multi-modal maritime gateway.'
  },

  // ================= OUR HISTORY =================
  {
    id: 'history-hero-badge',
    page: 'Our History',
    section: 'Header Banner',
    label: 'Header Badge',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Our History', field: 'heroBadge' },
    defaultValue: 'From 1976 to 2026 Golden Jubilee'
  },
  {
    id: 'history-hero-title',
    page: 'Our History',
    section: 'Header Banner',
    label: 'Main Headline',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Our History', field: 'heroTitle' },
    defaultValue: 'Chronicles of Heritage, Resilience & Innovation'
  },
  {
    id: 'history-hero-subtitle',
    page: 'Our History',
    section: 'Header Banner',
    label: 'Header Subtitle Narrative',
    type: 'textarea',
    rows: 3,
    dbPath: { target: 'pagesContent', pageId: 'Our History', field: 'heroSubtitle' },
    defaultValue: 'Discover the 50-year journey of Western Nigeria\'s premier economic institution, from Cocoa House construction to 21st-century venture investments.'
  },

  // ================= BOARD & LEADERSHIP =================
  {
    id: 'board-hero-title',
    page: 'Board of Directors',
    section: 'Governance Header',
    label: 'Board Page Headline',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Board of Directors', field: 'heroTitle' },
    defaultValue: 'The Board of Directors'
  },
  {
    id: 'board-hero-subtitle',
    page: 'Board of Directors',
    section: 'Governance Header',
    label: 'Board Page Subtitle',
    type: 'textarea',
    rows: 3,
    dbPath: { target: 'pagesContent', pageId: 'Board of Directors', field: 'heroSubtitle' },
    defaultValue: 'Distinguished corporate leaders and seasoned professionals appointed by the shareholder state governments to provide visionary strategic guidance.'
  },
  {
    id: 'leadership-hero-title',
    page: 'Leadership Team',
    section: 'Executive Header',
    label: 'Leadership Page Headline',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Leadership Team', field: 'heroTitle' },
    defaultValue: 'The Executive Leadership Team'
  },
  {
    id: 'leadership-hero-subtitle',
    page: 'Leadership Team',
    section: 'Executive Header',
    label: 'Leadership Page Subtitle',
    type: 'textarea',
    rows: 3,
    dbPath: { target: 'pagesContent', pageId: 'Leadership Team', field: 'heroSubtitle' },
    defaultValue: 'Dynamic executives and sector specialists executing group-wide strategy, operational excellence, and portfolio value maximization.'
  },

  // ================= PORTFOLIO & SUBSIDIARIES =================
  {
    id: 'portfolio-hero-title',
    page: 'Portfolio',
    section: 'Holdings Header',
    label: 'Portfolio Main Headline',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Portfolio', field: 'heroTitle' },
    defaultValue: 'Strategic Sectors & Enterprise Holdings'
  },
  {
    id: 'portfolio-hero-subtitle',
    page: 'Portfolio',
    section: 'Holdings Header',
    label: 'Portfolio Subtitle',
    type: 'textarea',
    rows: 3,
    dbPath: { target: 'pagesContent', pageId: 'Portfolio', field: 'heroSubtitle' },
    defaultValue: 'Managing a high-yield portfolio across Agriculture, Real Estate, Financial Services, Hospitality, Healthcare, Energy & Logistics.'
  },

  // ================= FOUNDATION & CSR =================
  {
    id: 'foundation-hero-title',
    page: 'Odu\'a Foundation',
    section: 'CSR Header',
    label: 'Foundation Page Headline',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Odu\'a Foundation', field: 'heroTitle' },
    defaultValue: 'Odu\'a Investment Foundation'
  },
  {
    id: 'foundation-hero-subtitle',
    page: 'Odu\'a Foundation',
    section: 'CSR Header',
    label: 'Foundation Subtitle',
    type: 'textarea',
    rows: 3,
    dbPath: { target: 'pagesContent', pageId: 'Odu\'a Foundation', field: 'heroSubtitle' },
    defaultValue: 'Empowering youth in technology, providing agricultural scholarships, and funding healthcare across Southwest communities.'
  },

  // ================= GOVERNANCE =================
  {
    id: 'governance-hero-title',
    page: 'Governance & Whistleblowing',
    section: 'Governance Header',
    label: 'Governance Headline',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Governance & Whistleblowing', field: 'heroTitle' },
    defaultValue: 'Governance, Compliance & Whistleblowing'
  },
  {
    id: 'governance-hero-subtitle',
    page: 'Governance & Whistleblowing',
    section: 'Governance Header',
    label: 'Governance Subtitle',
    type: 'textarea',
    rows: 3,
    dbPath: { target: 'pagesContent', pageId: 'Governance & Whistleblowing', field: 'heroSubtitle' },
    defaultValue: 'Ensuring the highest standards of transparency, zero tolerance for financial impropriety, and safe reporting channels.'
  },

  // ================= CAREERS =================
  {
    id: 'careers-hero-title',
    page: 'Careers',
    section: 'Talent Header',
    label: 'Careers Headline',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Careers', field: 'heroTitle' },
    defaultValue: 'Build Your Career at Odu\'a Group'
  },
  {
    id: 'careers-hero-subtitle',
    page: 'Careers',
    section: 'Talent Header',
    label: 'Careers Subtitle',
    type: 'textarea',
    rows: 3,
    dbPath: { target: 'pagesContent', pageId: 'Careers', field: 'heroSubtitle' },
    defaultValue: 'Join an extraordinary team driving regional economic development and building enterprises that will shape future generations.'
  },

  // ================= CONTACT US =================
  {
    id: 'contact-hero-title',
    page: 'Contact Us',
    section: 'Inquiries Header',
    label: 'Contact Headline',
    type: 'text',
    dbPath: { target: 'pagesContent', pageId: 'Contact Us', field: 'heroTitle' },
    defaultValue: 'Connect with Our Corporate Team'
  },
  {
    id: 'contact-hero-subtitle',
    page: 'Contact Us',
    section: 'Inquiries Header',
    label: 'Contact Subtitle',
    type: 'textarea',
    rows: 3,
    dbPath: { target: 'pagesContent', pageId: 'Contact Us', field: 'heroSubtitle' },
    defaultValue: 'Whether you are looking to co-invest, lease commercial space, or explore partnerships, our team is ready to assist you.'
  },
  {
    id: 'contact-address',
    page: 'Contact Us',
    section: 'Corporate Headquarters',
    label: 'Official Headquarters Physical Address',
    type: 'textarea',
    rows: 2,
    dbPath: { target: 'generalSettings', field: 'address' },
    defaultValue: 'Floors 20-23, Cocoa House, Dugbe, Ibadan, Oyo State, Nigeria.'
  },
  {
    id: 'contact-phone',
    page: 'Contact Us',
    section: 'Corporate Headquarters',
    label: 'Official Telephone Number',
    type: 'text',
    dbPath: { target: 'generalSettings', field: 'phone' },
    defaultValue: '+234 2 241 0835'
  },
  {
    id: 'contact-email',
    page: 'Contact Us',
    section: 'Corporate Headquarters',
    label: 'Official Corporate Email',
    type: 'text',
    dbPath: { target: 'generalSettings', field: 'email' },
    defaultValue: 'info@oduainvestment.com.ng'
  },

  // ================= FOOTER & GLOBAL =================
  {
    id: 'footer-tagline',
    page: 'Footer & Global',
    section: 'Global Brand & Navigation',
    label: 'Global Corporate Tagline',
    type: 'text',
    dbPath: { target: 'generalSettings', field: 'tagline' },
    defaultValue: 'The Engine Room for Economic Development in Southwest Nigeria'
  },
  {
    id: 'footer-sitename',
    page: 'Footer & Global',
    section: 'Global Brand & Navigation',
    label: 'Organization Name',
    type: 'text',
    dbPath: { target: 'generalSettings', field: 'siteName' },
    defaultValue: 'Odu\'a Investment Company Limited'
  },
  {
    id: 'footer-disclaimer',
    page: 'Footer & Global',
    section: 'Footer Legal & Copyright',
    label: 'Footer Legal & Sovereign Disclaimer',
    description: 'Appears at the very bottom bar across all pages of the site',
    type: 'textarea',
    rows: 2,
    dbPath: { target: 'generalSettings', field: 'footerDisclaimer' },
    defaultValue: 'Sovereign asset vehicle of Oyo, Ogun, Ondo, Osun, Ekiti & Lagos.'
  },
  {
    id: 'footer-newsletter-heading',
    page: 'Footer & Global',
    section: 'Footer Newsletter',
    label: 'Executive Briefing Heading',
    type: 'text',
    dbPath: { target: 'generalSettings', field: 'newsletterHeading' },
    defaultValue: 'Executive Briefing'
  },
  {
    id: 'footer-newsletter-desc',
    page: 'Footer & Global',
    section: 'Footer Newsletter',
    label: 'Executive Briefing Description',
    type: 'textarea',
    rows: 2,
    dbPath: { target: 'generalSettings', field: 'newsletterDesc' },
    defaultValue: 'Subscribe for quarterly investor reports, state infrastructure announcements, and board communiqués.'
  }
];

export default function SiteWideTextEditor({ 
  db, 
  onSaveDb, 
  onNavigateToPreview 
}: SiteWideTextEditorProps) {
  // Navigation & selection
  const [selectedPage, setSelectedPage] = useState<string>('Home');
  const [selectedSection, setSelectedSection] = useState<string>('All');
  
  // Search query to find any word or sentence on the site
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Local edited state (id -> value)
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  
  // Status indicators
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [savedSuccessId, setSavedSuccessId] = useState<string | null>(null);
  const [globalSuccessMsg, setGlobalSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Add New Custom Words Block modal
  const [isAddBlockOpen, setIsAddBlockOpen] = useState<boolean>(false);
  const [newBlockPage, setNewBlockPage] = useState<string>('Home');
  const [newBlockTitle, setNewBlockTitle] = useState<string>('');
  const [newBlockContent, setNewBlockContent] = useState<string>('');
  const [newBlockCategory, setNewBlockCategory] = useState<string>('Announcement');

  // Global Code Search (for any words hardcoded in component files)
  const [codeSearchQuery, setCodeSearchQuery] = useState<string>('');
  const [isCodeSearching, setIsCodeSearching] = useState<boolean>(false);
  const [codeMatches, setCodeMatches] = useState<any[]>([]);
  const [codeSelectedMatch, setCodeSelectedMatch] = useState<any | null>(null);
  const [codeReplacementText, setCodeReplacementText] = useState<string>('');
  const [codeSaving, setCodeSaving] = useState<boolean>(false);
  const [codeSuccess, setCodeSuccess] = useState<string>('');

  // Active view tab: 'browse' (by page & section) or 'code-finder' (search code files directly)
  const [activeTabMode, setActiveTabMode] = useState<'browse' | 'code-finder'>('browse');

  // List of all unique pages
  const availablePages = useMemo(() => {
    const set = new Set<string>();
    SITE_TEXT_SCHEMA.forEach(item => set.add(item.page));
    return Array.from(set);
  }, []);

  // Helper to get current live value from database
  const getDbValue = (item: TextItemDefinition): string => {
    if (editedValues[item.id] !== undefined) {
      return editedValues[item.id];
    }

    try {
      if (item.dbPath.target === 'pagesContent') {
        const pageId = item.dbPath.pageId || 'Home';
        return db?.pagesContent?.[pageId]?.[item.dbPath.field] ?? item.defaultValue;
      }
      if (item.dbPath.target === 'generalSettings') {
        return db?.generalSettings?.[item.dbPath.field] ?? item.defaultValue;
      }
      if (item.dbPath.target === 'southwestStates') {
        const stateKey = item.dbPath.field;
        const subKey = item.dbPath.subKey || 'description';
        return db?.southwestStates?.[stateKey]?.[subKey] ?? item.defaultValue;
      }
    } catch {
      return item.defaultValue;
    }
    return item.defaultValue;
  };

  // Sections for the selected page
  const pageSections = useMemo(() => {
    const sections = new Set<string>();
    SITE_TEXT_SCHEMA.filter(item => item.page === selectedPage).forEach(item => sections.add(item.section));
    return ['All', ...Array.from(sections)];
  }, [selectedPage]);

  // Filtered schema items based on selected page, section, or global search query
  const displayedItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      // If user typed a search query, search across ALL pages and fields!
      return SITE_TEXT_SCHEMA.filter(item => {
        const currentVal = getDbValue(item).toLowerCase();
        const label = item.label.toLowerCase();
        const section = item.section.toLowerCase();
        const page = item.page.toLowerCase();
        return currentVal.includes(query) || label.includes(query) || section.includes(query) || page.includes(query);
      });
    }

    // Otherwise, filter by selected page and section
    return SITE_TEXT_SCHEMA.filter(item => {
      if (item.page !== selectedPage) return false;
      if (selectedSection !== 'All' && item.section !== selectedSection) return false;
      return true;
    });
  }, [searchQuery, selectedPage, selectedSection, db, editedValues]);

  // Handle single item text change
  const handleTextChange = (id: string, newText: string) => {
    setEditedValues(prev => ({
      ...prev,
      [id]: newText
    }));
  };

  // Save single item
  const handleSaveItem = async (item: TextItemDefinition) => {
    const newValue = editedValues[item.id] !== undefined ? editedValues[item.id] : getDbValue(item);
    setIsSaving(true);
    setErrorMsg('');

    try {
      const updatedDb = JSON.parse(JSON.stringify(db));

      if (item.dbPath.target === 'pagesContent') {
        const pageId = item.dbPath.pageId || 'Home';
        if (!updatedDb.pagesContent) updatedDb.pagesContent = {};
        if (!updatedDb.pagesContent[pageId]) updatedDb.pagesContent[pageId] = {};
        updatedDb.pagesContent[pageId][item.dbPath.field] = newValue;
      } else if (item.dbPath.target === 'generalSettings') {
        if (!updatedDb.generalSettings) updatedDb.generalSettings = {};
        updatedDb.generalSettings[item.dbPath.field] = newValue;
      } else if (item.dbPath.target === 'southwestStates') {
        const stateKey = item.dbPath.field;
        const subKey = item.dbPath.subKey || 'description';
        if (!updatedDb.southwestStates) updatedDb.southwestStates = {};
        if (!updatedDb.southwestStates[stateKey]) updatedDb.southwestStates[stateKey] = {};
        updatedDb.southwestStates[stateKey][subKey] = newValue;
      }

      const ok = await onSaveDb(updatedDb);
      if (ok) {
        setSavedSuccessId(item.id);
        setTimeout(() => setSavedSuccessId(null), 2500);
      } else {
        setErrorMsg('Failed to save to database. Please check your network connection.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error saving changes');
    } finally {
      setIsSaving(false);
    }
  };

  // Save all modified items on the current screen
  const handleSaveAllModified = async () => {
    const modifiedKeys = Object.keys(editedValues);
    if (modifiedKeys.length === 0) return;

    setIsSaving(true);
    setErrorMsg('');
    try {
      const updatedDb = JSON.parse(JSON.stringify(db));

      SITE_TEXT_SCHEMA.forEach(item => {
        if (editedValues[item.id] !== undefined) {
          const val = editedValues[item.id];
          if (item.dbPath.target === 'pagesContent') {
            const pageId = item.dbPath.pageId || 'Home';
            if (!updatedDb.pagesContent) updatedDb.pagesContent = {};
            if (!updatedDb.pagesContent[pageId]) updatedDb.pagesContent[pageId] = {};
            updatedDb.pagesContent[pageId][item.dbPath.field] = val;
          } else if (item.dbPath.target === 'generalSettings') {
            if (!updatedDb.generalSettings) updatedDb.generalSettings = {};
            updatedDb.generalSettings[item.dbPath.field] = val;
          } else if (item.dbPath.target === 'southwestStates') {
            const stateKey = item.dbPath.field;
            const subKey = item.dbPath.subKey || 'description';
            if (!updatedDb.southwestStates) updatedDb.southwestStates = {};
            if (!updatedDb.southwestStates[stateKey]) updatedDb.southwestStates[stateKey] = {};
            updatedDb.southwestStates[stateKey][subKey] = val;
          }
        }
      });

      const ok = await onSaveDb(updatedDb);
      if (ok) {
        setGlobalSuccessMsg(`Saved all ${modifiedKeys.length} edited text block(s) successfully!`);
        setTimeout(() => setGlobalSuccessMsg(''), 3000);
      } else {
        setErrorMsg('Failed to save all changes.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error executing save all');
    } finally {
      setIsSaving(false);
    }
  };

  // Revert all unsaved changes for this view
  const handleResetCurrentEdits = () => {
    setEditedValues({});
  };

  // Add a brand new Custom Words / Paragraph Block
  const handleAddNewWordBlock = async () => {
    if (!newBlockTitle.trim() || !newBlockContent.trim()) {
      setErrorMsg('Please enter both a title and paragraph words.');
      return;
    }

    setIsSaving(true);
    try {
      const updatedDb = JSON.parse(JSON.stringify(db));
      if (!updatedDb.customTextBlocks) updatedDb.customTextBlocks = {};
      if (!updatedDb.customTextBlocks[newBlockPage]) updatedDb.customTextBlocks[newBlockPage] = [];

      const newBlock = {
        id: `custom-block-${Date.now()}`,
        title: newBlockTitle.trim(),
        content: newBlockContent.trim(),
        category: newBlockCategory,
        createdAt: new Date().toISOString()
      };

      updatedDb.customTextBlocks[newBlockPage].push(newBlock);

      const ok = await onSaveDb(updatedDb);
      if (ok) {
        setGlobalSuccessMsg(`New word block "${newBlockTitle}" added to ${newBlockPage} page!`);
        setNewBlockTitle('');
        setNewBlockContent('');
        setIsAddBlockOpen(false);
        setTimeout(() => setGlobalSuccessMsg(''), 3000);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to add word block');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete a Custom Words Block
  const handleDeleteCustomBlock = async (pageKey: string, blockId: string) => {
    if (!confirm('Are you sure you want to delete this custom word block?')) return;
    setIsSaving(true);
    try {
      const updatedDb = JSON.parse(JSON.stringify(db));
      if (updatedDb.customTextBlocks && updatedDb.customTextBlocks[pageKey]) {
        updatedDb.customTextBlocks[pageKey] = updatedDb.customTextBlocks[pageKey].filter((b: any) => b.id !== blockId);
      }
      const ok = await onSaveDb(updatedDb);
      if (ok) {
        setGlobalSuccessMsg('Custom text block deleted.');
        setTimeout(() => setGlobalSuccessMsg(''), 2500);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to delete block');
    } finally {
      setIsSaving(false);
    }
  };

  // Execute Code File Search (find any words inside codebase)
  const handleRunCodeSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!codeSearchQuery.trim()) return;

    setIsCodeSearching(true);
    setCodeMatches([]);
    setCodeSelectedMatch(null);
    setCodeSuccess('');

    try {
      const res = await fetch('/api/admin/code/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: codeSearchQuery.trim() })
      });
      const data = await res.json();
      if (data.success && data.matches) {
        setCodeMatches(data.matches);
      } else {
        setCodeMatches([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCodeSearching(false);
    }
  };

  // Modify exact code line on disk
  const handleSaveCodeReplacement = async () => {
    if (!codeSelectedMatch || !codeReplacementText.trim()) return;
    setCodeSaving(true);
    setCodeSuccess('');

    try {
      const res = await fetch('/api/admin/code/modify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filePath: codeSelectedMatch.filePath,
          targetContent: codeSelectedMatch.text,
          replacementContent: codeReplacementText,
          description: `Admin text editor updated: ${codeSelectedMatch.filePath}`
        })
      });

      const data = await res.json();
      if (data.success) {
        setCodeSuccess('Successfully saved words directly to code file! Reloading preview...');
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        setErrorMsg(data.message || 'Failed to modify code file');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error updating code');
    } finally {
      setCodeSaving(false);
    }
  };

  const modifiedCount = Object.keys(editedValues).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00a757] border border-emerald-200 flex items-center justify-center shrink-0">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-neutral-900 leading-tight">
                Site-Wide Text & Copy Editor
              </h2>
              <p className="text-xs text-neutral-500 font-light mt-0.5">
                Edit every single place where there are words on the website. Delete words, add new words, or search any phrase across all pages.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* View Mode Switcher */}
          <div className="flex items-center p-1 bg-neutral-100 rounded-xl border border-neutral-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTabMode('browse')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTabMode === 'browse'
                  ? 'bg-white text-neutral-900 shadow-xs font-bold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#00a757]" />
              <span>Browse All Pages</span>
            </button>

            <button
              onClick={() => setActiveTabMode('code-finder')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTabMode === 'code-finder'
                  ? 'bg-white text-neutral-900 shadow-xs font-bold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-blue-600" />
              <span>Deep Word Finder</span>
            </button>
          </div>

          <button
            onClick={() => {
              setNewBlockPage(selectedPage);
              setIsAddBlockOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00a757] hover:bg-[#008f49] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add New Words Block</span>
          </button>
        </div>
      </div>

      {/* Global Alerts */}
      {globalSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{globalSuccessMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg('')} className="ml-auto text-red-500 hover:text-red-700">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ================= MODE 1: BROWSE BY PAGE & EDIT WORDS ================= */}
      {activeTabMode === 'browse' && (
        <div className="space-y-6">

          {/* Search Bar: Live Word Finder Across Everything */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-xs">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any word or sentence on the website (e.g., Cocoa House, Fiduciary, 1976, Agriculture, Mandate, Oyo, etc.)..."
                className="w-full pl-10 pr-10 py-2.5 bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#00a757] focus:ring-1 focus:ring-[#00a757] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {searchQuery && (
              <div className="mt-2.5 flex items-center justify-between text-xs text-neutral-500 px-1">
                <span>
                  Found <strong className="text-neutral-900">{displayedItems.length}</strong> editable text locations containing "{searchQuery}"
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[#00a757] font-semibold hover:underline cursor-pointer"
                >
                  Clear search & return to page view
                </button>
              </div>
            )}
          </div>

          {/* Page Picker (Only shown when not in global search mode) */}
          {!searchQuery && (
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono">
                  Select Page to Edit:
                </span>
                {onNavigateToPreview && (
                  <button
                    onClick={() => onNavigateToPreview(selectedPage === 'Footer & Global' ? 'Home' : selectedPage)}
                    className="text-xs text-[#00a757] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View {selectedPage} Live</span>
                  </button>
                )}
              </div>

              {/* Page Pill Buttons */}
              <div className="flex flex-wrap gap-2">
                {availablePages.map(page => (
                  <button
                    key={page}
                    onClick={() => {
                      setSelectedPage(page);
                      setSelectedSection('All');
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      selectedPage === page
                        ? 'bg-[#00a757] text-white shadow-xs'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    <span>{page}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedPage === page ? 'bg-white/25 text-white' : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      {SITE_TEXT_SCHEMA.filter(i => i.page === page).length}
                    </span>
                  </button>
                ))}
              </div>

              {/* Section Sub-filter for Selected Page */}
              {pageSections.length > 2 && (
                <div className="pt-2 border-t border-neutral-100 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  <span className="text-[11px] text-neutral-400 shrink-0 font-medium">Sections:</span>
                  {pageSections.map(sec => (
                    <button
                      key={sec}
                      onClick={() => setSelectedSection(sec)}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-colors shrink-0 cursor-pointer ${
                        selectedSection === sec
                          ? 'bg-neutral-900 text-white font-semibold'
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Sticky Quick-Save Bar when items are modified */}
          {modifiedCount > 0 && (
            <div className="sticky top-2 z-20 bg-neutral-900 text-white rounded-2xl p-4 shadow-xl border border-neutral-700 flex items-center justify-between gap-4 animate-in slide-in-from-top duration-200">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-semibold text-neutral-200">
                  You have <strong className="text-white font-bold">{modifiedCount}</strong> unsaved text change{modifiedCount > 1 ? 's' : ''} on this screen.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetCurrentEdits}
                  className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  Discard
                </button>
                <button
                  onClick={handleSaveAllModified}
                  disabled={isSaving}
                  className="px-4 py-1.5 rounded-xl bg-[#00a757] hover:bg-[#008f49] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save All Changes ({modifiedCount})</span>
                </button>
              </div>
            </div>
          )}

          {/* Editable Text Cards Grid */}
          <div className="space-y-4">
            {displayedItems.map((item) => {
              const currentVal = getDbValue(item);
              const isModified = editedValues[item.id] !== undefined && editedValues[item.id] !== item.defaultValue;
              const isSavedJustNow = savedSuccessId === item.id;

              return (
                <div 
                  key={item.id}
                  className={`bg-white rounded-2xl border transition-all p-5 shadow-xs ${
                    isModified 
                      ? 'border-amber-300 ring-2 ring-amber-100' 
                      : 'border-neutral-200/80 hover:border-neutral-300'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-neutral-900">
                        {item.label}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                        {item.page} &rsaquo; {item.section}
                      </span>
                      {isModified && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          Unsaved
                        </span>
                      )}
                      {isSavedJustNow && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Saved!
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-auto">
                      {/* Character / Word count preview */}
                      <span className="text-[11px] font-mono text-neutral-400 mr-1">
                        {currentVal.split(/\s+/).filter(Boolean).length} words ({currentVal.length} chars)
                      </span>

                      {/* Reset to default button */}
                      {currentVal !== item.defaultValue && (
                        <button
                          onClick={() => handleTextChange(item.id, item.defaultValue)}
                          title="Restore original text"
                          className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Save this specific item button */}
                      <button
                        onClick={() => handleSaveItem(item)}
                        disabled={isSaving}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSavedJustNow
                            ? 'bg-emerald-600 text-white'
                            : 'bg-neutral-900 hover:bg-[#00a757] text-white'
                        }`}
                      >
                        {isSavedJustNow ? <Check className="w-3 h-3" /> : <Save className="w-3 h-3" />}
                        <span>{isSavedJustNow ? 'Saved' : 'Save'}</span>
                      </button>
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-[11px] text-neutral-500 font-light mb-2.5">
                      {item.description}
                    </p>
                  )}

                  {/* Text Input or Textarea */}
                  {item.type === 'textarea' ? (
                    <textarea
                      rows={item.rows || 3}
                      value={currentVal}
                      onChange={(e) => handleTextChange(item.id, e.target.value)}
                      className="w-full p-3.5 bg-neutral-50/70 hover:bg-white focus:bg-white border border-neutral-200 rounded-xl text-xs text-neutral-900 leading-relaxed focus:outline-none focus:border-[#00a757] focus:ring-1 focus:ring-[#00a757] transition-all resize-y font-sans"
                      placeholder="Type or delete words here..."
                    />
                  ) : (
                    <input
                      type="text"
                      value={currentVal}
                      onChange={(e) => handleTextChange(item.id, e.target.value)}
                      className="w-full p-3 bg-neutral-50/70 hover:bg-white focus:bg-white border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-[#00a757] focus:ring-1 focus:ring-[#00a757] transition-all font-sans"
                      placeholder="Type or delete words here..."
                    />
                  )}
                </div>
              );
            })}

            {displayedItems.length === 0 && (
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-12 text-center text-neutral-500">
                <FileText className="w-10 h-10 mx-auto text-neutral-300 mb-3" />
                <p className="text-sm font-semibold text-neutral-800">No matching text items found</p>
                <p className="text-xs text-neutral-500 mt-1">Try searching for a different word or clearing the search filter.</p>
              </div>
            )}
          </div>

          {/* User's Custom Added Text Blocks on this page */}
          {db?.customTextBlocks?.[selectedPage]?.length > 0 && (
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-mono">
                    Custom Added Words & Paragraphs on {selectedPage} ({db.customTextBlocks[selectedPage].length})
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {db.customTextBlocks[selectedPage].map((block: any) => (
                  <div key={block.id} className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-neutral-900">{block.title}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                          {block.category}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteCustomBlock(selectedPage, block.id)}
                        className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete this custom word block"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-neutral-700 leading-relaxed font-light whitespace-pre-line">
                      {block.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ================= MODE 2: DEEP WORD FINDER (SCAN ANY WORD IN CODEBASE) ================= */}
      {activeTabMode === 'code-finder' && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-base text-neutral-900">
              Deep Word Finder & Code Replacer
            </h3>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              If there are any hardcoded sentences or specific words embedded directly inside React templates or components, search for the exact phrase below. You can edit the words directly and save it to the code file with an automatic timestamped backup.
            </p>
          </div>

          <form onSubmit={handleRunCodeSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={codeSearchQuery}
                onChange={(e) => setCodeSearchQuery(e.target.value)}
                placeholder="Search any exact word or sentence in code (e.g., 'Enhancing the legacy', 'Cocoa House', '50 Years')..."
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-[#00a757] focus:ring-1 focus:ring-[#00a757]"
              />
            </div>
            <button
              type="submit"
              disabled={isCodeSearching || !codeSearchQuery.trim()}
              className="px-5 py-2.5 bg-[#00a757] hover:bg-[#008f49] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
            >
              {isCodeSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
              <span>Find Words</span>
            </button>
          </form>

          {codeSuccess && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{codeSuccess}</span>
            </div>
          )}

          {/* Search Results */}
          {codeMatches.length > 0 && (
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider">
                Matches found in Codebase ({codeMatches.length}):
              </span>

              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {codeMatches.map((match, idx) => (
                  <div 
                    key={idx}
                    onClick={() => {
                      setCodeSelectedMatch(match);
                      setCodeReplacementText(match.text);
                    }}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      codeSelectedMatch === match 
                        ? 'bg-emerald-50/60 border-[#00a757] ring-1 ring-[#00a757]' 
                        : 'bg-neutral-50/70 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-[11px] font-bold text-neutral-800">
                        {match.filePath}:{match.line}
                      </span>
                      <span className="text-[10px] font-mono bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded">
                        {match.category || 'Source'}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] text-neutral-600 truncate">
                      {match.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Editor for Selected Match */}
          {codeSelectedMatch && (
            <div className="p-5 bg-neutral-900 text-white rounded-2xl space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold block">
                    Editing Target Line:
                  </span>
                  <span className="font-mono text-xs text-neutral-300">
                    {codeSelectedMatch.filePath} (Line {codeSelectedMatch.line})
                  </span>
                </div>
                <button
                  onClick={() => setCodeSelectedMatch(null)}
                  className="text-neutral-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-neutral-400">
                  Delete, Add, or Replace Words in this line:
                </label>
                <textarea
                  rows={3}
                  value={codeReplacementText}
                  onChange={(e) => setCodeReplacementText(e.target.value)}
                  className="w-full p-3 bg-neutral-950 border border-neutral-700 rounded-xl text-xs font-mono text-emerald-300 leading-relaxed focus:outline-none focus:border-[#00a757]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={() => setCodeSelectedMatch(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold hover:bg-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCodeReplacement}
                  disabled={codeSaving}
                  className="px-4 py-1.5 rounded-xl bg-[#00a757] hover:bg-[#008f49] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {codeSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Words to File</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= MODAL: ADD NEW CUSTOM WORDS / PARAGRAPH BLOCK ================= */}
      {isAddBlockOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-neutral-100 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00a757] flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-neutral-900">
                    Add New Words / Paragraph Block
                  </h3>
                  <span className="text-xs text-neutral-500">Target Page: {newBlockPage}</span>
                </div>
              </div>
              <button
                onClick={() => setIsAddBlockOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1.5">Select Page</label>
                <select
                  value={newBlockPage}
                  onChange={(e) => setNewBlockPage(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-[#00a757]"
                >
                  {availablePages.map(page => (
                    <option key={page} value={page}>{page}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1.5">Block Title / Headline</label>
                <input
                  type="text"
                  value={newBlockTitle}
                  onChange={(e) => setNewBlockTitle(e.target.value)}
                  placeholder="e.g., Special Announcement, Historical Note, Chairman's Quote"
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-[#00a757]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1.5">Block Category / Type</label>
                <select
                  value={newBlockCategory}
                  onChange={(e) => setNewBlockCategory(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-[#00a757]"
                >
                  <option value="Announcement">Announcement Banner</option>
                  <option value="Editorial">Editorial Paragraph</option>
                  <option value="Quote">Executive Quote</option>
                  <option value="Notice">Notice / Disclaimer</option>
                  <option value="Highlight">Special Highlight</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1.5">Words & Narrative Content</label>
                <textarea
                  rows={4}
                  value={newBlockContent}
                  onChange={(e) => setNewBlockContent(e.target.value)}
                  placeholder="Type any words, sentences, or paragraphs here..."
                  className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 leading-relaxed focus:outline-none focus:border-[#00a757]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-neutral-100">
              <button
                onClick={() => setIsAddBlockOpen(false)}
                className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewWordBlock}
                disabled={isSaving}
                className="px-5 py-2 rounded-xl bg-[#00a757] hover:bg-[#008f49] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Add Word Block</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
