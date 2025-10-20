import { IoStarSharp } from 'react-icons/io5';
import useMovieDetails from '../hooks/useMovieDetails';

const Movie = () => {
  const { movieDetails } = useMovieDetails();
  return (
    <div>
      <div className='h-90 relative'>
        <div className='absolute bottom-0 p-7 '>
          <div className='flex items-end gap-3'>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
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
              <span className='text-sm'>{movieDetails?.runtime} min</span>
              <div className='flex flex-wrap gap-2 mt-2'>
                {movieDetails?.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className='bg-emerald-600/20 text-emerald-300 text-xs px-3 py-1 rounded-full'
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className='pt-7'>{movieDetails?.overview}</p>
        </div>

        <div
          className='h-full w-full bg-cover bg-center opacity-15'
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path})`,
          }}
        />
      </div>
      tickets
    </div>
  );
};

export default Movie;
