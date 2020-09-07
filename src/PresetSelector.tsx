import React from 'react';
import { CLOCK, SHIP_44P5H2V0, HANGAR, PULSAR, PLANER_GUN } from './presets';
import { Preset } from './types';

type Props = {
  onSelect: (preset: Preset) => void;
};

const PresetSelector: React.FC<Props> = ({ onSelect }: Props) => (
  <div>
    <button onClick={() => onSelect(CLOCK)}>Clock</button>
    <button onClick={() => onSelect(SHIP_44P5H2V0)}>Ship 44P5H2V0</button>
    <button onClick={() => onSelect(HANGAR)}>Hangar</button>
    <button onClick={() => onSelect(PULSAR)}>Pulsar</button>
    <button onClick={() => onSelect(PLANER_GUN)}>Planer gun</button>
  </div>
);

export default PresetSelector;
