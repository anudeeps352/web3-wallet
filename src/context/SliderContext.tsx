'use client';

import { createContext, useContext, useState } from 'react';

type Context = {
  sol: boolean;
  setSol: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultContext: Context = {
  sol: false,
  setSol: () => {},
};
const AppContext = createContext<Context>(defaultContext);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [sol, setSol] = useState(true);
  return (
    <AppContext.Provider value={{ sol, setSol }}>
      {children}
    </AppContext.Provider>
  );
}

export function useSliderContext() {
  return useContext(AppContext);
}
