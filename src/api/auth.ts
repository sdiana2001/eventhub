import { $api } from './axios';

interface AuthResponse {
  token: string; 
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const loginApi = async (data: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await $api.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const registerApi = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await $api.post<AuthResponse>('/auth/register', data);
  return response.data;
};
