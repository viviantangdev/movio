import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCredits, getLanguages, getMovie, getVideo } from '../api/endpoints';
import type {
  CastMember,
  CrewMember,
  Language,
  MovieData,
  Video,
} from '../types/movie';

const useMovie = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [loadingMovie, setLoading] = useState<boolean>(true);
  const [errorMovie, setError] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [casts, setCasts] = useState<CastMember[]>([]);
  const [crews, setCrews] = useState<CrewMember[]>([]);

  
  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch movie + video + languages + credit(cast & crew) list in parallel
        const [movieRes, videoRes, langRes, creditRes] = await Promise.all([
          axios.get(getMovie(Number(movieId))),
          axios.get(getVideo(Number(movieId))),
          axios.get(getLanguages),
          axios.get(getCredits(Number(movieId))),
        ]);

        // --- Movie ---
        const movie: MovieData = movieRes.data;

        // --- Video ---
        const video: Video[] = videoRes.data.results;

        // Find the official trailer, preferably from YouTube
        const trailer =
          video.find(
            (v) =>
              v.type === 'Trailer' &&
              v.site === 'YouTube' &&
              v.official === true
          ) || video.find((v) => v.type === 'Trailer');

        // --- Languages ---
        const languages: Language[] = langRes.data;

        // --- Casts ---
        const cast: CastMember[] = creditRes.data.cast;

        // --- Crew ---
        const crew: CrewMember[] = creditRes.data.crew;

        // Filter only directors
        const crewDirectors = crew.filter(
          (member) => member.job === 'Director'
        );

        setMovie(movie);
        setVideo(trailer ? trailer.key : null);
        setLanguages(languages);
        setCasts(cast || []);
        setCrews(crewDirectors);
      } catch (error) {
        if (axios.isCancel(error)) return; // Request was canceled
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
  }, [movieId]);

  return { movie, video, languages, casts, crews, loadingMovie, errorMovie };
};

export default useMovie;
