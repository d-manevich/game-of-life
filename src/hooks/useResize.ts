import { useRef, useEffect } from 'react';

const useResize = (onResize: (width: number, height: number) => void): React.RefObject<HTMLDivElement> => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleResize() {
      const container = containerRef.current;

      if (container) {
        const height = container.offsetHeight;
        const width = container.offsetWidth;

        onResize(width, height);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return containerRef;
};

export default useResize;
