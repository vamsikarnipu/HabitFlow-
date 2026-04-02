import React, {useMemo} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {useAppData} from '../context/AppDataContext';
import {theme} from '../constants/theme';

const w = Dimensions.get('window').width - 32;

export const AnalyticsScreen = () => {
  const {state} = useAppData();
  const best = Math.max(0, ...state.habits.map(h => h.bestStreak || h.streak));

  const weekly = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const day = d.toISOString().split('T')[0];
      labels.push(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()]);
      const completed = Object.values(state.logs[day] || {}).filter(Boolean).length;
      data.push(state.habits.length ? Math.round((completed / state.habits.length) * 100) : 0);
    }
    return {labels, data};
  }, [state.logs, state.habits.length]);

  const habitTop = state.habits.slice(0, 5);

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.row}><Text style={styles.stat}>🔥 Best streak: {best}</Text><Text style={styles.stat}>Active habits: {state.habits.length}</Text></View>
      <Text style={styles.section}>Weekly Completion Rate</Text>
      <BarChart
        width={w}
        height={220}
        data={{labels: weekly.labels, datasets: [{data: weekly.data}]}}
        yAxisSuffix="%"
        fromZero
        chartConfig={{backgroundGradientFrom: theme.card, backgroundGradientTo: theme.card, decimalPlaces: 0, color: () => theme.accent, labelColor: () => theme.muted}}
        style={styles.chart}
      />
      <Text style={styles.section}>Habit Performance</Text>
      <BarChart
        width={w}
        height={220}
        data={{labels: habitTop.map(h => h.emoji), datasets: [{data: habitTop.map(h => h.streak)}]}}
        fromZero
        chartConfig={{backgroundGradientFrom: theme.card, backgroundGradientTo: theme.card, decimalPlaces: 0, color: () => theme.accent2, labelColor: () => theme.muted}}
        style={styles.chart}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: theme.bg},
  content: {padding: 16},
  row: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14},
  stat: {color: theme.text},
  section: {color: theme.text, fontWeight: '700', marginBottom: 8, marginTop: 8},
  chart: {borderRadius: 14, marginBottom: 16},
});
