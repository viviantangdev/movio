import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUpcoming } from '../api/ApiLinks';
import type { MovieData } from '../types/movie';

const useUpcoming = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<MovieData[]>([]);
  const [loadingUpcoming, setLoading] = useState<boolean>(true);
  const [errorUpcoming, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate slow API
        // throw new Error('Network Error: Failed to connect');
        // throw new Error('404 Not Found');
        // throw new Error('Something unexpected happened');
        const response = await axios.get(getUpcoming);
        const data = response.data.results;

        // Get today’s date
        const today = new Date();

        // Filter for movies releasing today or later
        const filtered = data.filter((movie: MovieData) => {
          const releaseDate = new Date(movie.release_date);
          return releaseDate >= today;
        });

        // Sort by relese date (newest first)
        const sorted = filtered.sort(
          (a: MovieData, b: MovieData) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        );

        setUpcomingMovies(sorted);
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

  return { upcomingMovies, loadingUpcoming, errorUpcoming };
};

export default useUpcoming;
