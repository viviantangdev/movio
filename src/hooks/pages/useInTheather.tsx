import axios from 'axios';
import { useEffect, useState } from 'react';
import { getLanguages, getMovie, getNowPlaying } from '../../api/endpoints';
import type { Language, MovieData } from '../../types/movie';

const useInTheather = () => {
  const [inTheather, setInTheather] = useState<MovieData[]>([]);
  const [loadingInTheather, setLoading] = useState(true);
  const [errorInTheather, setError] = useState<string | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch now-playing movies + language list in parallel
        const [moviesRes, langsRes] = await Promise.all([
          axios.get(getNowPlaying),
          axios.get(getLanguages),
        ]);

        const nowPlaying: MovieData[] = moviesRes.data.results;
        const allLanguages: Language[] = langsRes.data;

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

        setInTheather(movieData);
        setLanguages(matchedLanguages);
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

  return { inTheather, languages, loadingInTheather, errorInTheather };
};

export default useInTheather;
