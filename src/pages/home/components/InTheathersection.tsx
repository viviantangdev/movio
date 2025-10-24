import { Link } from 'react-router-dom';
import type { MovieData } from '../../../types/movie';
import MovieCard from './MovieCard';
type InTheathersectionProps = {
  data: MovieData[];
};

const InTheathersection = ({ data }: InTheathersectionProps) => {
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex justify-between items-end'>
        <h2>In theather</h2>
        <Link to='intheather'>
          <span className='text-emerald-400'>See all</span>
        </Link>
      </div>
      <div className='grid grid-flow-col auto-cols-[minmax(200px,1fr)] gap-4 overflow-x-auto pb-4 snap-x snap-mandatory'>
        {data.map((item, index) => (
          <MovieCard
            key={index}
            movie={item}
            index={index}
            movieType='default'
          />
        ))}
      </div>
    </section>
  );
};

export default InTheathersection;
