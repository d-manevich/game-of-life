import React from 'react';
import './Grid.css';
import Cell from '../Cell';
import { GridType } from '../types';

type Props = {
  grid: GridType;
  onPointerMove: (event: React.PointerEvent<HTMLElement>) => void;
};

const Grid: React.FC<Props> = ({ grid, onPointerMove }: Props) => (
  <div className="Grid" onPointerMove={onPointerMove}>
    {grid.map((gridRow: boolean[], row: number) => (
      <div className="Grid-row" key={row}>
        {gridRow.map((cell: boolean, col: number) => (
          <Cell key={col} live={cell} row={row} col={col} />
        ))}
      </div>
    ))}
  </div>
);

export default React.memo(Grid);
