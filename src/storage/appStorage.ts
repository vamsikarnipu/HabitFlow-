import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKeys} from './keys';
import {AppState} from '../types/models';

export const appStorage = {
  async saveState(state: AppState) {
    await AsyncStorage.setItem(StorageKeys.appState, JSON.stringify(state));
  },
  async loadState(): Promise<AppState | null> {
    const value = await AsyncStorage.getItem(StorageKeys.appState);
    return value ? (JSON.parse(value) as AppState) : null;
  },
  async clearAll() {
    await AsyncStorage.clear();
  },
};
