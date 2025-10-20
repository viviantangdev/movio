import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiMovieDetails } from '../modules/ApiLinks';
import type { MovieDetails } from '../types/movie';

const useMovieDetails = () => {
  const { movieId } = useParams<string>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();

  useEffect(() => {

    const fetchData = async () => {
      await axios.get(apiMovieDetails(Number(movieId))).then((response) => {
        const data = response.data;

        setMovieDetails(data);
      });
    };
    fetchData();
  }, [movieId]);

  return { movieDetails };
};

export default useMovieDetails;
