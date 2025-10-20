import axios from 'axios';
import { useEffect, useState } from 'react';
import { genre } from '../modules/ApiLinks';
import type { Genre } from '../types/movie';

const useGenre = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(genre).then((response) => {
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
