import { IoPlay, IoStarSharp } from 'react-icons/io5';
import heroUrl from '../assets/hero.jpg';
import Modal from '../components/Modal';
import useMovieDetails from '../hooks/useMovieDetails';
import useMovieVideos from '../hooks/useMovieVideos';

const Movie = () => {
  const { movieDetails } = useMovieDetails();
  const { movieTrailer } = useMovieVideos();
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  return (
    <div>
      <div className='h-90 relative'>
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
          <p className='mt-5'>{movieDetails?.overview}</p>
        </div>
      </div>
      tickets
    </div>
  );
};

export default Movie;
