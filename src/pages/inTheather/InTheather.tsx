import { useState } from 'react';
import { IoTimeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import useInTheather from '../../hooks/pages/useInTheather';
import useGenre from '../../hooks/useGenre';
import Accordion from '../../shared/components/Accordion';
import ErrorState from '../../shared/components/ErrorState';
import Loader from '../../shared/components/Loader';
import type { MovieData } from '../../types/movie';
import type { TimeSlots } from '../../types/ticket';
import { formatRuntime } from '../../utils/format';
import { getOriginalLanguage } from '../../utils/helpers';
import FilterSection from './components/FilterSection';
import InTheatherHeroSection from './components/InTheatherHeroSection';

const InTheather = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { genres } = useGenre();
  const [selectedGenres, setSelectedGenres] = useState<string[]>(['All']);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['All']);

  const { inTheather, languages, loadingInTheather, errorInTheather } =
    useInTheather();

  if (loadingInTheather) return <Loader />;
  if (errorInTheather) return <ErrorState error={errorInTheather} />;

  const timeSlots: TimeSlots[] = [
    { time: '15:00', status: 'available' },
    { time: '18:00', status: 'full' },
    { time: '21:00', status: 'full' },
  ];

  const filterMovies: MovieData[] = inTheather.filter((movie) => {
    {
      //Filter by searchTerm
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      //Filter by genre
      const isAllSelected = selectedGenres.includes('All');
      const genreName = movie.genres.map((g) => g.name);
      const matchesGenre =
        isAllSelected ||
        genreName.some((genreName) => selectedGenres.includes(genreName));

      //Filter by languages
      const isAllLangSelected = selectedLanguages.includes('All');
      const langName = getOriginalLanguage(movie, languages);
      const matchesLang =
        isAllLangSelected || selectedLanguages.includes(langName);

      return matchesSearch && matchesGenre && matchesLang;
    }
  });

  return (
    <>
      <InTheatherHeroSection />
      <main>
        {/*Filter section */}
        <FilterSection
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          genres={genres}
          selectedGenres={selectedGenres}
          onGenresChange={setSelectedGenres}
          languages={languages}
          selectedLanguages={selectedLanguages}
          onLanguagesChange={setSelectedLanguages}
        />
        {/*List of movies */}
        {filterMovies.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16 text-center text-zinc-400'>
            <p className='text-lg font-medium text-zinc-300'>
              No matches found.
            </p>
            <p className='text-sm text-zinc-500'>
              Try searching for another movie title!
            </p>
          </div>
        ) : (
          <Accordion
            items={filterMovies.map((movie) => ({
              header: (
                <div className='flex items-end gap-2'>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className='h-[150px] object-cover'
                  />
                  <div className='flex flex-col items-start py-2'>
                    <p>{movie.title}</p>
                    <div className='flex items-center gap-1'>
                      <IoTimeOutline />
                      <span className='text-sm'>
                        {formatRuntime(movie.runtime)}
                      </span>
                    </div>
                    <div className='flex flex-wrap gap-2 mt-2'>
                      {movie.genres.map((genre) => (
                        <span key={genre.id} className='text-sm'>
                          {genre.name}
                        </span>
                      ))}
                      {getOriginalLanguage(movie, languages)}
                    </div>
                  </div>
                </div>
              ),
              content: (
                <div className='flex flex-col gap-7 '>
                  {timeSlots.map((time, index) => (
                    <div
                      key={index}
                      className='flex justify-between items-center gap-6'
                    >
                      <span>{time.time}</span>
                      <Link to={`/movies/${movie.id}/ticket`}>
                        <button
                          className={`p-2 ${
                            time.status === 'full'
                              ? 'bg-transparent !cursor-not-allowed'
                              : 'primaryButton cursor-pointer rounded-xl'
                          }`}
                        >
                          {time.status === 'full' ? 'Sold out' : 'Buy ticket'}
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              ),
            }))}
          />
        )}
      </main>
    </>
  );
};

export default InTheather;
