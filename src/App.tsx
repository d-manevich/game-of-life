import React, { useRef, useState, useEffect } from 'react';
import { Field, Params } from './types';
import { nth } from './utils';
import { generateInitialField, calcNextGeneration, updateCell } from './game';
import './App.css';
import Cell from './Cell';

const App: React.FC = () => {
  const intervalRef = useRef<number>();
  const [params, updateParams] = useState<Params>({ rows: 20, cols: 20 });
  const [history, setHistory] = useState<Field[]>([generateInitialField(params)]);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const currentState: Field = nth(history, -1) || generateInitialField(params);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setHistory((history) => [...history, calcNextGeneration(nth(history, -1) || generateInitialField(params))]);
      }, 200);
    }

    return () => {
      window.clearInterval(intervalRef.current);
    };
  }, [isPlaying, params]);

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

      <button onClick={() => setPlaying(!isPlaying)}>{!isPlaying ? 'Play' : 'Pause'}</button>
      <button onClick={() => setHistory([...history, calcNextGeneration(currentState)])}>next step</button>
      <button onClick={() => setHistory([generateInitialField(params)])}>reset</button>
      <div>Generation: {history.length}</div>
    </div>
  );
};

export default App;
