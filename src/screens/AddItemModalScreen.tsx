import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {habitColors, habitEmojis, theme} from '../constants/theme';
import {useAppData} from '../context/AppDataContext';
import {todayISO} from '../utils/date';

export const AddItemModalScreen = ({navigation}: NativeStackScreenProps<RootStackParamList, 'AddItemModal'>) => {
  const {addHabit, addTodo} = useAppData();
  const [tab, setTab] = useState<'habit' | 'todo'>('habit');
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState(habitEmojis[0]);
  const [color, setColor] = useState(habitColors[0]);

  const save = () => {
    if (!name.trim()) return;
    if (tab === 'habit') {
      addHabit({id: `${Date.now()}`, name, emoji, color, cat: 'productivity', time: 'anytime', freq: 'daily', streak: 0, bestStreak: 0, created: todayISO()});
    } else {
      addTodo({id: `${Date.now()}`, name, priority: 'med', cat: 'other', done: false, created: todayISO()});
    }
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <View style={styles.tabs}><Text onPress={() => setTab('habit')} style={[styles.tab, tab === 'habit' && styles.active]}>🔁 Habit</Text><Text onPress={() => setTab('todo')} style={[styles.tab, tab === 'todo' && styles.active]}>✅ Task</Text></View>
      <TextInput style={styles.input} placeholder="Name" placeholderTextColor={theme.muted} value={name} onChangeText={setName} />
      {tab === 'habit' && (
        <>
          <View style={styles.row}>{habitEmojis.slice(0, 7).map(e => <Text key={e} style={[styles.choice, emoji === e && styles.choiceActive]} onPress={() => setEmoji(e)}>{e}</Text>)}</View>
          <View style={styles.row}>{habitColors.map(c => <Pressable key={c} onPress={() => setColor(c)} style={[styles.color, {backgroundColor: c}, color === c && styles.colorActive]} />)}</View>
        </>
      )}
      <Pressable style={styles.btn} onPress={save}><Text style={styles.btnText}>Save</Text></Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: theme.surface, padding: 16},
  tabs: {flexDirection: 'row', gap: 8, marginBottom: 12},
  tab: {flex: 1, textAlign: 'center', color: theme.muted, padding: 10, borderRadius: 20, borderColor: theme.border, borderWidth: 1},
  active: {backgroundColor: theme.accent, color: '#fff', borderColor: theme.accent},
  input: {backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1, borderRadius: 12, padding: 12, color: theme.text, marginBottom: 12},
  row: {flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 12},
  choice: {backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1, padding: 8, borderRadius: 10},
  choiceActive: {borderColor: theme.accent},
  color: {width: 28, height: 28, borderRadius: 14},
  colorActive: {borderWidth: 2, borderColor: '#fff'},
  btn: {backgroundColor: theme.accent, padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 'auto'},
  btnText: {color: '#fff', fontWeight: '700'},
});
