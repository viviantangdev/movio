import { IoCalendarClearOutline } from 'react-icons/io5';
import Modal from '../../../shared/components/Modal';
import { formatDate } from '../../../utils/format';

interface DateSelectModalProps {
  dates: Date[];
  selectedDate: string;
  onSelect: (date: string) => void;
}
const DateSelectModal = ({
  dates,
  selectedDate,
  onSelect,
}: DateSelectModalProps) => {
  return (
    <Modal
      header='Select date'
      button={{
        text: `${selectedDate}`,
        icon: <IoCalendarClearOutline />,
        className:
          'bg-zinc-900 p-2 text-zinc-50 rounded-xl shadow-2xs border-none ring-2 ring-zinc-500 hover:ring-emerald-400 transition-smooth',
      }}
      children={
        <div className='flex flex-wrap gap-2'>
          {dates.map((date, index) => (
            <p
              key={index}
              onClick={() => {
                onSelect(formatDate(date));
              }}
              className={`cursor-pointer px-2 py-1 rounded transition-smooth border-1 ${
                formatDate(date) === selectedDate
                  ? 'border-emerald-500 bg-emerald-500 text-black'
                  : 'border-zinc-800 hover:text-emerald-400 hover:border-zinc-700'
              }`}
            >
              {formatDate(date)}
            </p>
          ))}
        </div>
      }
    />
  );
};

export default DateSelectModal;
