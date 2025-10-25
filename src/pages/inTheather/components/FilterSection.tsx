import { useState } from 'react';
import { IoClose, IoSearchOutline } from 'react-icons/io5';
import type { Genre } from '../../../types/movie';
import { formatDate, generateDates } from '../../../utils/format';
import DateSelectModal from './DateSelectModal';
import FilterSelectModal from './FilterSelectModal';

interface FilterSectipnProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  genres: Genre[];
  selectedGenres: string[];
  onGenresChange: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterSection = ({
  searchTerm,
  onSearchChange,
  genres,
  selectedGenres,
  onGenresChange,
}: FilterSectipnProps) => {
  const dates = generateDates(7);
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDate(dates[0])
  );

  const handleGenreSelect = (genre: string) => {
    onGenresChange((prev) => {
      // If user clicks "All"
      if (genre === 'All') {
        return ['All'];
      }

      // Remove "All" if other genres are selected
      const filtered = prev.filter((g) => g !== 'All');

      // Toggle the clicked genre
      const isSelected = filtered.includes(genre);
      const updated = isSelected
        ? filtered.filter((g) => g !== genre)
        : [...filtered, genre];

      // If all deselected, fallback to "All"
      return updated.length === 0 ? ['All'] : updated;
    });
  };

  const handleRemoveFilter = (filter: string) => {
    const filtered = selectedGenres.filter((g) => g !== filter);

    // If all genres removed: then add 'All' or filter accordingly
    if (filtered.length === 0) {
      onGenresChange(['All']);
    } else {
      onGenresChange(filtered);
    }
  };

  return (
    <>
      {/*Date, filter and search movie */}
      <div className='flex items-center gap-2 py-5'>
        <DateSelectModal
          dates={dates}
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
        />
        <FilterSelectModal
          filters={{
            genres: {
              label: 'Genres',
              data: genres.map((g) => ({ id: g.id, name: g.name })),
              selected: selectedGenres,
              onSelect: handleGenreSelect,
              isMulti: true,
              hasAllOption: true,
            },
          }}
        />
        <div className='relative flex flex-1 justify-between items-center group'>
          <IoSearchOutline className='absolute ml-3 pointer-events-none' />
          <input
            type='text'
            name='search'
            placeholder='Search movie'
            autoComplete='off'
            aria-label='Search movie'
            value={searchTerm}
            onChange={(e) => {
              onSearchChange(e.target.value);
            }}
            className='w-full pr-3 pl-10'
          />
          <IoClose
            className='absolute right-3 opacity-0 group-focus-within:opacity-100 transition-smooth cursor-pointer'
            onClick={() => onSearchChange('')}
          >
            clear
          </IoClose>
        </div>
      </div>
      {/*Selected filter tags */}
      {!selectedGenres.includes('All') && (
        <div className='flex gap-2 pb-5'>
          <button
            onClick={() => onGenresChange(['All'])}
            className='flex items-center gap-2 cursor-pointer px-2 py-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-smooth'
          >
            Clear
          </button>
          {selectedGenres.map((g) => (
            <button
              onClick={() => handleRemoveFilter(g)}
              className='flex items-center gap-2 cursor-pointer px-2 py-1 rounded-xl border-1 border-zinc-800 hover:border-zinc-700 transition-smooth'
            >
              {g} <IoClose />
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default FilterSection;
