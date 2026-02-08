import { api } from './client';

export interface User {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

// Получить всех пользователей
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

// Создать пользователя
export const createUser = async (data: { name: string; avatar: string }): Promise<User> => {
  const response = await api.post('/users', data);
  return response.data;
};

// Обновить пользователя
export const updateUser = async (id: string, data: { name: string; avatar: string }): Promise<User> => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

// Удалить пользователя
export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};