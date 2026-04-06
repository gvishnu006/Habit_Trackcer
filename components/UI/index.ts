import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export type Priority = 'low' | 'medium' | 'high';
export type HabitFrequency = 'daily' | 'weekly';

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  frequency: HabitFrequency;
  currentStreak: number;
  longestStreak: number;
  completedDates: string[]; // 'YYYY-MM-DD' format
  createdAt: Timestamp | Date;
  updatedAt?: Timestamp | Date;
}

export interface HabitFormData {
  name: string;
  description?: string;
  icon: string;
  color: string;
  frequency: HabitFrequency;
}

export interface Todo {
  id: string;
  userId: string;
  title: string;
  description?: string;
  priority: Priority;
  completed: boolean;
  dueDate?: Timestamp | Date | null;
  createdAt: Timestamp | Date;
  completedAt?: Timestamp | Date | null;
  tags?: string[];
}

export interface TodoFormData {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: Date | null;
  tags?: string[];
}

export interface DashboardStats {
  totalHabits: number;
  habitsCompletedToday: number;
  longestStreak: number;
  totalTodos: number;
  completedTodosToday: number;
  weeklyCompletionRate: number;
}

export interface WeeklyData {
  day: string;
  habits: number;
  todos: number;
}

export interface HabitColorOption {
  label: string;
  value: string;
  class: string;
}

export interface HabitIconOption {
  emoji: string;
  label: string;
}
