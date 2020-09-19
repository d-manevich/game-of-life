import React, { useRef, useState, useEffect, useCallback } from 'react';
import './GameRunner.css';

type Props = {
  onGameTick: () => void;
  onReset: () => void;
};

const GameRunner: React.FC<Props> = ({ onGameTick, onReset }: Props) => {
  const intervalRef = useRef<number>();
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);

  const handleReset = useCallback(() => {
    setPlaying(false);
    onReset();
  }, [onReset]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(onGameTick, 500 / speed);
    }

    return () => {
      window.clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed, onGameTick]);

  return (
    <div>
      <button onClick={() => setPlaying(!isPlaying)}>{!isPlaying ? 'Play' : 'Pause'}</button>
      <button onClick={() => onGameTick()}>Next</button>
      <button onClick={handleReset}>Reset</button>
      <div>
        <span>Speed</span>
        <input
          type="range"
          min="1"
          max="10"
          value={speed}
          onChange={(event) => setSpeed(parseInt(event.target.value))}
        />
      </div>
    </div>
  );
};

export default GameRunner;
