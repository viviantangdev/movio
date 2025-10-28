import { IoTimeOutline } from 'react-icons/io5';
import type { MovieData } from '../../../types/movie';
import { TICKET_PRICE } from '../../../types/ticket';
import { formatRuntime } from '../../../utils/format';

interface CheckoutSectionProps {
  movie: MovieData;
  selectedDate: string;
  selectedTime: string;
  selectedSeats: string[];
  email: string;
}

const CheckoutSection = ({
  movie,
  selectedDate,
  selectedTime,
  selectedSeats,
  email,
}: CheckoutSectionProps) => {
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
            <span>{selectedSeats.length} seats:</span>
            <div className='flex flex-wrap gap-1'>
              {selectedSeats.map((seat, index) => (
                <span>
                  Row {seat[0]} • Seat {seat[2]}
                  {index < selectedSeats.length - 1 && ' , '}
                </span>
              ))}
            </div>
          </div>
          {/*Ticket total*/}
          <div className='flex gap-3'>
            <p>{selectedSeats.length} tickets</p>
            <p>${selectedSeats.length * TICKET_PRICE}</p>
          </div>
          {/*Email*/}
          <div className='flex flex-col'>
            <span>Ticket delivery:</span>
            <span>{email}</span>
          </div>
        </div>
      </div>
      {/*Payment */}
      <div className='flex flex-col items-start bg-zinc-800 p-5 rounded-xl gap-5'>
        <h2 className='text-xl font-semibold'>Payment</h2>
        <div className='flex gap-3'>
          <span>Total amount:</span>
          <p>${selectedSeats.length * TICKET_PRICE}</p>
        </div>
        <form className='flex flex-col gap-2 w-full md:w-[500px]'>
          <div className='flex flex-col gap-2'>
            <label>Credit card number</label>
            <input type='number' required className='w-full px-2 ' />
          </div>
          <div className='flex gap-3 w-full'>
          <div className='flex flex-col gap-2 w-full'>
              <label>Expiry date</label>
              <input type='number' required className='w-full px-2' />
            </div>
          <div className='flex flex-col gap-2 w-full'>
              <label>CCV</label>
              <input type='number' required className='w-full px-2' />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label>Name on card</label>
            <input type='number' required className='w-full px-2' />
          </div>
        </form>
        <button type='submit' className='primaryButton w-full md:w-1/5'>
          Pay
        </button>
      </div>
    </section>
  );
};

export default CheckoutSection;
