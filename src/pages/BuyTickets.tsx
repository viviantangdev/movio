import DateSelector from '../components/DateSelector';
import TimeSelector from '../components/TimeSelector';
import SeatSelector from '../components/seatSelector';

const BuyTickets = () => {
  return (
    <div className='p-7'>
      <h2>Buy tickets</h2>
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
