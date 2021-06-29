/* istanbul ignore file */
import { useState } from 'react';
import * as knobTypes from '@storybook/addon-knobs';

// @ts-ignore
import { manager } from '@storybook/addon-knobs/dist/esm/registerKnobs';

export const useKnob = (
  knobType: keyof typeof knobTypes,
  name: string,
  defaultValue: any
) => {
  const knobFunc = knobTypes[knobType] as any;
  const [stateValue, _stateSetter] = useState(defaultValue);
  const knobValue = knobFunc(name, stateValue);

  const stateSetter = (value: any) => {
    _stateSetter(value);
    manager.knob(name, stateValue);
  };

  if (knobValue !== stateValue) {
    stateSetter(knobValue);
  }
  return [stateValue, stateSetter];
};
