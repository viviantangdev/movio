import { Link } from 'react-router-dom';
import Logo from './Logo';

interface NavbarLink {
  linkTo: string;
  navName: string;
}

const Links: NavbarLink[] = [
  { linkTo: '/', navName: 'Home' },
  { linkTo: 'movies', navName: 'Movies' },
];

const Navbar = () => {
  return (
    <header className='w-full p-5 flex justify-between items-center'>
      <Link to='/'>
        <Logo />
      </Link>
      <ul className='flex gap-6'>
        {Links.map((li, index) => (
          <Link to={li.linkTo} key={index}>
            <li className='underline underline-offset-4 decoration-1 decoration-transparent transition-all duration-500  hover:decoration-emerald-400'>
              {li.navName}
            </li>
          </Link>
        ))}
      </ul>
    </header>
  );
};

export default Navbar;
