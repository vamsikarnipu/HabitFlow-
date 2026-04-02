import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {useAppData} from '../context/AppDataContext';
import {theme} from '../constants/theme';
import {TodoCard} from '../components/TodoCard';

type Filter = 'all' | 'pending' | 'done' | 'high';

export const TodosScreen = () => {
  const {state, toggleTodo, deleteTodo} = useAppData();
  const [filter, setFilter] = useState<Filter>('all');

  const items = useMemo(() => {
    if (filter === 'pending') return state.todos.filter(t => !t.done);
    if (filter === 'done') return state.todos.filter(t => t.done);
    if (filter === 'high') return state.todos.filter(t => t.priority === 'high');
    return state.todos;
  }, [filter, state.todos]);

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.filters}>All · Pending · Done · High</Text>
      {['all', 'pending', 'done', 'high'].map(f => <Text key={f} style={[styles.filter, filter === f && styles.filterActive]} onPress={() => setFilter(f as Filter)}>{f}</Text>)}
      {items.map(t => <TodoCard key={t.id} todo={t} onToggle={() => toggleTodo(t.id)} onDelete={() => deleteTodo(t.id)} />)}
      {!items.length && <Text style={styles.empty}>Nothing here!</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: theme.bg},
  content: {padding: 16},
  filters: {color: theme.muted, marginBottom: 8},
  filter: {color: theme.muted, marginBottom: 6},
  filterActive: {color: theme.accent},
  empty: {color: theme.muted, textAlign: 'center', marginTop: 30},
});
