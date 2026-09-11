import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GripVertical,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Plus,
  Edit,
  Save,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  LayoutGrid,
  FileText,
  BarChart3,
  Globe,
  Building2,
  Award,
  Video,
  HelpCircle,
  Phone,
  ArrowRight,
  RefreshCw,
  Sliders,
  Image as ImageIcon,
  MapPin
} from 'lucide-react';
import { ImageUploader } from './ImageUploader';

export interface PageBlock {
  id: string;
  type: 
    | 'hero' 
    | 'stats' 
    | 'states' 
    | 'strategy' 
    | 'vision_mission' 
    | 'projects' 
    | 'news' 
    | 'leadership' 
    | 'calculator' 
    | 'cta_banner' 
    | 'rich_text' 
    | 'video' 
    | 'faq' 
    | 'contact_box'
    | 'map';
  title: string;
  subtitle?: string;
  visible: boolean;
  data: Record<string, any>;
}

interface DragDropPageBuilderProps {
  pageId: string;
  pageTitle: string;
  initialBlocks?: PageBlock[];
  onSave: (blocks: PageBlock[], pageMeta: any) => Promise<void>;
  onClose: () => void;
  onPreview: () => void;
  showNotification: (msg: string) => void;
}

// Preset block templates that users can drag or add
export const BLOCK_LIBRARY_PRESETS: Array<{
  type: PageBlock['type'];
  name: string;
  description: string;
  icon: any;
  category: string;
  defaultData: Record<string, any>;
}> = [
  {
    type: 'hero',
    name: 'Hero Banner & Top Headline',
    description: 'Full-width cinematic hero with badge pill, title, subtitle, image & CTA buttons.',
    icon: Sparkles,
    category: 'Headers',
    defaultData: {
      badge: 'The Engine Room of Southwest Nigeria',
      title: 'Enhancing the legacy for future generations',
      subtitle: 'Through strategic investments and efficient management of our diversified portfolio, we unlock new opportunities across Southwest Nigeria.',
      bannerImage: 'https://i.postimg.cc/gj0gKfZ7/cocoa-house.jpg',
      primaryBtnText: 'Explore Portfolio',
      primaryBtnLink: 'Portfolio',
      secondaryBtnText: 'Co-Invest with Us',
      secondaryBtnLink: 'Contact Us',
      align: 'center'
    }
  },
  {
    type: 'stats',
    name: 'Sovereign Metrics & Stats Bar',
    description: 'Overlapping 4-column counter for asset valuation, sectors, and founding year.',
    icon: BarChart3,
    category: 'Metrics',
    defaultData: {
      stat1Value: '6 States',
      stat1Label: 'One Shared Regional Vision',
      stat2Value: '50+ Yrs',
      stat2Label: 'Sovereign Legacy Heritage',
      stat3Value: '₦300B+',
      stat3Label: 'Asset Valuation Base',
      stat4Value: '9 Sectors',
      stat4Label: 'Key Driving Growth Sectors',
      bgColor: '#00a757'
    }
  },
  {
    type: 'states',
    name: 'Southwest Sovereign States Grid',
    description: 'Emblems and crests of the 6 owner state governments: Oyo, Ogun, Ondo, Osun, Ekiti, Lagos.',
    icon: Globe,
    category: 'Governance',
    defaultData: {
      title: 'Jointly Owned by 6 Southwest States of Nigeria',
      subtitle: 'A collective sovereign economic alliance driving sustainable regional prosperity.',
      showLogos: true
    }
  },
  {
    type: 'strategy',
    name: 'Strategic Thrust (SRC 2.0) Narrative',
    description: 'Two-column strategic overview with highlighted corporate priorities & mandate.',
    icon: Layers,
    category: 'Narrative',
    defaultData: {
      tag: 'Strategic Mandate',
      title: 'Catalyzing Wealth & Development Across South-Western Nigeria',
      text: 'As the sovereign asset hub representing Western Nigeria, we optimize and grow a highly diversified portfolio in Real Estate, Agronomy, Energy, Healthcare, and Financial Instruments.',
      buttonText: 'Read Corporate History',
      buttonLink: 'Our History'
    }
  },
  {
    type: 'vision_mission',
    name: 'Vision, Mission & Core Values Pillars',
    description: 'Three structured pillar cards showcasing Vision, Mission, and Iwa Pele Ethos.',
    icon: Award,
    category: 'Identity',
    defaultData: {
      visionTitle: 'Our Vision',
      visionText: 'To be a world-class conglomerate, delivering sustainable value to our stakeholders while remaining the undisputed engine of growth for Southwest Nigeria.',
      missionTitle: 'Our Mission',
      missionText: 'To run a commercially viable enterprise focused on high-yield sectors, optimizing asset performance, and creating generation-spanning economic value.',
      coreValuesTitle: 'Core Values & Ethos',
      coreValuesText: 'Guided strictly by the philosophy of "Iwa Pele" (Good Character), structured through Accountability, Enterprise, Integrity, and Collaboration.'
    }
  },
  {
    type: 'projects',
    name: 'Featured Projects & Infrastructure Grid',
    description: 'Visual showcase cards of active landmark developments and investments.',
    icon: Building2,
    category: 'Portfolio',
    defaultData: {
      tag: 'Active Engagements',
      title: 'Landmarks & Regional Capital Projects',
      buttonText: 'Explore All Projects',
      buttonLink: 'Ongoing Projects',
      itemCount: 3
    }
  },
  {
    type: 'news',
    name: 'Corporate News & Media Press Releases',
    description: 'Live grid displaying latest corporate announcements and press statements.',
    icon: FileText,
    category: 'Media',
    defaultData: {
      tag: 'Corporate Communications',
      title: 'Latest Media Highlights & Newsroom',
      buttonText: 'View All News',
      buttonLink: 'Media',
      itemCount: 3
    }
  },
  {
    type: 'cta_banner',
    name: 'Joint Ventures & Co-Investment Call to Action',
    description: 'High-conversion branded banner with prospectus request & partnership desk buttons.',
    icon: ArrowRight,
    category: 'Conversion',
    defaultData: {
      badge: 'Joint Ventures Desk',
      title: 'Accelerating Southwest Nigeria\'s Industrial Processing Zones',
      text: 'We invite institutional players, domestic fund managers, and global diaspora networks to join our stable co-investment pool. Backed by state cabinet guarantees.',
      primaryBtnText: 'Request Group Prospectus',
      secondaryBtnText: 'Connect with Secretariat'
    }
  },
  {
    type: 'rich_text',
    name: 'Custom Rich Text / Markdown Section',
    description: 'Custom headline, intro paragraph, detailed narrative, and optional accent image.',
    icon: FileText,
    category: 'Custom Content',
    defaultData: {
      title: 'Custom Section Heading',
      subtitle: 'Optional descriptive subtitle for this section.',
      content: 'Enter your custom paragraph content here. You can update this narrative at any time without touching code.',
      image: '',
      imagePosition: 'right'
    }
  },
  {
    type: 'video',
    name: 'Corporate Video & Documentary Embed',
    description: 'Responsive video embed with title, description, and YouTube/MP4 stream URL.',
    icon: Video,
    category: 'Media',
    defaultData: {
      title: 'Watch the Odu\'a 50-Year Golden Jubilee Documentary',
      subtitle: 'From the historic Cocoa House construction to 21st-century venture investments.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      caption: 'Official Corporate Documentary'
    }
  },
  {
    type: 'faq',
    name: 'Frequently Asked Questions (FAQ) Accordion',
    description: 'Interactive collapsible accordion for key stakeholder and investment questions.',
    icon: HelpCircle,
    category: 'Support',
    defaultData: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find quick answers about ownership, governance, co-investment, and operations.',
      faqs: [
        { q: 'Who owns Odu\'a Investment Company Limited?', a: 'Odu\'a Investment Company Limited is jointly owned by the six Southwest States of Nigeria: Oyo, Ogun, Ondo, Osun, Ekiti, and Lagos States.' },
        { q: 'What is the credit rating of Odu\'a Group?', a: 'The company holds an investment-grade Aa- credit rating with a stable financial outlook.' },
        { q: 'How can institutional investors partner with Odu\'a?', a: 'Investors can participate via Joint Ventures, Public-Private Partnerships (PPP), and SPV equity co-investments.' }
      ]
    }
  },
  {
    type: 'contact_box',
    name: 'Regional Contact & Headquarters Desk',
    description: 'Contact cards with Cocoa House address, telephone hotline, and direct email.',
    icon: Phone,
    category: 'Support',
    defaultData: {
      title: 'Connect with Odu\'a Corporate Headquarters',
      subtitle: 'Cocoa House, Dugbe, Ibadan, Oyo State, Nigeria',
      email: 'info@odua-investment.com',
      phone: '+234 2 241 4183',
      hours: 'Mon - Fri: 8:00 AM - 5:00 PM WAT'
    }
  },
  {
    type: 'map',
    name: 'Interactive Location Map',
    description: 'Embedded interactive Google Map showing the headquarters address at Cocoa House, Dugbe, Ibadan.',
    icon: MapPin,
    category: 'Support',
    defaultData: {
      title: 'Find Us at Cocoa House, Ibadan',
      subtitle: 'Floors 20-23, Cocoa House, Oba Adebimpe Road, Dugbe, Ibadan, Oyo State, Nigeria',
      mapQuery: 'Cocoa+House,+Oba+Adebimpe+Road,+Dugbe,+Ibadan,+Nigeria',
      zoom: 16
    }
  }
];

