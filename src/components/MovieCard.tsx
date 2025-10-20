import { IoStarSharp } from 'react-icons/io5';
import heroUrl from '../assets/hero.jpg';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  genreMap: Record<number, string>; 
}

const MovieCard = ({ movie, genreMap }: MovieCardProps) => {
  return (
    <div
      key={movie.id}
      className='min-w-[180px] min-h-[300px] rounded-xl overflow-hidden bg-zinc-900'
    >
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={`${movie.title} poster`}
          className='h-[300px] w-full object-cover [mask-image:linear-gradient(to_bottom,black_85%,transparent)]'
        />
      ) : (
        <img src={heroUrl} alt={`${movie.title} poster`} />
      )}
      <div className='flex flex-col my-2 p-2 gap-3'>
        <h3 className='text-sm'>{movie.title}</h3>
        <div className='flex items-center gap-0.5'>
          <IoStarSharp className='text-emerald-400' />
          <p className='text-sm'>{movie.vote_average.toFixed(1)}</p>
        </div>
        <div>
          {movie.genre_ids.map((g, index) => (
            <p key={index}>{genreMap[g]}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
