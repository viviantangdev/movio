import { useState } from 'react';
import { IoCard, IoTicket, IoTimeOutline } from 'react-icons/io5';
import useMovie from '../../hooks/useMovie';
import ErrorState from '../../shared/components/ErrorState';
import Loader from '../../shared/components/Loader';
import { TICKET_PRICE, type TimeSlots } from '../../types/ticket';
import { formatDate, formatRuntime, generateDates } from '../../utils/format';
import DateAndTiimeSelectModal from './components/DateAndTiimeSelectModal';
import SeatSelector from './components/SeatSelector';

const BuyTicket = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const timeSlots: TimeSlots[] = [
    { time: '15:00', status: 'available' },
    { time: '18:00', status: 'full' },
    { time: '21:00', status: 'full' },
  ];
  const { movie, loadingMovie, errorMovie } = useMovie();
  const dates = generateDates(7);
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDate(dates[0])
  );
  const [selectedTime, setSelectedTime] = useState<string>(timeSlots[0].time);

  if (loadingMovie) return <Loader />;
  if (!movie || errorMovie) return <ErrorState error={errorMovie} />;

  return (
    <main className='space-y-7'>
      <div className='flex items-center gap-2'>
        <IoTicket className='text-2xl' />
        <h2>Buy ticket</h2>
      </div>
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
              onSelect: setSelectedDate,
            },
            time: {
              label: 'Time',
              data: timeSlots.map((t, i) => ({ id: i, name: t.time })),
              selected: selectedTime,
              onSelect: setSelectedTime,
            },
          }}
        />
      </div>
      <div className='flex flex-col items-start bg-zinc-800 p-5 rounded-xl'>
        <h3 className='font-medium'>Select seat(s)</h3>
        <div className='w-full'>
          <SeatSelector
            selectedSeats={selectedSeats}
            onSeatChange={setSelectedSeats}
          />
        </div>
      </div>
      <div className='flex justify-between items-start bg-zinc-800 p-5 rounded-xl'>
        <p>Ticket x {selectedSeats.length}</p>
        <p>${selectedSeats.length*TICKET_PRICE}</p>
      </div>
      {/* <Link to={`/movies/${movie.id}/ticket`}> */}
      <button className='primaryButton flex items-center gap-2'>
        <IoCard />
        Continue to payment
      </button>
      {/* </Link> */}
    </main>
  );
};

export default BuyTicket;
