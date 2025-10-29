import { useState } from 'react';
import { IoTicket } from 'react-icons/io5';
import useBuyTicket from '../../hooks/useBuyTicket';
import ErrorState from '../../shared/components/ErrorState';
import Loader from '../../shared/components/Loader';
import BookingSection from './components/BookingSection';
import CheckoutSection from './components/CheckoutSection';

const BuyTicket = () => {
  const { movie, loadingMovie, errorMovie } = useBuyTicket();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isAllFiled, setIsAllFiled] = useState<boolean>(false); 
  
  if (loadingMovie) return <Loader />;
  if (!movie || errorMovie) return <ErrorState error={errorMovie} />;

  return (
    <main className='space-y-7'>
      <div className='flex items-center gap-2'>
        <IoTicket className='text-2xl' />
        <h2>Buy ticket</h2>
      </div>
      {isAllFiled ? (
        <CheckoutSection movie={movie} selectedSeats={selectedSeats} />
      ) : (
        <BookingSection
          movie={movie}
          selectedSeats={selectedSeats}
          onSelectedSeats={setSelectedSeats}
          nextStep={() => setIsAllFiled(true)}
        />
      )}
    </main>
  );
};

export default BuyTicket;
