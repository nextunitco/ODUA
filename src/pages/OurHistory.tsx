import React from 'react';
import { motion } from 'motion/react';
import { History, Sparkles } from 'lucide-react';
import OurHistoryPage from '../components/OurHistoryPage';
import WordPressPageHeader from '../components/WordPressPageHeader';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';

interface OurHistoryProps {
  onNavigate?: (page: string) => void;
  generalSettings?: {
    siteName?: string;
    tagline?: string;
    phone?: string;
    email?: string;
    address?: string;
    assetValue?: string;
    keySectorsCount?: string;
    vision?: string;
    mission?: string;
    coreValues?: string;
    establishedYear?: string;
    ownerStatesCount?: string;
    youtubeDocId?: string;
    docRuntime?: string;
  };
  historyMilestones?: any[];
}

export default function OurHistory({ onNavigate = () => {}, generalSettings, historyMilestones }: OurHistoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col text-left font-sans bg-neutral-50"
    >
      {/* WordPress-Style Header with Breadcrumbs */}
      <WordPressPageHeader
        title="Our History & Five Decades of Heritage"
        subtitle={`Discover the founding journey and enduring evolution of ${generalSettings?.siteName || "Odu'a Investment Company Limited"}—spanning over 50 years of industrial pioneerism and regional wealth preservation.`}
        badge={`Est. ${generalSettings?.establishedYear || "1976"}`}
        breadcrumbs={[
          { label: 'About Us', page: 'About Us' },
          { label: 'Our History', active: true }
        ]}
        onNavigate={onNavigate}
        backgroundImage={HERO_BACKGROUNDS.ourHistory}
      />

      {/* HISTORY TIMELINE CONTENT */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <OurHistoryPage generalSettings={generalSettings} historyMilestones={historyMilestones} />
      </main>
    </motion.div>
  );
}
