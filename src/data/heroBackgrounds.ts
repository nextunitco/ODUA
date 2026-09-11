// Curated and AI-generated high-resolution hero background images for all web pages
import headquartersHero from '../assets/images/corporate_headquarters_hero_1789027717425.jpg';
import cocoaHouseWikipedia from '../assets/images/cocoa_house_wikipedia.jpg';
import investmentHero from '../assets/images/investment_sectors_hero_1789027734737.jpg';
import governanceHero from '../assets/images/corporate_governance_hero_1789027752264.jpg';
import foundationHero from '../assets/images/community_foundation_hero_1789027766844.jpg';
import jubileeHero from '../assets/images/heritage_jubilee_hero_1789027787329.jpg';
import museumGallery from '../assets/images/museum/museum-gallery.jpg';

export const HERO_BACKGROUNDS = {
  // Home Page (Official Wikipedia Cocoa House Skyscraper)
  home: cocoaHouseWikipedia,

  // About Pages
  aboutUs: headquartersHero,
  whoWeAre: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
  ourHistory: jubileeHero,
  goldenJubilee: jubileeHero,

  // Leadership & Governance
  boardOfDirectors: governanceHero,
  leadershipTeam: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1920&q=80",
  governanceCompliance: governanceHero,

  // Investments & Commercial
  portfolio: investmentHero,
  subsidiaries: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
  projects: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1920&q=80",
  investors: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80",

  // CSR & Impact
  foundation: foundationHero,

  // Media, Careers, Contact, Museum
  media: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1920&q=80",
  museum: museumGallery,
  careers: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80",
  contact: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
} as const;
