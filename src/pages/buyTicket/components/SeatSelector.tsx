import { IoClose } from 'react-icons/io5';
import type { Seat } from '../../../types/ticket';

interface SeatSelectorProps {
  selectedSeats: string[];
  onSeatChange: (selected: string[]) => void;
}
const SeatSelector = ({ selectedSeats, onSeatChange }: SeatSelectorProps) => {
  const rows = 4;
  const perRow = 6;

  const generateSeats = (rows: number, perRow: number): Seat[] => {
    const seats: Seat[] = [];
    for (let row = 1; row <= rows; row++) {
      for (let num = 1; num <= perRow; num++) {
        seats.push({
          id: `${row}-${num}`,
          row,
          number: num,
        });
      }
    }
    return seats;
  };

  const seats = generateSeats(rows, perRow);

  const toggleSeat = (seat: Seat) => {
    const seatId = seat.id;
    if (selectedSeats.includes(seatId)) {
      onSeatChange(selectedSeats.filter((s) => s !== seatId));
    } else {
      onSeatChange([...selectedSeats, seatId]);
    }
  };

  return (
    <div className='flex flex-col items-center gap-6 py-8'>
      <div className='w-3/4 h-2 bg-zinc-700 rounded-full mb-6'>
        <p className='text-center text-xs text-zinc-400 mt-2'>SCREEN</p>
      </div>

      <div
        className='grid gap-3 justify-center'
        style={{ gridTemplateColumns: `repeat(${perRow}, minmax(0, 1fr))` }}
      >
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat.id);
          return (
            <button
              key={seat.id}
              onClick={() => toggleSeat(seat)}
              className={`
                w-8 h-8 transition-smooth 
                ${isSelected ? 'primaryButton scale-110' : 'secondaryButton'}
              `}
            />
          );
        })}
      </div>
      {/*Seat info */}
      <div className='flex gap-5'>
        <div className='flex items-center gap-1'>
          <div className='w-8 h-8 rounded-xl bg-emerald-400 border-zinc-800 border'></div>
          <span className='text-xs'>Selected</span>
        </div>
        <div className='flex items-center gap-1'>
          <div className='w-8 h-8 rounded-xl bg-zinc-900 border-zinc-800 border'></div>
          <span className='text-xs'>Available</span>
        </div>
        <div className='flex items-center gap-1'>
          <div className='w-8 h-8 rounded-xl bg-zinc-600 flex justify-center items-center'>
            <IoClose />
          </div>
          <span className='text-xs'>Booked</span>
        </div>
      </div>
      {/* Selected info */}
      <div className='mt-6 text-zinc-400 text-sm'>
        {selectedSeats.length > 0
          ? `Selected seats:`
          : 'No seats selected yet.'}
      </div>
      <div className='flex flex-wrap gap-2'>
        {selectedSeats.map((seat) => (
          <span className='px-3 py-1 bg-emerald-500 text-zinc-900 rounded-full text-sm shadow-md'>
            Row {seat[0]} • Seat {seat[2]}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SeatSelector;
