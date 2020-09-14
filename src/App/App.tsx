import React, { useState, useCallback } from 'react';
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
  const [grid, setGrid] = useState<GridType>(generateInitialGrid(params));
  const [generation, setGeneration] = useState(1);

  const updateParams = useCallback((updParams: Params) => {
    setParams(updParams);
    setGrid(generateInitialGrid(updParams));
  }, []);

  const gameTick = useCallback(() => {
    setGrid((prevGrid) => calcNextGeneration(prevGrid));
    setGeneration((prevGen) => prevGen + 1);
  }, []);

  const handleCellClick = useCallback((row: number, col: number, cell: boolean) => {
    setGrid((prevGrid) => updateCell(prevGrid, row, col, !cell));
  }, []);

  const handleReset = useCallback(() => {
    setGrid(generateInitialGrid(initialParams));
    setGeneration(1);
    setParams(initialParams);
  }, []);

  const handlePresetSelect = useCallback(({ params, grid }: Preset) => {
    setGrid(grid);
    setGeneration(1);
    setParams(params);
  }, []);

  return (
    <div className="App">
      <div>Generation: {generation}</div>
      <GameRunner grid={grid} onGameTick={gameTick} onCellClick={handleCellClick} onReset={handleReset} />
      <Controls params={params} updateParams={updateParams} />
      <PresetSelector onSelect={handlePresetSelect} />
    </div>
  );
};

export default App;
