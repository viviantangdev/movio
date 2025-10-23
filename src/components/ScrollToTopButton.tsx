import { IoArrowUp } from 'react-icons/io5';
import useScrollToTop from '../hooks/useScrollToTop';

const ScrollToTopButton = () => {
  const { isVisible, scrollToTop } = useScrollToTop();

  return (
    <div
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-4 rounded-full bg-emerald-500 text-white shadow-lg transition-smooth
        hover:bg-emerald-400 
        ${
          isVisible
            ? 'opacity-100 translate-y-0 cursor-pointer'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      aria-label='Scroll to top'
    >
      <IoArrowUp className='w-5 h-5' />
    </div>
  );
};

export default ScrollToTopButton;
