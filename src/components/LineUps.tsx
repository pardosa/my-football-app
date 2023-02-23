import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { components } from "../types/openapi";

type Iprops = {
  team: components["schemas"]["Team"];
  lineups: components["schemas"]["FixtureLineups"];
};

export default function LineUps(props: Iprops) {
  const { team, lineups } = props;
  return (
    <Stack>
      <Typography variant="h5" sx={{ mb: 2 }}>{`${team.name}`}</Typography>
      <Typography variant="subtitle1">Coach</Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <ListItemAvatar>
          <Avatar alt={lineups.coach?.name} src={lineups.coach?.photo} />
        </ListItemAvatar>
        <ListItemText primary={lineups.coach?.name} secondary={""} />
      </Stack>
      <Typography variant="subtitle1">Formation</Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {lineups.formation}
      </Typography>
      <Typography variant="subtitle1">Starting XI</Typography>
      <Stack sx={{ mb: 2 }}>
        {lineups.startXI?.map((pl) => (
          <Stack
            direction={"row"}
          >{`${pl.player?.number} - ${pl.player?.name} (${pl.player?.pos})`}</Stack>
        ))}
      </Stack>
      <Typography variant="subtitle1">Substitutes</Typography>
      <Stack sx={{ mb: 2 }}>
        {lineups.substitutes?.map((pl) => (
          <Stack
            direction={"row"}
          >{`${pl.player?.number} - ${pl.player?.name} (${pl.player?.pos})`}</Stack>
        ))}
      </Stack>
    </Stack>
  );
}
