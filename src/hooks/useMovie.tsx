import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../api/ApiLinks';
import type {  MovieData } from '../types/movie';

const useMovie = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [loadingMovie, setLoading] = useState<boolean>(true);
  const [errorMovie, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate slow API
        // throw new Error('Network Error: Failed to connect');
        // throw new Error('404 Not Found');
        // throw new Error('Something unexpected happened');
        const response = await axios.get(getMovie(Number(movieId)));
        setMovie(response.data);
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
  }, [movieId]);

  return { movie, loadingMovie, errorMovie };
};

export default useMovie;
