import { generateInitialGrid, updateCell, getNeighbours, calcCellLive, calcNextGeneration } from './game';
import { Grid } from './types';

const neighbour = true;
const liveCell = true;
const deadCell = false;

test('generate initial grid 4x6', () => {
  const grid = generateInitialGrid({ rows: 4, cols: 6 });
  expect(grid).toMatchObject<Grid>([
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
  ]);
});

test('update cell', () => {
  const grid: Grid = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];
  const updatedGrid: Grid = updateCell(grid, 1, 1, true);
  expect(updatedGrid).toMatchObject<Grid>([
    [false, false, false],
    [false, liveCell, false],
    [false, false, false],
  ]);
});

test('get zero neighbours', () => {
  const grid: Grid = [
    [false, false, false],
    [deadCell, false, false],
    [false, false, false],
  ];
  const neighbours = getNeighbours(grid, 1, 0);
  expect(neighbours).toBe(0);
});

test('get neighbours', () => {
  const grid: Grid = [
    [neighbour, false, false],
    [deadCell, false, false],
    [false, false, neighbour],
  ];
  const neighbours = getNeighbours(grid, 1, 0);
  expect(neighbours).toBe(2);
});

describe('calc cell live', () => {
  test('dead cell in wasteland', () => {
    const grid: Grid = [
      [false, false, false],
      [false, deadCell, false],
      [false, false, false],
    ];
    const cell = calcCellLive(grid, 1, 1);
    expect(cell).toBe(false);
  });

  test('live cell in wasteland (should die by loneliness)', () => {
    const grid: Grid = [
      [false, false, false],
      [false, liveCell, false],
      [false, false, false],
    ];
    const cell = calcCellLive(grid, 1, 1);
    expect(cell).toBe(false);
  });

  test('live cell one neighbour (should die by loneliness)', () => {
    const grid: Grid = [
      [false, false, false],
      [false, liveCell, false],
      [false, false, neighbour],
    ];
    const cell = calcCellLive(grid, 1, 1);
    expect(cell).toBe(false);
  });

  test('live cell two neighbour (should stay live)', () => {
    const grid: Grid = [
      [false, false, false],
      [false, liveCell, neighbour],
      [false, false, neighbour],
    ];
    const cell = calcCellLive(grid, 1, 1);
    expect(cell).toBe(true);
  });

  test('dead cell two neighbour (should stay dead)', () => {
    const grid: Grid = [
      [false, false, false],
      [false, deadCell, neighbour],
      [false, false, neighbour],
    ];
    const cell = calcCellLive(grid, 1, 1);
    expect(cell).toBe(false);
  });

  test('live cell three neighbour (should stay live)', () => {
    const grid: Grid = [
      [false, false, false],
      [false, liveCell, neighbour],
      [neighbour, false, neighbour],
    ];
    const cell = calcCellLive(grid, 1, 1);
    expect(cell).toBe(true);
  });

  test('dead cell three neighbour (should become live by reproduction)', () => {
    const grid: Grid = [
      [false, false, false],
      [false, deadCell, neighbour],
      [neighbour, false, neighbour],
    ];
    const cell = calcCellLive(grid, 1, 1);
    expect(cell).toBe(true);
  });

  test('live cell four neighbour (should become dead by overpopulation)', () => {
    const grid: Grid = [
      [false, false, false],
      [false, liveCell, neighbour],
      [neighbour, neighbour, neighbour],
    ];
    const cell = calcCellLive(grid, 1, 1);
    expect(cell).toBe(false);
  });

  test('dead cell four neighbour (should stay dead)', () => {
    const grid: Grid = [
      [false, false, false],
      [false, deadCell, neighbour],
      [neighbour, neighbour, neighbour],
    ];
    const cell = calcCellLive(grid, 1, 1);
    expect(cell).toBe(false);
  });

  test('dead cell all neighbours (should stay dead)', () => {
    const grid: Grid = [
      [neighbour, neighbour, neighbour],
      [neighbour, deadCell, neighbour],
      [neighbour, neighbour, neighbour],
    ];
    const cell = calcCellLive(grid, 1, 1);
    expect(cell).toBe(false);
  });

  test('5 black guys and blonde on couch', () => {
    const grid: Grid = [
      [neighbour, neighbour, neighbour],
      [neighbour, liveCell, neighbour],
      [false, false, false],
    ];
    const cell = calcCellLive(grid, 1, 1);
    expect(cell).toBe(false);
  });
});

test('calc next generation', () => {
  const grid: Grid = [
    [false, false, false, false, false],
    [false, false, liveCell, false, false],
    [false, false, liveCell, false, false],
    [false, false, liveCell, false, false],
    [false, false, false, false, false],
  ];
  const nextGeneration: Grid = calcNextGeneration(grid);
  expect(nextGeneration).toMatchObject([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, liveCell, liveCell, liveCell, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ]);
});
