import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Code, Database, Cloud, GitBranch, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skill, Experience } from '@/types';

interface ResumeSectionProps {
  skills: Skill[];
  experiences: Experience[];
}

// Map common categories to icons
const getCategoryIcon = (category: string) => {
  const normalized = category.toLowerCase();
  if (normalized.includes('frontend') || normalized.includes('web')) return Code;
  if (normalized.includes('backend') || normalized.includes('api')) return Database;
  if (normalized.includes('devops') || normalized.includes('cloud')) return Cloud;
  if (normalized.includes('tool')) return GitBranch;
  return Briefcase; // Default
};

// Helper to format date range
const formatDateRange = (startDate: string, endDate?: string | null) => {
  const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const end = endDate ? new Date(endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present';
  return `${start} - ${end}`;
};

export default function ResumeSection({ skills, experiences }: ResumeSectionProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 text-foreground">
          Skills & Experience
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Overview of my technical expertise and professional journey
        </p>
        <Button 
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Resume
        </Button>
      </div>

      {skills.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
        {skills.map((skillGroup) => {
          const Icon = getCategoryIcon(skillGroup.category);
          return (
            <motion.div key={skillGroup.id} variants={item}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">{skillGroup.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill, index) => (
                      <li key={index} className="text-muted-foreground flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
        </motion.div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Professional Experience</CardTitle>
          <CardDescription className="text-muted-foreground">
            Recent positions and achievements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-8">
            {Object.entries(
              experiences.reduce((acc, exp) => {
                const group = acc[exp.company] || [];
                group.push(exp);
                acc[exp.company] = group;
                return acc;
              }, {} as Record<string, Experience[]>)
            ).map(([company, companyExperiences], index) => (
              <div key={index} className="relative border-l-2 border-primary/20 pl-6 pb-2 last:pb-0">
                {/* Company Label */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                <h3 className="text-xl font-bold text-foreground mb-4">{company}</h3>
                
                {/* Roles within the company */}
                <div className="space-y-8">
                  {companyExperiences.map((exp, expIndex) => (
                    <div key={exp.id} className="relative">
                      {expIndex !== companyExperiences.length - 1 && (
                         <div className="absolute left-[-25px] top-6 bottom-[-32px] w-0.5 bg-primary/20" />
                      )}
                      
                      <div className="group">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                          <h4 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                            {exp.title}
                          </h4>
                          <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                            {formatDateRange(exp.start_date, exp.end_date)}
                          </span>
                        </div>
                        <div 
                          className="prose prose-sm prose-neutral dark:prose-invert max-w-none text-muted-foreground"
                          dangerouslySetInnerHTML={{ __html: exp.description }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
