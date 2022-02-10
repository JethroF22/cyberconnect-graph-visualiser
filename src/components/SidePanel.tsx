import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

import TabPanel from "./TabPanel";

function SidePanel() {
  return (
    <Drawer
      sx={{
        width: "30%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "30%",
          boxSizing: "border-box",
          borderRight: "2px solid rgba(0, 0, 0, 0.12)",
          backgroundColor: "#006494",
          color: "#fff",
          padding: "10px",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          width: "80%",
          height: "100%",
          margin: "0 auto",
        }}
      >
        <TabPanel />
      </Box>
    </Drawer>
  );
}

export default SidePanel;