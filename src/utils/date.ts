export const todayISO = () => new Date().toISOString().split('T')[0];

export const greetingFromHour = (hour: number) => {
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
};
