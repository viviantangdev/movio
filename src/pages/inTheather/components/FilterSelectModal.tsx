import { IoFilter } from 'react-icons/io5';
import Modal from '../../../shared/components/Modal';

interface FilterOption {
  id: string | number;
  name: string;
}

interface FilterConfig {
  label: string;
  data: FilterOption[];
  selected: string[];
  onSelect: (value: string) => void;
  isMulti?: boolean;
  hasAllOption?: boolean;
}

interface FilterSelectModalProps {
  filters: Record<string, FilterConfig>;
}

const FilterSelectModal = ({ filters }: FilterSelectModalProps) => {
  const getItemClassName = (selected: boolean) => {
    return `cursor-pointer px-2 py-1 rounded-xl transition-smooth border-1
        ${
          selected
            ? 'border-emerald-500 bg-emerald-500 text-black'
            : 'border-zinc-800 hover:text-emerald-400 hover:border-zinc-700'
        }`;
  };

  return (
    <Modal
      header='Filter'
      button={{
        text: 'Filter',
        icon: <IoFilter />,
        className:
          'bg-zinc-900 p-2 text-zinc-50 rounded-xl shadow-2xs border-none ring-2 ring-zinc-500 hover:ring-emerald-400 transition-smooth',
      }}
      children={
        <div className='flex flex-col gap-4'>
          {Object.entries(filters).map(([key, config]) => {
            const { label, data, selected, onSelect, hasAllOption } = config;

            const isAllSelected = hasAllOption && selected.includes('All');

            return (
              <section key={key}>
                <p className='font-semibold mb-2'>{label}</p>
                <div className='flex flex-wrap gap-2'>
                  {hasAllOption && (
                    <p
                      onClick={() => onSelect('All')}
                      className={getItemClassName(isAllSelected!)}
                    >
                      All
                    </p>
                  )}

                  {data.map((item) => {
                    const isSelected = selected.includes(item.name);

                    return (
                      <p
                        key={item.id}
                        onClick={() => onSelect(item.name)}
                        className={getItemClassName(isSelected)}
                      >
                        {item.name}
                      </p>
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

export default FilterSelectModal;
