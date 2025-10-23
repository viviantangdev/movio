import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVideo } from '../api/endpoints';
import type { Video } from '../types/movie';

const useVideo = () => {
  const { movieId } = useParams<string>();
  const [movieTrailer, setMovieTrailer] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(getVideo(Number(movieId))).then((response) => {
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

export default useVideo;
