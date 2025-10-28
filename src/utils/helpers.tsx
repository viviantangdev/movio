import type { Language, MovieData } from "../types/movie";

  export const getOriginalLanguage = (
    movie: MovieData,
    languages: Language[]
  ): string => {
    const iso = movie.original_language;
    const found = languages.find((l) => l.iso_639_1 === iso);
    return found?.english_name ?? 'Unknown';
  };



export function generateFakeSchedule( days = 3): Record<string, { time: string; isFull: boolean }[]> {
  const schedule: Record<string, { time: string; isFull: boolean }[]> = {};
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateISO = date.toISOString().slice(0, 10);

    const showtimes = ["13:00", "16:30", "20:00"].map((time) => ({
      time,
      // randomize ~20% of showings as full
      isFull: Math.random() < 0.9,
    }));

    schedule[dateISO] = showtimes;
  }

  return schedule;
}