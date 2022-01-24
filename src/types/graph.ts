export interface Node {
  data: {
    id: string | number;
    label: string;
    image: string;
    color?: string;
  };
  position: {
    x: number | null;
    y: number | null;
  };
}

export interface Edge {
  data: {
    source: string | number;
    target: string | number;
    label: string;
  };
}

export interface GraphInfo {
  nodes: Node[];
  edges: Edge[];
}
