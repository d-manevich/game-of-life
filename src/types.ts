export type GridType = boolean[][];

export type Size = {
  width: number;
  height: number;
};

export type Params = {
  rows: number;
  cols: number;
};

export type Preset = {
  params: Params;
  grid: GridType;
};
