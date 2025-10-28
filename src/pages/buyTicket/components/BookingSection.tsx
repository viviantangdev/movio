import { useEffect, useState } from 'react';
import { IoTimeOutline } from 'react-icons/io5';
import type { MovieData } from '../../../types/movie';
import { dates, TICKET_CURRENCY, TICKET_PRICE, timeSlots } from '../../../types/ticket';
import { formatDate, formatRuntime } from '../../../utils/format';
import DateAndTiimeSelectModal from './DateAndTimeSelectModal';
import SeatSelector from './SeatSelector';

interface BookingSectionProps {
  movie: MovieData;
  selectedDate: string;
  onSelectedDate: (value: string) => void;
  selectedTime: string;
  onSelectedTime: (value: string) => void;
  selectedSeats: string[];
  onSelectedSeats: (selected: string[]) => void;
  nextStep: () => void;
}
const BookingSection = ({
  movie,
  selectedDate,
  selectedTime,
  onSelectedDate,
  onSelectedTime,
  selectedSeats,
  onSelectedSeats,
  nextStep,
}: BookingSectionProps) => {
  const [errorSeats, setErrorSeats] = useState<string>('');

  useEffect(() => {
    if (selectedSeats.length > 0 && errorSeats) setErrorSeats('');
  }, [selectedSeats, errorSeats]);

  const handleNextStep = () => {
    // reset existing errors
    setErrorSeats('');

    const hasSeats = selectedSeats.length > 0;

    if (!hasSeats) {
      setErrorSeats('Please select at least one seat');
      return;
    }

    nextStep();
  };

  return (
    <section className='flex flex-col gap-5'>
      <h2 className='text-xl font-semibold'>Select Date, Time & Seats</h2>
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
            <span className='text-sm'>{formatRuntime(movie.runtime)}</span>
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
      <div className='flex items-start justify-between bg-zinc-800 p-5 rounded-xl'>
        <div className='flex flex-col gap-2'>
          <h3 className='font-medium'>Date and times</h3>
          <div className='flex flex-col'>
            <span>{selectedDate}</span>
            <span>{selectedTime}</span>
          </div>
        </div>
        <DateAndTiimeSelectModal
          filters={{
            date: {
              label: 'Date',
              data: dates.map((d, i) => ({ id: i, name: formatDate(d) })),
              selected: selectedDate,
              onSelect: onSelectedDate,
            },
            time: {
              label: 'Time',
              data: timeSlots.map((t, i) => ({ id: i, name: t.time })),
              selected: selectedTime,
              onSelect: onSelectedTime,
            },
          }}
        />
      </div>
      <div className='flex flex-col items-start bg-zinc-800 p-5 rounded-xl'>
        <h3 className='font-medium'>Select one or more seats</h3>
        {errorSeats && <p className='text-red-500 text-sm'>{errorSeats}</p>}

        <div className='w-full'>
          <SeatSelector
            selectedSeats={selectedSeats}
            onSeatChange={onSelectedSeats}
          />
        </div>
      </div>
      <div className='flex justify-between items-start bg-zinc-800 p-5 rounded-xl'>
        <p>Ticket x {selectedSeats.length}</p>
        <p>{TICKET_CURRENCY} {selectedSeats.length * TICKET_PRICE}</p>
      </div>

      <button
        type='submit'
        onClick={handleNextStep}
        className='primaryButton md:w-1/5'
      >
        Checkout
      </button>
    </section>
  );
};

export default BookingSection;
