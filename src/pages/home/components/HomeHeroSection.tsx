import { IoClose, IoSearchOutline } from 'react-icons/io5';
import heroUrl from '../../../assets/hero.jpg';

type HomeHeroSectionProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

const HomeHeroSection = ({
  searchTerm,
  onSearchChange,
}: HomeHeroSectionProps) => {
  return (
    <div className='relative h-[350px]'>
      <img
        src={heroUrl}
        alt='Cinema Movio'
        className='w-full h-full object-cover opacity-70 [mask-image:linear-gradient(to_bottom,black_85%,transparent)]'
      />
      {/*Search bar */}
      <div className='absolute inset-0 flex flex-col justify-center items-center gap-7 '>
        <p>What movie do you want to watch?</p>
        <div className='relative flex justify-between items-center group'>
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
    </div>
  );
};

export default HomeHeroSection;
