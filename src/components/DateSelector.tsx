import { useState } from 'react';
import { formatDate, generateDates } from '../utils/format';

const DateSelector = () => {
  const dates = generateDates(7);
  const [selectedDate, setSelectedDate] = useState<Date>(dates[0]);

  return (
    <div className='flex gap-3 overflow-x-auto py-4 px-2 no-scrollbar'>
      {dates.map((date) => {
        const formatted = formatDate(date);
        const isSelected = selectedDate?.toDateString() === date.toDateString();

        return (
          <button
            key={date.toISOString()}
            onClick={() => setSelectedDate(date)}
            className={`
              flex flex-col items-center justify-center
              min-w-[90px] 
              ${isSelected ? 'primaryButton scale-105' : 'secondaryButton'}
            `}
          >
            <span className='text-sm font-semibold'>
              {formatted.split(',')[0]} {/* Weekday */}
            </span>
            <span className='text-lg font-bold'>
              {formatted.split(' ')[1]} {/* Month */}
            </span>
            <span className='text-sm opacity-80'>
              {formatted.split(' ')[2]} {/* Day */}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default DateSelector;
