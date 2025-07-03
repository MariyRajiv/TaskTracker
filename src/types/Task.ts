export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  category?: string;
}

export interface User {
  username: string;
  loginTime: string;
}

export type TaskFilter = 'all' | 'completed' | 'pending';
export type TaskSort = 'created' | 'title' | 'dueDate' | 'priority';