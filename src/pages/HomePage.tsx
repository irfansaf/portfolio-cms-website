import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import PortfolioGrid from '../components/PortfolioGrid';
import DiaryGrid from '../components/DiaryGrid';
import ResumeSection from '../components/ResumeSection';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { Project, DiaryEntry, Skill, Experience } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface HomePageProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  projects: Project[];
  diaryEntries: DiaryEntry[];
  skills: Skill[];
  experiences: Experience[];
}

export default function HomePage({ theme, onThemeToggle, projects, diaryEntries, skills, experiences }: HomePageProps) {
  const portfolioRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleViewWork = () => {
    portfolioRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar 
        currentPage="home"
        theme={theme}
        onThemeToggle={onThemeToggle}
      />
      
      <main>
        <HeroSection onCtaClick={handleViewWork} />
        
        <section id="portfolio" ref={portfolioRef} className="py-24 px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-center text-foreground">
              Portfolio
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
              A collection of my recent work and projects
            </p>
            <PortfolioGrid projects={projects} />
          </div>
        </section>

        <section id="diaries" className="py-24 px-8 bg-muted">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-center text-foreground">
              Engineering Blog
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
              Technical articles, lessons learned, and thoughts on software engineering
            </p>
            <DiaryGrid entries={diaryEntries} />
          </div>
        </section>

        <section id="resume" className="py-24 px-8 bg-background">
          <div className="max-w-4xl mx-auto">
            <ResumeSection skills={skills} experiences={experiences} />
          </div>
        </section>

        <section id="contact" className="py-24 px-8 bg-muted">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-center text-foreground">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-16">
              Have a project in mind? Let's talk about it.
            </p>
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
