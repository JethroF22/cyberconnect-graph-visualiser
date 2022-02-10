import { useContext } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

import AddressDetailsHeader from "./AddressDetailsHeader";
import TabPanel from "./TabPanel";

import { AppContext } from "../context/AppContext";

import colors from "../styles/colors";

function SidePanel() {
  const {
    state: { address },
  } = useContext(AppContext);
  return (
    <Drawer
      sx={{
        width: "30%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "30%",
          boxSizing: "border-box",
          borderRight: "2px solid rgba(0, 0, 0, 0.12)",
          backgroundColor: colors.sapphireBlue,
          color: colors.white,
          padding: "10px",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          width: "80%",
          height: "100%",
          margin: "0 auto",
        }}
      >
        {address && (
          <>
            <AddressDetailsHeader />
            <TabPanel />
          </>
        )}
      </Box>
    </Drawer>
  );
}

export default SidePanel;
