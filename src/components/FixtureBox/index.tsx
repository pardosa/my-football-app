import {
  ListItem,
  Grid,
  Stack,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { components } from "../../types/openapi";
import { styled } from "@mui/material/styles";

type Iprops = {
  fx: components["schemas"]["Fixtures"];
  onClick: () => void;
};

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

const FixtureBox = (props: Iprops) => {
  const { fx, onClick } = props;
  const goals = fx.events?.filter((ev) => ev.type === "Goal");
  const homeGoals = goals?.filter((ev) => ev.team?.id === fx.teams?.home?.id);
  const awayGoals = goals?.filter((ev) => ev.team?.id === fx.teams?.away?.id);
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
        textAlign: "center",
        mb: 4,
      }}
    >
      <ListItem
        onClick={(e) => {
          onClick();
        }}
        style={{ cursor: "pointer" }}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={2}>
            <Stack direction="row" spacing={1}>
              <ListItemAvatar>
                <Avatar alt={fx.league?.name} src={fx.league?.logo} />
              </ListItemAvatar>
              <ListItemText
                primary={fx.league?.name}
                secondary={fx.league?.season}
              />
            </Stack>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Stack sx={{ mb: 2 }}>
                  <Stack
                    direction="row-reverse"
                    alignItems="center"
                    spacing={1}
                  >
                    <Avatar
                      src={fx?.teams?.home?.logo}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Typography variant="h6">
                      {fx?.teams?.home?.name}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="row-reverse" alignItems="right" spacing={2}>
                  <Stack>
                    {homeGoals?.map((gl) => (
                      <Typography variant="subtitle2">{`${gl.player?.name} (${gl.time?.elapsed})`}</Typography>
                    ))}
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack>
                  <FlexBetween>{fx.fixture?.status?.short}</FlexBetween>
                  <FlexBetween>
                    <Typography variant="h5">{fx.goals?.home}</Typography>
                    <Typography variant="h6">-</Typography>
                    <Typography variant="h5">{fx.goals?.away}</Typography>
                  </FlexBetween>
                  <FlexBetween>{fx.fixture?.venue?.name}</FlexBetween>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar
                    src={fx?.teams?.away?.logo}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography variant="h6">{fx?.teams?.away?.name}</Typography>
                </Stack>
                <Stack direction="row" alignItems="left" spacing={2}>
                  <Stack>
                    {awayGoals?.map((gl) => (
                      <Typography variant="subtitle2">{`${gl.player?.name} (${gl.time?.elapsed})`}</Typography>
                    ))}
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <Stack alignItems="center" spacing={1}>
              <Typography variant="h6">{fx.league?.round}</Typography>
              <Typography variant="subtitle1">
                {fx.fixture?.status?.long}
              </Typography>
              <Typography variant="subtitle2">
                Referee: {fx.fixture?.referee}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ListItem>
    </Box>
  );
};

export default FixtureBox;
