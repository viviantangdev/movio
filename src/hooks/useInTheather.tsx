import axios from 'axios';
import { useEffect, useState } from 'react';
import { getLanguages, getMovie, getNowPlaying } from '../api/endpoints';
import type { Genre, Language, MovieData } from '../types/movie';
import type { MovieWithSchedule } from '../types/ticket';
import { generateFakeSchedule } from '../utils/helpers';

const useInTheather = () => {
  const [inTheather, setInTheather] = useState<MovieWithSchedule[]>([]);
  const [loadingInTheather, setLoading] = useState(true);
  const [errorInTheather, setError] = useState<string | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [allDates, setAllDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch now-playing + language list in parallel
        const [moviesRes, langsRes] = await Promise.all([
          axios.get(getNowPlaying),
          axios.get(getLanguages),
        ]);

        // --- NowPlaying ---
        const nowPlaying: MovieData[] = moviesRes.data.results;

        // Fetch detailed info for each movie + fake schedule in parallel
        const movieData = await Promise.all(
          nowPlaying.map(async (movie: MovieData) => {
            try {
              const detailsResponse = await axios.get(getMovie(movie.id));
              const details = detailsResponse.data;

              // attach fake schedule
              const schedule = generateFakeSchedule();
              return { ...details, schedule }; //merged result
            } catch {
              // fallback movie (still attach a fake schedule)
              const schedule = generateFakeSchedule();
              return { ...movie, schedule };
            }
          })
        );

        // --- Languages ---
        const allLanguages: Language[] = langsRes.data;

        // Extract unique language codes from movies
        const uniqueLangCodes = Array.from(
          new Set(movieData.map((m) => m.original_language))
        );

        // Match codes to English names
        const matchedLanguages = uniqueLangCodes.map((code) => {
          const found = allLanguages.find((lang) => lang.iso_639_1 === code);
          return (
            found || {
              iso_639_1: code,
              english_name: code, // fallback if missing
            }
          );
        });

        // --- Genres ---
        // Flatten all genres from all movies
        const allMovieGenres = movieData.flatMap((movie) => movie.genres);

        // Remove duplicates by genre ID
        const genreMap = new Map<number, Genre>();
        allMovieGenres.forEach((genre) => {
          genreMap.set(genre.id, genre); // map ensures uniqueness by id
        });

        // Convert back to array
        const availableGenres = Array.from(genreMap.values());

        setInTheather(movieData);
        setLanguages(matchedLanguages);
        setGenres(availableGenres);

        //AllDates
        // Compute unique dates from all movie schedules
        const datesSet = new Set<string>();
        movieData.forEach((movie) => {
          Object.keys(movie.schedule).forEach((date) => datesSet.add(date));
        });

        // Convert to sorted array
        const sortedDates = Array.from(datesSet).sort(
          (a, b) => new Date(a).getTime() - new Date(b).getTime()
        );

        // Update state
        setAllDates(sortedDates);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    inTheather,
    languages,
    genres,
    allDates,
    loadingInTheather,
    errorInTheather,
  };
};

export default useInTheather;
