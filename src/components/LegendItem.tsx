import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const nodeIndicatorStyle = {
  borderRadius: "50%",
  height: "20px",
  width: "20px",
};

interface LegendItemProps {
  color: string;
  text: string;
}

function LegendItem({ color, text }: LegendItemProps) {
  return (
    <Box
      sx={{
        width: "60%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          ...nodeIndicatorStyle,
          backgroundColor: color,
        }}
      ></div>
      <Typography
        variant="h5"
        noWrap
        textAlign="center"
        component="div"
        color={color}
        sx={{
          height: "50%",
          marginLeft: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

export default LegendItem;
