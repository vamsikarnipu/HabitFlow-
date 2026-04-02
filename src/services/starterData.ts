import {Goal, Habit} from '../types/models';
import {todayISO} from '../utils/date';

const makeHabit = (name: string, emoji: string, color: string, cat: Goal, time: Habit['time']): Habit => ({
  id: `${Date.now()}-${Math.random()}`,
  name,
  emoji,
  color,
  cat,
  time,
  freq: 'daily',
  streak: 0,
  bestStreak: 0,
  created: todayISO(),
});

export const starterHabitsByGoal: Record<Goal, Habit[]> = {
  health: [makeHabit('Morning Exercise', '💪', '#4ecca3', 'health', 'morning')],
  mind: [makeHabit('10-min Meditation', '🧘', '#7c6dfa', 'mind', 'morning')],
  productivity: [makeHabit('Plan My Day', '📋', '#7c6dfa', 'productivity', 'morning')],
  learn: [makeHabit('Read for 20 Minutes', '📚', '#f7b731', 'learn', 'evening')],
  finance: [makeHabit('Track Expenses', '💰', '#4ecca3', 'finance', 'evening')],
  social: [makeHabit('Connect with Someone', '💬', '#ff6b6b', 'social', 'evening')],
};
