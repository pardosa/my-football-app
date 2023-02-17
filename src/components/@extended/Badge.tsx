import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

type Iprops = {
  text: string;
};

export const Badge = (props: Iprops) => {
  return (
    <div>
      <Item
        variant="outlined"
        style={
          props.text === "W"
            ? { color: "rgb(82, 196, 26)" }
            : props.text === "D"
            ? { color: "rgb(24, 144, 255)" }
            : props.text === "L"
            ? { color: "rgb(255, 77, 79)" }
            : { color: "#595959" }
        }
      >
        {props.text}
      </Item>
    </div>
  );
};
