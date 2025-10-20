import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  return (
    <header className='w-full p-5 flex justify-between items-center'>
      <Link to='/'>
        <Logo />
      </Link>
      <ul className='flex gap-6'>
        <li className='underline underline-offset-4 decoration-1 decoration-transparent transition-all duration-500  hover:decoration-emerald-400'>
          <Link to='movies'>In Theather</Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
