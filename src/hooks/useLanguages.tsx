import axios from 'axios';
import { useEffect, useState } from 'react';
import { getLanguages } from '../api/ApiLinks';
import type { Language } from '../types/movie';

const useLanguages = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [languagesLoading, setLoading] = useState<boolean>(true);
  const [languagesError, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate slow API
        // throw new Error('Network Error: Failed to connect');
        // throw new Error('404 Not Found');
        // throw new Error('Something unexpected happened');
        const response = await axios.get(getLanguages);
        const data = response.data;

        setLanguages(data);
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
  }, []);

  return { languages, languagesLoading, languagesError };
};

export default useLanguages;
