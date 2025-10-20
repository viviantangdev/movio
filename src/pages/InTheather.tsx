import MovieCard from '../components/MovieCard';
import Rating from '../components/Rating';
import useNowPlaying from '../hooks/useNowPlaying';

const InTheather = () => {
  const { nowPlayingMovies } = useNowPlaying();
  return (
    <div className='flex justify-center p-4'>
      <div className='grid grid-cols-2 gap-4'>
        {nowPlayingMovies.map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
            topContent={<Rating vote={movie.vote_average} />}
          />
        ))}
      </div>
    </div>
  );
};

export default InTheather;
