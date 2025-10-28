import { IoPlay, IoStarSharp, IoTicket, IoTimeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import heroUrl from '../../../assets/hero.jpg';
import Modal from '../../../shared/components/Modal';
import type { MovieData } from '../../../types/movie';
import { formatRuntime } from '../../../utils/format';

interface MovieHeroSectionProps {
  movie: MovieData;
  movieTrailer: string | null;
}

const MovieHeroSection = ({ movie, movieTrailer }: MovieHeroSectionProps) => {
  return (
    <div className='relative h-130'>
      <div
        className='h-full w-full bg-cover bg-center opacity-15'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />
      <div className='inset-x-0 w-[90%] md:w-[80%] 2xl:w-[50%] max-w-7xl mx-auto absolute bottom-0 p-7 space-y-3'>
        <div className='flex items-end gap-3'>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : heroUrl
            }
            alt={movie.title}
            className='rounded-xl h-40'
          />
          <div>
            <div className='flex flex-wrap items-center gap-2'>
              <h2>{movie.title}</h2>
              <div className='flex items-center gap-0.5'>
                <IoStarSharp className='text-emerald-400' />
                <p className='text-sm'>{movie.vote_average.toFixed(1)}</p>
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <IoTimeOutline />
              <span className='text-sm'>{formatRuntime(movie.runtime)}</span>
            </div>
            <div className='flex flex-wrap gap-2 mt-2'>
              {movie.genres.map((genre) => (
                <span key={genre.id} className='text-sm'>
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className='flex gap-2'>
          {movieTrailer && (
            <Modal
              button={{
                icon: <IoPlay />,
                text: 'Play trailer',
                className: 'secondaryButton',
              }}
              children={
                <iframe
                  width='500px'
                  height='250px'
                  src={`https://www.youtube.com/embed/${movieTrailer}`}
                  title='Trailer'
                  allowFullScreen
                  className='rounded-xl shadow-lg'
                />
              }
              header='Play trailer'
            />
          )}
          <Link to={`/movies/${movie.id}/ticket`}>
            <button className='primaryButton flex items-center gap-2'>
              <IoTicket />
              Buy ticket
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieHeroSection;
