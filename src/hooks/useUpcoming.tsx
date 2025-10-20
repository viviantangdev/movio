import axios from 'axios';
import { useEffect, useState } from 'react';
import { upcoming } from '../modules/ApiLinks';
import type { Movie } from '../types/movie';

const useUpcoming = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(upcoming).then((response) => {
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
    fetchData();
  }, []);

  return { upcomingMovies };
};

export default useUpcoming;
