import client from './client';
import { Project, DiaryEntry } from '@/types';

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
