import { Grid, Params } from './types';
import { nth } from './utils';

export function generateInitialGrid({ rows, cols }: Params): Grid {
  return Array(rows).fill(Array(cols).fill(false));
}

export function updateCell(grid: Grid, row: number, col: number, cell: boolean): Grid {
  const newGrid: Grid = grid.map((gridRow, rowIndex) =>
    row !== rowIndex ? gridRow : gridRow.map((oldCell, colIndex) => (col !== colIndex ? oldCell : cell)),
  );
  return newGrid;
}

export function getNeighbours(grid: Grid, row: number, col: number): number {
  let neighbours = 0;

  for (let y = row - 1; y <= row + 1; y++) {
    const gridRow = nth(grid, y) || [];

    for (let x = col - 1; x <= col + 1; x++) {
      const gridCell = nth(gridRow, x) || false;

      if (!(y === row && x === col)) {
        neighbours += Number(gridCell);
      }
    }
  }

  return neighbours;
}

export function calcCellLive(grid: Grid, row: number, col: number): boolean {
  const cell: boolean = grid[row][col];
  const neighbours: number = getNeighbours(grid, row, col);

  if (cell && neighbours < 2) return false;
  if (cell && (neighbours === 2 || neighbours === 3)) return true;
  if (cell && neighbours > 3) return false;
  if (!cell && neighbours === 3) return true;

  return false;
}

export function calcNextGeneration(grid: Grid): Grid {
  const nextGeneration: Grid = grid.map((gridRow: boolean[], row: number) =>
    gridRow.map((cell: boolean, col: number) => calcCellLive(grid, row, col)),
  );

  return nextGeneration;
}
