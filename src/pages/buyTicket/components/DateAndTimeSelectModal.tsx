import { IoPencil } from 'react-icons/io5';
import Modal from '../../../shared/components/Modal';

interface DateAndTimeOption {
  id: string | number;
  name: string;
  value: string;
  isFull?: boolean;
}

interface DateAndTimeConfig {
  label: string;
  data: DateAndTimeOption[];
  selected: string;
  onSelect: (value: string) => void;
}

interface DateAndTimeSelectProps {
  filters: Record<string, DateAndTimeConfig>;
}
const DateAndTimeSelectModal = ({ filters }: DateAndTimeSelectProps) => {
  const getItemClassName = (selected: boolean, isFull: boolean) => {
    return `cursor-pointer px-2 py-1 rounded-xl transition-smooth border-1
       ${
         selected
           ? 'border-emerald-500 bg-emerald-500 text-black'
           : isFull
           ? 'border-gray-600 text-gray-500 bg-transparent !cursor-not-allowed border-dashed'
           : 'border-zinc-800 hover:text-emerald-400 hover:border-zinc-700'
       }
        
      `;
  };

  return (
    <Modal
      header='Filter'
      button={{
        text: 'Change',
        icon: <IoPencil />,
        className:
          'bg-zinc-900 p-2 text-zinc-50 rounded-xl shadow-2xs border-none ring-2 ring-zinc-500 hover:ring-emerald-400 transition-smooth',
      }}
      children={
        <div className='flex flex-col gap-4'>
          {Object.entries(filters).map(([key, config]) => {
            const { label, data, selected, onSelect } = config;

            return (
              <section key={key}>
                <p className='font-semibold mb-2'>{label}</p>
                <div className='flex flex-wrap gap-2'>
                  {data.map((item) => {
                    const isSelected = selected.includes(item.value);
                    const isFull = item.isFull === true;
                    return (
                      <button
                        key={item.id}
                        disabled={isFull}
                        onClick={() => onSelect(item.value)}
                        className={getItemClassName(isSelected, isFull)}
                      >
                        {isFull ? `${item.name} - Sold out` : `${item.name}`}
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      }
    />
  );
};

export default DateAndTimeSelectModal;
