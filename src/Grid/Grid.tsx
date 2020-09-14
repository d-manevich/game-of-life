import React, { useCallback } from 'react';
import './Grid.css';
import Cell from '../Cell';
import { GridType } from '../types';

type Props = {
  grid: GridType;
  generation: number;
  onCellClick: (row: number, col: number, cell: boolean) => void;
};

const Grid: React.FC<Props> = ({ grid, generation, onCellClick }: Props) => {
  const handleCellClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const target = event.target as HTMLElement;
      const dataset = target.dataset;

      if (dataset.type === 'cell') {
        const row = parseInt(dataset?.row || '0');
        const col = parseInt(dataset?.col || '0');
        const live = JSON.parse(dataset?.live || 'false');

        onCellClick(row, col, live);
      }
    },
    [onCellClick],
  );

  return (
    <div className="Grid" onClick={handleCellClick}>
      {grid.map((gridRow: boolean[], row: number) => (
        <div className="Grid-row" key={row}>
          {gridRow.map((cell: boolean, col: number) => (
            <Cell key={col} live={cell} row={row} col={col} />
          ))}
        </div>
      ))}
      <div className="Generation">{generation}</div>
    </div>
  );
};

export default React.memo(Grid);
