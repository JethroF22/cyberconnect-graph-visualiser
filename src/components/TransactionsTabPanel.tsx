import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

import { TabPanelProps } from "../types/props";

import { AppContext } from "../context/AppContext";
import { Transaction } from "../types/etherscan";
import colors from "../styles/colors";
import TransactionDetails from "./TransactionDetails";
import { formatLabel } from "../lib/transactions";

function TransactionsTabPanel({ selectedTab, tabIndex }: TabPanelProps) {
  const {
    state: { transactions, address },
  } = useContext(AppContext);
  const [selectedTransaction, setSelectedAddress] = useState<string>("");
  const toggleTransactionDetails = (transaction: Transaction) => {
    if (selectedTransaction === transaction.hash) {
      setSelectedAddress("");
    } else {
      setSelectedAddress(transaction.hash);
    }
  };

  return (
    <div
      role="tabpanel"
      hidden={selectedTab !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
    >
      {selectedTab === tabIndex && (
        <Box sx={{ p: 3, width: "91%", marginRight: "0" }}>
          {(!transactions || transactions.length === 0) && (
            <Typography>This address has no transactions</Typography>
          )}

          {transactions && transactions.length > 0 && (
            <List
              sx={{
                width: "100%",
                bgcolor: colors.sapphireBlue,
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              {transactions?.map((transaction) => (
                <div key={transaction.hash}>
                  <ListItemButton
                    onClick={() => toggleTransactionDetails(transaction)}
                    sx={{ width: "100%" }}
                  >
                    <ListItemText primary={formatLabel(transaction, address)} />
                    {selectedTransaction === transaction.hash ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItemButton>
                  <Collapse
                    in={selectedTransaction === transaction.hash}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ width: "100%" }}>
                        <ListItemText
                          primary={
                            <TransactionDetails
                              transaction={transaction}
                              searchedAddress={address}
                            />
                          }
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </div>
              ))}
            </List>
          )}
        </Box>
      )}
    </div>
  );
}

export default TransactionsTabPanel;
