import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useOutletContext } from 'react-router';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import PortfolioGrid from '../components/PortfolioGrid';
import DiaryGrid from '../components/DiaryGrid';
import ResumeSection from '../components/ResumeSection';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import type { AppContext } from '@/modules/shared/types';
import { generateOpenGraphTags, generateTwitterCardTags, generateCanonicalUrl, generateWebsiteStructuredData, generatePersonStructuredData } from '@/modules/shared/lib/seo';
import StructuredData from '@/modules/shared/components/StructuredData';

gsap.registerPlugin(ScrollTrigger);

export const meta = () => {
  const description = 'A modern portfolio website showcasing projects, technical articles, and professional experience. Built with React and Go.';
  const title = 'Software Engineer Portfolio';
  const url = '/';
  
  const ogTags = generateOpenGraphTags({
    title,
    description,
    url,
    siteName: 'Portfolio',
  });

  const twitterTags = generateTwitterCardTags({
    title,
    description,
  });

  return [
    { title },
    { name: 'description', content: description },
    { name: 'keywords', content: 'portfolio, software engineer, developer, full stack, web development, projects' },
    { tagName: 'link', rel: 'canonical', href: generateCanonicalUrl(url) },
    ...ogTags.map(tag => ({
      ...(tag.property ? { property: tag.property } : {}),
      ...(tag.name ? { name: tag.name } : {}),
      content: tag.content,
    })),
    ...twitterTags.map(tag => ({
      name: tag.name,
      content: tag.content,
    })),
  ];
};

export default function HomePage() {
  const { theme, onThemeToggle, projects, diaryEntries, skills, experiences, siteName } = useOutletContext<AppContext>();
  
  // existing logic...
  const portfolioRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleViewWork = () => {
    portfolioRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Generate structured data
  const structuredData = [];
  
  // Website structured data
  structuredData.push(generateWebsiteStructuredData({
    name: siteName,
    url: generateCanonicalUrl('/'),
    description: 'A modern portfolio website showcasing projects, technical articles, and professional experience.',
  }));

  // Person structured data (if we have social links)
  const activeSocialLinks = socialLinks.filter(link => link.is_active);
  if (activeSocialLinks.length > 0) {
    structuredData.push(generatePersonStructuredData({
      name: siteName,
      url: generateCanonicalUrl('/'),
      jobTitle: 'Software Engineer',
      description: 'Full stack developer building scalable systems and solving complex problems.',
      sameAs: activeSocialLinks.map(link => link.url),
    }));
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData data={structuredData} />
      <NavBar 
        siteName={siteName}
        theme={theme}
        onThemeToggle={onThemeToggle}
      />
      
      <main id="main-content">
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
