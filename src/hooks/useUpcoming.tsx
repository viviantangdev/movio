import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUpcoming } from '../modules/ApiLinks';
import type { Movie } from '../types/movie';

const useUpcoming = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(getUpcoming).then((response) => {
        const data = response.data.results;

        // Get today’s date
        const today = new Date();

        // Filter for movies releasing today or later
        const filtered = data.filter((movie: Movie) => {
          const releaseDate = new Date(movie.release_date);
          return releaseDate >= today;
        });

        // Sort by relese date (newest first)
        const sorted = filtered.sort(
          (a: Movie, b: Movie) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        );

        setUpcomingMovies(sorted);
      });
    };
    fetchData();
  }, []);

  return { upcomingMovies };
};

export default useUpcoming;
