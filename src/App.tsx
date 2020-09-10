import React, { useRef, useState, useEffect } from 'react';
import { nth } from './utils';
import { generateInitialGrid, calcNextGeneration, updateCell } from './game';
import './App.css';
import Cell from './Cell';
import Controls from './Controls';
import PresetSelector from './PresetSelector';
import { Grid, Params, Preset } from './types';

const initialParams: Params = {
  rows: 20,
  cols: 20,
};

const App: React.FC = () => {
  const intervalRef = useRef<number>();
  const [params, setParams] = useState<Params>(initialParams);
  const [history, setHistory] = useState<Grid[]>([generateInitialGrid(params)]);
  const [generation, setGeneration] = useState<number>(0);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(200);
  const currentState: Grid = nth(history, generation) || generateInitialGrid(params);

  function updateParams(updParams: Params) {
    const newParams = { ...params, ...updParams };
    setParams(newParams);
    setHistory([generateInitialGrid(newParams)]);
    setGeneration(0);
  }

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setHistory((history) => {
          const cutHistory = history.slice(0, generation + 1);
          return [...cutHistory, calcNextGeneration(nth(cutHistory, -1) || generateInitialGrid(params))];
        });
        setGeneration(generation + 1);
      }, speed);
    }

    return () => {
      window.clearInterval(intervalRef.current);
    };
  }, [isPlaying, params, generation, speed]);

  return (
    <div className="App">
      <div className="Grid">
        {currentState.map((gridRow: boolean[], row: number) => (
          <div className="Grid-row" key={row}>
            {gridRow.map((cell: boolean, col: number) => (
              <Cell
                key={col}
                live={cell}
                onClick={() => setHistory([...history.slice(0, generation), updateCell(currentState, row, col, !cell)])}
              />
            ))}
          </div>
        ))}
      </div>
      <div>Generation: {generation + 1}</div>
      <Controls
        isPlaying={isPlaying}
        togglePlay={() => setPlaying(!isPlaying)}
        onReset={() => {
          setPlaying(false);
          setHistory([generateInitialGrid(initialParams)]);
          setGeneration(0);
          setParams(initialParams);
        }}
        generation={generation}
        maxGeneration={history.length - 1}
        onGenerationChange={setGeneration}
        params={params}
        updateParams={updateParams}
        speed={speed}
        setSpeed={setSpeed}
      />
      <PresetSelector
        onSelect={({ params, grid }: Preset) => {
          setHistory([grid]);
          setGeneration(0);
          setParams(params);
        }}
      />
    </div>
  );
};

export default App;
