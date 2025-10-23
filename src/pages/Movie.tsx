import { IoPlay, IoStarSharp, IoTicket } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import heroUrl from '../assets/hero.jpg';
import ErrorState from '../components/ErrorState';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import useLanguages from '../hooks/useLanguages';
import useCredits from '../hooks/useCredits';
import useMovie from '../hooks/useMovie';
import type { Language, Movie } from '../types/movie';
import { formatRuntime } from '../utils/format';
import BuyTickets from './BuyTickets';
import useVideo from '../hooks/useVideo';

const Movie = () => {
  const { movie, loadingMovie, errorMovie } = useMovie();
  const { casts, crews, loadingCredits, errorCredits } = useCredits();
  const { languages, loadingLanguages, errorLanguages } = useLanguages();
  const { movieTrailer } = useVideo();
  const navigate = useNavigate();

  if (loadingMovie || loadingCredits || loadingLanguages) return <Loader />;
  if (!movie || errorMovie || errorCredits || errorLanguages)
    return <ErrorState error={errorMovie || errorCredits || errorLanguages} />;

  const handleBuyTickets = () => {
    navigate(`/movies/${movie.id}/ticket`);
  };

  const getOriginalLanguage = (
    movie: Movie,
    languages: Language[]
  ): string => {
    const iso = movie.original_language;
    const found = languages.find((l) => l.iso_639_1 === iso);
    return found?.english_name ?? 'Unknown';
  };

  const originalLanguage = getOriginalLanguage(movie, languages);

  return (
    <div>
      <div className='relative h-130'>
        <div
          className='h-full w-full bg-cover bg-center opacity-15'
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        />
        <div className='absolute bottom-0 p-7 space-y-3'>
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
                  <p className='text-sm'>
                    {movie.vote_average.toFixed(1)}
                  </p>
                </div>
              </div>
              <span className='text-sm'>
                {movie.runtime && formatRuntime(movie.runtime)}
              </span>
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
                button={{ icon: <IoPlay />, text: 'Play trailer' }}
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
              />
            )}
            <button
              onClick={handleBuyTickets}
              className='primaryButton flex items-center gap-2 '
            >
              <IoTicket />
              Buy tickets
            </button>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-7 p-7'>
        <p className='mt-5'>{movie.overview}</p>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <span className='font-extralight text-gray-400'>
              Original title:
            </span>
            <p>{movie.original_title}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='font-extralight text-gray-400'>
              Original language:
            </span>
            <p>{originalLanguage}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <span className='font-extralight text-gray-400'>Release date:</span>
            <p>{movie.release_date}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='font-extralight text-gray-400'>Directors:</span>
            {crews.map((director, index) => (
              <p key={index}>{director.name}</p>
            ))}
          </div>
          <div className='flex flex-col gap-1'>
            <span className='font-extralight text-gray-400'>Actors:</span>
            {casts.map((actor, index) => (
              <p key={index}>{actor.name}</p>
            ))}
          </div>
        </div>
      </div>
      <BuyTickets />
    </div>
  );
};

export default Movie;
