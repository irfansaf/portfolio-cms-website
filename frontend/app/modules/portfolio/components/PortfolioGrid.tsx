import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/modules/shared/ui/card';
import type { Project } from '@/modules/shared/types';
import { useNavigate } from 'react-router';

interface PortfolioGridProps {
  projects: Project[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const navigate = useNavigate();



  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.length === 0 && (
        <div className="col-span-1 md:col-span-2 text-center py-12 text-muted-foreground">
          No projects found.
        </div>
      )}
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          variants={item}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card
            className="cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full group"
            onClick={() => navigate(`/project/${project.slug}`)}
          >
            <div className="aspect-video overflow-hidden bg-muted">
              <img
                src={project.img_src}
                alt={project.title}
                width={800}
                height={450}
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
                {project.technologies.map((tech, index: number) => (
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
    </div>
  );
}
