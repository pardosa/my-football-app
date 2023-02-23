import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Stack,
  Grid,
  Avatar,
  ListItemAvatar,
  ListItemText,
  InputLabel,
} from "@mui/material";

import { AppDispatch } from "../../store";
import { components } from "../../types/openapi";
import FixtureBox from "../../components/FixtureBox";

import { useParams, useNavigate } from "react-router-dom";
import {
  detailFixture,
  getFixtureStatus,
  getFixture,
} from "../../store/reducers/fixture";
import { useTheme } from "@mui/material/styles";
import EventTimeline from "../../components/EventTimeline";
import LineUps from "../../components/LineUps";

type TFixtures = components["schemas"]["Fixtures"];

const Fixture = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fixture: TFixtures[] = useSelector(detailFixture);
  const status = useSelector(getFixtureStatus);
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const style = {
    width: "100%",
    bgcolor: "background.paper",
    mb: 2,
  };

  interface divProps {
    children?: React.ReactNode;
    label: string;
  }

  function DivData(props: divProps) {
    const { children, label } = props;

    return (
      <>
        <Stack spacing={1}>
          <InputLabel htmlFor={label}>{label}</InputLabel>
          {children}
        </Stack>
      </>
    );
  }

  useEffect(() => {
    if (id) dispatch(getFixture({ id: Number(id) }));
  }, [dispatch, id]);

  return status === "succeeded" && fixture.length > 0 ? (
    <Card key={"fixtures-card-"} sx={style}>
      <CardHeader title={"Fixtures"} />
      <CardContent sx={{ color: "text.primary", bgcolor: theme.shadows[6] }}>
        {fixture.map((fx) => (
          <>
            <FixtureBox
              fx={fx}
              onClick={() => navigate("/dashboard/fixture/" + fx.fixture?.id)}
            />
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
              <Grid item xs={4}>
                <Stack>
                  <Card key={"venye-card-"} sx={style}>
                    <CardContent sx={{ color: "text.primary" }}>
                      <Stack spacing={2}>
                        <DivData label={"Venue"}>
                          <Stack direction="row" spacing={4}>
                            <ListItemAvatar>
                              <Avatar
                                alt={fx.fixture?.venue?.name}
                                src={fx.fixture?.venue?.image}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={fx.fixture?.venue?.name}
                              secondary={fx.fixture?.venue?.city}
                            />
                          </Stack>
                        </DivData>
                        <DivData label={"Date"}>
                          <Typography variant="h5">
                            {fx.fixture?.date
                              ? new Date(fx.fixture?.date).toLocaleString()
                              : "-"}
                          </Typography>
                        </DivData>

                        <DivData label={"Country"}>
                          <Stack direction="row" spacing={4}>
                            <ListItemAvatar>
                              <Avatar
                                alt={fx.league?.name}
                                src={fx.league?.flag}
                                variant="square"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={fx.league?.name}
                              secondary={fx.league?.round}
                            />
                          </Stack>
                        </DivData>
                      </Stack>
                    </CardContent>
                  </Card>
                  <Card key={"events-card"} sx={style}>
                    <CardContent sx={{ color: "text.primary" }}>
                      <Box sx={{ width: "100%" }}>
                        {fx.events && <EventTimeline events={fx.events} />}
                      </Box>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Card key={"events-card"} sx={style}>
                  <CardContent sx={{ color: "text.primary" }}>
                    {fx.lineups && fx.lineups?.length > 0 && fx.teams?.home && (
                      <LineUps team={fx.teams?.home} lineups={fx.lineups[0]} />
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card key={"events-card"} sx={style}>
                  <CardContent sx={{ color: "text.primary" }}>
                    {fx.lineups && fx.lineups?.length > 0 && fx.teams?.away && (
                      <LineUps team={fx.teams?.away} lineups={fx.lineups[1]} />
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={4}></Grid>
            </Grid>
          </>
        ))}
      </CardContent>
    </Card>
  ) : (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};

export default Fixture;
