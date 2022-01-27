import { useRef, useEffect, useContext, FC } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import useGetConnections from "../hooks/useGetConnections";
import useGetTransactions from "../hooks/useGetAddressTransactions";
import { RequestState } from "../types/http";
import {
  nodeMouseOverHandler,
  nodeMouseOutHandler,
} from "../lib/cytoscapeEvents";
import { AppContext } from "../context/AppContext";

const CustomGraph: FC = () => {
  const cyRef = useRef<cytoscape.Core>(null);
  const {
    state: { address },
  } = useContext(AppContext);
  const { graphInfo: socialGraphInfo, graphIsLoaded } = useGetConnections(
    address || ""
  );
  const { requestState, graphInfo: transactionGraphInfo } = useGetTransactions(
    address || ""
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
      {requestState === RequestState.IDLE && (
        <Typography
          variant="h4"
          noWrap
          textAlign="center"
          component="div"
          color="#000"
          sx={{
            margin: "0 auto",
            height: "50%",
            paddingTop: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Search for an address to get started!
          <ArrowUpwardIcon sx={{ fontSize: "36px", color: "#000" }} />
        </Typography>
      )}
      {requestState === RequestState.LOADING && (
        <Box
          sx={{
            margin: "0 auto",
            height: "50%",
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={64} sx={{ color: "#2d5d7b" }} />
        </Box>
      )}
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
          style={{ width: "100%", height: "100%" }}
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
