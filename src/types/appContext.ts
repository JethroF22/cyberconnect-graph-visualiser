import { Dispatch, SetStateAction } from "react";

import { ConnectionNode, TransactionNode } from "./graph";

export interface AppContextState {
  address: string | null;
  selectedNode: ConnectionNode | TransactionNode | null;
}
export interface AppContextValue {
  state: AppContextState;
  setState: Dispatch<SetStateAction<AppContextState>>;
}
