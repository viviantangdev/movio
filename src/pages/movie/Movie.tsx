import { useRef } from 'react';
import { IoPlay, IoStarSharp, IoTicket, IoTimeOutline } from 'react-icons/io5';
import heroUrl from '../../assets/hero.jpg';
import useCredits from '../../hooks/useCredits';
import useLanguages from '../../hooks/useLanguages';
import useMovie from '../../hooks/useMovie';
import useVideo from '../../hooks/useVideo';
import ErrorState from '../../shared/components/ErrorState';
import Loader from '../../shared/components/Loader';
import Modal from '../../shared/components/Modal';
import type { Language, MovieData } from '../../types/movie';
import { formatRuntime } from '../../utils/format';
import BuyTickets from './components/BuyTickets';

const Movie = () => {
  const { movie, loadingMovie, errorMovie } = useMovie();
  const { casts, crews, loadingCredits, errorCredits } = useCredits();
  const { languages, loadingLanguages, errorLanguages } = useLanguages();
  const { movieTrailer } = useVideo();
  const buyTicketSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToBuyTicket = () => {
    buyTicketSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loadingMovie || loadingCredits || loadingLanguages) return <Loader />;
  if (!movie || errorMovie || errorCredits || errorLanguages)
    return <ErrorState error={errorMovie || errorCredits || errorLanguages} />;

  const handleBuyTicket = () => {
    scrollToBuyTicket();
  };

  const getOriginalLanguage = (
    movie: MovieData,
    languages: Language[]
  ): string => {
    const iso = movie.original_language;
    const found = languages.find((l) => l.iso_639_1 === iso);
    return found?.english_name ?? 'Unknown';
  };

  const originalLanguage = getOriginalLanguage(movie, languages);

  return (
    <>
      {/*Movie hero */}
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
            <button
              onClick={handleBuyTicket}
              className='primaryButton flex items-center gap-2 '
            >
              <IoTicket />
              Buy ticket
            </button>
          </div>
        </div>
      </div>
      {/*Movie info */}
      <main className='flex flex-col gap-7 p-7'>
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
            <div className='flex gap-2 overflow-x-auto'>
              {crews.map((director, index) => (
                <div
                  key={index}
                  className='flex flex-col gap-2 items-center w-[80px] flex-shrink-0'
                >
                  <img
                    src={
                      director.profile_path
                        ? `https://image.tmdb.org/t/p/w500${director.profile_path}`
                        : heroUrl
                    }
                    alt={director.name}
                    className='rounded-xl w-[80px] h-[80px] object-cover'
                  />
                  <p className='text-xs text-center'>{director.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='font-extralight text-gray-400'>Actors:</span>
            <div className='flex gap-2 overflow-x-auto'>
              {casts.map((actor, index) => (
                <div
                  key={index}
                  className='flex flex-col gap-2 items-center w-[80px] flex-shrink-0'
                >
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : heroUrl
                    }
                    alt={actor.name}
                    className='rounded-xl w-[80px] h-[80px] object-cover'
                  />
                  <p className='text-xs text-center'>{actor.name}</p>
                  <p className='text-xs text-center'>({actor.character})</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      {/*Seperator */}
      <div className='w-full h-1 bg-zinc-900 ' />
      {/*But ticket */}
      <div ref={buyTicketSectionRef}>
        <BuyTickets />
      </div>
    </>
  );
};

export default Movie;
