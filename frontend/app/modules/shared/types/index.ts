export interface Project {
  id: string | number;
  slug: string;
  title: string;
  description: string;
  img_src: string;
  role: string;
  technologies: string[];
  overview: string;
  outcomes: string;
  gallery: string[];
  links: string[];
}

export interface DiaryEntry {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  visibility: 'public' | 'private';
}

export interface Skill {
  id: string | number;
  category: string;
  items: string[];
}

export interface Experience {
  id: string | number;
  title: string;
  company: string;
  start_date: string;
  end_date?: string | null;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface AppContext {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  projects: Project[];
  diaryEntries: DiaryEntry[];
  skills: Skill[];
  experiences: Experience[];
  isAuthenticated: boolean;
  logout: () => void;
  fetchData: () => Promise<void>;
  onUpdateProjects: () => void;
  onUpdateDiaries: () => void;
  onUpdateSkills: () => void;
  onUpdateExperiences: () => void;
  onLogout: () => void;
  onThemeToggle: () => void;
}
