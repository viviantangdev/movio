import type { MovieData } from '../../../types/movie';
import MovieCard from './MovieCard';

type UpcomingSectionProps = {
  data: MovieData[];
};

const UpcomingSection = ({ data }: UpcomingSectionProps) => {
  return (
    <section className='flex flex-col gap-4'>
      <h2>Upcoming</h2>
      <div className='grid grid-flow-col auto-cols-[minmax(200px,1fr)] gap-4 overflow-x-auto pb-4 snap-x snap-mandatory'>
        {data.map((item, index) => (
          <MovieCard
            key={index}
            index={index}
            movie={item}
            movieType='upcoming'
          />
        ))}
      </div>
    </section>
  );
};

export default UpcomingSection;
