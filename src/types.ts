export type Grid = boolean[][];

export type Params = {
  rows: number;
  cols: number;
};

export type Preset = {
  params: Params;
  grid: Grid;
};
