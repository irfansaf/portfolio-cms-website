import { client } from '@/modules/shared/api/client';
import type { Project, DiaryEntry, Skill, Experience, SocialLink } from '@/modules/shared/types';

// Projects
export const getProjects = async (): Promise<Project[]> => {
  return client.get<Project[]>('/projects');
};

export const getProject = async (slug: string): Promise<Project> => {
  return client.get<Project>(`/projects/${slug}`);
};

export const createProject = async (data: Partial<Project>): Promise<Project> => {
  return client.post<Project>('/projects/', data);
};

export const updateProject = async (id: string | number, data: Partial<Project>): Promise<Project> => {
  return client.put<Project>(`/projects/${id}`, data);
};

export const deleteProject = async (id: string | number): Promise<void> => {
  return client.delete(`/projects/${id}`);
};

// Diaries
export const getDiaries = async (): Promise<DiaryEntry[]> => {
  return client.get<DiaryEntry[]>('/diaries');
};

export const getDiary = async (slug: string): Promise<DiaryEntry> => {
  return client.get<DiaryEntry>(`/diaries/${slug}`);
};

export const createDiary = async (data: Partial<DiaryEntry>): Promise<DiaryEntry> => {
  return client.post<DiaryEntry>('/diaries/', data);
};

export const updateDiary = async (id: string | number, data: Partial<DiaryEntry>): Promise<DiaryEntry> => {
  return client.put<DiaryEntry>(`/diaries/${id}`, data);
};

export const deleteDiary = async (id: string | number): Promise<void> => {
  return client.delete(`/diaries/${id}`);
};

// Skills
export const getSkills = async (): Promise<Skill[]> => {
  return client.get<Skill[]>('/skills');
};

export const createSkill = async (data: Partial<Skill>): Promise<Skill> => {
  return client.post<Skill>('/skills/', data);
};

export const updateSkill = async (id: string | number, data: Partial<Skill>): Promise<Skill> => {
  return client.put<Skill>(`/skills/${id}`, data);
};

export const deleteSkill = async (id: string | number): Promise<void> => {
  return client.delete(`/skills/${id}`);
};

// Experiences
export const getExperiences = async (): Promise<Experience[]> => {
  return client.get<Experience[]>('/experiences');
};

export const createExperience = async (data: Partial<Experience>): Promise<Experience> => {
  return client.post<Experience>('/experiences/', data);
};

export const updateExperience = async (id: string | number, data: Partial<Experience>): Promise<Experience> => {
  return client.put<Experience>(`/experiences/${id}`, data);
};

export const deleteExperience = async (id: string | number): Promise<void> => {
  return client.delete(`/experiences/${id}`);
};

// Social Links
export const getSocialLinks = async (): Promise<SocialLink[]> => {
  return client.get<SocialLink[]>('/social-links');
};
