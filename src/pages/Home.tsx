import { Link } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import Loader from '../components/Loader';
import MovieCard from '../components/MovieCard';
import Rating from '../components/Rating';
import useNowPlaying from '../hooks/useNowPlaying';
import useUpcoming from '../hooks/useUpcoming';

const Home = () => {
  const { nowPlayingMovies, topRankedMovies, loading, error } = useNowPlaying();
  const { upcomingMovies, upcomingLoading, upcomingError } = useUpcoming();

  if (loading) return <Loader />;
  if (error) return <ErrorState error={error} />;
  if (upcomingLoading) return <Loader />;
  if (upcomingError) return <ErrorState error={error} />;

  return (
    <>
      {/*Main section */}
      <main className=' p-7 flex flex-col gap-8'>
        {/*Top ranked */}
        <section className='flex flex-col gap-4'>
          <h2>Top ranked</h2>
          <div className='flex gap-4 overflow-x-scroll px-2 pb-6'>
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
          <div className='flex justify-between items-end'>
            <h2>In theather</h2>
            <Link to='movies'>
              <span className='text-emerald-400'>See all</span>
            </Link>
          </div>
          <div className='flex gap-4 overflow-x-scroll px-2 pb-6'>
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
          <div className='flex gap-4 overflow-x-scroll px-2 pb-6'>
            {upcomingMovies.map((item, index) => (
              <MovieCard
                key={index}
                movie={item}
                topContent={<p>Release: {item.release_date}</p>}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
