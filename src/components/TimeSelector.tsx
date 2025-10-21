import { useState } from 'react';

const TimeSelector = () => {
  const times = ['09:00', '12:00', '15:00', '18:00', '23:00'];
  const [selectedTime, setSelectedTime] = useState<string>(times[0]);
  return (
    <div className='flex gap-3 overflow-x-auto py-4 px-2 no-scrollbar'>
      {times.map((time) => {
        const isSelected = selectedTime === time;

        return (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`
              flex flex-col items-center justify-center
              min-w-[90px] 
              ${isSelected ? 'primaryButton scale-105' : 'secondaryButton'}
            `}
          >
            <span className='text-lg font-semibold'>{time}</span>
          </button>
        );
      })}
    </div>
  );
};
export default TimeSelector;
