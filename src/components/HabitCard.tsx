import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Habit} from '../types/models';
import {theme} from '../constants/theme';

export const HabitCard = ({habit, done, onPress, onDelete}: {habit: Habit; done: boolean; onPress: () => void; onDelete?: () => void}) => (
  <Pressable style={[styles.card, done && styles.done]} onPress={onPress}>
    <View style={[styles.icon, {backgroundColor: `${habit.color}33`}]}>
      <Text>{habit.emoji}</Text>
    </View>
    <View style={styles.main}>
      <Text style={styles.name}>{habit.name}</Text>
      <Text style={styles.meta}>🔥 {habit.streak} day streak · {habit.time}</Text>
    </View>
    {onDelete ? (
      <Pressable onPress={onDelete}>
        <Text style={styles.delete}>🗑</Text>
      </Pressable>
    ) : null}
  </Pressable>
);

const styles = StyleSheet.create({
  card: {backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border, borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10},
  done: {borderColor: theme.accent2},
  icon: {height: 42, width: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center'},
  main: {flex: 1},
  name: {color: theme.text, fontWeight: '600'},
  meta: {color: theme.muted, fontSize: 12, marginTop: 2},
  delete: {color: theme.muted, fontSize: 16, padding: 4},
});
