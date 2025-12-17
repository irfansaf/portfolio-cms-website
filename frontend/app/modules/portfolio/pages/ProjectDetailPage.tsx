
import { useParams, useNavigate, useLoaderData } from 'react-router'; // v7 import
import { useOutletContext } from 'react-router';
import { useEffect } from 'react';
import type { Route } from '../+types/ProjectDetailPage';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '@/modules/shared/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { AppContext } from '@/modules/shared/types';
import { generateOpenGraphTags, generateTwitterCardTags, generateCanonicalUrl, generateProjectStructuredData, generateDescription } from '@/modules/shared/lib/seo';
import StructuredData from '@/modules/shared/components/StructuredData';
import Breadcrumbs from '@/modules/shared/components/Breadcrumbs';
import { getProject, getSystemStatus } from '@/modules/portfolio/api';
import { getSystemStatus as getSystemStatusAPI } from '@/modules/shared/api/system';

export async function loader({ params, request }: Route.LoaderArgs) {
  const slug = params.slug;
  if (!slug) {
    throw new Response('Project not found', { status: 404 });
  }

  try {
    const [project, status] = await Promise.all([
      getProject(slug).catch(() => null),
      getSystemStatusAPI().catch(() => ({ site_name: 'Portfolio', initialized: true })),
    ]);

    return {
      project,
      siteName: status.site_name || 'Portfolio',
      baseUrl: new URL(request.url).origin,
    };
  } catch (error) {
    return {
      project: null,
      siteName: 'Portfolio',
      baseUrl: new URL(request.url).origin,
    };
  }
}

export const meta = ({ data, params }: Route.MetaArgs) => {
  const project = data?.project;
  const siteName = data?.siteName || 'Portfolio';
  const baseUrl = data?.baseUrl || '';
  const slug = params?.slug || '';
  
  if (!project) {
    const title = 'Project Not Found';
    const description = 'The requested project could not be found.';
    const url = `/project/${slug}`;
    
    return [
      { title },
      { name: 'description', content: description },
      { tagName: 'link', rel: 'canonical', href: generateCanonicalUrl(url) },
    ];
  }

  const title = `${project.title} - ${siteName}`;
  const description = generateDescription(project.description || project.overview || project.title, 160);
  const url = `/project/${slug}`;
  const imageUrl = project.img_src?.startsWith('http') 
    ? project.img_src 
    : `${baseUrl}${project.img_src}`;
  
  const ogTags = generateOpenGraphTags({
    title,
    description,
    url,
    type: 'article',
    siteName,
    image: imageUrl,
  });

  const twitterTags = generateTwitterCardTags({
    title,
    description,
    image: imageUrl,
  });

  return [
    { title },
    { name: 'description', content: description },
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

export default function ProjectDetailPage() {
  const { theme, onThemeToggle, siteName: contextSiteName } = useOutletContext<AppContext>();
  const loaderData = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  
  const project = loaderData?.project;
  const siteName = loaderData?.siteName || contextSiteName;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavBar siteName={siteName} theme={theme} onThemeToggle={onThemeToggle} />
        <main id="main-content" className="py-32 px-8">
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

  // Generate structured data for the project
  const projectUrl = generateCanonicalUrl(`/project/${project.slug}`);
  const structuredData = generateProjectStructuredData({
    name: project.title,
    description: project.description,
    url: projectUrl,
    image: project.img_src.startsWith('http') ? project.img_src : generateCanonicalUrl(project.img_src),
    technologies: project.technologies,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData data={structuredData} />
      <NavBar siteName={siteName} theme={theme} onThemeToggle={onThemeToggle} />
      
      <main id="main-content" className="py-32 px-8">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Portfolio', href: '/portfolio' },
              { label: project.title },
            ]}
          />

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
                {project.technologies.map((tech, index: number) => (
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
              src={project.img_src}
              alt={project.title}
              width={1200}
              height={675}
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
                {project.gallery.map((image, index: number) => (
                  <img 
                    key={index}
                    src={image}
                    alt={`${project.title} gallery ${index + 1}`}
                    width={600}
                    height={400}
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
