# HabitFlow React Native Refactor

## 1) React Native CLI Setup

```bash
npx react-native@latest init HabitFlow --template react-native-template-typescript
cd HabitFlow
npm install
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler
npm install @react-native-async-storage/async-storage
npm install react-native-chart-kit react-native-svg
cd ios && pod install && cd ..
npm run start
npm run android # or npm run ios
```

## 2) Architecture

```
/src
  /components
  /constants
  /context
  /hooks
  /navigation
  /screens
  /services
  /storage
  /types
  /utils
```

## 3) HTML-to-RN Mapping Highlights

- Splash (`#splash`) → `SplashScreen`.
- Onboarding (`#onboard`) → `OnboardingScreen` with 3 controlled steps.
- Screen panes (`.screen`) → dedicated RN screens (`Today`, `Habits`, `Analytics`, `Todos`, `Focus`, `Profile`).
- Add modal (`#modal-overlay`) → `AddItemModalScreen` using stack modal presentation.
- `localStorage` data (`DB`) → `AsyncStorage` abstraction in `src/storage/appStorage.ts`.
- DOM mutation (`innerHTML`, class toggles) → state + props in `AppDataContext` and reusable cards.
- Chart.js charts → `react-native-chart-kit` bar charts.
- Focus timer `setInterval` logic → `useFocusTimer` with cleanup in `useEffect`.

## 4) Improvements

- Centralized state management with `AppDataContext`.
- Strict TypeScript models for all entities.
- Reusable card components (`HabitCard`, `TodoCard`).
- Deterministic navigation with root stack + tabs.
- Onboarding persistence via `onboardingDone` state.

