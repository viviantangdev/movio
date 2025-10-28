import axios from 'axios';
import { useEffect, useState } from 'react';
import { getNowPlaying, getUpcoming } from '../../api/endpoints';
import type { MovieData } from '../../types/movie';

const useHome = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<MovieData[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieData[]>([]);
  const [topRankedMovies, setTopRankedMovies] = useState<MovieData[]>([]);
  const [loadingHome, setLoading] = useState<boolean>(true);
  const [errorHome, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch upcoming + nowPlaying endpoints in parallel
        const [upcomingRes, nowPlayingRes] = await Promise.all([
          axios.get(getUpcoming),
          axios.get(getNowPlaying),
        ]);

        // --- Upcoming Movies ---
        const upcomingData: MovieData[] = upcomingRes.data.results;
        const today = new Date();

        // Filter releasing date from today
        const filteredUpcoming = upcomingData.filter((movie) => {
          const releaseDate = new Date(movie.release_date);
          return releaseDate >= today;
        });

        // Sort by relese date (newest first)
        const sortedUpcoming = filteredUpcoming.sort(
          (a, b) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        );

        // --- Now Playing Movies ---
        const nowPlayingData: MovieData[] = nowPlayingRes.data.results;

        const sortedAtoZ = [...nowPlayingData].sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        const sortedRanking = [...nowPlayingData].sort(
          (a, b) => b.vote_average - a.vote_average
        );

        // --- Set States ---
        setUpcomingMovies(sortedUpcoming);
        setNowPlayingMovies(sortedAtoZ);
        setTopRankedMovies(sortedRanking);
      } catch (error) {
        if (axios.isCancel(error)) return;
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

  return {
    upcomingMovies,
    nowPlayingMovies,
    topRankedMovies,
    loadingHome,
    errorHome,
  };
};

export default useHome;
