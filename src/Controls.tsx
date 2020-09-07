import React from 'react';
import { Params } from './types';

type Props = {
  isPlaying: boolean;
  togglePlay: () => void;
  onReset: () => void;
  generation: number;
  maxGeneration: number;
  onGenerationChange: (generation: number) => void;
  params: Params;
  updateParams: (params: Params) => void;
};

const Controls: React.FC<Props> = ({
  isPlaying,
  togglePlay,
  onReset,
  generation,
  maxGeneration,
  onGenerationChange,
  params,
  updateParams,
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
    <div>
      <span>rows </span>
      <button onClick={() => updateParams({ ...params, rows: params.rows + 1 })}>add</button>
      <button onClick={() => updateParams({ ...params, rows: params.rows - 1 })} disabled={params.rows <= 1}>
        del
      </button>
    </div>
    <div>
      <span>columns </span>
      <button onClick={() => updateParams({ ...params, cols: params.cols + 1 })}>add</button>
      <button onClick={() => updateParams({ ...params, cols: params.cols - 1 })} disabled={params.cols <= 1}>
        del
      </button>
    </div>
  </div>
);

export default Controls;
