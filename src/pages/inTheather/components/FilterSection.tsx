import { IoClose, IoSearchOutline } from 'react-icons/io5';
import type { Genre, Language } from '../../../types/movie';
import FilterSelectModal from './FilterSelectModal';

interface FilterSectipnProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  genres: Genre[];
  selectedGenres: string[];
  onGenresChange: React.Dispatch<React.SetStateAction<string[]>>;
  languages: Language[];
  selectedLanguages: string[];
  onLanguagesChange: React.Dispatch<React.SetStateAction<string[]>>;
  allDates: string[];
  selectedDate: string[];
  onDateChange: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterSection = ({
  searchTerm,
  onSearchChange,
  genres,
  selectedGenres,
  onGenresChange,
  languages,
  selectedLanguages,
  onLanguagesChange,
  allDates,
  selectedDate,
  onDateChange,
}: FilterSectipnProps) => {
  const handleSelect = (
    item: string,
    onChange: (update: (prev: string[]) => string[]) => void
  ) => {
    onChange((prev) => {
      // If user clicks "All"
      if (item === 'All') {
        return ['All'];
      }

      // Remove "All" if other items are selected
      const filtered = prev.filter((f) => f !== 'All');

      // Toggle the clicked item
      const isSelected = filtered.includes(item);
      const updated = isSelected
        ? filtered.filter((f) => f !== item)
        : [...filtered, item];

      // If all deselected, fallback to "All"
      return updated.length === 0 ? ['All'] : updated;
    });
  };

  const handleRemoveTag = (
    filter: string,
    selectedItems: string[],
    onChange: (updated: string[]) => void
  ) => {
    const filtered = selectedItems.filter((item) => item !== filter);

    if (filtered.length === 0) {
      onChange(['All']);
    } else {
      onChange(filtered);
    }
  };

  const handleClearTags = () => {
    onGenresChange(['All']);
    onLanguagesChange(['All']);
    onDateChange(['All']);
  };

  return (
    <>
      {/*Date, filter and search movie */}
      <div className='flex items-center gap-2 py-5'>
        <FilterSelectModal
          filters={{
            dates: {
              label: 'Dates',
              data: allDates.map((g) => ({ id: g, name: g })),
              selected: selectedDate,
              onSelect: (date: string) => handleSelect(date, onDateChange),
              isMulti: true,
              hasAllOption: true,
            },
            genres: {
              label: 'Genres',
              data: genres.map((g) => ({ id: g.id, name: g.name })),
              selected: selectedGenres,
              onSelect: (genre: string) => handleSelect(genre, onGenresChange),
              isMulti: true,
              hasAllOption: true,
            },
            languages: {
              label: 'Languages',
              data: languages.map((l) => ({
                id: l.iso_639_1,
                name: l.english_name,
              })),
              selected: selectedLanguages,
              onSelect: (lang: string) => handleSelect(lang, onLanguagesChange),
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
      {(!selectedGenres.includes('All') ||
        !selectedLanguages.includes('All') ||
        !selectedDate.includes('All')) && (
        <div className='flex flex-wrap gap-2 pb-5'>
          <button
            onClick={() => handleClearTags()}
            className='flex items-center gap-2 cursor-pointer px-2 py-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-smooth'
          >
            Clear
          </button>
          {selectedDate
            .filter((item) => item !== 'All') //Skip 'All'
            .map((g) => (
              <button
                onClick={() => handleRemoveTag(g, selectedDate, onDateChange)}
                className='flex items-center gap-2 cursor-pointer px-2 py-1 rounded-xl border-1 border-zinc-800 hover:border-zinc-700 transition-smooth'
              >
                {g} <IoClose />
              </button>
            ))}
          {selectedGenres
            .filter((item) => item !== 'All') //Skip 'All'
            .map((g) => (
              <button
                onClick={() =>
                  handleRemoveTag(g, selectedGenres, onGenresChange)
                }
                className='flex items-center gap-2 cursor-pointer px-2 py-1 rounded-xl border-1 border-zinc-800 hover:border-zinc-700 transition-smooth'
              >
                {g} <IoClose />
              </button>
            ))}
          {selectedLanguages
            .filter((item) => item !== 'All') //Skip 'All'
            .map((l, index) => (
              <button
                key={index}
                onClick={() =>
                  handleRemoveTag(l, selectedLanguages, onLanguagesChange)
                }
                className='flex items-center gap-2 cursor-pointer px-2 py-1 rounded-xl border-1 border-zinc-800 hover:border-zinc-700 transition-smooth'
              >
                {l} <IoClose />
              </button>
            ))}
        </div>
      )}
    </>
  );
};

export default FilterSection;
