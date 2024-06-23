import axios, { AxiosInstance } from 'axios';

const API_URL = 'http://localhost:8000';  // Replace with your actual API URL

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface LoginResponse {
  access_token: string;
}

interface SignupResponse {
  message: string;
}

interface BotData {
  id: string;
  alias: string;
  status: string;
  system_prompt: string;
}

interface CreateBotData {
  token: string;
  system_prompt: string;
  alias: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/login', { username, password });
  return response.data;
};

export const signup = async (username: string, password: string, inviteCode: string): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>('/signup', { username, password, invite_code: inviteCode });
  return response.data;
};

export const getBotInfo = async (): Promise<BotData> => {
  const response = await api.get<BotData>('/bot');
  return response.data;
};

export const createBot = async (botData: CreateBotData): Promise<BotData> => {
  const response = await api.post<BotData>('/bot', botData);
  return response.data;
};

// Add this interceptor to include the JWT token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;