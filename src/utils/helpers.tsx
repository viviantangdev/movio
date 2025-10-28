import type { Language, MovieData } from "../types/movie";

  export const getOriginalLanguage = (
    movie: MovieData,
    languages: Language[]
  ): string => {
    const iso = movie.original_language;
    const found = languages.find((l) => l.iso_639_1 === iso);
    return found?.english_name ?? 'Unknown';
  };