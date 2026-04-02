import {useEffect, useMemo, useState} from 'react';

export const useFocusTimer = (focusMinutes: number, breakMinutes: number, onFocusDone: () => void) => {
  const [running, setRunning] = useState(false);
  const [isFocusPhase, setIsFocusPhase] = useState(true);
  const [seconds, setSeconds] = useState(focusMinutes * 60);

  const total = useMemo(
    () => (isFocusPhase ? focusMinutes * 60 : breakMinutes * 60),
    [isFocusPhase, focusMinutes, breakMinutes],
  );

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (seconds > 0) return;
    setRunning(false);
    if (isFocusPhase) onFocusDone();
    const nextPhase = !isFocusPhase;
    setIsFocusPhase(nextPhase);
    setSeconds(nextPhase ? focusMinutes * 60 : breakMinutes * 60);
  }, [seconds, isFocusPhase, focusMinutes, breakMinutes, onFocusDone]);

  const reset = () => {
    setRunning(false);
    setIsFocusPhase(true);
    setSeconds(focusMinutes * 60);
  };

  const progress = total ? seconds / total : 1;

  return {running, setRunning, isFocusPhase, seconds, total, progress, reset};
};
