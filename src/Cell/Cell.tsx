import React from 'react';
import './Cell.css';

type Props = {
  live: boolean;
  row: number;
  col: number;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

const Cell: React.FC<Props> = ({ live, row, col, onClick }: Props) => (
  <div className="Cell" data-type="cell" data-live={live} data-row={row} data-col={col} onClick={onClick} />
);

export default React.memo(Cell);
