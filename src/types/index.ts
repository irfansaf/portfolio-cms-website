export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  imgSrc: string;
  role: string;
  technologies: string[];
  overview: string;
  outcomes: string;
  gallery: string[];
  links: string[];
}

export interface DiaryEntry {
  id: string;
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
