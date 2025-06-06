import { useEffect, useState } from 'react';

export const useScrollTopCheck = (): boolean => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setReady(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    if (window.scrollY === 0) {
      setReady(true);
    } else {
      window.addEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return ready;
};
