import { useParams, useNavigate, useOutletContext } from 'react-router';
import { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '@/modules/shared/ui/button';
import { ArrowLeft, Lock } from 'lucide-react';
import type { AppContext } from '@/modules/shared/types';

export default function DiaryDetailPage() {
  const { theme, onThemeToggle, diaryEntries, isAuthenticated } = useOutletContext<AppContext>();

  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const entry = diaryEntries.find(e => e.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!entry) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavBar theme={theme} onThemeToggle={onThemeToggle} />
        <main className="py-32 px-8">
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar theme={theme} onThemeToggle={onThemeToggle} />
      
      <main className="py-32 px-8">
        <div className="max-w-3xl mx-auto">
          <Button 
            onClick={() => navigate('/')}
            className="mb-12 bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Diaries
          </Button>

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
