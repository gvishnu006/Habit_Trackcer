import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Habit, HabitFormData, Todo, TodoFormData } from '@/types';
import { format } from 'date-fns';

// ─── HABITS ─────────────────────────────────────────────────────────────

export const habitsCol = (uid: string) =>
  collection(db, 'users', uid, 'habits');

export async function getHabits(uid: string): Promise<Habit[]> {
  const q = query(habitsCol(uid), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Habit));
}

export async function createHabit(uid: string, data: HabitFormData): Promise<string> {
  const ref = await addDoc(habitsCol(uid), {
    ...data,
    userId: uid,
    currentStreak: 0,
    longestStreak: 0,
    completedDates: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateHabit(uid: string, id: string, data: Partial<Habit>): Promise<void> {
  const ref = doc(db, 'users', uid, 'habits', id);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}

export async function deleteHabit(uid: string, id: string): Promise<void> {
  await deleteDoc(doc(db, 'users', uid, 'habits', id));
}

export async function toggleHabitCompletion(uid: string, habit: Habit): Promise<void> {
  const today = format(new Date(), 'yyyy-MM-dd');
  const isCompleted = habit.completedDates.includes(today);

  let newDates: string[];
  let newStreak: number;
  let newLongest: number;

  if (isCompleted) {
    newDates = habit.completedDates.filter((d) => d !== today);
    newStreak = calculateStreak(newDates);
    newLongest = Math.max(habit.longestStreak, newStreak);
  } else {
    newDates = [...habit.completedDates, today];
    newStreak = calculateStreak(newDates);
    newLongest = Math.max(habit.longestStreak, newStreak);
  }

  await updateHabit(uid, habit.id, {
    completedDates: newDates,
    currentStreak: newStreak,
    longestStreak: newLongest,
  });
}

function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const sorted = [...dates].sort((a, b) => b.localeCompare(a));
  const today = format(new Date(), 'yyyy-MM-dd');
  const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');

  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;

  let streak = 0;
  let current = sorted[0] === today ? new Date() : new Date(Date.now() - 86400000);

  for (const date of sorted) {
    const expected = format(current, 'yyyy-MM-dd');
    if (date === expected) {
      streak++;
      current = new Date(current.getTime() - 86400000);
    } else {
      break;
    }
  }

  return streak;
}

// ─── TODOS ───────────────────────────────────────────────────────────────

export const todosCol = (uid: string) =>
  collection(db, 'users', uid, 'todos');

export async function getTodos(uid: string): Promise<Todo[]> {
  const q = query(todosCol(uid), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Todo));
}

export async function createTodo(uid: string, data: TodoFormData): Promise<string> {
  const ref = await addDoc(todosCol(uid), {
    ...data,
    userId: uid,
    completed: false,
    dueDate: data.dueDate ? Timestamp.fromDate(data.dueDate) : null,
    createdAt: serverTimestamp(),
    completedAt: null,
  });
  return ref.id;
}

export async function updateTodo(uid: string, id: string, data: Partial<Todo>): Promise<void> {
  const ref = doc(db, 'users', uid, 'todos', id);
  await updateDoc(ref, data);
}

export async function deleteTodo(uid: string, id: string): Promise<void> {
  await deleteDoc(doc(db, 'users', uid, 'todos', id));
}

export async function toggleTodoCompletion(uid: string, todo: Todo): Promise<void> {
  const ref = doc(db, 'users', uid, 'todos', todo.id);
  await updateDoc(ref, {
    completed: !todo.completed,
    completedAt: !todo.completed ? serverTimestamp() : null,
  });
}
