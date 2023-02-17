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
  Button,
  ButtonGroup,
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

type TStandings = components["schemas"]["Standings"];
type TStandingTeam = components["schemas"]["StandingTeam"];

export const Standings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const standings: TStandings[] = useSelector(selectAllStandings);
  const status = useSelector(getStandingsStatus);

  const { id, season } = useParams();

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
          <Badge badgeContent={row.rank} color="primary"></Badge>
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
        title: "All Games",
        renderCell: (row) => (
          <ButtonGroup variant="text" aria-label="All Games">
            <Button>{row.all?.played} P</Button>
            <Button>{row.all?.win} W</Button>
            <Button>{row.all?.draw} D</Button>
            <Button>{row.all?.lose} L</Button>
          </ButtonGroup>
        ),
      },
      home: {
        title: "Home Games",
        renderCell: (row) => (
          <ButtonGroup variant="text" aria-label="Home Games">
            <Button>{row.home?.played} P</Button>
            <Button>{row.home?.win} W</Button>
            <Button>{row.home?.draw} D</Button>
            <Button>{row.home?.lose} L</Button>
          </ButtonGroup>
        ),
      },
      away: {
        title: "Away Games",
        renderCell: (row) => (
          <ButtonGroup variant="text" aria-label="Away Games">
            <Button>{row.away?.played} P</Button>
            <Button>{row.away?.win} W</Button>
            <Button>{row.away?.draw} D</Button>
            <Button>{row.away?.lose} L</Button>
          </ButtonGroup>
        ),
      },
    }),
    []
  );

  useEffect(() => {
    if (id && season)
      dispatch(getStandings({ leagueId: Number(id), season: Number(season) }));
  }, [dispatch, id, season]);

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
