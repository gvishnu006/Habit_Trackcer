import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { HabitColorOption, HabitIconOption, Priority } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toDate(val: Timestamp | Date | undefined | null): Date | null {
  if (!val) return null;
  if (val instanceof Date) return val;
  if (val && typeof (val as Timestamp).toDate === 'function')
    return (val as Timestamp).toDate();
  return null;
}

export function formatDate(val: Timestamp | Date | undefined | null): string {
  const d = toDate(val);
  if (!d) return '';
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  return format(d, 'MMM dd, yyyy');
}

export const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bg: string; border: string }> = {
  high: {
    label: 'High',
    color: 'text-red-soft',
    bg: 'bg-red-soft/10',
    border: 'border-red-soft/30',
  },
  medium: {
    label: 'Medium',
    color: 'text-yellow-soft',
    bg: 'bg-yellow-soft/10',
    border: 'border-yellow-soft/30',
  },
  low: {
    label: 'Low',
    color: 'text-green',
    bg: 'bg-green/10',
    border: 'border-green/30',
  },
};

export const HABIT_COLORS: HabitColorOption[] = [
  { label: 'Indigo', value: '#818CF8', class: 'bg-[#818CF8]' },
  { label: 'Cyan', value: '#67E8F9', class: 'bg-[#67E8F9]' },
  { label: 'Green', value: '#4ADE80', class: 'bg-[#4ADE80]' },
  { label: 'Orange', value: '#FB923C', class: 'bg-[#FB923C]' },
  { label: 'Pink', value: '#F472B6', class: 'bg-[#F472B6]' },
  { label: 'Yellow', value: '#FCD34D', class: 'bg-[#FCD34D]' },
  { label: 'Red', value: '#F87171', class: 'bg-[#F87171]' },
  { label: 'Teal', value: '#2DD4BF', class: 'bg-[#2DD4BF]' },
];

export const HABIT_ICONS: HabitIconOption[] = [
  { emoji: '🏋️', label: 'Workout' },
  { emoji: '📚', label: 'Reading' },
  { emoji: '💻', label: 'Coding' },
  { emoji: '🧘', label: 'Meditation' },
  { emoji: '🏃', label: 'Running' },
  { emoji: '💧', label: 'Hydration' },
  { emoji: '🌙', label: 'Sleep' },
  { emoji: '🎨', label: 'Creative' },
  { emoji: '🥗', label: 'Nutrition' },
  { emoji: '📝', label: 'Journal' },
  { emoji: '🎵', label: 'Music' },
  { emoji: '🌿', label: 'Nature' },
  { emoji: '🧹', label: 'Cleaning' },
  { emoji: '☀️', label: 'Morning' },
  { emoji: '💊', label: 'Medicine' },
  { emoji: '🙏', label: 'Gratitude' },
];

export function getWeekDates(): string[] {
  const dates: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(format(d, 'yyyy-MM-dd'));
  }
  return dates;
}

export function getMonthDates(): string[] {
  const dates: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(format(d, 'yyyy-MM-dd'));
  }
  return dates;
}
