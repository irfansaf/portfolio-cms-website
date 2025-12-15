import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DiaryEntry } from '../types';

interface DiaryGridProps {
  entries: DiaryEntry[];
}

export default function DiaryGrid({ entries }: DiaryGridProps) {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {entries.map((entry) => (
        <motion.div key={entry.id} variants={item}>
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
    </motion.div>
  );
}
