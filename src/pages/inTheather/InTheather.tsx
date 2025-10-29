import { useState } from 'react';
import { IoTimeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import useInTheather from '../../hooks/useInTheather';
import Accordion from '../../shared/components/Accordion';
import ErrorState from '../../shared/components/ErrorState';
import Loader from '../../shared/components/Loader';
import type { MovieWithSchedule } from '../../types/ticket';
import { formatDateLabel, formatRuntime } from '../../utils/format';
import { getOriginalLanguage } from '../../utils/helpers';
import FilterSection from './components/FilterSection';
import InTheatherHeroSection from './components/InTheatherHeroSection';

const InTheather = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>(['All']);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['All']);
  const [selectedDate, setSelectedDate] = useState<string[]>(['All']);
  const navigate = useNavigate();

  const {
    inTheather,
    languages,
    genres,
    allDates,
    loadingInTheather,
    errorInTheather,
  } = useInTheather();

  if (loadingInTheather) return <Loader />;
  if (errorInTheather) return <ErrorState error={errorInTheather} />;

  const filterMovies: MovieWithSchedule[] = inTheather.filter((movie) => {
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

      // Filter by selected dates
      const hasAvailabilityOnSelectedDates = selectedDate.includes('All')
        ? Object.values(movie.schedule).some((showtimes) =>
            showtimes.some((show) => !show.isFull)
          )
        : selectedDate.some((date) =>
            movie.schedule[date]?.some((show) => !show.isFull)
          );
      return (
        matchesSearch &&
        matchesGenre &&
        matchesLang &&
        hasAvailabilityOnSelectedDates
      );
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
          allDates={allDates}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        {/*List of movies */}
        {filterMovies.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16 text-center text-zinc-400'>
            <p className='text-lg font-medium text-zinc-300'>
              No matches found.
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
                    </div>
                  </div>
                </div>
              ),
              content: (
                <div className='flex flex-col gap-6'>
                  {Object.entries(movie.schedule).map(([date, showtimes]) => (
                    <div key={date} className='flex flex-col gap-3'>
                      {/* Date label */}
                      <h4 className='font-semibold text-lg'>
                        {formatDateLabel(date)}
                      </h4>

                      {/* Times row */}
                      <div className='flex flex-wrap gap-3'>
                        {showtimes.map((show) => {
                          const handleClick = () => {
                            if (show.isFull) return; // disable full

                            // Build URL with query params
                            const searchParams = new URLSearchParams({
                              date,
                              time: show.time,
                            });

                            navigate(
                              `/movies/${
                                movie.id
                              }/ticket?${searchParams.toString()}`
                            );
                          };

                          return (
                            <button
                              key={`${date}-${show.time}`}
                              onClick={handleClick}
                              // to={`/movies/${movie.id}/ticket`}
                              className={`px-4 py-2 rounded-xl text-sm font-medium border
                              ${
                                show.isFull
                                  ? 'border-gray-600 text-gray-500 bg-transparent cursor-not-allowed border-dashed'
                                  : 'bg-blue-600 text-white hover:bg-blue-700 transition'
                              }`}
                            >
                              {show.isFull
                                ? `${show.time} — Sold out`
                                : `${show.time}`}
                            </button>
                          );
                        })}
                      </div>
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
