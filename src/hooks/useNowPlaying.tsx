import axios from 'axios';
import { useEffect, useState } from 'react';
import { getNowPlaying } from '../api/ApiLinks';
import type { Movie } from '../types/movie';

const useNowPlaying = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [topRankedMovies, setTopRankedMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoading] = useState<boolean>(true);
  const [errorMovies, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate slow API
        // throw new Error('Network Error: Failed to connect');
        // throw new Error('404 Not Found');
        // throw new Error('Something unexpected happened');

        const response = await axios.get(getNowPlaying);
        const data = response.data.results;

        // Sort by A to Z
        const sortedAtoZ = [...data].sort((a: Movie, b: Movie) =>
          a.title.localeCompare(b.title)
        );

        // Sort by vote ranking
        const sortedRanking = [...data].sort(
          (a: Movie, b: Movie) => b.vote_average - a.vote_average
        );

        setNowPlayingMovies(sortedAtoZ);
        setTopRankedMovies(sortedRanking);
      } catch (error) {
        if (axios.isCancel(error)) return; // Request was canceled
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || error.message);
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { nowPlayingMovies, topRankedMovies, loadingMovies, errorMovies };
};

export default useNowPlaying;
