import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiMovieVideos } from '../modules/ApiLinks';

interface Video {
  id: string;
  key: string;
  site: string;
  type: string;
  official: boolean;
}
const useMovieVideos = () => {
  const { movieId } = useParams<string>();
  const [movieTrailer, setMovieTrailer] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(apiMovieVideos(Number(movieId))).then((response) => {
        const data: Video[] = response.data.results;

        // Find the official trailer, preferably from YouTube
        const trailer =
          data.find(
            (v) =>
              v.type === 'Trailer' &&
              v.site === 'YouTube' &&
              v.official === true
          ) || data.find((v) => v.type === 'Trailer');

        setMovieTrailer(trailer ? trailer.key : null);
      });
    };
    fetchData();
  }, [movieId]);

  return { movieTrailer };
};

export default useMovieVideos;
