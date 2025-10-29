import { IoTimeOutline } from 'react-icons/io5';
import useBuyTicket from '../../../hooks/useBuyTicket';
import type { MovieData } from '../../../types/movie';
import { TICKET_CURRENCY, TICKET_PRICE } from '../../../types/ticket';
import { formatRuntime } from '../../../utils/format';
import CinemaCheckoutCardForm from './CheckoutForm';

interface CheckoutSectionProps {
  movie: MovieData;
  selectedSeats: string[];
}

const CheckoutSection = ({ movie, selectedSeats }: CheckoutSectionProps) => {
  const { selectedDate, selectedTime } = useBuyTicket();
  return (
    <section className='flex flex-col gap-5 pb-15'>
      <h2 className='text-xl font-semibold'>Summary and payment</h2>

      {/*Summary */}
      <div className='flex flex-col items-start bg-zinc-800 p-5 rounded-xl gap-3'>
        <h2 className='text-xl font-semibold'>Summary</h2>
        {/*Image, title, runtime */}
        <div className='flex items-end gap-2'>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className='h-[100px] object-cover'
          />
          <div className='flex flex-col w-full'>
            <p className='text-wrap'>{movie.title}</p>
            <div className='flex items-center gap-1'>
              <IoTimeOutline />
              <span className='text-sm'>{formatRuntime(movie.runtime)}</span>
            </div>
          </div>
        </div>
        {/*Ticket details */}
        <div className='flex flex-col items-start py-2 gap-2'>
          {/*Date & time*/}
          <div className='flex gap-3'>
            <span>{selectedDate}</span>
            <span>{selectedTime}</span>
          </div>
          {/*Seats*/}
          <div>
            <span>{selectedSeats.length} x Seat:</span>
            <div className='flex flex-wrap gap-1'>
              {selectedSeats.map((seat, index) => (
                <span>
                  Row {seat[0]} • Seat {seat[2]}
                  {index < selectedSeats.length - 1 && ' , '}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*Payment */}
      <div className='flex flex-col items-start bg-zinc-800 p-5 rounded-xl gap-5'>
        <h2 className='text-xl font-semibold'>Payment</h2>
        <div className='flex gap-3'>
          <span>{selectedSeats.length} x Ticket:</span>
          <p>
            {TICKET_CURRENCY} {selectedSeats.length * TICKET_PRICE}
          </p>
        </div>
        <div className='flex gap-3 font-extrabold'>
          <span>Total amount:</span>
          <p>
            {TICKET_CURRENCY} {selectedSeats.length * TICKET_PRICE}
          </p>
        </div>
        <CinemaCheckoutCardForm amount={selectedSeats.length * TICKET_PRICE} />
      </div>
    </section>
  );
};

export default CheckoutSection;
