import { ComponentType } from "react";

import { AppContext } from "../context/AppContext";
import useAppContext from "../hooks/useAppContext";

const WithContext = <P,>(AppComponent: ComponentType<P>) => {
  const HOC = (props: any) => {
    const { state, setState } = useAppContext();

    return (
      <AppContext.Provider value={{ state, setState }}>
        <AppComponent {...props} />
      </AppContext.Provider>
    );
  };

  return HOC;
};

export default WithContext;
