import { useContext } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { AppContext } from "../context/AppContext";

import colors from "../styles/colors";

function AddressDetailsHeader() {
  const {
    state: { searchedIdentity },
  } = useContext(AppContext);
  return (
    <Box
      sx={{
        height: "25%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar src={searchedIdentity?.avatar} sx={{ width: 75, height: 75 }} />
      {searchedIdentity?.ens && (
        <Typography
          variant="h4"
          noWrap
          textAlign="center"
          component="div"
          color={colors.cultured}
        >
          {searchedIdentity.ens}
        </Typography>
      )}
      <Box
        sx={{
          height: "50%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "10 10",
          }}
        >
          <Typography
            variant="h4"
            noWrap
            textAlign="center"
            component="div"
            color={colors.cultured}
          >
            {searchedIdentity?.followerCount}
          </Typography>
          <Typography
            variant="h6"
            noWrap
            textAlign="center"
            component="div"
            color={colors.cultured}
          >
            Followers
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "10 10",
          }}
        >
          <Typography
            variant="h4"
            noWrap
            textAlign="center"
            component="div"
            color={colors.cultured}
          >
            {searchedIdentity?.followingCount}
          </Typography>
          <Typography
            variant="h6"
            noWrap
            textAlign="center"
            component="div"
            color={colors.cultured}
          >
            Followed
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default AddressDetailsHeader;
