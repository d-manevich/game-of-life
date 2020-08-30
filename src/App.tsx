import React from 'react';
import './App.css';
import Cell from './Cell';

type Field = boolean[][];

const initialField: Field = [
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
];

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

const App: React.FC = () => {
  const [field, setField] = React.useState<Field>(initialField);
  const [isPlaying, setPlaying] = React.useState<boolean>(false);

  return (
    <div className="App">
      <div className="Field">
        {field.map((row, rowIndex) => (
          <div className="Field-row" key={rowIndex}>
            {row.map((isLive, cellIndex) => (
              <Cell
                key={cellIndex}
                live={isLive}
                onClick={() => setField(updateFieldCell(field, rowIndex, cellIndex, !isLive))} />
            ))}
          </div>
        ))}
      </div>

      <button onClick={() => setPlaying(!isPlaying)}>{isPlaying ? 'Play' : 'Pause'}</button>
      <div>Generation: {}</div>
    </div>
  );
}

export default App;
