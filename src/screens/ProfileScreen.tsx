import React from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {useAppData} from '../context/AppDataContext';
import {theme} from '../constants/theme';

export const ProfileScreen = () => {
  const {state, resetApp} = useAppData();
  const initials = (state.user?.name || 'HF').split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase();

  return (
    <View style={styles.root}>
      <View style={styles.avatar}><Text style={styles.avatarText}>{initials}</Text></View>
      <Text style={styles.name}>{state.user?.name}</Text>
      <Text style={styles.sub}>Focus Sessions: {state.pomos}</Text>
      <Text style={styles.sub}>Habits Created: {state.habits.length}</Text>
      <Text style={styles.sub}>Tasks Created: {state.todos.length}</Text>
      <Pressable
        style={styles.reset}
        onPress={() => Alert.alert('Reset all data?', 'This will delete all progress.', [{text: 'Cancel'}, {text: 'Reset', style: 'destructive', onPress: () => resetApp()}])}>
        <Text style={styles.resetText}>Reset All Data</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: theme.bg, padding: 16},
  avatar: {width: 72, height: 72, borderRadius: 36, backgroundColor: theme.accent, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'},
  avatarText: {color: '#fff', fontWeight: '800', fontSize: 24},
  name: {color: theme.text, textAlign: 'center', fontSize: 22, fontWeight: '700', marginTop: 10, marginBottom: 16},
  sub: {color: theme.muted, marginBottom: 8},
  reset: {marginTop: 20, borderWidth: 1, borderColor: theme.border, backgroundColor: theme.card, borderRadius: 14, padding: 14, alignItems: 'center'},
  resetText: {color: theme.muted},
});
