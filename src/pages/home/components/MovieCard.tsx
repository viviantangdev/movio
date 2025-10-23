import { Link } from 'react-router-dom';
import heroUrl from '../../../assets/hero.jpg';
import type { MovieData } from '../../../types/movie';
import Rating from './Rating';

type MovieType = 'default' | 'top' | 'upcoming';

interface MovieCardProps {
  index: number;
  movie: MovieData;
  movieType: MovieType;
}

const MovieCard = ({ index, movie, movieType }: MovieCardProps) => {
  return (
    <Link to={`/movies/${movie.id}`}>
      <div className='min-w-[100px] w-[200px] h-[360px] movieCard'>
        <div key={movie.id} className='relative'>
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} poster`}
              className='h-[300px] w-full object-cover [mask-image:linear-gradient(to_bottom,black_85%,transparent)]'
            />
          ) : (
            <img src={heroUrl} alt={`${movie.title} poster`} />
          )}
          <span className='absolute top-3 left-3 bg-zinc-950/70 text-emerald-300 text-xs px-3 py-1 rounded-full'>
            <Rating vote={movie.vote_average} />
          </span>
          {movieType === 'upcoming' && (
            <span className='absolute bottom-0 left-0 right-0 bg-zinc-950/70 text-emerald-300 text-xs px-3 py-2'>
              <p>Release date {movie.release_date}</p>
            </span>
          )}
        </div>
        <h3 className='text-md p-4 truncate'>
          {movieType === 'top' && `${index + 1}. `}
          {movie.title}
        </h3>
      </div>
    </Link>
  );
};

export default MovieCard;
