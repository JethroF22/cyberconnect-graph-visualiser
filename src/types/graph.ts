import { Identity } from "./connections";
import { Transaction } from "./etherscan";

export interface NodeData {
  id: string | number;
  label: string;
  color?: string;
}

export interface BaseNode {
  position: {
    x: number | null;
    y: number | null;
  };
}

export interface ConnectionNodeData extends NodeData, Identity {}

export interface TransactionNodeData extends NodeData, Transaction {}

export interface ConnectionNode extends BaseNode {
  data: ConnectionNodeData;
}

export interface TransactionNode extends BaseNode {
  data: TransactionNodeData;
}

export interface Edge {
  data: {
    source: string | number;
    target: string | number;
    label: string;
    color: string;
  };
}

export interface GraphInfo {
  edges: Edge[];
}

export interface ConnectionGraphInfo extends GraphInfo {
  nodes: ConnectionNode[];
}

export interface TransactionsGraphInfo extends GraphInfo {
  nodes: TransactionNode[];
}
