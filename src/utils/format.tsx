export const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

/**
 * Returns an array of Date objects starting from today.
 */
export const generateDates = (days: number): Date[] => {
  const today = new Date();
  const result = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i); // Add days properly
    result.push(date);
  }

  return result;
};

/**
 * Formats a date nicely for UI (e.g. "Mon, Oct 21")
 */
export const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
