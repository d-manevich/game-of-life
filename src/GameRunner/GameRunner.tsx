import React, { useRef, useState, useEffect, useCallback } from 'react';
import cn from 'classnames';
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
    <div className="Controls">
      <button
        className={cn({ Button: true, play: !isPlaying, pause: isPlaying })}
        onClick={() => setPlaying(!isPlaying)}
      >
        {!isPlaying && (
          <svg width="18" height="18" viewBox="-3 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.733 18c-.288 0-.57-.08-.82-.228C.35 17.439 0 16.793 0 16.092V1.908C0 1.205.35.56.912.228A1.594 1.594 0 012.59.252l11.62 7.256c.242.159.442.379.58.64a1.82 1.82 0 010 1.705 1.732 1.732 0 01-.58.639L2.587 17.75c-.258.162-.553.249-.854.25z"
              fill="#fff"
            />
          </svg>
        )}
        {isPlaying && (
          <svg width="11" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.8 0h2.4c.212 0 .416.086.566.24.15.153.234.361.234.578v16.364a.828.828 0 01-.234.578.791.791 0 01-.566.24H7.8a.791.791 0 01-.566-.24.828.828 0 01-.234-.578V.818c0-.217.084-.425.234-.578A.791.791 0 017.8 0zM.8 0h2.4c.212 0 .416.086.566.24C3.916.393 4 .6 4 .818v16.364a.828.828 0 01-.234.578.791.791 0 01-.566.24H.8a.791.791 0 01-.566-.24.828.828 0 01-.234-.578V.818C0 .601.084.393.234.24A.791.791 0 01.8 0z"
              fill="#fff"
            />
          </svg>
        )}
      </button>
      <button className="Button reset" onClick={handleReset}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M17.65 6.35a7.95 7.95 0 00-6.48-2.31c-3.67.37-6.69 3.35-7.1 7.02C3.52 15.91 7.27 20 12 20a7.98 7.98 0 007.21-4.56c.32-.67-.16-1.44-.9-1.44-.37 0-.72.2-.88.53a5.994 5.994 0 01-6.8 3.31c-2.22-.49-4.01-2.3-4.48-4.52A6.002 6.002 0 0112 6c1.66 0 3.14.69 4.22 1.78l-1.51 1.51c-.63.63-.19 1.71.7 1.71H19c.55 0 1-.45 1-1V6.41c0-.89-1.08-1.34-1.71-.71l-.64.65z" />
        </svg>
      </button>
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
