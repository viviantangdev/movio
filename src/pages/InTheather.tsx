import { useState } from 'react';
import { IoClose, IoSearchOutline, IoTimeOutline } from 'react-icons/io5';
import useGenre from '../hooks/useGenre';

import ErrorState from '../components/ErrorState';
import Loader from '../components/Loader';
import useInTheather from '../hooks/useInTheather';
import { formatRuntime } from '../utils/format';

interface TImeSlots {
  time: string;
  status: Status;
}

type Status = 'full' | 'available';

const InTheather = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { genres } = useGenre();
  const { inTheather, loadingInTheather, errorInTheather } = useInTheather();

  if (loadingInTheather) return <Loader />;
  if (errorInTheather) return <ErrorState error={errorInTheather} />;

  const timeSlots: TImeSlots[] = [
    { time: '15:00', status: 'available' },
    { time: '18:00', status: 'full' },
    { time: '21:00', status: 'full' },
  ];

  return (
    <div className='p-7 flex flex-col gap-7'>
      <h2>In Theather</h2>
      {/*Filter  */}
      <div className='flex items-center gap-3'>
        <div className='relative flex justify-between items-center w-1/3 group'>
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
        <div className='w-2/3 '>
          {genres.map((g) => (
            <p>{g.name}</p>
          ))}
        </div>
      </div>
      {/*Movies  */}

      <ul className='w-full divide-amber-300 divide-y'>
        {inTheather.map((movie, index) => (
          <li key={index} className='py-9'>
            <div className='flex justify-between items-center'>
              {/*Movie */}
              <div className='flex items-end gap-2 bg-amber-500'>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className='h-[150px] object-cover'
                />
                <div>
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
              {/*Timeslot */}
              <div className='flex flex-col bg-amber-700 gap-7'>
                {timeSlots.map((time, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center gap-6'
                  >
                    <span>{time.time}</span>
                    <span
                      className={`p-2 ${
                        time.status === 'full'
                          ? 'bg-transparent cursor-not-allowed'
                          : 'primaryButton cursor-pointer rounded-xl'
                      }`}
                    >
                      {time.status === 'full' ? 'Sold out' : 'Buy ticket'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InTheather;
