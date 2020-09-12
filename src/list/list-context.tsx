import * as React from 'react';

type ListContextT = {
  getClassName: (index: number) => string[] ;
  setEnabled: (index: number, isEnabled: boolean) => void;
};

export const ListContext = React.createContext<ListContextT>({
  getClassName: (index: number) => [],
  setEnabled: (index: number, isEnabled: boolean) => {},
});
