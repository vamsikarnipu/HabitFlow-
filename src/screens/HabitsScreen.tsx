import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useAppData} from '../context/AppDataContext';
import {theme} from '../constants/theme';
import {HabitCard} from '../components/HabitCard';
import {todayISO} from '../utils/date';

const cats = ['all', 'health', 'mind', 'productivity', 'learn', 'finance', 'social'] as const;

export const HabitsScreen = () => {
  const {state, toggleHabit, deleteHabit} = useAppData();
  const [cat, setCat] = useState<(typeof cats)[number]>('all');
  const log = state.logs[todayISO()] || {};
  const list = cat === 'all' ? state.habits : state.habits.filter(h => h.cat === cat);

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
        {cats.map(c => (
          <Text key={c} style={[styles.tab, cat === c && styles.activeTab]} onPress={() => setCat(c)}>
            {c}
          </Text>
        ))}
      </ScrollView>
      {list.map(h => <HabitCard key={h.id} habit={h} done={!!log[h.id]} onPress={() => toggleHabit(h.id)} onDelete={() => deleteHabit(h.id)} />)}
      {!list.length && <Text style={styles.empty}>No habits in this category</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: theme.bg},
  content: {padding: 16},
  tabs: {marginBottom: 16},
  tab: {color: theme.muted, borderWidth: 1, borderColor: theme.border, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, marginRight: 8},
  activeTab: {backgroundColor: theme.accent, color: '#fff', borderColor: theme.accent},
  empty: {color: theme.muted, textAlign: 'center', marginTop: 30},
});
