import { IoPlay, IoStarSharp, IoTicket } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import heroUrl from '../assets/hero.jpg';
import ErrorState from '../components/ErrorState';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import useLanguages from '../hooks/useLanguages';
import useMovieDetails from '../hooks/useMovieDetails';
import useMovieVideos from '../hooks/useMovieVideos';
import type { Languages, MovieDetails } from '../types/movie';
import { formatRuntime } from '../utils/format';
import BuyTickets from './BuyTickets';

const Movie = () => {
  const { movieDetails, loading, error } = useMovieDetails();
  const { languages, languagesLoading, languagesError } = useLanguages();
  const { movieTrailer } = useMovieVideos();
  const navigate = useNavigate();

  const handleBuyTickets = () => {
    navigate(`/movies/${movieDetails?.id}/ticket`);
  };

  const getOriginalLanguage = (
    movieDetails: MovieDetails | null | undefined,
    languages: Languages[]
  ): string => {
    const iso = movieDetails?.original_language;
    if (!iso) return 'Unknown';

    const found = languages.find((l) => l.iso_639_1 === iso);
    return found?.english_name ?? 'Unknown';
  };

  const originalLanguage = getOriginalLanguage(movieDetails, languages);

  if (loading || languagesLoading) return <Loader />;
  if (error || languagesError) return <ErrorState error={error} />;

  return (
    <div>
      <div className='relative h-130'>
        <div
          className='h-full w-full bg-cover bg-center opacity-15'
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path})`,
          }}
        />
        <div className='absolute bottom-0 p-7 space-y-3'>
          <div className='flex items-end gap-3'>
            <img
              src={
                movieDetails?.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`
                  : heroUrl
              }
              alt={movieDetails?.title}
              className='rounded-xl h-40'
            />
            <div>
              <div className='flex flex-wrap items-center gap-2'>
                <h2>{movieDetails?.title}</h2>
                <div className='flex items-center gap-0.5'>
                  <IoStarSharp className='text-emerald-400' />
                  <p className='text-sm'>
                    {movieDetails?.vote_average.toFixed(1)}
                  </p>
                </div>
              </div>
              <span className='text-sm'>
                {movieDetails?.runtime && formatRuntime(movieDetails?.runtime)}
              </span>
              <div className='flex flex-wrap gap-2 mt-2'>
                {movieDetails?.genres.map((genre) => (
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
        <p className='mt-5'>{movieDetails?.overview}</p>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <span className='font-extralight text-gray-400'>
              Original title:
            </span>
            <p>{movieDetails?.original_title}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='font-extralight text-gray-400'>
              Original language:
            </span>
            <p>{originalLanguage}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='font-extralight text-gray-400'>Release date:</span>
            <p>{movieDetails?.release_date}</p>
          </div>
        </div>
      </div>
      <BuyTickets />
    </div>
  );
};

export default Movie;
