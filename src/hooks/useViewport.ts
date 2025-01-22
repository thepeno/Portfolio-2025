import { useState, useEffect } from 'react';

const useViewport = () => {
  const [isMdOrAbove, setIsMdOrAbove] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMdOrAbove(window.innerWidth >= 768); // Assuming 768px is the breakpoint for md
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMdOrAbove;
};

export default useViewport;