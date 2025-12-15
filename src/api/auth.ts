import client from './client';
import { LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth';

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  // client.post now returns Promise<T> directly
  const response = await client.post<AuthResponse>('/auth/login', data);
  return response;
};

export const register = async (data: RegisterRequest): Promise<void> => {
  await client.post('/auth/register', data);
};
