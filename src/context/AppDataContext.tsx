import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {appStorage} from '../storage/appStorage';
import {AppState, Goal, Habit, Todo, User} from '../types/models';
import {todayISO} from '../utils/date';
import {starterHabitsByGoal} from '../services/starterData';

const defaultState: AppState = {
  user: null,
  habits: [],
  todos: [],
  logs: {},
  pomos: 0,
  goals: [],
  onboardingDone: false,
};

interface Ctx {
  state: AppState;
  loading: boolean;
  completeOnboarding: (name: string, goals: Goal[]) => void;
  toggleHabit: (id: string) => void;
  addHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  incrementPomodoro: () => void;
  resetApp: () => Promise<void>;
}

const AppDataContext = createContext<Ctx | undefined>(undefined);

export const AppDataProvider = ({children}: {children: React.ReactNode}) => {
  const [state, setState] = useState<AppState>(defaultState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appStorage.loadState().then(data => {
      if (data) setState(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading) appStorage.saveState(state);
  }, [state, loading]);

  const completeOnboarding = useCallback((name: string, goals: Goal[]) => {
    const user: User = {name: name || 'Friend', since: todayISO()};
    const seeded = goals.flatMap(goal => starterHabitsByGoal[goal] || []);
    setState(prev => ({
      ...prev,
      user,
      goals,
      onboardingDone: true,
      habits: seeded.length ? seeded : prev.habits,
    }));
  }, []);

  const toggleHabit = useCallback((id: string) => {
    const key = todayISO();
    setState(prev => {
      const dayLog = prev.logs[key] || {};
      const next = !dayLog[id];
      const habits = prev.habits.map(h => {
        if (h.id !== id) return h;
        const streak = next ? h.streak + 1 : Math.max(0, h.streak - 1);
        return {...h, streak, bestStreak: Math.max(h.bestStreak, streak)};
      });
      return {...prev, habits, logs: {...prev.logs, [key]: {...dayLog, [id]: next}}};
    });
  }, []);

  const addHabit = useCallback((habit: Habit) => setState(prev => ({...prev, habits: [...prev.habits, habit]})), []);
  const deleteHabit = useCallback((id: string) => setState(prev => ({...prev, habits: prev.habits.filter(h => h.id !== id)})), []);
  const addTodo = useCallback((todo: Todo) => setState(prev => ({...prev, todos: [todo, ...prev.todos]})), []);
  const toggleTodo = useCallback((id: string) => setState(prev => ({...prev, todos: prev.todos.map(t => (t.id === id ? {...t, done: !t.done} : t))})), []);
  const deleteTodo = useCallback((id: string) => setState(prev => ({...prev, todos: prev.todos.filter(t => t.id !== id)})), []);
  const incrementPomodoro = useCallback(() => setState(prev => ({...prev, pomos: prev.pomos + 1})), []);
  const resetApp = useCallback(async () => {
    await appStorage.clearAll();
    setState(defaultState);
  }, []);

  const value = useMemo(
    () => ({state, loading, completeOnboarding, toggleHabit, addHabit, deleteHabit, addTodo, toggleTodo, deleteTodo, incrementPomodoro, resetApp}),
    [state, loading, completeOnboarding, toggleHabit, addHabit, deleteHabit, addTodo, toggleTodo, deleteTodo, incrementPomodoro, resetApp],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) throw new Error('useAppData must be used inside AppDataProvider');
  return context;
};
