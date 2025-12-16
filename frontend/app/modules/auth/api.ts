import { client } from '@/modules/shared/api/client';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/modules/shared/types/auth';

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  return client.post<AuthResponse>('/auth/login', data);
};

export const register = async (data: RegisterRequest): Promise<void> => {
  await client.post('/auth/register', data);
};
