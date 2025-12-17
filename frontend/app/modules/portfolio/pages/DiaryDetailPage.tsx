import { useParams, useNavigate, useOutletContext, useLoaderData } from 'react-router';
import { useEffect } from 'react';
import type { Route } from '../+types/DiaryDetailPage';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '@/modules/shared/ui/button';
import { ArrowLeft, Lock } from 'lucide-react';
import type { AppContext } from '@/modules/shared/types';
import { generateOpenGraphTags, generateTwitterCardTags, generateCanonicalUrl, generateArticleStructuredData, generateDescription } from '@/modules/shared/lib/seo';
import StructuredData from '@/modules/shared/components/StructuredData';
import Breadcrumbs from '@/modules/shared/components/Breadcrumbs';
import { getDiary, getSystemStatus } from '@/modules/portfolio/api';
import { getSystemStatus as getSystemStatusAPI } from '@/modules/shared/api/system';

export async function loader({ params, request }: Route.LoaderArgs) {
  const slug = params.slug;
  if (!slug) {
    throw new Response('Diary entry not found', { status: 404 });
  }

  try {
    const [diary, status] = await Promise.all([
      getDiary(slug).catch(() => null),
      getSystemStatusAPI().catch(() => ({ site_name: 'Portfolio', initialized: true })),
    ]);

    return {
      diary,
      siteName: status.site_name || 'Portfolio',
      baseUrl: new URL(request.url).origin,
    };
  } catch (error) {
    return {
      diary: null,
      siteName: 'Portfolio',
      baseUrl: new URL(request.url).origin,
    };
  }
}

export const meta = ({ data, params }: Route.MetaArgs) => {
  const diary = data?.diary;
  const siteName = data?.siteName || 'Portfolio';
  const baseUrl = data?.baseUrl || '';
  const slug = params?.slug || '';
  
  if (!diary || diary.visibility !== 'public') {
    const title = diary ? 'Private Entry' : 'Entry Not Found';
    const description = diary 
      ? 'This diary entry is private and requires authentication to view.'
      : 'The requested diary entry could not be found.';
    const url = `/diary/${slug}`;
    
    return [
      { title },
      { name: 'description', content: description },
      { tagName: 'link', rel: 'canonical', href: generateCanonicalUrl(url) },
    ];
  }

  const title = `${diary.title} - ${siteName}`;
  const description = generateDescription(diary.excerpt || diary.content || diary.title, 160);
  const url = `/diary/${slug}`;
  
  const ogTags = generateOpenGraphTags({
    title,
    description,
    url,
    type: 'article',
    siteName,
  });

  const twitterTags = generateTwitterCardTags({
    title,
    description,
  });

  return [
    { title },
    { name: 'description', content: description },
    { name: 'article:published_time', content: diary.date },
    { name: 'article:author', content: siteName },
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

export default function DiaryDetailPage() {
  const { theme, onThemeToggle, isAuthenticated, siteName: contextSiteName } = useOutletContext<AppContext>();
  const loaderData = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  
  const entry = loaderData?.diary;
  const siteName = loaderData?.siteName || contextSiteName;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!entry) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavBar siteName={siteName} theme={theme} onThemeToggle={onThemeToggle} />
        <main id="main-content" className="py-32 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-headline text-4xl font-bold mb-8 text-foreground">Entry Not Found</h1>
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

  const canView = entry.visibility === 'public' || isAuthenticated;

  // Generate structured data for the article (only for public entries)
  let structuredData = null;
  if (canView && entry.visibility === 'public') {
    const articleUrl = generateCanonicalUrl(`/diary/${entry.slug}`);
    structuredData = generateArticleStructuredData({
      title: entry.title,
      description: entry.excerpt || entry.title,
      url: articleUrl,
      datePublished: entry.date,
      dateModified: entry.date,
      author: {
        name: 'Software Engineer',
        url: generateCanonicalUrl('/'),
      },
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {structuredData && <StructuredData data={structuredData} />}
      <NavBar siteName={siteName} theme={theme} onThemeToggle={onThemeToggle} />
      
      <main id="main-content" className="py-32 px-8">
        <div className="max-w-3xl mx-auto">
          {entry && (
            <Breadcrumbs
              items={[
                { label: 'Diaries', href: '/diaries' },
                { label: entry.title },
              ]}
            />
          )}

          {!canView ? (
            <div className="text-center py-24">
              <Lock className="w-16 h-16 mx-auto mb-8 text-muted-foreground" />
              <h1 className="font-headline text-3xl font-bold mb-4 text-foreground">
                Private Entry
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                This diary entry is private and requires authentication to view.
              </p>
              <Button 
                onClick={() => navigate('/cms')}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Go to Login
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <time className="text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  {entry.visibility === 'private' && (
                    <span className="px-3 py-1 bg-gray-500 text-white rounded-md text-sm">
                      Private
                    </span>
                  )}
                </div>
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
                  {entry.title}
                </h1>
              </div>

              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div 
                  className="text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: entry.content }}
                />
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
