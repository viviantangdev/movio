import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getMovie } from '../api/endpoints';
import type { MovieWithSchedule } from '../types/ticket';
import { generateFakeSchedule } from '../utils/helpers';

const useBuyTicket = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [movie, setMovie] = useState<MovieWithSchedule | null>(null);
  const [loadingMovie, setLoading] = useState<boolean>(true);
  const [errorMovie, setError] = useState<string | null>(null);

  // --- URL State ---
  const selectedDate = searchParams.get('date') ?? '';
  const selectedTime = searchParams.get('time') ?? '';

  const setSelectedDate = (date: string) => {
    setSearchParams((prev) => {
      prev.set('date', date);
      return prev;
    });
  };

  const setSelectedTime = (time: string) => {
    setSearchParams((prev) => {
      prev.set('time', time);
      return prev;
    });
  };

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch movie in parallel
        const [movieRes] = await Promise.all([
          axios.get(getMovie(Number(movieId))),
        ]);

        // --- Movie ---
        const movie: MovieWithSchedule = movieRes.data;
        const schedule = generateFakeSchedule(3);
        // Merge
        const movieWithSchedule: MovieWithSchedule = {
          ...movie,
          schedule,
        };
        setMovie(movieWithSchedule);
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

  return {
    movie,
    selectedDate,
    selectedTime,
    setSelectedDate,
    setSelectedTime,
    loadingMovie,
    errorMovie,
  };
};

export default useBuyTicket;
