import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCasts } from '../api/ApiLinks';
import type { MovieActors } from '../types/movie';

const useMovieActors = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [actors, setActors] = useState<MovieActors[]>([]);
  const [actorsLoading, setLoading] = useState<boolean>(true);
  const [actorsError, setError] = useState<string | null>(null);

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
        const response = await axios.get(getCasts(Number(movieId)));
        setActors(response.data.cast || []);
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

  return { actors, actorsLoading, actorsError };
};

export default useMovieActors;
