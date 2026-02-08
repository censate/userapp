import axios from 'axios';

// ВРЕМЕННО - замените позже на ваш реальный URL
const API_URL = 'https://6988977e780e8375a688adc1.mockapi.io/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен в заголовки если есть
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});