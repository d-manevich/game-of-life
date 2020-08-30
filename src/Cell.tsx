import React from 'react';
import './Cell.css';

type Props = {
  live?: boolean;
  onClick?: () => void;
};

const Cell: React.FC<Props> = ({ live = false, onClick }: Props) => (
  <div className={`Cell ${live && 'live'}`} onClick={onClick} />
);

export default Cell;
