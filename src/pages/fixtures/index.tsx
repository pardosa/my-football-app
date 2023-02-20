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
                <ListItem button>
                  <Grid container spacing={1}>
                    <Grid item xs={6} md={4}>
                      <Stack direction="row" spacing={4}>
                        <ListItemAvatar>
                          <Avatar alt={fx.league?.name} src={fx.league?.logo} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={fx.league?.name}
                          secondary={fx.league?.season}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={6} md={4}>
                      <Grid container spacing={1}>
                        <Grid item xs={6} md={4}>
                          <Stack alignItems="center" spacing={1}>
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
                          <div style={{ textAlign: "center" }}>
                            {fx.goals?.home}
                          </div>
                        </Grid>
                        <Grid item xs={6} md={2}>
                          <div style={{ textAlign: "center" }}>vs</div>
                        </Grid>
                        <Grid item xs={6} md={1}>
                          <div style={{ textAlign: "center" }}>
                            {fx.goals?.away}
                          </div>
                        </Grid>
                        <Grid item xs={6} md={4}>
                          <Stack alignItems="center" spacing={1}>
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

                    <Grid item xs={6} md={4}>
                      <div>xs=6 md=4</div>
                    </Grid>
                  </Grid>
                </ListItem>
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
