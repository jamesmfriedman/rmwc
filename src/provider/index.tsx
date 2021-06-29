import React from 'react';
import * as RMWC from '@rmwc/types';

type TooltipActivationT = 'hover' | 'click' | 'focus';

type TooltipAlignT =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

type TooltipOptions = {
  /** How to align the tooltip. Defaults to `top`. */
  align?: TooltipAlignT;
  /** Activate the tooltip through one or more interactions. Defaults to `['hover', 'focus']`. */
  activateOn?: TooltipActivationT | TooltipActivationT[];
  /** Whether or not to show an arrow on the Tooltip. Defaults to `false`. */
  showArrow?: boolean;
  /** Delay in milliseconds before showing the tooltip when interacting via touch or mouse. */
  enterDelay?: number;
  /** Delay in milliseconds before hiding the tooltip when interacting via touch or mouse. */
  leaveDelay?: number;
};

type TypographyOptions = {
  defaultTag?: string | React.ComponentType<any>;
  headline1?: string | React.ComponentType<any>;
  headline2?: string | React.ComponentType<any>;
  headline3?: string | React.ComponentType<any>;
  headline4?: string | React.ComponentType<any>;
  headline5?: string | React.ComponentType<any>;
  headline6?: string | React.ComponentType<any>;
  subtitle1?: string | React.ComponentType<any>;
  subtitle2?: string | React.ComponentType<any>;
  body1?: string | React.ComponentType<any>;
  body2?: string | React.ComponentType<any>;
  caption?: string | React.ComponentType<any>;
  button?: string | React.ComponentType<any>;
  overline?: string | React.ComponentType<any>;
};

/** A provider for setting global options in RMWC. */
export interface RMWCProviderProps {
  /** Enable / Disable interaction ripples globally */
  ripple?: boolean;
  /** Global options for icons */
  icon?: Partial<RMWC.IconOptions>;
  /** Global tooltip options */
  tooltip?: Partial<TooltipOptions>;
  /** Global typography options */
  typography?: Partial<TypographyOptions>;
  /** Children to render */
  children?: React.ReactNode;
}

// Default provider options
const providerDefaults: RMWCProviderProps = {
  ripple: true,
  tooltip: {
    align: 'top',
    showArrow: false,
    activateOn: ['hover', 'focus'],
    enterDelay: 0,
    leaveDelay: 0
  },
  typography: {},
  icon: {
    icon: '',
    basename: 'material-icons',
    prefix: '',
    strategy: 'auto',
    render: undefined
  }
};

export const ProviderContext = React.createContext(providerDefaults);

export const useProviderContext = () => React.useContext(ProviderContext);

/** A provider for setting global options in RMWC. */
export const RMWCProvider = ({ children, ...rest }: RMWCProviderProps) => {
  return (
    <ProviderContext.Provider
      value={{
        ...providerDefaults,
        ...rest
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};
