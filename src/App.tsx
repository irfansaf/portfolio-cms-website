import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import DiaryDetailPage from './pages/DiaryDetailPage';
import CMSDashboard from './pages/CMSDashboard';
import { Project, DiaryEntry } from './types';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      slug: 'e-commerce-platform',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory management.',
      imgSrc: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      role: 'Full Stack Engineer',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
      overview: 'Built a scalable e-commerce platform handling 10k+ daily transactions with real-time inventory sync, payment processing, and order management.',
      outcomes: 'Reduced page load time by 60% and increased conversion rate by 35%.',
      gallery: ['https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop'],
      links: []
    },
    {
      id: '2',
      slug: 'microservices-architecture',
      title: 'Microservices Architecture',
      description: 'Distributed system with event-driven architecture.',
      imgSrc: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
      role: 'Backend Engineer',
      technologies: ['Go', 'Kubernetes', 'RabbitMQ', 'gRPC', 'Prometheus'],
      overview: 'Designed and implemented a microservices architecture for a fintech application, handling millions of transactions daily with 99.99% uptime.',
      outcomes: 'Improved system scalability by 300% and reduced infrastructure costs by 40%.',
      gallery: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop'],
      links: []
    },
    {
      id: '3',
      slug: 'real-time-analytics-dashboard',
      title: 'Real-Time Analytics Dashboard',
      description: 'Data visualization platform processing millions of events per second.',
      imgSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      role: 'Software Engineer',
      technologies: ['React', 'TypeScript', 'Apache Kafka', 'ClickHouse', 'WebSocket'],
      overview: 'Developed a real-time analytics dashboard that processes and visualizes streaming data with sub-second latency.',
      outcomes: 'Enabled data-driven decisions with real-time insights, improving business metrics by 25%.',
      gallery: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'],
      links: []
    },
    {
      id: '4',
      slug: 'devops-automation-pipeline',
      title: 'DevOps Automation Pipeline',
      description: 'CI/CD pipeline with automated testing and deployment.',
      imgSrc: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop',
      role: 'DevOps Engineer',
      technologies: ['Jenkins', 'Terraform', 'AWS', 'Ansible', 'Python'],
      overview: 'Built a comprehensive CI/CD pipeline automating the entire software delivery lifecycle from code commit to production deployment.',
      outcomes: 'Reduced deployment time from hours to minutes and eliminated 95% of manual errors.',
      gallery: ['https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop'],
      links: []
    }
  ]);

  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([
    {
      id: '1',
      slug: 'scaling-microservices',
      title: 'Scaling Microservices: Lessons Learned',
      excerpt: 'Key insights from building and scaling distributed systems in production.',
      content: 'After working on microservices architecture for the past year, I\'ve learned that the biggest challenge isn\'t the technology itself, but managing the complexity that comes with distributed systems.\n\nOne of the most important lessons: start with a monolith and extract services only when you have clear boundaries and a real need for independent scaling. Premature optimization in architecture can lead to unnecessary complexity.\n\nKey takeaways:\n- Service boundaries should align with business domains\n- Invest heavily in observability from day one\n- Circuit breakers and retry logic are not optional\n- Database per service is ideal, but shared databases can work with proper boundaries\n- Event-driven architecture helps with loose coupling\n\nThe journey has been challenging but incredibly rewarding.',
      date: '2024-01-15',
      visibility: 'public'
    },
    {
      id: '2',
      slug: 'typescript-best-practices',
      title: 'TypeScript Best Practices for Large Codebases',
      excerpt: 'Practical tips for maintaining type safety in enterprise applications.',
      content: 'TypeScript has become my go-to language for building scalable applications. Here are some practices that have helped maintain code quality:\n\n1. Strict Mode Always: Enable strict mode in tsconfig.json. It catches bugs early.\n\n2. Avoid \'any\': Use \'unknown\' instead when you truly don\'t know the type. It forces you to do type checking.\n\n3. Utility Types: Leverage built-in utility types like Partial, Pick, Omit, and Record.\n\n4. Type Guards: Create custom type guards for complex type narrowing.\n\n5. Discriminated Unions: Use them for state management and API responses.\n\n6. Const Assertions: Use \'as const\' for literal types and readonly arrays.\n\nThese practices have significantly reduced runtime errors in our production systems.',
      date: '2024-01-10',
      visibility: 'public'
    },
    {
      id: '3',
      slug: 'debugging-production-issues',
      title: 'Debugging Production Issues at 3 AM',
      excerpt: 'War stories and lessons from on-call duty.',
      content: 'Being on-call teaches you things no tutorial ever will. Last week, I got paged at 3 AM for a critical production issue...\n\nThe application was experiencing intermittent 500 errors. Logs showed nothing obvious. After digging through metrics, I discovered a memory leak in a background job that had been running for weeks.\n\nLesson learned: Always set up proper monitoring and alerting BEFORE issues happen. We now have:\n- Memory usage alerts\n- Error rate thresholds\n- Latency percentile tracking\n- Database connection pool monitoring\n\nThe best debugging tool is prevention through observability.',
      date: '2024-01-05',
      visibility: 'public'
    },
    {
      id: '4',
      slug: 'personal-growth-reflections',
      title: 'Personal Growth Reflections',
      excerpt: 'Private thoughts on career development and work-life balance.',
      content: 'Some personal reflections on my journey as a software engineer...',
      date: '2023-12-28',
      visibility: 'private'
    }
  ]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              theme={theme}
              onThemeToggle={toggleTheme}
              projects={projects}
              diaryEntries={diaryEntries.filter(entry => entry.visibility === 'public')}
            />
          } 
        />
        <Route 
          path="/project/:slug" 
          element={
            <ProjectDetailPage 
              theme={theme}
              onThemeToggle={toggleTheme}
              projects={projects}
            />
          } 
        />
        <Route 
          path="/diary/:slug" 
          element={
            <DiaryDetailPage 
              theme={theme}
              onThemeToggle={toggleTheme}
              diaryEntries={diaryEntries}
              isAuthenticated={isAuthenticated}
            />
          } 
        />
        <Route 
          path="/cms" 
          element={
            <CMSDashboard 
              theme={theme}
              onThemeToggle={toggleTheme}
              isAuthenticated={isAuthenticated}
              onLogin={() => setIsAuthenticated(true)}
              onLogout={() => setIsAuthenticated(false)}
              projects={projects}
              diaryEntries={diaryEntries}
              onUpdateProjects={setProjects}
              onUpdateDiaries={setDiaryEntries}
            />
          } 
        />
        </Routes>
      </Router>
    </>
  );
}

export default App;
