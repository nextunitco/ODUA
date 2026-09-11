export interface StateMetadata {
  id?: string;
  name: string;
  capital: string;
  gdp?: string;
  population?: string;
  keySectors?: string[];
  description?: string;
  coordinates?: { x: number; y: number };
  
  // Backward compatibility for existing data structures
  tagline?: string;
  importance?: string;
  projects?: string[];
  logo?: string;
}

export interface SectorDetail {
  id?: string;
  title: string;
  description: string;
  icon?: string;
  contribution?: string;
  subSectors?: string[];
  
  // Backward compatibility for Portfolio view
  subtitle?: string;
  image?: string;
  bullets?: string[];
  tagline?: string;
  stats?: { label: string; value: string }[];
  subs?: string[];
}

export interface Project {
  id?: string;
  title: string;
  sector: string;
  location: string;
  status: 'Completed' | 'Ongoing' | 'Pipeline';
  description: string;
  image: string;
  completionYear?: string;
}

export interface NewsCard {
  id: string | number;
  title: string;
  category: string;
  date: string;
  summary?: string;
  excerpt?: string;
  image: string;
  content?: string;
  author?: string;
}