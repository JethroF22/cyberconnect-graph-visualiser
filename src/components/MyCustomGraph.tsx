// Component that creates the graph
import { useSigma, useLoadGraph, useSetSettings } from "react-sigma-v2";

export const MyCustomGraph = () => {
  const sigma = useSigma();
  const graph = sigma.getGraph();
  graph.addNode("Jessica", {
    label: "Jessica",
    x: 1,
    y: 1,
    color: "#FF0",
    size: 10,
  });
  graph.addNode("Truman", {
    label: "Truman",
    x: 0,
    y: 0,
    color: "#00F",
    size: 5,
  });
  graph.addEdge("Jessica", "Truman", { color: "#CCC", size: 1 });
  return null;
};
