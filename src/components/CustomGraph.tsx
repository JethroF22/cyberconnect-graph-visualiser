import { useRef, useEffect, FC } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";

import useGetConnections from "../hooks/useGetConnections";
import useGetTransactions from "../hooks/useGetAddressTransactions";
import { RequestState } from "../types/http";
import {
  nodeMouseOverHandler,
  nodeMouseOutHandler,
} from "../lib/cytoscapeEvents";

const CustomGraph: FC = () => {
  const cyRef = useRef<cytoscape.Core>(null);
  const address = "0x8ddD03b89116ba89E28Ef703fe037fF77451e38E";
  const { graphInfo: socialGraphInfo, graphIsLoaded } = useGetConnections(
    "0x8ddD03b89116ba89E28Ef703fe037fF77451e38E"
  );
  const { requestState, graphInfo: transactionGraphInfo } = useGetTransactions(
    "0x8ddD03b89116ba89E28Ef703fe037fF77451e38E"
  );

  let elements = CytoscapeComponent.normalizeElements(socialGraphInfo);
  elements = [
    ...elements,
    ...CytoscapeComponent.normalizeElements(transactionGraphInfo),
  ];

  const layout = {
    name: "cose",
    idealEdgeLength: function () {
      return 250;
    },
    nodeOverlap: 100,
  };

  useEffect(() => {
    if (cyRef.current) {
      const cy = cyRef.current;

      cy.nodes().on("mouseover", (event) => nodeMouseOverHandler(event, cy));
      cy.nodes().on("mouseout", (event) => nodeMouseOutHandler(event, cy));
    }
  }, [elements]);

  return (
    <>
      {(requestState === RequestState.LOADING || !graphIsLoaded) &&
        "Loading..."}
      {requestState === RequestState.RESOLVED && graphIsLoaded && (
        <CytoscapeComponent
          stylesheet={[
            {
              selector: "node",
              style: {
                width: 40,
                height: 40,
                shape: "ellipse",
                "background-color": "data(color)",
              },
            },
            {
              selector: "edge",
              style: {
                width: 2,
                "line-color": "data(color)",
                display: "none",
              },
            },
            {
              selector: ".semitransparent",
              style: {
                opacity: 0.4,
              },
            },
            {
              selector: ".highlight",
              style: {
                opacity: 1,
              },
            },
          ]}
          style={{ width: "100%", height: "1000px" }}
          elements={elements}
          layout={layout}
          cy={(cy) => (cyRef.current = cy)}
          autoungrabify={true}
        />
      )}
    </>
  );
};

export default CustomGraph;
