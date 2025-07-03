import { Task, User } from '../types/Task';

const TASKS_KEY = 'tasks';
const USER_KEY = 'user';

export const saveTasksToStorage = (tasks: Task[]): void => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const loadTasksFromStorage = (): Task[] => {
  const tasksJson = localStorage.getItem(TASKS_KEY);
  return tasksJson ? JSON.parse(tasksJson) : [];
};

export const saveUserToStorage = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const loadUserFromStorage = (): User | null => {
  const userJson = localStorage.getItem(USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

export const clearUserFromStorage = (): void => {
  localStorage.removeItem(USER_KEY);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};