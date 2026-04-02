import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Pressable, Text} from 'react-native';
import {useAppData} from '../context/AppDataContext';
import {SplashScreen} from '../screens/SplashScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {TodayScreen} from '../screens/TodayScreen';
import {HabitsScreen} from '../screens/HabitsScreen';
import {AnalyticsScreen} from '../screens/AnalyticsScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {TodosScreen} from '../screens/TodosScreen';
import {FocusScreen} from '../screens/FocusScreen';
import {AddItemModalScreen} from '../screens/AddItemModalScreen';
import {theme} from '../constants/theme';
import {greetingFromHour, todayISO} from '../utils/date';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = ({navigation}: {navigation: any}) => {
  const {state} = useAppData();
  const done = Object.values(state.logs[todayISO()] || {}).filter(Boolean).length;
  const title = `Good ${greetingFromHour(new Date().getHours())}, ${state.user?.name ?? 'there'} 👋`;
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.bg},
        headerTintColor: theme.text,
        tabBarStyle: {backgroundColor: theme.surface, borderTopColor: theme.border},
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.muted,
      }}>
      <Tab.Screen name="Today" component={TodayScreen} options={{title, tabBarBadge: done || undefined, headerRight: () => <Pressable onPress={() => navigation.navigate('AddItemModal')}><Text style={{color: theme.accent, fontSize: 24}}>＋</Text></Pressable>}} />
      <Tab.Screen name="Habits" component={HabitsScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} options={{title: 'Stats'}} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const BootScreen = ({navigation}: {navigation: any}) => {
  const {state} = useAppData();
  const [done, setDone] = useState(false);

  if (done) {
    navigation.replace(state.onboardingDone ? 'Main' : 'Onboarding');
  }

  return <SplashScreen onDone={() => setDone(true)} />;
};

export const AppNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Boot" component={BootScreen} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Main" component={MainTabs} />
    <Stack.Screen name="Todos" component={TodosScreen} options={{headerShown: true}} />
    <Stack.Screen name="Focus" component={FocusScreen} options={{headerShown: true}} />
    <Stack.Screen name="AddItemModal" component={AddItemModalScreen} options={{presentation: 'modal', headerShown: true, title: 'Add'}} />
  </Stack.Navigator>
);
