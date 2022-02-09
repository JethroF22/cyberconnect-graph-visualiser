import Box from "@mui/material/Box";

import CustomGraph from "./CustomGraph";
import Header from "./Header";
import WithContext from "../hocs/WithContext";

function HomePage() {
  return (
    <Box sx={{ width: "95vw", height: "95vh", display: "flex" }}>
      <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <Header />
        <CustomGraph />
      </Box>
    </Box>
  );
}

export default WithContext(HomePage);
