export const apiKey = import.meta.env.VITE_TMDB_KEY;
export const baseUrl = 'https://api.themoviedb.org/3';

//Endpoints
export const getNowPlaying = `${baseUrl}/movie/now_playing?api_key=${apiKey}&language=en-US&region=us`;
export const getUpcoming = `${baseUrl}/movie/upcoming?api_key=${apiKey}&language=en-US&region=us`;
export const getGenre = `${baseUrl}/genre/movie/list?api_key=${apiKey}`;
export const getMovieDetails = (movieId: number) =>
  `${baseUrl}/movie/${movieId}?api_key=${apiKey}`;
export const getMovieVideos = (movieId: number) =>
  `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`;
export const getLanguages = `${baseUrl}/configuration/languages?api_key=${apiKey}`
