import React from 'react';
import './Cell.css';

type Props = {
  live: boolean;
  row: number;
  col: number;
};

const Cell: React.FC<Props> = ({ live, row, col }: Props) => (
  <div className="Cell" data-type="cell" data-live={live} data-row={row} data-col={col} />
);

export default React.memo(Cell);
