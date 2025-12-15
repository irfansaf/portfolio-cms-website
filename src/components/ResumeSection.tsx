import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Code, Database, Cloud, GitBranch } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResumeSection() {
  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'], icon: Code },
    { category: 'Backend', items: ['Node.js', 'Go', 'Python', 'REST APIs'], icon: Database },
    { category: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'], icon: Cloud },
    { category: 'Tools', items: ['Git', 'Linux', 'PostgreSQL', 'Redis'], icon: GitBranch },
  ];

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
          5+ years of experience building scalable applications and distributed systems
        </p>
        <Button 
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Resume
        </Button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {skills.map((skillGroup) => {
          const Icon = skillGroup.icon;
          return (
            <motion.div key={skillGroup.category} variants={item}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">{skillGroup.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill) => (
                      <li key={skill} className="text-muted-foreground flex items-center">
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

      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Professional Experience</CardTitle>
          <CardDescription className="text-muted-foreground">
            Recent positions and achievements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-l-2 border-primary pl-6 space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-foreground">Senior Software Engineer</h3>
              <p className="text-sm text-muted-foreground mb-2">Tech Company • 2022 - Present</p>
              <ul className="space-y-2 text-foreground">
                <li>• Led development of microservices architecture serving 1M+ users</li>
                <li>• Reduced API response time by 70% through optimization</li>
                <li>• Mentored junior developers and conducted code reviews</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">Software Engineer</h3>
              <p className="text-sm text-muted-foreground mb-2">Startup Inc • 2020 - 2022</p>
              <ul className="space-y-2 text-foreground">
                <li>• Built full-stack features using React and Node.js</li>
                <li>• Implemented CI/CD pipelines reducing deployment time by 80%</li>
                <li>• Collaborated with cross-functional teams on product development</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
