import { Link } from 'react-router-dom';
import heroUrl from '../assets/hero.jpg';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  topContent: React.ReactElement;
  //   genreMap: Record<number, string>;
}

const MovieCard = ({ movie, topContent }: MovieCardProps) => {
  return (
    <Link to={`/movies/${movie.id}`}>
      <div
        key={movie.id}
        className='relative min-w-[100px] w-[200px] min-h-[300px] rounded-xl overflow-hidden bg-zinc-900'
      >
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} poster`}
            className='h-[300px] w-full object-cover [mask-image:linear-gradient(to_bottom,black_85%,transparent)]'
          />
        ) : (
          <img src={heroUrl} alt={`${movie.title} poster`} />
        )}
        <div className='flex flex-col my-2 p-2 gap-3'>
          <h3 className='text-sm'>{movie.title}</h3>

          {/* <div>
              {movie.genre_ids.map((g, index) => (
                <p key={index}>{genreMap[g]}</p>
              ))}
            </div> */}
        </div>
        <span className='absolute top-3 left-3 bg-zinc-950/70 text-emerald-300 text-xs px-3 py-1 rounded-full'>
          {topContent}
        </span>
      </div>
    </Link>
  );
};

export default MovieCard;
