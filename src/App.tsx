import React from 'react';
import last from 'lodash-es/last';
import take from 'lodash-es/take';
import nth from 'lodash-es/nth';
import './App.css';
import Cell from './Cell';

type Field = boolean[][];

const rowsCount = 10;
const cellsCount = 12;
const initialField: Field = Array(rowsCount).fill(Array(cellsCount).fill(false));

function updateFieldCell(field: Field, row: number, cell: number, isLive: boolean): Field {
  const newField: Field = field.map(
    (oldRow, rowIndex) => (
      row !== rowIndex
        ? oldRow
        : oldRow.map((oldCell, cellIndex) => cell !== cellIndex ? oldCell : isLive)
    )
  );
  return newField;
}

function getNeighbours(rowIndex: number, cellIndex: number, oldGeneration: Field): number {
  let neighbours = 0;

  for (let row = rowIndex - 1; row <= rowIndex + 1; row++) {
    for (let cell = cellIndex - 1; cell <= cellIndex + 1; cell++) {
      if (!(row === rowIndex && cell === cellIndex)) {
        neighbours += Number(
          nth(
            nth(oldGeneration, (row >= rowsCount ? row - rowsCount : row)),
            (cell >= cellsCount ? cell - cellsCount : cell)
          )
        )
      }
    }
  }
  
  return neighbours;
}

function calcCellLive(
  cell: boolean,
  rowIndex: number,
  cellIndex: number,
  oldGeneration: Field
): boolean {
  const neighbours: number = getNeighbours(rowIndex, cellIndex, oldGeneration);

  if (cell && neighbours < 2) return false;
  if (cell && (neighbours === 2 || neighbours === 3)) return true;
  if (cell && neighbours > 3) return false;
  if (!cell && neighbours === 3) return true;

  return false;
}

function calcNextGeneration(oldGeneration: Field): Field {
  const nextGeneration: Field = oldGeneration.map((row: boolean[], rowIndex: number) =>
    row.map((cell: boolean, cellIndex: number) => calcCellLive(cell, rowIndex, cellIndex, oldGeneration))
  );

  return nextGeneration;
}

const App: React.FC = () => {
  const [history, setHistory] = React.useState<Field[]>([initialField]);
  const [isPlaying, setPlaying] = React.useState<boolean>(false);
  const currentState: Field = last(history) || initialField;

  return (
    <div className="App">
      <div className="Field">
        {currentState.map((row: boolean[], rowIndex: number) => (
          <div className="Field-row" key={rowIndex}>
            {row.map((cell: boolean, cellIndex: number) => (
              <Cell
                key={cellIndex}
                live={cell}
                onClick={() => setHistory(([...take(history, history.length - 1), updateFieldCell(currentState, rowIndex, cellIndex, !cell)]))} />
            ))}
          </div>
        ))}
      </div>

      <button onClick={() => setPlaying(!isPlaying)}>{!isPlaying ? 'Play' : 'Pause'}</button>
      <button onClick={() => setHistory([...history, calcNextGeneration(currentState)])}>next step</button>
      <button onClick={() => setHistory([initialField])}>reset</button>
      <div>Generation: {history.length}</div>
    </div>
  );
}

export default App;
