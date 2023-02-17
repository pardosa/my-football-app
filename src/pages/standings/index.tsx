import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Stack,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Badge,
  Grid,
} from "@mui/material";

import { AppDispatch } from "../../store";
import SchemaTable, { IColumnConfig } from "../../components/SchemaTable";
import { components } from "../../types/openapi";
import openapi from "../../openapi.json";
import { SchemaObject } from "openapi3-ts";

import { useParams } from "react-router-dom";
import {
  selectAllStandings,
  getStandingsStatus,
  getStandings,
} from "../../store/reducers/standings";
import { ButtonGroup } from "../../components/@extended/ButtonGroup";
import { Badge as CustomBadge } from "../../components/@extended/Badge";

type TStandings = components["schemas"]["Standings"];
type TStandingTeam = components["schemas"]["StandingTeam"];

export const Standings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const standings: TStandings[] = useSelector(selectAllStandings);
  const status = useSelector(getStandingsStatus);

  const { id, season } = useParams();

  const btnGroupTitle = (title: string) => (
    <Grid container spacing={0}>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        {title}
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <ButtonGroup games={["P", "W", "D", "L"]} />
      </Grid>
    </Grid>
  );

  const standingLeagueSchema = useMemo(
    () =>
      ({
        properties: {
          ...openapi.components.schemas.StandingTeam.properties,
        },
      } as SchemaObject),
    []
  );

  const config = useMemo<{
    [propName: string]: IColumnConfig<components["schemas"]["StandingTeam"]>;
  }>(
    () => ({
      description: {
        hidden: true,
      },
      status: {
        hidden: true,
      },
      rank: {
        title: "Rank",
        renderCell: (row) => (
          <Grid container spacing={0}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Badge badgeContent={row.rank} color="primary"></Badge>
            </Grid>
          </Grid>
        ),
      },
      team: {
        title: "Team",
        renderCell: (row) => {
          return row.team?.name !== null ? (
            <Stack direction="row" spacing={4}>
              <ListItemAvatar>
                <Avatar alt={row.team?.name} src={row.team?.logo} />
              </ListItemAvatar>
              <ListItemText primary={row.team?.name} secondary={""} />
            </Stack>
          ) : (
            <></>
          );
        },
      },
      all: {
        title: btnGroupTitle("All games"),
        renderCell: (row) => (
          <Grid container spacing={0}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <ButtonGroup
                games={[
                  row.all?.played,
                  row.all?.win,
                  row.all?.draw,
                  row.all?.lose,
                ]}
              />
            </Grid>
          </Grid>
        ),
      },
      home: {
        title: btnGroupTitle("Home games"),
        renderCell: (row) => (
          <Grid container spacing={0}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <ButtonGroup
                games={[
                  row.home?.played,
                  row.home?.win,
                  row.home?.draw,
                  row.home?.lose,
                ]}
              />
            </Grid>
          </Grid>
        ),
      },
      away: {
        title: btnGroupTitle("Away games"),
        renderCell: (row) => (
          <Grid container spacing={0}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <ButtonGroup
                games={[
                  row.away?.played,
                  row.away?.win,
                  row.away?.draw,
                  row.away?.lose,
                ]}
              />
            </Grid>
          </Grid>
        ),
      },
      form: {
        title: <div style={{ textAlign: "center" }}>Last Game</div>,
        renderCell: (row) => (
          <Stack direction="row" spacing={0}>
            {row.form?.split("").map((fr) => (
              <CustomBadge text={fr} />
            ))}
          </Stack>
        ),
      },
    }),
    []
  );

  useEffect(() => {
    if (id && season)
      standings.length === 0 &&
        dispatch(
          getStandings({ leagueId: Number(id), season: Number(season) })
        );
  }, [dispatch, id, season, standings.length]);

  return status === "succeeded" && standings.length > 0 ? (
    <div>
      {standings.map((std, idx) => (
        <Card key={"standings-card-" + std.league?.id}>
          <CardHeader
            avatar={
              <Avatar
                alt={std.league?.name}
                src={std.league?.logo}
                variant="square"
              />
            }
            title={std.league?.name}
            subheader={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {std.league?.country}
                </Typography>
                {" — season: " + std.league?.season}
              </React.Fragment>
            }
          />
          <CardContent>
            <SchemaTable<TStandingTeam>
              data={
                std.league?.standings && std.league?.standings?.length > 0
                  ? std.league?.standings[0]
                  : []
              }
              schema={standingLeagueSchema}
              height={window.innerHeight}
              width={window.innerWidth - 25}
              config={config}
              onRowClick={(row) => {
                console.log(row);
              }}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  ) : (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};
