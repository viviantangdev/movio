import { useState } from 'react';
import { IoTicket } from 'react-icons/io5';
import useMovie from '../../hooks/useMovie';
import ErrorState from '../../shared/components/ErrorState';
import Loader from '../../shared/components/Loader';
import { dates, timeSlots } from '../../types/ticket';
import { formatDate } from '../../utils/format';
import CheckoutSection from './components/CheckoutSection';
import TicketSection from './components/TicketSection';

const BuyTicket = () => {
  const { movie, loadingMovie, errorMovie } = useMovie();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDate(dates[0])
  );
  const [selectedTime, setSelectedTime] = useState<string>(timeSlots[0].time);
  const [email, setEmail] = useState<string>('');
  const [isAllFiled, setIsAllFiled] = useState<boolean>(false); ///Change to false when ready
  if (loadingMovie) return <Loader />;
  if (!movie || errorMovie) return <ErrorState error={errorMovie} />;

  return (
    <main className='space-y-7'>
      <div className='flex items-center gap-2'>
        <IoTicket className='text-2xl' />
        <h2>Buy ticket</h2>
      </div>
      {isAllFiled ? (
        <CheckoutSection
          movie={movie}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedSeats={selectedSeats}
          email={email}
        />
      ) : (
        <TicketSection
          movie={movie}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSelectedDate={setSelectedDate}
          onSelectedTime={setSelectedTime}
          selectedSeats={selectedSeats}
          onSelectedSeats={setSelectedSeats}
          nextStep={() => setIsAllFiled(true)}
          email={email}
          onEmailChange={setEmail}
        />
      )}
    </main>
  );
};

export default BuyTicket;
