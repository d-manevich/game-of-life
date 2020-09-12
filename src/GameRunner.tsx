import React, { useRef, useState, useEffect, useCallback } from 'react';
import Grid from './Grid';
import { GridType } from './types';

type Props = {
  grid: GridType;
  onGameTick: () => void;
  onCellClick: (row: number, col: number, cell: boolean) => void;
  onReset: () => void;
};

const GameRunner: React.FC<Props> = ({ grid, onGameTick, onCellClick, onReset }: Props) => {
  const intervalRef = useRef<number>();
  const cellRef = useRef<HTMLElement>();
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

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const target = event.target as HTMLElement;
      const dataset = target.dataset;

      if (cellRef.current !== target && dataset.type === 'cell') {
        cellRef.current = target;

        const row = parseInt(dataset?.row || '0');
        const col = parseInt(dataset?.col || '0');
        const live = JSON.parse(dataset?.live || 'false');

        onCellClick(row, col, live);
      }
    },
    [onCellClick, cellRef],
  );

  return (
    <div>
      <Grid grid={grid} onPointerMove={handleMove} />
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
