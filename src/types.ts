export type GridType = boolean[][];

export type Params = {
  rows: number;
  cols: number;
};

export type Preset = {
  params: Params;
  grid: GridType;
};
