import Box from "@mui/material/Box";

import WithContext from "../hocs/WithContext";

import CustomGraph from "./CustomGraph";
import SidePanel from "./SidePanel";
import Header from "./Header";

function HomePage() {
  return (
    <Box sx={{ width: "95vw", height: "95vh", display: "flex" }}>
      <SidePanel />
      <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <Header />
        <CustomGraph />
      </Box>
    </Box>
  );
}

export default WithContext(HomePage);
