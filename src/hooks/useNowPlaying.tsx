import axios from 'axios';
import { useEffect, useState } from 'react';
import type { Movie } from '../types/movie';

const useNowPlaying = () => {
  const apiKey = import.meta.env.VITE_TMDB_KEY;
  const endpoint = 'https://api.themoviedb.org/3/movie/now_playing';
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios.get(`${endpoint}?api_key=${apiKey}`).then((response) => {
      const data = response.data.results;

      // Sort by relese date (newest first)
      const sorted = data.sort(
        (a: Movie, b: Movie) => b.vote_average - a.vote_average
      );
      setNowPlayingMovies(sorted);
    });
  };
  return { nowPlayingMovies };
};

export default useNowPlaying;
