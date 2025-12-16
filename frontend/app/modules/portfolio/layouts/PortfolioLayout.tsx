import { Outlet } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { Toaster } from '@/modules/shared/ui/toaster';
import type { Project, DiaryEntry, Skill, Experience, SocialLink } from '@/modules/shared/types';
import { getProjects, getDiaries, getSkills, getExperiences, getSocialLinks } from '@/modules/portfolio/api';

function PortfolioLayout() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
       return !!localStorage.getItem('token');
    }
    return false;
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  const fetchData = async () => {
    try {
      const [fetchedProjects, fetchedDiaries, fetchedSkills, fetchedExperiences, fetchedSocialLinks] = await Promise.all([
        getProjects(),
        getDiaries(),
        getSkills(),
        getExperiences(),
        getSocialLinks()
      ]);
      setProjects(fetchedProjects);
      setDiaryEntries(fetchedDiaries);
      setSkills(fetchedSkills);
      setExperiences(fetchedExperiences);
      setSocialLinks(fetchedSocialLinks);
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

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <>
      <Toaster />
      <Outlet context={{
        theme,
        toggleTheme,
        projects,
        diaryEntries,
        skills,
        experiences,
        socialLinks,
        isAuthenticated,
        logout,
        fetchData, // exposed for CMS updates
        onUpdateProjects: fetchData,
        onUpdateDiaries: fetchData,
        onUpdateSkills: fetchData,
        onUpdateExperiences: fetchData,
        onUpdateSocialLinks: fetchData,
        onLogout: logout,
        onThemeToggle: toggleTheme,
      }} />
    </>
  );
}

export default PortfolioLayout;
