import type { MovieData } from '../../../types/movie';
import MovieCard from './MovieCard';

type FilteredSectionProps = {
  searchTerm: string;
  data: MovieData[];
};

const FilteredSection = ({ searchTerm, data }: FilteredSectionProps) => {
  return (
    <section className='flex flex-col gap-4'>
      <h2>Search results for '{searchTerm}'</h2>
      <div className='grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'>
        {data.map((item, index) => (
          <MovieCard
            key={index}
            index={index}
            movie={item}
            movieType={
              new Date(item.release_date) > new Date() ? 'upcoming' : 'default'
            }
          />
        ))}
      </div>
    </section>
  );
};

export default FilteredSection;
