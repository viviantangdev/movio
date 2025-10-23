import { useState } from 'react';
import { IoClose, IoSearchOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import Loader from '../components/Loader';
import MovieCard from '../components/MovieCard';
import useNowPlaying from '../hooks/useNowPlaying';
import useUpcoming from '../hooks/useUpcoming';
import type { Movie } from '../types/movie';

const Home = () => {
  const { nowPlayingMovies, topRankedMovies, loading, error } = useNowPlaying();
  const { upcomingMovies, upcomingLoading, upcomingError } = useUpcoming();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredMovies: Movie[] = [
    ...nowPlayingMovies,
    ...upcomingMovies,
  ].filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;
  if (error) return <ErrorState error={error} />;
  if (upcomingLoading) return <Loader />;
  if (upcomingError) return <ErrorState error={error} />;

  return (
    <>
      {/*Main section */}
      <main className=' p-7 flex flex-col gap-8'>
        {/*Search bar */}
        <div className='relative flex items-center group'>
          <IoSearchOutline className='absolute ml-3 pointer-events-none' />
          <input
            type='text'
            name='search'
            placeholder='Search movie'
            autoComplete='off'
            aria-label='Search movie'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className='w-full pr-3 pl-10'
          />
          <IoClose
            className='absolute right-3 opacity-0 group-focus-within:opacity-100 transition-smooth cursor-pointer'
            onClick={() => setSearchTerm('')}
          >
            clear
          </IoClose>
        </div>
        {searchTerm === '' ? (
          <div>
            {/*Top ranked */}
            <section className='flex flex-col gap-4'>
              <h2>Top ranked</h2>
              <div className='flex gap-4 overflow-x-scroll px-2 pb-6'>
                {topRankedMovies.map((item, index) => (
                  <MovieCard
                    key={index}
                    movie={item}
                    movieType='top'
                    index={index}
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
                    index={index}
                    movieType='default'
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
                    index={index}
                    movie={item}
                    movieType='upcoming'
                  />
                ))}
              </div>
            </section>
          </div>
        ) : filteredMovies.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-16 text-center text-zinc-400'>
          <p className='text-lg font-medium text-zinc-300'>No matches found.</p>
          <p className='text-sm text-zinc-500'>
            Try searching for another movie title!
          </p>
        </div>
        ) : (
          <div className='flex flex-col gap-4'>
            <h2>Search results for '{searchTerm}'</h2>
            <div className='flex gap-4 overflow-x-scroll px-2 pb-6'>
              {filteredMovies.map((item, index) => (
                <MovieCard
                  key={index}
                  index={index}
                  movie={item}
                  movieType={
                    new Date(item.release_date) > new Date()
                      ? 'upcoming'
                      : 'default'
                  }
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
