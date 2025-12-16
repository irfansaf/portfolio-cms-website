import { client } from './client';

export interface SystemStatus {
  initialized: boolean;
  site_name: string;
}

export interface SetupRequest {
  site_name: string;
  username: string;
  email: string;
  password: string;
}

export const getSystemStatus = async (): Promise<SystemStatus> => {
  const response = await client.get<SystemStatus>('/system/status');
  return response;
};

export const setupSystem = async (data: SetupRequest): Promise<void> => {
  await client.post('/system/setup', data);
};
