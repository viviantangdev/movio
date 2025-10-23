import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCredits } from '../api/ApiLinks';
import type { CastMember, CrewMember } from '../types/movie';

const useCredits = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [loadingCredits, setLoading] = useState<boolean>(true);
  const [errorCredits, setError] = useState<string | null>(null);
  const [casts, setCasts] = useState<CastMember[]>([]);
  const [crews, setCrews] = useState<CrewMember[]>([]);
  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate slow API
        // throw new Error('Network Error: Failed to connect');
        // throw new Error('404 Not Found');
        // throw new Error('Something unexpected happened');
        const response = await axios.get(getCredits(Number(movieId)));

        const cast: CastMember[] = response.data.cast;
        setCasts(cast || []);

        const crew: CrewMember[] = response.data.crew;
        const crewDirectors = crew.filter((member) => member.job === 'Director');
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

  return { casts, crews, loadingCredits, errorCredits };
};

export default useCredits;
