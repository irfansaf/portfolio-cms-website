import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/modules/shared/ui/card';
import type { DiaryEntry } from '@/modules/shared/types';
import { useNavigate } from 'react-router';

interface DiaryGridProps {
  entries: DiaryEntry[];
}

export default function DiaryGrid({ entries }: DiaryGridProps) {
  const navigate = useNavigate();



  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {entries.length === 0 && (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-muted-foreground">
          No diary entries found.
        </div>
      )}
      {entries.map((entry, index) => (
        <motion.div
          key={entry.id}
          variants={item}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card
            className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full group border-l-4 border-l-primary"
            onClick={() => navigate(`/diary/${entry.slug}`)}
          >
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <time className="text-sm text-muted-foreground font-mono">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                {entry.visibility === 'public' && (
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-xs font-mono">
                    Public
                  </span>
                )}
              </div>
              <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                {entry.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground line-clamp-2">
                {entry.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-primary hover:underline font-normal flex items-center gap-2">
                Read article 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
