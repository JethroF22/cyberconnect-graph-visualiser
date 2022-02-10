import { ComponentType, useReducer } from "react";

import {
  AppContext,
  appContextReducer,
  initialState,
} from "../context/AppContext";

const WithContext = (AppComponent: ComponentType) => {
  const HOC = (props: any) => {
    const [state, dispatch] = useReducer(appContextReducer, initialState);

    return (
      <AppContext.Provider value={{ state, dispatch }}>
        <AppComponent {...props} />
      </AppContext.Provider>
    );
  };

  return HOC;
};

export default WithContext;
