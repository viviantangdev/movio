import { useState } from 'react';
import useHome from '../../hooks/pages/useHome';
import ErrorState from '../../shared/components/ErrorState';
import Loader from '../../shared/components/Loader';
import type { MovieData } from '../../types/movie';
import FilteredMovieSection from './components/FilteredMoviesSection';
import HomeHeroSection from './components/HomeHeroSection';
import InTheathersection from './components/InTheathersection';
import TopRankedSection from './components/TopRankedSection';
import UpcomingSection from './components/UpcomingSection';

const Home = () => {
  const {
    upcomingMovies,
    nowPlayingMovies,
    topRankedMovies,
    loadingHome,
    errorHome,
  } = useHome();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredMovies: MovieData[] = [
    ...nowPlayingMovies,
    ...upcomingMovies,
  ].filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loadingHome) return <Loader />;
  if (errorHome) return <ErrorState error={errorHome} />;

  return (
    <>
      {/*Hero section */}
      <HomeHeroSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {/*Main section */}
      <main>
        {searchTerm === '' ? (
          <div className='flex flex-col gap-16 my-8'>
            {/*Top ranked */}
            <TopRankedSection data={topRankedMovies} />
            {/*In theather */}
            <InTheathersection data={nowPlayingMovies} />
            {/*Upcoming */}
            <UpcomingSection data={upcomingMovies} />
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16 text-center text-zinc-400'>
            <p className='text-lg font-medium text-zinc-300'>
              No matches found.
            </p>
            <p className='text-sm text-zinc-500'>
              Try searching for another movie title!
            </p>
          </div>
        ) : (
          <FilteredMovieSection searchTerm={searchTerm} data={filteredMovies} />
        )}
      </main>
    </>
  );
};

export default Home;
