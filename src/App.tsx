import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import DiaryDetailPage from './pages/DiaryDetailPage';
import CMSDashboard from './pages/CMSDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Project, DiaryEntry, Skill, Experience } from './types';

import { getProjects, getDiaries, getSkills, getExperiences } from '@/api/content';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const fetchData = async () => {
    try {
      const [fetchedProjects, fetchedDiaries, fetchedSkills, fetchedExperiences] = await Promise.all([
        getProjects(),
        getDiaries(),
        getSkills(),
        getExperiences()
      ]);
      setProjects(fetchedProjects);
      setDiaryEntries(fetchedDiaries);
      setSkills(fetchedSkills);
      setExperiences(fetchedExperiences);
    } catch (error) {
      console.error("Failed to fetch content:", error);
    }
  };

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchData();
  }, []);



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
              skills={skills}
              experiences={experiences}
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/cms" 
          element={
            <CMSDashboard 
              theme={theme}
              onThemeToggle={toggleTheme}
              isAuthenticated={isAuthenticated}
              onLogout={() => {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
              }}
              projects={projects}
              diaryEntries={diaryEntries}
              onUpdateProjects={() => fetchData()}
              onUpdateDiaries={() => fetchData()}
              skills={skills}
              experiences={experiences}
              onUpdateSkills={() => fetchData()}
              onUpdateExperiences={() => fetchData()}
            />
          } 
        />
        </Routes>
      </Router>
    </>
  );
}

export default App;
