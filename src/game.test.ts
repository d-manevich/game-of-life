import { generateInitialField, updateCell, getNeighbours, calcCellLive, calcNextGeneration } from './game';
import { Field } from './types';

const neighbour = true;
const liveCell = true;
const deadCell = false;

test('generate initial field 4x6', () => {
  const field = generateInitialField({ rows: 4, cols: 6 });
  expect(field).toMatchObject<Field>([
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
  ]);
});

test('update cell', () => {
  const field: Field = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];
  const updatedField: Field = updateCell(field, 1, 1, true);
  expect(updatedField).toMatchObject<Field>([
    [false, false, false],
    [false, liveCell, false],
    [false, false, false],
  ]);
});

test('get zero neighbours', () => {
  const field: Field = [
    [false, false, false],
    [deadCell, false, false],
    [false, false, false],
  ];
  const neighbours = getNeighbours(field, 1, 0);
  expect(neighbours).toBe(0);
});

test('get neighbours', () => {
  const field: Field = [
    [neighbour, false, false],
    [deadCell, false, false],
    [false, false, neighbour],
  ];
  const neighbours = getNeighbours(field, 1, 0);
  expect(neighbours).toBe(2);
});

describe('calc cell live', () => {
  test('dead cell in wasteland', () => {
    const field: Field = [
      [false, false, false],
      [false, deadCell, false],
      [false, false, false],
    ];
    const cell = calcCellLive(field, 1, 1);
    expect(cell).toBe(false);
  });

  test('live cell in wasteland (should die by loneliness)', () => {
    const field: Field = [
      [false, false, false],
      [false, liveCell, false],
      [false, false, false],
    ];
    const cell = calcCellLive(field, 1, 1);
    expect(cell).toBe(false);
  });

  test('live cell one neighbour (should die by loneliness)', () => {
    const field: Field = [
      [false, false, false],
      [false, liveCell, false],
      [false, false, neighbour],
    ];
    const cell = calcCellLive(field, 1, 1);
    expect(cell).toBe(false);
  });

  test('live cell two neighbour (should stay live)', () => {
    const field: Field = [
      [false, false, false],
      [false, liveCell, neighbour],
      [false, false, neighbour],
    ];
    const cell = calcCellLive(field, 1, 1);
    expect(cell).toBe(true);
  });

  test('dead cell two neighbour (should stay dead)', () => {
    const field: Field = [
      [false, false, false],
      [false, deadCell, neighbour],
      [false, false, neighbour],
    ];
    const cell = calcCellLive(field, 1, 1);
    expect(cell).toBe(false);
  });

  test('live cell three neighbour (should stay live)', () => {
    const field: Field = [
      [false, false, false],
      [false, liveCell, neighbour],
      [neighbour, false, neighbour],
    ];
    const cell = calcCellLive(field, 1, 1);
    expect(cell).toBe(true);
  });

  test('dead cell three neighbour (should become live by reproduction)', () => {
    const field: Field = [
      [false, false, false],
      [false, deadCell, neighbour],
      [neighbour, false, neighbour],
    ];
    const cell = calcCellLive(field, 1, 1);
    expect(cell).toBe(true);
  });

  test('live cell four neighbour (should become dead by overpopulation)', () => {
    const field: Field = [
      [false, false, false],
      [false, liveCell, neighbour],
      [neighbour, neighbour, neighbour],
    ];
    const cell = calcCellLive(field, 1, 1);
    expect(cell).toBe(false);
  });

  test('dead cell four neighbour (should stay dead)', () => {
    const field: Field = [
      [false, false, false],
      [false, deadCell, neighbour],
      [neighbour, neighbour, neighbour],
    ];
    const cell = calcCellLive(field, 1, 1);
    expect(cell).toBe(false);
  });

  test('dead cell all neighbours (should stay dead)', () => {
    const field: Field = [
      [neighbour, neighbour, neighbour],
      [neighbour, deadCell, neighbour],
      [neighbour, neighbour, neighbour],
    ];
    const cell = calcCellLive(field, 1, 1);
    expect(cell).toBe(false);
  });

  test('5 black guys and blonde on couch', () => {
    const field: Field = [
      [neighbour, neighbour, neighbour],
      [neighbour, liveCell, neighbour],
      [false, false, false],
    ];
    const cell = calcCellLive(field, 1, 1);
    expect(cell).toBe(false);
  });
});

test('calc next generation', () => {
  const field: Field = [
    [false, false, false, false, false],
    [false, false, liveCell, false, false],
    [false, false, liveCell, false, false],
    [false, false, liveCell, false, false],
    [false, false, false, false, false],
  ];
  const nextGeneration: Field = calcNextGeneration(field);
  expect(nextGeneration).toMatchObject([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, liveCell, liveCell, liveCell, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ]);
});
