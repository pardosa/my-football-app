import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Grid,
  Avatar,
} from "@mui/material";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

import { AppDispatch } from "../../store";
import { components } from "../../types/openapi";

import { useParams } from "react-router-dom";
import {
  detailPlayer,
  getPlayerStatus,
  getPlayer,
} from "../../store/reducers/player";
import { useTheme } from "@mui/material/styles";
import PlayerCard from "../../components/PlayerCard";

type TPlayerStats = components["schemas"]["PlayerStatistics"];

function Player() {
  const dispatch = useDispatch<AppDispatch>();
  const playerStats: TPlayerStats[] = useSelector(detailPlayer);
  const status = useSelector(getPlayerStatus);
  const { id } = useParams();
  const theme = useTheme();

  useEffect(() => {
    if (id) dispatch(getPlayer({ id: Number(id), season: 2022 }));
  }, [dispatch, id]);

  return status === "succeeded" && playerStats.length > 0 ? (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={2}>
        <Card key={"player-info-card"}>
          <CardContent
            sx={{ color: "text.primary", bgcolor: theme.shadows[6] }}
          >
            <Stack alignItems={"center"} justifyContent={"center"} spacing={3}>
              <Avatar
                alt={playerStats[0].player?.name}
                src={playerStats[0].player?.photo}
                sx={{ width: 100, height: 100 }}
              />
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                spacing={1}
              >
                <Typography variant="h4">
                  {playerStats[0].player?.name}
                </Typography>
                <Typography variant="h6">
                  {`${playerStats[0].player?.nationality}`}
                </Typography>
              </Stack>
              <Stack
                alignItems={"space-between"}
                justifyContent="center"
                direction="row"
                spacing={4}
              >
                <Stack
                  alignItems={"center"}
                  justifyContent={"center"}
                  spacing={1}
                >
                  <Typography variant="h5">
                    {playerStats[0].player?.age}
                  </Typography>
                  <Typography variant="body1">Age</Typography>
                </Stack>
                <Stack
                  alignItems={"center"}
                  justifyContent={"center"}
                  spacing={1}
                >
                  <Typography variant="h5">
                    {playerStats[0].player?.weight}
                  </Typography>
                  <Typography variant="body1">Weight</Typography>
                </Stack>
                <Stack
                  alignItems={"center"}
                  justifyContent={"center"}
                  spacing={1}
                >
                  <Typography variant="h5">
                    {playerStats[0].player?.height}
                  </Typography>
                  <Typography variant="body1">Height</Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack
              alignItems={"left"}
              justifyContent={"left"}
              spacing={1}
              sx={{ pt: 4 }}
            >
              <Stack direction={"row"} spacing={4} alignItems={"left"}>
                <FlagOutlinedIcon fontSize="small" color="success" />
                <Typography variant="h6">
                  {`${playerStats[0].player?.nationality}`}
                </Typography>
              </Stack>
              <Stack direction={"row"} spacing={4} alignItems={"left"}>
                <CakeOutlinedIcon fontSize="small" color="warning" />
                <Typography variant="h6">
                  {`${playerStats[0].player?.birth?.date}`}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={10}>
        <PlayerCard stats={playerStats[0].statistics} />
      </Grid>
    </Grid>
  ) : (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}

export default Player;
