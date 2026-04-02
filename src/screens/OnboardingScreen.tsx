import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {theme} from '../constants/theme';
import {Goal} from '../types/models';
import {useAppData} from '../context/AppDataContext';

const goals: {key: Goal; icon: string; label: string}[] = [
  {key: 'health', icon: '💪', label: 'Health & Fitness'},
  {key: 'mind', icon: '🧠', label: 'Mental Clarity'},
  {key: 'productivity', icon: '🚀', label: 'Productivity'},
  {key: 'learn', icon: '📚', label: 'Learning'},
  {key: 'finance', icon: '💰', label: 'Finance'},
  {key: 'social', icon: '🤝', label: 'Relationships'},
];

export const OnboardingScreen = () => {
  const {completeOnboarding} = useAppData();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [selected, setSelected] = useState<Goal[]>([]);

  const submit = () => completeOnboarding(name.trim() || 'Friend', selected);

  return (
    <View style={styles.root}>
      {step === 0 && (
        <View>
          <Text style={styles.title}>Welcome to HabitFlow</Text>
          <TextInput style={styles.input} placeholder="Your name" placeholderTextColor={theme.muted} value={name} onChangeText={setName} />
          <Pressable style={styles.btn} onPress={() => name.trim() && setStep(1)}><Text style={styles.btnText}>Let's go →</Text></Pressable>
        </View>
      )}
      {step === 1 && (
        <View>
          <Text style={styles.title}>What do you want to improve?</Text>
          <View style={styles.grid}>
            {goals.map(g => {
              const active = selected.includes(g.key);
              return (
                <Pressable key={g.key} style={[styles.goal, active && styles.goalActive]} onPress={() => setSelected(prev => (prev.includes(g.key) ? prev.filter(x => x !== g.key) : [...prev, g.key]))}>
                  <Text>{g.icon}</Text>
                  <Text style={styles.goalText}>{g.label}</Text>
                </Pressable>
              );
            })}
          </View>
          <Pressable style={styles.btn} onPress={() => setStep(2)}><Text style={styles.btnText}>Continue →</Text></Pressable>
        </View>
      )}
      {step === 2 && (
        <View>
          <Text style={styles.title}>You're all set!</Text>
          <Pressable style={styles.btn} onPress={submit}><Text style={styles.btnText}>Start Building Habits 🚀</Text></Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: theme.bg, justifyContent: 'center', padding: 24},
  title: {color: theme.text, fontSize: 28, fontWeight: '800', marginBottom: 16, textAlign: 'center'},
  input: {backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border, borderRadius: 12, color: theme.text, padding: 14, marginBottom: 16},
  btn: {backgroundColor: theme.accent, borderRadius: 14, padding: 14, alignItems: 'center'},
  btnText: {color: '#fff', fontWeight: '700'},
  grid: {flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16},
  goal: {width: '48%', backgroundColor: theme.card, borderColor: theme.border, borderWidth: 2, borderRadius: 12, padding: 12, alignItems: 'center'},
  goalActive: {borderColor: theme.accent},
  goalText: {color: theme.text, marginTop: 8, fontSize: 12},
});
