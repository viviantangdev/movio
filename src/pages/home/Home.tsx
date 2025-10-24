import { useState } from 'react';
import useNowPlaying from '../../hooks/useNowPlaying';
import useUpcoming from '../../hooks/useUpcoming';
import ErrorState from '../../shared/components/ErrorState';
import Loader from '../../shared/components/Loader';
import type { MovieData } from '../../types/movie';
import FilteredSection from './components/FilteredSection';
import HomeHeroSection from './components/HomeHeroSection';
import InTheathersection from './components/InTheathersection';
import TopRankedSection from './components/TopRankedSection';
import UpcomingSection from './components/UpcomingSection';

const Home = () => {
  const { nowPlayingMovies, topRankedMovies, loadingMovies, errorMovies } =
    useNowPlaying();
  const { upcomingMovies, loadingUpcoming, errorUpcoming } = useUpcoming();

  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredMovies: MovieData[] = [
    ...nowPlayingMovies,
    ...upcomingMovies,
  ].filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loadingMovies || loadingUpcoming) return <Loader />;
  if (errorMovies || errorUpcoming)
    return <ErrorState error={errorMovies || errorUpcoming} />;

  return (
    <>
      {/*Hero section */}
      <HomeHeroSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {/*Main section */}
      {/* <main className=' p-7 flex flex-col'> */}
      <main className='w-[90%] md:w-[80%] 2xl:w-[50%] max-w-7xl mx-auto py-7'>
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
          <FilteredSection searchTerm={searchTerm} data={filteredMovies} />
        )}
      </main>
    </>
  );
};

export default Home;
