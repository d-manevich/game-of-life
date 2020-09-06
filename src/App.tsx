import React, { useRef, useState, useEffect } from 'react';
import { Field, Params } from './types';
import { nth } from './utils';
import { generateInitialField, calcNextGeneration, updateCell } from './game';
import './App.css';
import Cell from './Cell';
import Controls from './Controls';

const App: React.FC = () => {
  const intervalRef = useRef<number>();
  const [params, updateParams] = useState<Params>({ rows: 20, cols: 20 });
  const [history, setHistory] = useState<Field[]>([generateInitialField(params)]);
  const [generation, setGeneration] = useState<number>(0);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const currentState: Field = nth(history, generation) || generateInitialField(params);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setHistory((history) => {
          const cutHistory = history.slice(0, generation + 1);
          return [...cutHistory, calcNextGeneration(nth(cutHistory, -1) || generateInitialField(params))];
        });
        setGeneration(generation + 1);
      }, 200);
    }

    return () => {
      window.clearInterval(intervalRef.current);
    };
  }, [isPlaying, params, generation]);

  return (
    <div className="App">
      <div className="Field">
        {currentState.map((fieldRow: boolean[], row: number) => (
          <div className="Field-row" key={row}>
            {fieldRow.map((cell: boolean, col: number) => (
              <Cell
                key={col}
                live={cell}
                onClick={() => setHistory([...history.slice(0, -1), updateCell(currentState, row, col, !cell)])}
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
          setHistory([generateInitialField(params)]);
          setGeneration(0);
        }}
        generation={generation}
        maxGeneration={history.length - 1}
        onGenerationChange={setGeneration}
      />
    </div>
  );
};

export default App;
