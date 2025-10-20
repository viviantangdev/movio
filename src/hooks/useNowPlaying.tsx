import axios from 'axios';
import { useEffect, useState } from 'react';
import { getNowPlaying } from '../modules/ApiLinks';
import type { Movie } from '../types/movie';

const useNowPlaying = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [topRankedMovies, setTopRankedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(getNowPlaying).then((response) => {
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
      });
    };
    fetchData();
  }, []);

  return { nowPlayingMovies, topRankedMovies };
};

export default useNowPlaying;
