import { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

import { TabPanelProps } from "../types/props";
import { ActionTypes } from "../types/appContext";

import { AppContext } from "../context/AppContext";

import colors from "../styles/colors";

function FollowedTabPanel({ selectedTab, tabIndex }: TabPanelProps) {
  const {
    state: { followed },
    dispatch,
  } = useContext(AppContext);

  const setSearchedAddress = (address: string) => {
    dispatch({
      type: ActionTypes.SET_ADDRESS,
      value: address,
    });
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
          {(!followed || followed.length === 0) && (
            <Typography>
              This address is not following any other addresses
            </Typography>
          )}

          {followed && followed.length > 0 && (
            <List
              sx={{
                width: "100%",
                bgcolor: colors.sapphireBlue,
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              {followed?.map((identity) => (
                <>
                  <ListItemButton
                    onClick={() => setSearchedAddress(identity.address)}
                  >
                    <ListItemIcon>
                      <Avatar src={identity.avatar} sx={{ fontSize: "12px" }} />
                    </ListItemIcon>
                    <ListItemText primary={identity.address} />
                    <PersonSearchIcon />
                  </ListItemButton>
                </>
              ))}
            </List>
          )}
        </Box>
      )}
    </div>
  );
}

export default FollowedTabPanel;
