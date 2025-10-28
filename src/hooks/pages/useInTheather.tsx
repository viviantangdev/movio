import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  getGenre,
  getLanguages,
  getMovie,
  getNowPlaying,
} from '../../api/endpoints';
import type { Genre, Language, MovieData } from '../../types/movie';

const useInTheather = () => {
  const [inTheather, setInTheather] = useState<MovieData[]>([]);
  const [loadingInTheather, setLoading] = useState(true);
  const [errorInTheather, setError] = useState<string | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch now-playing movies + language + genre list in parallel
        const [moviesRes, langsRes, genresRes] = await Promise.all([
          axios.get(getNowPlaying),
          axios.get(getLanguages),
          axios.get(getGenre),
        ]);

        const nowPlaying: MovieData[] = moviesRes.data.results;
        const allLanguages: Language[] = langsRes.data;
        const allGenres: Genre[] = genresRes.data.genres;

        // Fetch detailed info for each movie in parallel
        const movieData = await Promise.all(
          nowPlaying.map(async (movie) => {
            try {
              const detailsResponse = await axios.get(getMovie(movie.id));
              return detailsResponse.data as MovieData;
            } catch {
              // If one fails, still include the movie
              return movie as MovieData;
            }
          })
        );

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

        // Get all genre IDs from now-playing movies
        const usedGenreIds = new Set<number>();
        movieData.forEach((movie) => {
          movie.genres.forEach((id) => usedGenreIds.add(id.id));
        });

        // Filter only the genres that are actually used
        const availableGenres = allGenres.filter((genre) =>
          usedGenreIds.has(genre.id)
        );

        setInTheather(movieData);
        setLanguages(matchedLanguages);
        setGenres(availableGenres);
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

  return { inTheather, languages, genres, loadingInTheather, errorInTheather };
};

export default useInTheather;
