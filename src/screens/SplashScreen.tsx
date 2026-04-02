import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '../constants/theme';

export const SplashScreen = ({onDone}: {onDone: () => void}) => {
  useEffect(() => {
    const id = setTimeout(onDone, 1800);
    return () => clearTimeout(id);
  }, [onDone]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Habit<Text style={styles.accent}>Flow</Text></Text>
      <Text style={styles.tagline}>1% better, every single day</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: theme.bg, alignItems: 'center', justifyContent: 'center'},
  logo: {fontSize: 42, color: theme.text, fontWeight: '800'},
  accent: {color: theme.accent},
  tagline: {color: theme.muted, marginTop: 12},
});
