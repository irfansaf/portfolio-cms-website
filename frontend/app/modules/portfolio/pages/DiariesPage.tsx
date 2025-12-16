import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import NavBar from '../components/NavBar';
import DiaryGrid from '../components/DiaryGrid';
import Footer from '../components/Footer';
import type { AppContext } from '@/modules/shared/types';
import { Button } from '@/modules/shared/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export default function DiariesPage() {
  const { theme, onThemeToggle, diaryEntries } = useOutletContext<AppContext>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar theme={theme} onThemeToggle={onThemeToggle} />
      
      <main className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <div>
              <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Engineering Diaries
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Technical articles, thoughts, and lessons learned along the journey.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          <DiaryGrid entries={diaryEntries} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
