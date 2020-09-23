import React, { useState, useCallback } from 'react';
import { generateInitialGrid, calcNextGeneration, updateCell } from '../game';
import './App.css';
import '../GameGrid/ResizeContainer.css';

import CanvasGrid from '../GameGrid';
import useResize from '../GameGrid/ResizeContainer';
import GameRunner from '../GameRunner';
import ParamsEditor from '../ParamsEditor';
import PresetSelector from '../PresetSelector';
import { GridType, Params, Preset } from '../types';

type Size = {
  width: number;
  height: number;
};

const initialParams: Params = {
  rows: 20,
  cols: 20,
};

const App: React.FC = () => {
  const [params, setParams] = useState<Params>(initialParams);
  const [grid, setGrid] = useState<GridType>(generateInitialGrid(params));
  const [generation, setGeneration] = useState(1);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

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

  const containerRef = useResize((width, height) => setSize({ width, height }));

  return (
    <div className="App">
      <div className="ResizeContainer" ref={containerRef}>
        {!!size.width && !!size.height && <CanvasGrid availableSize={size} params={params} grid={grid} />}
      </div>
      <div className="Controls-container">
        <GameRunner onGameTick={gameTick} onReset={handleReset} />
        <ParamsEditor params={params} updateParams={updateParams} />
      </div>
      <PresetSelector onSelect={handlePresetSelect} />
    </div>
  );
};

export default App;
