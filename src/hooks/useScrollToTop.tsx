import { useEffect, useState } from 'react';

const useScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // ✅ Track scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // ✅ Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return { isVisible, scrollToTop };
};

export default useScrollToTop;
