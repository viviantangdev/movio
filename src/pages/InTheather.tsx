import MovieCard from '../components/MovieCard';
import useNowPlaying from '../hooks/useNowPlaying';

const InTheather = () => {
  const { nowPlayingMovies } = useNowPlaying();
  return (
    <>
      <div className='grid grid-cols-2 gap-1.5 p-4'>
        {nowPlayingMovies.map((movie, index) => (
          <MovieCard key={index} movie={movie}/>
        ))}
      </div>
    </>
  );
};

export default InTheather;
