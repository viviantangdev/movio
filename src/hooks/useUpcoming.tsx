import axios from 'axios';
import { useEffect, useState } from 'react';
import type { Movie } from '../types/movie';


const useUpcoming = () => {
  const apiKey = import.meta.env.VITE_TMDB_KEY;
  const endpoint = 'https://api.themoviedb.org/3/movie/upcoming';
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios.get(`${endpoint}?api_key=${apiKey}`).then((response) => {
      const data = response.data.results;

      // Get current year
      const currentYear = new Date().getFullYear();

      // Filter for upcoming movies releasing this year only
      const thisYearMovies = data.filter((movie: Movie) => {
        const releaseYear = new Date(movie.release_date).getFullYear();
        return releaseYear === currentYear;
      });

      // Sort by relese date (newest first)
      const sorted = thisYearMovies.sort(
        (a: Movie, b: Movie) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime()
      );

      setUpcomingMovies(sorted);
    });
  };

  return { upcomingMovies };
};

export default useUpcoming;
