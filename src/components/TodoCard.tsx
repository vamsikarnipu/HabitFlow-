import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Todo} from '../types/models';
import {theme} from '../constants/theme';

export const TodoCard = ({todo, onToggle, onDelete}: {todo: Todo; onToggle: () => void; onDelete: () => void}) => (
  <View style={[styles.card, todo.done && styles.done]}>
    <Pressable style={styles.check} onPress={onToggle}>
      <Text>{todo.done ? '✓' : ''}</Text>
    </Pressable>
    <View style={styles.main}>
      <Text style={[styles.name, todo.done && styles.strike]}>{todo.name}</Text>
      <Text style={styles.meta}>{todo.priority.toUpperCase()} {todo.due ? `· ${todo.due}` : ''} · {todo.cat}</Text>
    </View>
    <Pressable onPress={onDelete}>
      <Text style={styles.delete}>🗑</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  card: {backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1, borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10},
  done: {opacity: 0.7},
  check: {width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: theme.border, alignItems: 'center', justifyContent: 'center'},
  main: {flex: 1},
  name: {color: theme.text, fontWeight: '500'},
  strike: {textDecorationLine: 'line-through', color: theme.muted},
  meta: {color: theme.muted, fontSize: 12, marginTop: 4},
  delete: {color: theme.muted, padding: 4},
});
