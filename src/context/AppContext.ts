import { createContext } from "react";

import { AppContextState, AppContextValue } from "../types/appContext";

export const AppContext = createContext<AppContextValue>({
  state: {} as AppContextState,
  setState: () => null,
});
