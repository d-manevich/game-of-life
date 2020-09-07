export type Field = boolean[][];

export type Params = {
  rows: number;
  cols: number;
};

export type Preset = {
  params: Params;
  field: Field;
};
