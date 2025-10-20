import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  return (
    <header className='absolute top-0 w-full p-5 flex justify-between items-center'>
      <Link to='/'>
          <Logo />
      </Link>
      <ul>
        <li>
          <Link to='movies'>Movies</Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
