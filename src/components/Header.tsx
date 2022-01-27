import { ChangeEventHandler, useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";

import { AppContext } from "../context/AppContext";
import { validateAddresses } from "../lib/validation";

function Header() {
  const { setState, state } = useContext(AppContext);
  const [address, setAddress] = useState<string>("");
  const [isValidAddress, setValidity] = useState<boolean>(true);

  const search = () => {
    const isValid = validateAddresses(address);
    if (isValid) {
      setValidity(true);
      setState({
        ...state,
        address,
      });
    } else {
      console.log("invalid address");
      setValidity(false);
    }
  };

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    setAddress(value);
  };

  return (
    <Box
      sx={{
        height: "50px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <TextField
        sx={{
          width: "50%",
          boxShadow:
            "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);",
        }}
        placeholder="Search address"
        variant="outlined"
        onChange={onChangeHandler}
        error={!isValidAddress ? true : undefined}
        helperText={
          !isValidAddress ? "Please enter a valid address" : undefined
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={search}
              />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default Header;
