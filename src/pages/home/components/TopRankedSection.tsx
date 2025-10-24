import type { MovieData } from '../../../types/movie';
import MovieCard from './MovieCard';

type TopRankedSectionProps = {
  data: MovieData[];
};

const TopRankedSection = ({ data }: TopRankedSectionProps) => {
  return (
    <section className='flex flex-col gap-4'>
      <h2>Top ranked</h2>
      <div className='grid grid-flow-col auto-cols-[minmax(200px,1fr)] gap-4 overflow-x-auto pb-4 snap-x snap-mandatory'>
        {data.map((item, index) => (
          <MovieCard key={index} movie={item} movieType='top' index={index} />
        ))}
      </div>
    </section>
  );
};

export default TopRankedSection;
