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

export interface NavItem {
  label: string;
  href: string;
}
