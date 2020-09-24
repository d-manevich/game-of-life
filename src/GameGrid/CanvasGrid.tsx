import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import { clamp } from '../utils';
import { Size, Params, GridType } from '../types';

const MARGIN = 2;
const LINE_WIDTH = 1.0;

type Props = {
  availableSize: Size;
  params: Params;
  grid: GridType;
  onCellTouch: (row: number, col: number) => void;
};

type CacheCell = {
  row: number | null;
  col: number | null;
};

function calcCellSize(availableSize: Size, params: Params): number {
  const maxCellHight = Math.floor(availableSize.height / params.rows);
  const maxCellWidth = Math.floor(availableSize.width / params.cols);

  return Math.min(maxCellHight, maxCellWidth);
}

function draw(context: CanvasRenderingContext2D, grid: GridType, cellSize: number) {
  const scale = window.devicePixelRatio;
  context.scale(scale, scale);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.strokeStyle = '#C7C7C7';
  context.fillStyle = '#F7C476';
  context.lineWidth = LINE_WIDTH;

  grid.forEach((row, y) =>
    row.forEach((cell, x) => {
      context.beginPath();

      if (cell) {
        context.fillRect(x * cellSize + MARGIN / 2, y * cellSize + MARGIN / 2, cellSize - MARGIN, cellSize - MARGIN);
      } else {
        context.strokeRect(
          x * cellSize + MARGIN / 2 + LINE_WIDTH / 2,
          y * cellSize + MARGIN / 2 + LINE_WIDTH / 2,
          cellSize - MARGIN - LINE_WIDTH,
          cellSize - MARGIN - LINE_WIDTH,
        );
      }
    }),
  );

  context.setTransform(1, 0, 0, 1, 0, 0);
}

const CanvasGrid: React.FC<Props> = ({ availableSize, params, grid, onCellTouch }: Props) => {
  const cachedCell = useRef<CacheCell>({ row: null, col: null });
  const canvasRef = useRef(null);
  const cellSize = useMemo(() => calcCellSize(availableSize, params), [availableSize, params]);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const contex = (canvas as HTMLCanvasElement).getContext('2d');
      if (contex) draw(contex, grid, cellSize);
    }
  }, [grid, cellSize]);

  const handlePointerDown = useCallback(() => {
    isDrawing.current = true;
  }, []);

  useEffect(() => {
    const handlePointerUp = () => {
      isDrawing.current = false;
    };

    window.addEventListener('pointerup', handlePointerUp);

    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawing.current) return;

      const { offsetX, offsetY } = event.nativeEvent;
      const row = Math.floor(offsetY / cellSize);
      const col = Math.floor(offsetX / cellSize);

      if (row !== cachedCell.current.row || col !== cachedCell.current.col) {
        cachedCell.current = { row, col };
        onCellTouch(clamp(row, 0, params.rows - 1), clamp(col, 0, params.cols - 1));
      }
    },
    [cellSize, params, onCellTouch],
  );

  return (
    <canvas
      style={{
        width: `${params.cols * cellSize}px`,
        height: `${params.rows * cellSize}px`,
        touchAction: 'none',
      }}
      ref={canvasRef}
      width={Math.floor(params.cols * cellSize * window.devicePixelRatio)}
      height={Math.floor(params.rows * cellSize * window.devicePixelRatio)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    />
  );
};

export default React.memo(CanvasGrid);
