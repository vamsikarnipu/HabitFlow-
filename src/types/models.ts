export type Goal = 'health' | 'mind' | 'productivity' | 'learn' | 'finance' | 'social';

export interface User {
  name: string;
  since: string;
}

export interface Habit {
  id: string;
  name: string;
  emoji: string;
  color: string;
  cat: Goal;
  time: 'morning' | 'afternoon' | 'evening' | 'anytime';
  freq: 'daily' | 'weekdays' | 'weekends' | '3x' | 'custom';
  streak: number;
  bestStreak: number;
  created: string;
}

export interface Todo {
  id: string;
  name: string;
  due?: string;
  priority: 'high' | 'med' | 'low';
  cat: 'work' | 'personal' | 'health' | 'finance' | 'other';
  done: boolean;
  created: string;
}

export type HabitLog = Record<string, boolean>;
export type Logs = Record<string, HabitLog>;

export interface AppState {
  user: User | null;
  habits: Habit[];
  todos: Todo[];
  logs: Logs;
  pomos: number;
  goals: Goal[];
  onboardingDone: boolean;
}
