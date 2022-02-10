import Box from "@mui/material/Box";

import WithContext from "../hocs/WithContext";

import CustomGraph from "./CustomGraph";
import SidePanel from "./SidePanel";
import Header from "./Header";
import Legend from "./Legend";

function HomePage() {
  return (
    <Box sx={{ width: "95vw", height: "95vh", display: "flex" }}>
      <SidePanel />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Header />
        <CustomGraph />
        <Legend />
      </Box>
    </Box>
  );
}

export default WithContext(HomePage);
