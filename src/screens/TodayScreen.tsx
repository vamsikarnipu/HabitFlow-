import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {useAppData} from '../context/AppDataContext';
import {todayISO} from '../utils/date';
import {theme} from '../constants/theme';
import {HabitCard} from '../components/HabitCard';
import {TodoCard} from '../components/TodoCard';

export const TodayScreen = ({navigation}: NativeStackScreenProps<RootStackParamList, 'Today'>) => {
  const {state, toggleHabit, toggleTodo, deleteTodo} = useAppData();
  const log = state.logs[todayISO()] || {};
  const done = state.habits.filter(h => log[h.id]).length;
  const pct = state.habits.length ? Math.round((done / state.habits.length) * 100) : 0;
  const pendingTodos = state.todos.filter(t => !t.done).slice(0, 4);

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.progress}>{pct}% today</Text>
      <Text style={styles.section}>Today's Habits</Text>
      {state.habits.slice(0, 5).map(h => <HabitCard key={h.id} habit={h} done={!!log[h.id]} onPress={() => toggleHabit(h.id)} />)}
      <Text style={styles.link} onPress={() => navigation.navigate('Habits')}>See all</Text>
      <Text style={styles.section}>Tasks</Text>
      {pendingTodos.map(t => <TodoCard key={t.id} todo={t} onToggle={() => toggleTodo(t.id)} onDelete={() => deleteTodo(t.id)} />)}
      <Text style={styles.link} onPress={() => navigation.navigate('Todos')}>View all</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: theme.bg},
  content: {padding: 16, paddingBottom: 24},
  progress: {color: theme.accent, fontSize: 36, fontWeight: '800', textAlign: 'center', marginBottom: 16},
  section: {color: theme.text, fontSize: 18, fontWeight: '700', marginBottom: 10, marginTop: 8},
  link: {color: theme.accent, marginBottom: 10},
});
