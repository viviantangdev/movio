import axios from 'axios';
import { useEffect, useState } from 'react';
import { getMovie, getNowPlaying } from '../../api/endpoints';
import type { MovieData } from '../../types/movie';

const useInTheather = () => {
  const [inTheather, setInTheather] = useState<MovieData[]>([]);
  const [loadingInTheather, setLoading] = useState(true);
  const [errorInTheather, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get the list of now-playing movies
        const response = await axios.get(getNowPlaying);
        const nowPlaying: MovieData[] = response.data.results;

        // Fetch detailed info for each movie in parallel
        const movieData = await Promise.all(
          nowPlaying.map(async (movie) => {
            try {
              const detailsResponse = await axios.get(getMovie(movie.id));
              return detailsResponse.data as MovieData;
            } catch {
              // if one fails, still continue
              return movie as MovieData;
            }
          })
        );

        setInTheather(movieData);
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

  return { inTheather, loadingInTheather, errorInTheather };
};

export default useInTheather;
