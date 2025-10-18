import heroUrl from '../assets/hero.jpg';
import Logo from '../components/Logo';
import MovieCard from '../components/MovieCard';
import useTopRated from '../hooks/useNowPlaying';
import useUpcoming from '../hooks/useUpcoming';

const Home = () => {
  const { nowPlayingMovies } = useTopRated();
  const { upcomingMovies } = useUpcoming();

  return (
    <div className='relative'>
      <header className='absolute top-0 w-full p-5'>
        <Logo />
      </header>
      {/*Hero section */}
      <section
        className='h-[25vh] w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center gap-2 p-4'
        style={{ backgroundImage: `url(${heroUrl})` }}
      >
        <span>What movie do you want to watch?</span>
        <input
          type='text'
          placeholder='Search movie'
          className='bg-zinc-950 border-1 border-emerald-400 rounded-lg p-2'
        />
      </section>
      {/*Main section */}
      <main className='pl-6 py-4 flex flex-col gap-8'>
        {/*Top ranked */}
        <section className='flex flex-col gap-4' >
          <h2>Top ranked</h2>
          <div className='flex gap-4 overflow-x-scroll pr-4'>
            {nowPlayingMovies.map((item) => (
              <MovieCard movie={item} />
            ))}
          </div>
        </section>
        <section className='flex flex-col gap-4' >
          <h2 >Upcoming</h2>
          <div className='flex gap-4 overflow-x-scroll pr-4'>
            {upcomingMovies.map((item) => (
              <MovieCard movie={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
