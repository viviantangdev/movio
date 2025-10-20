export const apiKey = import.meta.env.VITE_TMDB_KEY;
export const baseUrl = 'https://api.themoviedb.org/3';


//Endpoints
export const apiNowPlaying = `${baseUrl}/movie/now_playing?api_key=${apiKey}`; 
export const apiUpcoming = `${baseUrl}/movie/upcoming?api_key=${apiKey}`; 
export const apiGenre = `${baseUrl}/genre/movie/list?api_key=${apiKey}`; 
export const apiMovieDetails = (movieId: number| null ) =>
  `${baseUrl}/movie/${movieId}?api_key=${apiKey}`;