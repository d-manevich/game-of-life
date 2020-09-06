import { Field, Params } from './types';
import { nth } from './utils';

export function generateInitialField({ rows, cols }: Params): Field {
  return Array(rows).fill(Array(cols).fill(false));
}

export function updateFieldCell(field: Field, row: number, col: number, cell: boolean): Field {
  const newField: Field = field.map((fieldRow, rowIndex) =>
    row !== rowIndex ? fieldRow : fieldRow.map((oldCell, colIndex) => (col !== colIndex ? oldCell : cell)),
  );
  return newField;
}

export function getNeighbours(row: number, col: number, oldGeneration: Field): number {
  let neighbours = 0;

  for (let y = row - 1; y <= row + 1; y++) {
    const fieldRow = nth(oldGeneration, y) || [];

    for (let x = col - 1; x <= col + 1; x++) {
      const fieldCell = nth(fieldRow, x) || false;

      if (!(y === row && x === col)) {
        neighbours += Number(fieldCell);
      }
    }
  }

  return neighbours;
}

export function calcCellLive(cell: boolean, row: number, col: number, oldGeneration: Field): boolean {
  const neighbours: number = getNeighbours(row, col, oldGeneration);

  if (cell && neighbours < 2) return false;
  if (cell && (neighbours === 2 || neighbours === 3)) return true;
  if (cell && neighbours > 3) return false;
  if (!cell && neighbours === 3) return true;

  return false;
}

export function calcNextGeneration(oldGeneration: Field): Field {
  const nextGeneration: Field = oldGeneration.map((fieldRow: boolean[], row: number) =>
    fieldRow.map((cell: boolean, col: number) => calcCellLive(cell, row, col, oldGeneration)),
  );

  return nextGeneration;
}
