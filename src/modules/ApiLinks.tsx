export const apiKey = import.meta.env.VITE_TMDB_KEY;
export const baseUrl = 'https://api.themoviedb.org/3';


//Endpoints
export const nowPlaying = `${baseUrl}/movie/now_playing?api_key=${apiKey}`; 
export const upcoming = `${baseUrl}/movie/upcoming?api_key=${apiKey}`; 
export const genre = `${baseUrl}/genre/movie/list?api_key=${apiKey}`; 