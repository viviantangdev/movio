import MovieCard from '../components/MovieCard';
import Rating from '../components/Rating';
import useNowPlaying from '../hooks/useNowPlaying';
import useUpcoming from '../hooks/useUpcoming';

const Home = () => {
  const { nowPlayingMovies, topRankedMovies } = useNowPlaying();
  const { upcomingMovies } = useUpcoming();

  return (
    <>
      {/*Main section */}
      <main className='pl-6 py-4 flex flex-col gap-8'>
        {/*Top ranked */}
        <section className='flex flex-col gap-4'>
          <h2>Top ranked</h2>
          <div className='flex gap-4 overflow-x-scroll pr-4'>
            {topRankedMovies.map((item, index) => (
              <MovieCard
                key={index}
                movie={item}
                topContent={<Rating vote={item.vote_average} />}
              />
            ))}
          </div>
        </section>
        {/*In theather */}
        <section className='flex flex-col gap-4'>
          <h2>In theather</h2>
          <div className='flex gap-4 overflow-x-scroll pr-4'>
            {nowPlayingMovies.map((item, index) => (
              <MovieCard
                key={index}
                movie={item}
                topContent={<Rating vote={item.vote_average} />}
              />
            ))}
          </div>
        </section>

        {/*Upcoming */}
        <section className='flex flex-col gap-4'>
          <h2>Upcoming</h2>
          <div className='flex gap-4 overflow-x-scroll pr-4'>
            {upcomingMovies.map((item, index) => (
              <MovieCard key={index} movie={item} topContent={<p>Release: {item.release_date}</p>}/>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
