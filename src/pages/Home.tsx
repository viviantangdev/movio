import MovieCard from '../components/MovieCard';
import useNowPlaying from '../hooks/useNowPlaying';
import useUpcoming from '../hooks/useUpcoming';

const Home = () => {
  const { nowPlayingMovies, topRankedMovies } = useNowPlaying();
  const { upcomingMovies } = useUpcoming();

  return (
    <>
      {/*Hero section */}
      {/* <Hero
        children={
          <div className='flex flex-col gap-2'>
            <span>What movie do you want to watch?</span>
            <input
              type='text'
              placeholder='Search movie'
              className='bg-zinc-950 border-1 border-emerald-400 rounded-lg p-2'
            />
          </div>
        }
      /> */}
      {/*Main section */}
      <main className='pl-6 py-4 flex flex-col gap-8'>
        {/*Top ranked */}
        <section className='flex flex-col gap-4'>
          <h2>Top ranked</h2>
          <div className='flex gap-4 overflow-x-scroll pr-4'>
            {topRankedMovies.map((item, index) => (
              <MovieCard key={index} movie={item} />
            ))}
          </div>
        </section>
        {/*In theather */}
        <section className='flex flex-col gap-4'>
          <h2>In theather</h2>
          <div className='flex gap-4 overflow-x-scroll pr-4'>
            {nowPlayingMovies.map((item, index) => (
              <MovieCard key={index} movie={item} />
            ))}
          </div>
        </section>

        {/*Upcoming */}
        <section className='flex flex-col gap-4'>
          <h2>Upcoming</h2>
          <div className='flex gap-4 overflow-x-scroll pr-4'>
            {upcomingMovies.map((item, index) => (
              <MovieCard key={index} movie={item} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
