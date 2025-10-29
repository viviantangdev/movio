import { Link } from 'react-router-dom';
import Logo from './Logo';

interface NavbarLink {
  linkTo: string;
  navName: string;
}

const Links: NavbarLink[] = [
  { linkTo: '/', navName: 'Movies' },
  { linkTo: 'intheather', navName: 'In Theather' },
];

const Navbar = () => {
  return (
    <header className='flex justify-between items-center w-[90%] md:w-[80%] 2xl:w-[50%] max-w-7xl mx-auto py-7'>

        <Link to='/'>
          <Logo />
        </Link>
        <ul className='flex gap-6'>
          {Links.map((li, index) => (
            <Link to={li.linkTo} key={index}>
              <li className='underline underline-offset-4 decoration-1 decoration-transparent transition-smooth hover:decoration-emerald-400'>
                {li.navName}
              </li>
            </Link>
          ))}
        </ul>
      
    </header>
  );
};

export default Navbar;
