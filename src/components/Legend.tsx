import Card from "@mui/material/Card";

import colors from "../styles/colors";
import LegendItem from "./LegendItem";

function Legend() {
  return (
    <Card
      sx={{
        width: "15%",
        height: "20%",
        position: "absolute",
        top: 15,
        right: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginRight: "50px",
      }}
    >
      <LegendItem text="Follower" color={colors.richBlack} />
      <LegendItem text="Following" color={colors.darkPurple} />
      <LegendItem text="Transactions" color={colors.onyx} />
    </Card>
  );
}

export default Legend;
