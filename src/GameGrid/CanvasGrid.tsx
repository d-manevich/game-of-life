import React, { useRef, useEffect, useMemo } from 'react';
import { Size, Params, GridType } from '../types';

type Props = {
  availableSize: Size;
  params: Params;
  grid: GridType;
};

function calcCellSize(availableSize: Size, params: Params): number {
  const maxCellHight = Math.floor(availableSize.height / params.rows);
  const maxCellWidth = Math.floor(availableSize.width / params.cols);

  return Math.min(maxCellHight, maxCellWidth);
}

function draw(context: CanvasRenderingContext2D, grid: GridType, cellSize: number) {
  const scale = window.devicePixelRatio;
  const lineWidth = 1.0;
  context.scale(scale, scale);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.strokeStyle = '#61dafb';
  context.fillStyle = '#61dafb';
  context.lineWidth = 1.0;

  grid.forEach((row, y) =>
    row.forEach((cell, x) => {
      context.beginPath();

      if (cell) {
        context.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
      } else {
        context.strokeRect(
          x * cellSize + 1 + lineWidth / 2,
          y * cellSize + 1 + lineWidth / 2,
          cellSize - 2 - lineWidth,
          cellSize - 2 - lineWidth,
        );
      }
    }),
  );

  context.setTransform(1, 0, 0, 1, 0, 0);
}

const CanvasGrid: React.FC<Props> = ({ availableSize, params, grid }: Props) => {
  const canvasRef = useRef(null);
  const cellSize = useMemo(() => calcCellSize(availableSize, params), [availableSize, params]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const contex = (canvas as HTMLCanvasElement).getContext('2d');
      if (contex) draw(contex, grid, cellSize);
    }
  }, [grid, cellSize]);

  return (
    <canvas
      style={{
        width: `${params.cols * cellSize}px`,
        height: `${params.rows * cellSize}px`,
      }}
      ref={canvasRef}
      width={Math.floor(params.cols * cellSize * window.devicePixelRatio)}
      height={Math.floor(params.rows * cellSize * window.devicePixelRatio)}
    />
  );
};

export default React.memo(CanvasGrid);
