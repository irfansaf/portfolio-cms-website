import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Project } from '../types';

interface PortfolioGridProps {
  projects: Project[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
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
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={item}>
          <Card
            className="cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full group"
            onClick={() => navigate(`/project/${project.slug}`)}
          >
            <div className="aspect-video overflow-hidden bg-muted">
              <img
                src={project.imgSrc}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-xs font-mono">
                  {project.role}
                </span>
              </div>
              <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
