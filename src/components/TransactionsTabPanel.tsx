import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { TabPanelProps } from "../types/props";

function TransactionsTabPanel({ selectedTab, tabIndex }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={selectedTab !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
    >
      {selectedTab === tabIndex && (
        <Box sx={{ p: 3 }}>
          <Typography>Transactions</Typography>
        </Box>
      )}
    </div>
  );
}

export default TransactionsTabPanel;
