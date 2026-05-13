import axios from 'axios';

const apiHost = import.meta.env.VITE_API_URL || '';
const baseURL = apiHost ? `${apiHost.replace(/\/$/, '')}/api` : '/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nc_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('nc_token');
      localStorage.removeItem('nc_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const chatService = {
  getChats: (search) => api.get('/chat', { params: search ? { search } : {} }),
  getChatById: (chatId) => api.get(`/chat/${chatId}`),
  createChat: (message) => api.post('/chat', { message }),
  sendMessage: (chatId, message) => api.post(`/chat/${chatId}/message`, { message }),
  regenerate: (chatId) => api.post(`/chat/${chatId}/regenerate`),
  deleteChat: (chatId) => api.delete(`/chat/${chatId}`),
  clearAll: () => api.delete('/chat/clear'),
};

export default api;
