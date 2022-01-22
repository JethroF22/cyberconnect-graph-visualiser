export interface Node {
  id: string | number;
  label: string;
  title?: string;
  shape: string;
  image: string;
}

export interface Edge {
  from: string | number;
  to: string | number;
}

export interface GraphInfo {
  nodes: Node[];
  edges: Edge[];
}
