import { useEffect, useState } from "react";

import { AppContextState } from "../types/appContext";

export default function useAppContenxt() {
  const [state, setState] = useState<AppContextState>({
    address: null,
    selectedNode: null,
  });

  useEffect(() => {
    console.log("state", state);
    return () => {};
  }, [state]);

  return { state, setState };
}
