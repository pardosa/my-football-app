import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Stack,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme,
} from "@mui/material";

import { AppDispatch } from "../../store";
import { components } from "../../types/openapi";

import { useParams } from "react-router-dom";
import {
  selectAllFixtures,
  getFixturesStatus,
  getFixtures,
} from "../../store/reducers/fixtures";

type TFixtures = components["schemas"]["Fixtures"];

export const Fixtures = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fixtures: TFixtures[] = useSelector(selectAllFixtures);
  const status = useSelector(getFixturesStatus);
  const { id, season } = useParams();

  useEffect(() => {
    if (id && season)
      fixtures.length === 0 &&
        dispatch(getFixtures({ teamId: Number(id), season: Number(season) }));
  }, [dispatch, id, season, fixtures.length]);

  const style = {
    width: "100%",
    bgcolor: "background.paper",
  };

  return status === "succeeded" && fixtures.length > 0 ? (
    <div>
      <Card key={"fixtures-card-"}>
        <CardHeader title={"Fixtures"} />
        <CardContent>
          <List sx={style} component="nav" aria-label="mailbox folders">
            {fixtures.map((fx) => (
              <>
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
                  <ListItem>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={6} md={2}>
                        <Stack direction="row" spacing={1}>
                          <ListItemAvatar>
                            <Avatar
                              alt={fx.league?.name}
                              src={fx.league?.logo}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={fx.league?.name}
                            secondary={fx.league?.season}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} md={4}>
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
                            </Stack>{" "}
                          </Grid>
                          <Grid item xs={6} md={1}>
                            <Typography
                              variant="h5"
                              style={{ textAlign: "right" }}
                            >
                              {fx.goals?.home}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={2}>
                            <Typography
                              variant="h6"
                              style={{ textAlign: "center" }}
                            >
                              -
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={1}>
                            <Typography
                              variant="h5"
                              style={{ textAlign: "left" }}
                            >
                              {fx.goals?.away}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={4}>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <Avatar
                                src={fx?.teams?.away?.logo}
                                sx={{ width: 40, height: 40 }}
                              />
                              <Typography variant="h6">
                                {fx?.teams?.away?.name}
                              </Typography>
                            </Stack>{" "}
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={6} md={2}>
                        <Stack alignItems="center" spacing={1}>
                          <Typography variant="h6">
                            {fx.league?.round}
                          </Typography>
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
                <Divider />
              </>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  ) : (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};
