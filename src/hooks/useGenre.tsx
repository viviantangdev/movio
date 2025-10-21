import axios from 'axios';
import { useEffect, useState } from 'react';
import { getGenre } from '../api/ApiLinks';
import type { Genre } from '../types/movie';

const useGenre = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(getGenre).then((response) => {
        const data = response.data.genres;

        setGenres(data);
      });
    };
    fetchData();
  }, []);

  // lookup (id → name)
  const genreMap = Object.fromEntries(genres.map((g) => [g.id, g.name]));

  return { genres, genreMap };
};

export default useGenre;
