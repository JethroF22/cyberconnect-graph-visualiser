import { useRef, useContext, FC } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import useGetGraphElements from "../hooks/useGetGraphElements";
import { RequestState } from "../types/http";
import { AppContext } from "../context/AppContext";
import colors from "../styles/colors";

const CustomGraph: FC = () => {
  const cyRef = useRef<cytoscape.Core>(null);
  const {
    state: { address },
  } = useContext(AppContext);
  const { loadingState, elements } = useGetGraphElements(address || "");

  // @ts-ignore
  const graphElements = CytoscapeComponent.normalizeElements(elements);

  const layout = {
    concentric: function (node: cytoscape.NodeSingular) {
      return node.data("level");
    },
    levelWidth: function () {
      return 1;
    },
    name: "concentric",
  };

  return (
    <>
      {loadingState === RequestState.IDLE && (
        <Typography
          variant="h4"
          noWrap
          textAlign="center"
          component="div"
          color={colors.richBlack}
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
          <ArrowUpwardIcon sx={{ fontSize: "36px", color: colors.richBlack }} />
        </Typography>
      )}
      {loadingState === RequestState.LOADING && (
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
          <CircularProgress size={64} sx={{ color: colors.darkSkyBlue }} />
        </Box>
      )}
      {loadingState === RequestState.RESOLVED && (
        <>
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
              {
                selector: ".labelled",
                style: {
                  label: "data(label)",
                  "font-size": "36px",
                },
              },
            ]}
            style={{ width: "100%", height: "100%" }}
            elements={graphElements}
            layout={layout}
            cy={(cy) => {
              // @ts-ignore
              cyRef.current = cy;
            }}
            autoungrabify={true}
          />
        </>
      )}
    </>
  );
};

export default CustomGraph;
