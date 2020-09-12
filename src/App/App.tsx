import React, { useState, useCallback } from 'react';
import { nth } from '../utils';
import { generateInitialGrid, calcNextGeneration, updateCell } from '../game';
import './App.css';
import GameRunner from '../GameRunner';
import Controls from '../Controls';
import PresetSelector from '../PresetSelector';
import { GridType, Params, Preset } from '../types';

const initialParams: Params = {
  rows: 20,
  cols: 20,
};

const App: React.FC = () => {
  const [params, setParams] = useState<Params>(initialParams);
  const [history, setHistory] = useState<GridType[]>([generateInitialGrid(params)]);
  const [generation, setGeneration] = useState<number>(0);
  const currentState: GridType = nth(history, generation) || generateInitialGrid(params);

  const updateParams = useCallback(
    (updParams: Params) => {
      const newParams = { ...params, ...updParams };
      setParams(newParams);
      setHistory([generateInitialGrid(newParams)]);
      setGeneration(0);
    },
    [params],
  );

  const gameTick = useCallback(() => {
    setHistory((history) => {
      const cutHistory = history.slice(0, generation + 1);
      return [...cutHistory, calcNextGeneration(nth(cutHistory, -1) || generateInitialGrid(params))];
    });
    setGeneration((generation) => generation + 1);
  }, [params, generation]); // some shit

  const handleCellClick = useCallback(
    (row: number, col: number, cell: boolean) => {
      setHistory([...history.slice(0, generation), updateCell(currentState, row, col, !cell)]);
    },
    [history, generation, currentState],
  );

  const handleReset = useCallback(() => {
    setHistory([generateInitialGrid(initialParams)]);
    setGeneration(0);
    setParams(initialParams);
  }, []);

  return (
    <div className="App">
      <div>Generation: {generation + 1}</div>
      <GameRunner grid={currentState} onGameTick={gameTick} onCellClick={handleCellClick} onReset={handleReset} />
      <Controls
        generation={generation}
        maxGeneration={history.length - 1}
        onGenerationChange={setGeneration}
        params={params}
        updateParams={updateParams}
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
