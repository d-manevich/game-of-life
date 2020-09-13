import React, { useRef, useState, useEffect, useCallback } from 'react';
import Grid from '../Grid';
import { GridType } from '../types';

type Props = {
  grid: GridType;
  onGameTick: () => void;
  onCellClick: (row: number, col: number, cell: boolean) => void;
  onReset: () => void;
};

const GameRunner: React.FC<Props> = ({ grid, onGameTick, onCellClick, onReset }: Props) => {
  const intervalRef = useRef<number>();
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(200);

  const handleReset = useCallback(() => {
    setPlaying(false);
    onReset();
  }, [onReset]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(onGameTick, speed);
    }

    return () => {
      window.clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed, onGameTick]);

  return (
    <div>
      <Grid grid={grid} onCellClick={onCellClick} />
      <button onClick={() => setPlaying(!isPlaying)}>{!isPlaying ? 'Play' : 'Pause'}</button>
      <button onClick={handleReset}>Reset</button>
      <div>
        <span>Speed: {speed}</span>
        <input
          type="range"
          min="50"
          max="500"
          value={speed}
          onChange={(event) => setSpeed(parseInt(event.target.value))}
        />
      </div>
    </div>
  );
};

export default GameRunner;
