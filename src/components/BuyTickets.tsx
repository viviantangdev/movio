import { IoTicket } from 'react-icons/io5';
import DateSelector from './DateSelector';
import SeatSelector from './SeatSelector';
import TimeSelector from './TimeSelector';

const BuyTickets = () => {
  return (
    <div className='p-7'>
      <div className='flex items-center gap-2'>
        <IoTicket className='text-2xl' />
        <h2>Buy tickets</h2>
      </div>
      <p>Select date and time:</p>
      <DateSelector />
      <TimeSelector />
      <SeatSelector />
      <div className='flex justify-center'>
        <button
          onClick={() => {}}
          className='secondaryButton flex items-center gap-2'
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BuyTickets;
