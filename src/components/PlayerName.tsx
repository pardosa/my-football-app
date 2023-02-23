import { Stack, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Iprops = {
  id?: number;
  number?: number;
  name?: string;
  pos?: string;
};

function PlayerName(props: Iprops) {
  const { id, number, name, pos } = props;
  const navigate = useNavigate();
  return (
    <Stack direction={"row"} spacing={2}>
      <Button
        variant="contained"
        color="info"
        sx={{
          borderRadius: "50%",
          padding: "4px",
          minWidth: "20px",
          height: "20px",
        }}
      >
        {number}
      </Button>
      <Link
        component="button"
        variant="body2"
        onClick={() => {
          navigate("/dashboard/player/" + id);
        }}
      >
        {name}
      </Link>
      {pos && (
        <Button
          variant="contained"
          color="success"
          sx={{
            borderRadius: "50%",
            padding: "4px",
            minWidth: "25px",
            height: "25px",
          }}
        >
          {pos}
        </Button>
      )}
    </Stack>
  );
}

export default PlayerName;
