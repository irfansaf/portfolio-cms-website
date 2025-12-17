import { useOutletContext } from 'react-router';
import { Link } from 'react-router';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import type { AppContext } from '@/modules/shared/types';
import { generateOpenGraphTags, generateTwitterCardTags, generateCanonicalUrl } from '@/modules/shared/lib/seo';

export const meta = () => {
  const title = 'Sitemap';
  const description = 'Find all pages and content on this website. Browse projects, diary entries, and resources.';
  const url = '/sitemap';
  
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

export default function SitemapPage() {
  const { theme, onThemeToggle, projects, diaryEntries, siteName } = useOutletContext<AppContext>();

  // Filter public diaries only
  const publicDiaries = diaryEntries.filter(diary => diary.visibility === 'public');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar siteName={siteName} theme={theme} onThemeToggle={onThemeToggle} />
      
      <main id="main-content" className="py-32 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Sitemap
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Find all pages and content on this website
          </p>

          <div className="space-y-12">
            {/* Main Pages */}
            <section>
              <h2 className="font-headline text-2xl font-bold mb-6 text-foreground">
                Main Pages
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/portfolio" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/diaries" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Engineering Diaries
                  </Link>
                </li>
              </ul>
            </section>

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="font-headline text-2xl font-bold mb-6 text-foreground">
                  Projects ({projects.length})
                </h2>
                <ul className="grid md:grid-cols-2 gap-2">
                  {projects.map((project) => (
                    <li key={project.id}>
                      <Link 
                        to={`/project/${project.slug}`}
                        className="text-primary hover:underline flex items-center gap-2"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        {project.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Diary Entries */}
            {publicDiaries.length > 0 && (
              <section>
                <h2 className="font-headline text-2xl font-bold mb-6 text-foreground">
                  Engineering Diaries ({publicDiaries.length})
                </h2>
                <ul className="grid md:grid-cols-2 gap-2">
                  {publicDiaries.map((diary) => (
                    <li key={diary.id}>
                      <Link 
                        to={`/diary/${diary.slug}`}
                        className="text-primary hover:underline flex items-center gap-2"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        {diary.title}
                      </Link>
                      <span className="text-sm text-muted-foreground ml-6">
                        {new Date(diary.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Resources */}
            <section>
              <h2 className="font-headline text-2xl font-bold mb-6 text-foreground">
                Resources
              </h2>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/feed.xml" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    RSS Feed
                  </a>
                </li>
                <li>
                  <a 
                    href="/sitemap.xml" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    XML Sitemap
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

