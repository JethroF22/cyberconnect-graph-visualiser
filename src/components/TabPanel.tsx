import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import FollowersTabPanel from "./FollowersTabPanel";
import FollowingTabPanel from "./FollowingTabPanel";
import TransactionsTabPanel from "./TransactionsTabPanel";

const tabLabelStyles = {
  color: "#eef0f2",
  "&.Mui-selected": {
    color: "#eef0f2",
  },
};

function TabPanel() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: any, tabIndex: any) => {
    setSelectedTab(tabIndex);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { backgroundColor: "#eef0f2" },
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
