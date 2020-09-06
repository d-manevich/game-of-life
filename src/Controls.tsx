import React from 'react';

type Props = {
  isPlaying: boolean;
  togglePlay: () => void;
  onReset: () => void;
  generation: number;
  maxGeneration: number;
  onGenerationChange: (generation: number) => void;
};

const Controls: React.FC<Props> = ({
  isPlaying,
  togglePlay,
  onReset,
  generation,
  maxGeneration,
  onGenerationChange,
}: Props) => (
  <div>
    <button onClick={togglePlay}>{!isPlaying ? 'Play' : 'Pause'}</button>
    <button onClick={onReset}>Reset</button>
    <div>
      <button onClick={() => onGenerationChange(generation - 1)} disabled={isPlaying || generation <= 0}>
        {'<'}
      </button>
      <button onClick={() => onGenerationChange(generation + 1)} disabled={isPlaying || generation >= maxGeneration}>
        {'>'}
      </button>
    </div>
  </div>
);

export default Controls;
