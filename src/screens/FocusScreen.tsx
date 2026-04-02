import React, {useCallback, useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {theme, focusQuotes} from '../constants/theme';
import {useFocusTimer} from '../hooks/useFocusTimer';
import {useAppData} from '../context/AppDataContext';

export const FocusScreen = () => {
  const {incrementPomodoro} = useAppData();
  const [focusMins, setFocusMins] = useState(25);
  const [breakMins, setBreakMins] = useState(5);
  const [quote, setQuote] = useState(focusQuotes[0]);

  const onFocusDone = useCallback(() => {
    incrementPomodoro();
    setQuote(focusQuotes[Math.floor(Math.random() * focusQuotes.length)]);
  }, [incrementPomodoro]);

  const {running, setRunning, seconds, isFocusPhase, progress, reset} = useFocusTimer(focusMins, breakMins, onFocusDone);
  const display = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const stroke = useMemo(() => 553 * (1 - progress), [progress]);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>🧘 Focus Mode</Text>
      <View style={styles.timerWrap}>
        <Svg width={200} height={200}>
          <Circle cx={100} cy={100} r={88} stroke={theme.border} strokeWidth={8} fill="none" />
          <Circle cx={100} cy={100} r={88} stroke={isFocusPhase ? theme.accent : theme.accent2} strokeWidth={8} fill="none" strokeDasharray="553" strokeDashoffset={stroke} />
        </Svg>
        <View style={styles.overlay}><Text style={styles.time}>{display}</Text><Text style={styles.phase}>{isFocusPhase ? '🎯 Focus' : '☕ Break'}</Text></View>
      </View>
      <View style={styles.row}><Pressable style={styles.secondary} onPress={reset}><Text style={styles.btnText}>Reset</Text></Pressable><Pressable style={styles.primary} onPress={() => setRunning(!running)}><Text style={styles.btnText}>{running ? 'Pause' : 'Start'}</Text></Pressable></View>
      <TextInput style={styles.input} keyboardType="numeric" value={String(focusMins)} onChangeText={t => setFocusMins(Number(t) || 25)} placeholder="Focus mins" placeholderTextColor={theme.muted} />
      <TextInput style={styles.input} keyboardType="numeric" value={String(breakMins)} onChangeText={t => setBreakMins(Number(t) || 5)} placeholder="Break mins" placeholderTextColor={theme.muted} />
      <Text style={styles.quote}>{quote}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: theme.bg, padding: 16},
  title: {color: theme.text, fontWeight: '700', textAlign: 'center', marginBottom: 12},
  timerWrap: {alignItems: 'center', justifyContent: 'center'},
  overlay: {position: 'absolute', alignItems: 'center'},
  time: {color: theme.text, fontSize: 40, fontWeight: '800'},
  phase: {color: theme.muted},
  row: {flexDirection: 'row', gap: 10, justifyContent: 'center', marginVertical: 16},
  primary: {backgroundColor: theme.accent, borderRadius: 24, paddingHorizontal: 24, paddingVertical: 10},
  secondary: {backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border, borderRadius: 24, paddingHorizontal: 24, paddingVertical: 10},
  btnText: {color: theme.text},
  input: {backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1, borderRadius: 12, color: theme.text, padding: 12, marginBottom: 10, textAlign: 'center'},
  quote: {color: theme.muted, fontStyle: 'italic', marginTop: 8},
});