// Helper to get visual metadata (label, icon, color badge) for each block type
const getBlockTypeMeta = (type: PageBlock['type']) => {
  switch (type) {
    case 'hero':
      return { label: 'HERO', icon: Sparkles, badgeColor: 'bg-purple-50 text-purple-700 border-purple-200/90' };
    case 'stats':
      return { label: 'STATS', icon: BarChart3, badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/90' };
    case 'states':
      return { label: 'STATES', icon: Globe, badgeColor: 'bg-teal-50 text-teal-700 border-teal-200/90' };
    case 'strategy':
      return { label: 'STRATEGY', icon: Layers, badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/90' };
    case 'vision_mission':
      return { label: 'VALUES', icon: Award, badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/90' };
    case 'projects':
      return { label: 'PROJECTS', icon: Building2, badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/90' };
    case 'news':
      return { label: 'NEWS', icon: FileText, badgeColor: 'bg-rose-50 text-rose-700 border-rose-200/90' };
    case 'leadership':
      return { label: 'LEADERSHIP', icon: LayoutGrid, badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200/90' };
    case 'calculator':
      return { label: 'CALCULATOR', icon: Sliders, badgeColor: 'bg-violet-50 text-violet-700 border-violet-200/90' };
    case 'cta_banner':
      return { label: 'CTA BANNER', icon: Sparkles, badgeColor: 'bg-amber-50 text-amber-800 border-amber-200/90' };
    case 'video':
      return { label: 'VIDEO', icon: Video, badgeColor: 'bg-red-50 text-red-700 border-red-200/90' };
    case 'faq':
      return { label: 'FAQ', icon: HelpCircle, badgeColor: 'bg-sky-50 text-sky-700 border-sky-200/90' };
    case 'contact_box':
      return { label: 'CONTACT', icon: Phone, badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/90' };
    case 'map':
      return { label: 'MAP', icon: MapPin, badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/90' };
    case 'rich_text':
    default:
      return { label: 'CONTENT', icon: Edit, badgeColor: 'bg-neutral-100 text-neutral-700 border-neutral-200/90' };
  }
};

export function DragDropPageBuilder({
  pageId,
  pageTitle,
  initialBlocks,
  onSave,
  onClose,
  onPreview,
  showNotification
}: DragDropPageBuilderProps) {
  // Initialize default blocks based on page
  const getDefaultBlocksForPage = (id: string): PageBlock[] => {
    if (initialBlocks && initialBlocks.length > 0) {
      return initialBlocks;
    }

    if (id === 'Home') {
      return [
        { id: 'b_hero', type: 'hero', title: 'Hero Banner', visible: true, data: BLOCK_LIBRARY_PRESETS[0].defaultData },
        { id: 'b_stats', type: 'stats', title: 'Sovereign Metrics Bar', visible: true, data: BLOCK_LIBRARY_PRESETS[1].defaultData },
        { id: 'b_states', type: 'states', title: 'SW Sovereign States Grid', visible: true, data: BLOCK_LIBRARY_PRESETS[2].defaultData },
        { id: 'b_strategy', type: 'strategy', title: 'Strategic Thrust & Mandate', visible: true, data: BLOCK_LIBRARY_PRESETS[3].defaultData },
        { id: 'b_projects', type: 'projects', title: 'Featured Projects Showcase', visible: true, data: BLOCK_LIBRARY_PRESETS[5].defaultData },
        { id: 'b_cta', type: 'cta_banner', title: 'Joint Ventures CTA Banner', visible: true, data: BLOCK_LIBRARY_PRESETS[7].defaultData },
        { id: 'b_news', type: 'news', title: 'Latest Corporate News', visible: true, data: BLOCK_LIBRARY_PRESETS[6].defaultData }
      ];
    } else {
      return [
        { 
          id: `b_hero_${id}`, 
          type: 'hero', 
          title: `${id} Hero Header`, 
          visible: true, 
          data: {
            ...BLOCK_LIBRARY_PRESETS[0].defaultData,
            badge: `${id} Overview`,
            title: id,
            subtitle: `Welcome to the official ${id} portal of Odu'a Investment Company Limited.`,
            bannerImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80'
          } 
        },
        { 
          id: `b_text_${id}`, 
          type: 'rich_text', 
          title: `${id} Narrative & Mandate`, 
          visible: true, 
          data: {
            title: `Strategic Objectives of ${id}`,
            subtitle: 'Overview of operations, milestones, and sustainable governance.',
            content: `Odu'a Investment Company Limited operates with unwavering commitment to value creation, high-yield asset optimization, and generation-spanning regional impact across ${id}.`
          } 
        },
        { id: `b_cta_${id}`, type: 'cta_banner', title: 'Co-Investment & Inquiries', visible: true, data: BLOCK_LIBRARY_PRESETS[7].defaultData }
      ];
    }
  };

  const [blocks, setBlocks] = useState<PageBlock[]>(getDefaultBlocksForPage(pageId));
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(blocks[0]?.id || null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Drag and Drop State
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Reorder Handler
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    // Keep clean
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...blocks];
    const [movedItem] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, movedItem);

    setBlocks(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
    showNotification(`Moved block "${movedItem.title}" to position ${targetIndex + 1}!`);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Move Up / Move Down Handlers
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;

    const updated = [...blocks];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setBlocks(updated);
    showNotification(`Moved "${moved.title}" ${direction}!`);
  };

  // Toggle Visibility
  const toggleBlockVisibility = (id: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, visible: !b.visible } : b));
    const target = blocks.find(b => b.id === id);
    if (target) {
      showNotification(`Block "${target.title}" is now ${target.visible ? 'Hidden' : 'Visible'}.`);
    }
  };

  // Duplicate Block
  const duplicateBlock = (id: string) => {
    const target = blocks.find(b => b.id === id);
    if (!target) return;

    const newBlock: PageBlock = {
      ...target,
      id: `b_${Date.now()}`,
      title: `${target.title} (Copy)`,
      data: JSON.parse(JSON.stringify(target.data))
    };

    const targetIdx = blocks.findIndex(b => b.id === id);
    const updated = [...blocks];
    updated.splice(targetIdx + 1, 0, newBlock);
    setBlocks(updated);
    setSelectedBlockId(newBlock.id);
    showNotification(`Duplicated "${target.title}".`);
  };

  // Delete Block
  const deleteBlock = (id: string) => {
    if (blocks.length <= 1) {
      showNotification('Cannot delete the last remaining block.');
      return;
    }
    const target = blocks.find(b => b.id === id);
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedBlockId === id) {
      const remaining = blocks.filter(b => b.id !== id);
      setSelectedBlockId(remaining[0]?.id || null);
    }
    showNotification(`Removed block "${target?.title || 'Block'}".`);
  };

  // Add Block from Library
  const handleAddBlockPreset = (preset: typeof BLOCK_LIBRARY_PRESETS[0]) => {
    const newBlock: PageBlock = {
      id: `b_${Date.now()}_${preset.type}`,
      type: preset.type,
      title: preset.name,
      visible: true,
      data: JSON.parse(JSON.stringify(preset.defaultData))
    };

    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
    setIsLibraryOpen(false);
    showNotification(`Added new "${preset.name}" block to page!`);
  };

  // Update Data in Selected Block
  const updateSelectedBlockData = (key: string, val: any) => {
    if (!selectedBlockId) return;
    setBlocks(blocks.map(b => {
      if (b.id === selectedBlockId) {
        return {
          ...b,
          data: { ...b.data, [key]: val }
        };
      }
      return b;
    }));
  };

  // Update Block Title
  const updateSelectedBlockTitle = (newTitle: string) => {
    if (!selectedBlockId) return;
    setBlocks(blocks.map(b => b.id === selectedBlockId ? { ...b, title: newTitle } : b));
  };

  // Save All Changes
  const handleSave = async () => {
    try {
      setSaving(true);
      // Extract top level hero/stats data for backward compatibility
      const heroBlock = blocks.find(b => b.type === 'hero');
      const statsBlock = blocks.find(b => b.type === 'stats');
      const textBlock = blocks.find(b => b.type === 'rich_text' || b.type === 'strategy');

      const pageMeta = {
        heroBadge: heroBlock?.data?.badge,
        heroTitle: heroBlock?.data?.title,
        heroSubtitle: heroBlock?.data?.subtitle,
        bannerImage: heroBlock?.data?.bannerImage,
        primaryButtonText: heroBlock?.data?.primaryBtnText,
        secondaryButtonText: heroBlock?.data?.secondaryBtnText,
        introTitle: textBlock?.data?.title,
        introText: textBlock?.data?.content || textBlock?.data?.text,
        assetValueText: statsBlock?.data?.stat3Value,
        assetValueLabel: statsBlock?.data?.stat3Label,
        sectorsText: statsBlock?.data?.stat4Value,
        sectorsLabel: statsBlock?.data?.stat4Label,
        heritageText: statsBlock?.data?.stat2Value,
        heritageLabel: statsBlock?.data?.stat2Label,
        blocks: blocks
      };

      await onSave(blocks, pageMeta);
      showNotification(`Page "${pageTitle}" published with ${blocks.length} custom blocks!`);
    } catch (err: any) {
      showNotification(`Error saving blocks: ${err.message || 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  return (
    <div className="space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
          >
            ← Back to Pages
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-neutral-900">Drag & Drop Visual Builder: {pageTitle}</h2>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold flex items-center gap-1">
                <GripVertical className="w-3 h-3 text-emerald-600" /> Interactive Canvas
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              Drag section blocks by their handles (⋮⋮) to reorder your page. Click any block to configure headlines, photos, and copy.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={() => setIsLibraryOpen(!isLibraryOpen)}
            className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-400" /> Add New Block
          </button>

          <button 
            type="button"
            onClick={onPreview}
            className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-4 h-4" /> Live Preview
          </button>

          <button 
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-[#00a757] hover:bg-[#008f49] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Block Elements Library Drawer / Modal */}
      <AnimatePresence>
        {isLibraryOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-neutral-900 text-white p-5 rounded-2xl border border-neutral-800 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-emerald-400" /> Block Elements Library
                </h3>
                <p className="text-xs text-neutral-400">Click any block preset to add it directly to your page layout.</p>
              </div>
              <button 
                onClick={() => setIsLibraryOpen(false)}
                className="text-neutral-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-neutral-800"
              >
                Close Library
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[360px] overflow-y-auto pr-1">
              {BLOCK_LIBRARY_PRESETS.map((preset) => {
                const IconComponent = preset.icon;
                return (
                  <div 
                    key={preset.type}
                    onClick={() => handleAddBlockPreset(preset)}
                    className="p-3.5 bg-neutral-800/80 hover:bg-neutral-700/80 border border-neutral-700 hover:border-emerald-500/50 rounded-xl cursor-pointer transition-all duration-200 group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-xs text-white group-hover:text-emerald-400 transition-colors">{preset.name}</h4>
                      <p className="text-[11px] text-neutral-400 leading-snug line-clamp-2">{preset.description}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-neutral-700 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                      <span>{preset.category}</span>
                      <span className="text-emerald-400 font-bold group-hover:translate-x-0.5 transition-transform">+ Insert Block</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Drag-and-Drop Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Canvas (7 Cols): Drag & Drop Blocks Sequence */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-mono flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600" /> Page Section Blocks ({blocks.length})
            </span>
            <span className="text-[11px] text-neutral-400">
              Drag <strong className="text-neutral-700">⋮⋮</strong> to re-order
            </span>
          </div>

          <div className="space-y-2.5">
            {blocks.map((block, index) => {
              const isSelected = selectedBlockId === block.id;
              const isDragging = draggedIndex === index;
              const isDropTarget = dragOverIndex === index;
              const meta = getBlockTypeMeta(block.type);
              const Icon = meta.icon;

              return (
                <div
                  key={block.id}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  onClick={() => setSelectedBlockId(block.id)}
                  className={`group relative p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 select-none cursor-pointer ${
                    isDragging 
                      ? 'opacity-30 border-2 border-dashed border-emerald-500 bg-emerald-50/20 scale-[0.98]' 
                      : isDropTarget
                        ? 'border-2 border-dashed border-[#00a757] bg-emerald-50/60 shadow-md scale-[1.01]'
                        : isSelected
                          ? 'border-emerald-500 bg-gradient-to-r from-emerald-50/40 via-white to-white shadow-md ring-2 ring-emerald-500/20 border-l-[6px] border-l-emerald-600'
                          : 'border-neutral-200/90 bg-white hover:border-neutral-300 hover:shadow-md hover:bg-neutral-50/30'
                  } ${!block.visible ? 'opacity-65 bg-neutral-50/80 border-dashed' : ''}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    
                    {/* Left: Drag Handle + Number + Type Icon + Title & Subtitle */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Drag Grip Handle */}
                      <div 
                        className="w-8 h-8 rounded-xl bg-neutral-100/90 group-hover:bg-neutral-200/80 text-neutral-400 group-hover:text-neutral-700 flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0 transition-colors border border-neutral-200/60 shadow-2xs"
                        title="Drag to re-order section"
                      >
                        <GripVertical className="w-4 h-4" />
                      </div>

                      {/* Number Step Pill */}
                      <div className={`w-7 h-7 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs transition-colors ${
                        isSelected ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-neutral-900 text-white'
                      }`}>
                        {index + 1}
                      </div>

                      {/* Title, Badge & Subtitle */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-serif font-bold text-sm text-neutral-900 tracking-tight leading-snug group-hover:text-emerald-800 transition-colors truncate">
                            {block.title}
                          </h4>
                          
                          <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border shrink-0 ${meta.badgeColor}`}>
                            <Icon className="w-2.5 h-2.5" />
                            {meta.label}
                          </span>

                          {!block.visible && (
                            <span className="text-[10px] font-bold font-mono text-amber-800 bg-amber-100/80 border border-amber-200/80 px-2 py-0.5 rounded-md shrink-0">
                              Hidden
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-neutral-500 truncate mt-0.5 font-light">
                          {block.data.subtitle || block.data.title || block.data.tag || 'Configured content section'}
                        </p>
                      </div>
                    </div>

                    {/* Right: Quick Action Controls Toolbar */}
                    <div 
                      className="flex items-center gap-0.5 bg-neutral-50/90 border border-neutral-200/80 p-1 rounded-xl shadow-2xs shrink-0" 
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Move Up */}
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveBlock(index, 'up')}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-white hover:shadow-2xs disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-neutral-400 transition-all cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      {/* Move Down */}
                      <button
                        type="button"
                        disabled={index === blocks.length - 1}
                        onClick={() => moveBlock(index, 'down')}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-white hover:shadow-2xs disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-neutral-400 transition-all cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      <div className="w-px h-3.5 bg-neutral-200 mx-0.5"></div>

                      {/* Visibility Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleBlockVisibility(block.id)}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                          block.visible 
                            ? 'text-neutral-500 hover:text-neutral-900 hover:bg-white hover:shadow-2xs' 
                            : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                        }`}
                        title={block.visible ? 'Hide Block on Live Site' : 'Show Block on Live Site'}
                      >
                        {block.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>

                      {/* Duplicate */}
                      <button
                        type="button"
                        onClick={() => duplicateBlock(block.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-white hover:shadow-2xs transition-all cursor-pointer"
                        title="Duplicate Block"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => deleteBlock(block.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 hover:shadow-2xs transition-all cursor-pointer"
                        title="Delete Block"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Add Block Drop Box */}
          <div 
            onClick={() => setIsLibraryOpen(true)}
            className="border-2 border-dashed border-neutral-300 hover:border-emerald-500 hover:bg-emerald-50/20 rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-1 text-neutral-600 hover:text-emerald-700"
          >
            <Plus className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold">+ Insert Section Block from Library</span>
            <span className="text-[10px] text-neutral-400">Choose from Hero, Statistics, Projects, Strategy, Video, or FAQ</span>
          </div>
        </div>

        {/* Right Inspector (5 Cols): Selected Block Properties & Content */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 space-y-4 sticky top-4">
            
            {selectedBlock ? (
              <div className="space-y-4">
                {/* Block Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Configuring Block
                    </span>
                    <input 
                      type="text" 
                      value={selectedBlock.title} 
                      onChange={(e) => updateSelectedBlockTitle(e.target.value)}
                      className="text-sm font-bold text-neutral-900 mt-1 w-full border-b border-transparent hover:border-neutral-300 focus:border-[#00a757] focus:outline-none"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Type: {selectedBlock.type}
                  </span>
                </div>

                {/* Property Fields per Block Type */}
                <div className="space-y-3 text-xs max-h-[460px] overflow-y-auto pr-1">
                  
                  {/* Hero Block Fields */}
                  {selectedBlock.type === 'hero' && (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">
                          Category Badge / Pill
                        </label>
                        <input 
                          type="text" 
                          value={selectedBlock.data.badge || ''} 
                          onChange={(e) => updateSelectedBlockData('badge', e.target.value)}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs focus:ring-2 focus:ring-[#00a757] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">
                          Main Headline (Title)
                        </label>
                        <input 
                          type="text" 
                          value={selectedBlock.data.title || ''} 
                          onChange={(e) => updateSelectedBlockData('title', e.target.value)}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs font-bold focus:ring-2 focus:ring-[#00a757] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">
                          Subtitle Narrative
                        </label>
                        <textarea 
                          rows={3}
                          value={selectedBlock.data.subtitle || ''} 
                          onChange={(e) => updateSelectedBlockData('subtitle', e.target.value)}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs focus:ring-2 focus:ring-[#00a757] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">
                          Background Hero Photo URL
                        </label>
                        <input 
                          type="text" 
                          value={selectedBlock.data.bannerImage || ''} 
                          onChange={(e) => updateSelectedBlockData('bannerImage', e.target.value)}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs font-mono focus:ring-2 focus:ring-[#00a757] focus:outline-none"
                        />
                        {selectedBlock.data.bannerImage && (
                          <div className="mt-2 h-24 rounded-lg overflow-hidden border border-neutral-200 relative">
                            <img 
                              src={selectedBlock.data.bannerImage} 
                              alt="Hero banner preview" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer" 
                            />
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Primary Button</label>
                          <input 
                            type="text" 
                            value={selectedBlock.data.primaryBtnText || ''} 
                            onChange={(e) => updateSelectedBlockData('primaryBtnText', e.target.value)}
                            className="w-full p-2 rounded-lg border border-neutral-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Secondary Button</label>
                          <input 
                            type="text" 
                            value={selectedBlock.data.secondaryBtnText || ''} 
                            onChange={(e) => updateSelectedBlockData('secondaryBtnText', e.target.value)}
                            className="w-full p-2 rounded-lg border border-neutral-300 text-xs"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Stats Block Fields */}
                  {selectedBlock.type === 'stats' && (
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((num) => (
                        <div key={num} className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200">
                          <span className="text-[10px] font-bold text-neutral-500 font-mono block mb-1">Stat Counter #{num}</span>
                          <div className="grid grid-cols-2 gap-2">
                            <input 
                              type="text" 
                              placeholder="Value (e.g. ₦300B+)"
                              value={selectedBlock.data[`stat${num}Value`] || ''} 
                              onChange={(e) => updateSelectedBlockData(`stat${num}Value`, e.target.value)}
                              className="p-1.5 rounded border border-neutral-300 text-xs font-bold"
                            />
                            <input 
                              type="text" 
                              placeholder="Label (e.g. Asset Base)"
                              value={selectedBlock.data[`stat${num}Label`] || ''} 
                              onChange={(e) => updateSelectedBlockData(`stat${num}Label`, e.target.value)}
                              className="p-1.5 rounded border border-neutral-300 text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Rich Text Block Fields */}
                  {(selectedBlock.type === 'rich_text' || selectedBlock.type === 'strategy') && (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Section Heading</label>
                        <input 
                          type="text" 
                          value={selectedBlock.data.title || ''} 
                          onChange={(e) => updateSelectedBlockData('title', e.target.value)}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Subtitle</label>
                        <input 
                          type="text" 
                          value={selectedBlock.data.subtitle || selectedBlock.data.tag || ''} 
                          onChange={(e) => updateSelectedBlockData('subtitle', e.target.value)}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Narrative Content Body</label>
                        <textarea 
                          rows={5}
                          value={selectedBlock.data.content || selectedBlock.data.text || ''} 
                          onChange={(e) => updateSelectedBlockData('content', e.target.value)}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs leading-relaxed"
                        />
                      </div>
                    </>
                  )}

                  {/* Video Block Fields */}
                  {selectedBlock.type === 'video' && (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Video Title</label>
                        <input 
                          type="text" 
                          value={selectedBlock.data.title || ''} 
                          onChange={(e) => updateSelectedBlockData('title', e.target.value)}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Video Embed URL (YouTube or MP4)</label>
                        <input 
                          type="url" 
                          value={selectedBlock.data.videoUrl || ''} 
                          onChange={(e) => updateSelectedBlockData('videoUrl', e.target.value)}
                          placeholder="https://www.youtube.com/embed/..."
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Video Caption</label>
                        <input 
                          type="text" 
                          value={selectedBlock.data.caption || ''} 
                          onChange={(e) => updateSelectedBlockData('caption', e.target.value)}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs"
                        />
                      </div>
                    </>
                  )}

                  {/* CTA Banner Fields */}
                  {selectedBlock.type === 'cta_banner' && (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">CTA Headline</label>
                        <input 
                          type="text" 
                          value={selectedBlock.data.title || ''} 
                          onChange={(e) => updateSelectedBlockData('title', e.target.value)}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">CTA Descriptive Paragraph</label>
                        <textarea 
                          rows={3}
                          value={selectedBlock.data.text || ''} 
                          onChange={(e) => updateSelectedBlockData('text', e.target.value)}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Primary Button</label>
                          <input 
                            type="text" 
                            value={selectedBlock.data.primaryBtnText || ''} 
                            onChange={(e) => updateSelectedBlockData('primaryBtnText', e.target.value)}
                            className="w-full p-2 rounded-lg border border-neutral-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Secondary Button</label>
                          <input 
                            type="text" 
                            value={selectedBlock.data.secondaryBtnText || ''} 
                            onChange={(e) => updateSelectedBlockData('secondaryBtnText', e.target.value)}
                            className="w-full p-2 rounded-lg border border-neutral-300 text-xs"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* FAQ Accordion Fields */}
                  {selectedBlock.type === 'faq' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">FAQ Section Title</label>
                        <input 
                          type="text" 
                          value={selectedBlock.data.title || ''} 
                          onChange={(e) => updateSelectedBlockData('title', e.target.value)}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">FAQ Subtitle</label>
                        <input 
                          type="text" 
                          value={selectedBlock.data.subtitle || ''} 
                          onChange={(e) => updateSelectedBlockData('subtitle', e.target.value)}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs"
                        />
                      </div>
                      <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                        <span className="text-[10px] font-bold text-neutral-700">Questions Loaded ({selectedBlock.data.faqs?.length || 0})</span>
                        <p className="text-[11px] text-neutral-500">
                          Automatically synchronizes with live enterprise FAQ database and displays interactive collapsible accordions.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Contact Box Fields */}
                  {selectedBlock.type === 'contact_box' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Section Title</label>
                        <input 
                          type="text" 
                          value={selectedBlock.data.title || ''} 
                          onChange={(e) => updateSelectedBlockData('title', e.target.value)}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Office Address</label>
                        <textarea 
                          rows={2}
                          value={selectedBlock.data.subtitle || ''} 
                          onChange={(e) => updateSelectedBlockData('subtitle', e.target.value)}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Email</label>
                          <input 
                            type="email" 
                            value={selectedBlock.data.email || ''} 
                            onChange={(e) => updateSelectedBlockData('email', e.target.value)}
                            className="w-full p-2 rounded-lg border border-neutral-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Phone</label>
                          <input 
                            type="text" 
                            value={selectedBlock.data.phone || ''} 
                            onChange={(e) => updateSelectedBlockData('phone', e.target.value)}
                            className="w-full p-2 rounded-lg border border-neutral-300 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Map Block Fields */}
                  {selectedBlock.type === 'map' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Map Section Title</label>
                        <input 
                          type="text" 
                          value={selectedBlock.data.title || ''} 
                          onChange={(e) => updateSelectedBlockData('title', e.target.value)}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Address / Landmark Label</label>
                        <textarea 
                          rows={2}
                          value={selectedBlock.data.subtitle || ''} 
                          onChange={(e) => updateSelectedBlockData('subtitle', e.target.value)}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Google Maps Query</label>
                        <input 
                          type="text" 
                          value={selectedBlock.data.mapQuery || ''} 
                          onChange={(e) => updateSelectedBlockData('mapQuery', e.target.value)}
                          placeholder="Cocoa+House,+Oba+Adebimpe+Road,+Dugbe,+Ibadan,+Nigeria"
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-600 mb-1">Map Zoom Level (12-18)</label>
                        <input 
                          type="number" 
                          min={10}
                          max={20}
                          value={selectedBlock.data.zoom || 16} 
                          onChange={(e) => updateSelectedBlockData('zoom', parseInt(e.target.value, 10))}
                          className="w-full p-2 rounded-lg border border-neutral-300 text-xs"
                        />
                      </div>
                    </div>
                  )}

                </div>

                {/* Save Block Quick Button */}
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400">Edits update in real time.</span>
                  <button 
                    type="button"
                    onClick={handleSave}
                    className="px-3.5 py-1.5 bg-[#00a757] hover:bg-[#008f49] text-white rounded-lg text-xs font-bold transition-all shadow cursor-pointer flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Save Changes
                  </button>
                </div>

              </div>
            ) : (
              <div className="text-center py-12 text-neutral-400 space-y-2">
                <Sliders className="w-8 h-8 mx-auto text-neutral-300 stroke-1" />
                <p className="text-xs font-semibold text-neutral-600">No Block Selected</p>
                <p className="text-[11px] text-neutral-400">Click any block in the canvas to edit its properties.</p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
