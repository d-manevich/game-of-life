import React, { useRef, useEffect } from 'react';
import './ResizeContainer.css';

type Props = {
  onResize: (width: number, height: number) => void;
  children: React.ReactNode;
};

const ResizeContainer: React.FC<Props> = ({ onResize, children }: Props) => {
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

  return (
    <div className="ResizeContainer" ref={containerRef}>
      {children}
    </div>
  );
};

export default ResizeContainer;
