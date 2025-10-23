import { IoPlay, IoStarSharp, IoTicket } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import heroUrl from '../assets/hero.jpg';
import ErrorState from '../components/ErrorState';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import useMovieDetails from '../hooks/useMovieDetails';
import useMovieVideos from '../hooks/useMovieVideos';
import { formatRuntime } from '../utils/format';

const Movie = () => {
  const { movieDetails, loading, error } = useMovieDetails();
  const { movieTrailer } = useMovieVideos();
  const navigate = useNavigate();

  const handleBuyTickets = () => {
    navigate(`/movies/${movieDetails?.id}/ticket`);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorState error={error}/>;

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
          <p className='mt-5'>{movieDetails?.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
