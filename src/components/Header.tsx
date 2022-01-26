import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";

function Header() {
  return (
    <Box
      sx={{
        height: "50px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextField
        sx={{
          width: "50%",
        }}
        placeholder="Search address"
        variant="standard"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default Header;
