import { FC } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import Cytoscape from "cytoscape";
import COSEBilkent from "cytoscape-cose-bilkent";

import useGetConnections from "../hooks/useGetConnections";

Cytoscape.use(COSEBilkent);

const CustomGraph: FC = () => {
  const { loading, graphInfo, graphIsLoaded } = useGetConnections(
    "0x8ddD03b89116ba89E28Ef703fe037fF77451e38E"
  );

  console.log("graphInfo", graphInfo);

  const elements = CytoscapeComponent.normalizeElements(graphInfo);
  console.log("elements", elements);

  const layout = { name: "cose" };

  return (
    <>
      {!graphIsLoaded && "Loading..."}
      {graphIsLoaded && (
        <CytoscapeComponent
          stylesheet={[
            {
              selector: "node",
              style: {
                width: 20,
                height: 20,
                shape: "rectangle",
              },
            },
            {
              selector: "edge",
              style: {
                width: 2,
              },
            },
          ]}
          style={{ width: "100%", height: "1000px" }}
          elements={elements}
          layout={layout}
        />
      )}
    </>
  );
};

export default CustomGraph;
