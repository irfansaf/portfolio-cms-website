import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailPageProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  projects: Project[];
}

export default function ProjectDetailPage({ theme, onThemeToggle, projects }: ProjectDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavBar currentPage="portfolio" theme={theme} onThemeToggle={onThemeToggle} />
        <main className="py-32 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-headline text-4xl font-bold mb-8 text-foreground">Project Not Found</h1>
            <Button 
              onClick={() => navigate('/')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar currentPage="portfolio" theme={theme} onThemeToggle={onThemeToggle} />
      
      <main className="py-32 px-8">
        <div className="max-w-5xl mx-auto">
          <Button 
            onClick={() => navigate('/')}
            className="mb-12 bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Portfolio
          </Button>

          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-8 text-foreground">
            {project.title}
          </h1>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div>
              <h3 className="font-headline text-lg font-semibold mb-3 text-foreground">Role</h3>
              <p className="text-muted-foreground">{project.role}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-headline text-lg font-semibold mb-3 text-foreground">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-muted text-muted-foreground rounded-md text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <img 
              src={project.imgSrc}
              alt={project.title}
              className="w-full rounded-lg"
              loading="lazy"
            />
          </div>

          <div className="prose prose-lg max-w-none mb-16 dark:prose-invert">
            <h2 className="font-headline text-3xl font-bold mb-6 text-foreground">Overview</h2>
            <div 
              className="text-foreground leading-relaxed mb-8"
              dangerouslySetInnerHTML={{ __html: project.overview }}
            />

            <h2 className="font-headline text-3xl font-bold mb-6 text-foreground">Outcomes</h2>
            <div 
              className="text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: project.outcomes }}
            />
          </div>

          {project.gallery.length > 0 && (
            <div className="mb-16">
              <h2 className="font-headline text-3xl font-bold mb-8 text-foreground">Gallery</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {project.gallery.map((image, index) => (
                  <img 
                    key={index}
                    src={image}
                    alt={`${project.title} gallery ${index + 1}`}
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
