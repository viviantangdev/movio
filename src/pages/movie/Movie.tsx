import heroUrl from '../../assets/hero.jpg';
import useCredits from '../../hooks/useCredits';
import useLanguages from '../../hooks/useLanguages';
import useMovie from '../../hooks/useMovie';
import useVideo from '../../hooks/useVideo';
import ErrorState from '../../shared/components/ErrorState';
import Loader from '../../shared/components/Loader';
import type { Language, MovieData } from '../../types/movie';
import MovieHeroSection from './components/MovieHeroSection';

const Movie = () => {
  const { movie, loadingMovie, errorMovie } = useMovie();
  const { casts, crews, loadingCredits, errorCredits } = useCredits();
  const { languages, loadingLanguages, errorLanguages } = useLanguages();
  const { movieTrailer } = useVideo();

  if (loadingMovie || loadingCredits || loadingLanguages) return <Loader />;
  if (!movie || errorMovie || errorCredits || errorLanguages)
    return <ErrorState error={errorMovie || errorCredits || errorLanguages} />;

  const getOriginalLanguage = (
    movie: MovieData,
    languages: Language[]
  ): string => {
    const iso = movie.original_language;
    const found = languages.find((l) => l.iso_639_1 === iso);
    return found?.english_name ?? 'Unknown';
  };

  const originalLanguage = getOriginalLanguage(movie, languages);

  return (
    <>
      {/*Movie hero */}
      <MovieHeroSection movie={movie} movieTrailer={movieTrailer} />
      {/*Movie info */}
      <main className='flex flex-col gap-7 p-7'>
        <p className='mt-5'>{movie.overview}</p>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <span className='font-extralight text-gray-400'>
              Original title:
            </span>
            <p>{movie.original_title}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='font-extralight text-gray-400'>
              Original language:
            </span>
            <p>{originalLanguage}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <span className='font-extralight text-gray-400'>Release date:</span>
            <p>{movie.release_date}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='font-extralight text-gray-400'>Directors:</span>
            <div className='flex gap-2 overflow-x-auto'>
              {crews.map((director, index) => (
                <div
                  key={index}
                  className='flex flex-col gap-2 items-center w-[80px] flex-shrink-0'
                >
                  <img
                    src={
                      director.profile_path
                        ? `https://image.tmdb.org/t/p/w500${director.profile_path}`
                        : heroUrl
                    }
                    alt={director.name}
                    className='rounded-xl w-[80px] h-[80px] object-cover'
                  />
                  <p className='text-xs text-center'>{director.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='font-extralight text-gray-400'>Actors:</span>
            <div className='flex gap-2 overflow-x-auto'>
              {casts.map((actor, index) => (
                <div
                  key={index}
                  className='flex flex-col gap-2 items-center w-[80px] flex-shrink-0'
                >
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : heroUrl
                    }
                    alt={actor.name}
                    className='rounded-xl w-[80px] h-[80px] object-cover'
                  />
                  <p className='text-xs text-center'>{actor.name}</p>
                  <p className='text-xs text-center'>({actor.character})</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Movie;
