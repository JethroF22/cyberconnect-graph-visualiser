import { Identity } from "./connections";
import { Transaction } from "./etherscan";

export interface NodeData {
  id: string | number;
  label: string;
  color?: string;
  level: number | null;
}

export interface ConnectionNodeData extends NodeData, Identity {}

export interface TransactionNodeData extends NodeData, Transaction {}

export interface Node {
  data: NodeData;
}
export interface ConnectionNode {
  data: ConnectionNodeData;
}

export interface TransactionNode {
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
  nodes: Node[];
  edges: Edge[];
}

export interface ConnectionGraphInfo extends GraphInfo {
  nodes: ConnectionNode[];
}

export interface TransactionsGraphInfo extends GraphInfo {
  nodes: TransactionNode[];
}
