import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import FollowersTabPanel from "./FollowersTabPanel";
import FollowingTabPanel from "./FollowingTabPanel";
import TransactionsTabPanel from "./TransactionsTabPanel";
import colors from "../styles/colors";

const tabLabelStyles = {
  color: colors.cultured,
  "&.Mui-selected": {
    color: colors.cultured,
  },
};

function TabPanel() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: any, tabIndex: any) => {
    setSelectedTab(tabIndex);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { backgroundColor: colors.cultured },
          }}
        >
          <Tab label="Followers" sx={tabLabelStyles} />
          <Tab label="Following" sx={tabLabelStyles} />
          <Tab label="Transactions" sx={tabLabelStyles} />
        </Tabs>
      </Box>
      <FollowersTabPanel selectedTab={selectedTab} tabIndex={0} />
      <FollowingTabPanel selectedTab={selectedTab} tabIndex={1} />
      <TransactionsTabPanel selectedTab={selectedTab} tabIndex={2} />
    </Box>
  );
}

export default TabPanel;
