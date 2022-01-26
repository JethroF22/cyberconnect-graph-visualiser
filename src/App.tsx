import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { styled, alpha } from "@mui/material/styles";

import CustomGraph from "./components/CustomGraph";
import Header from "./components/Header";

function App() {
  return (
    <Box sx={{ width: "95vw", height: "95vh", display: "flex" }}>
      <Drawer
        sx={{
          width: "20%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "20%",
            boxSizing: "border-box",
            borderRight: "2px solid rgba(0, 0, 0, 0.12)",
            backgroundColor: "#457eac",
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
            justifyContent: "space-between",
            padding: "10px",
            width: "80%",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h3"
            noWrap
            component="div"
            textAlign="center"
            color="#fff"
          >
            Faceblock
          </Typography>
          <PersonSearchIcon sx={{ fontSize: "48px", color: "#fff" }} />
        </Box>
      </Drawer>
      <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <Header />
        <CustomGraph />
      </Box>
    </Box>
  );
}

export default App;
