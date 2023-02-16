import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack, ListItemAvatar, Avatar, ListItemText } from "@mui/material";

import { AppDispatch } from "../../store";
import SchemaTable, { IColumnConfig } from "../../components/SchemaTable";
import { components } from "../../types/openapi";
import openapi from "../../openapi.json";
import { SchemaObject } from "openapi3-ts";
import {
  getTeams,
  getTeamsStatus,
  selectAllTeams,
} from "../../store/reducers/teams";
import { useParams } from "react-router-dom";

type TTeams = components["schemas"]["Teams"];

export const Teams = () => {
  const dispatch = useDispatch<AppDispatch>();
  const teams: TTeams[] = useSelector(selectAllTeams);
  const status = useSelector(getTeamsStatus);

  const { id, season } = useParams();

  const teamsSchema = useMemo(
    () =>
      ({
        properties: {
          ...openapi.components.schemas.Teams.properties,
        },
      } as SchemaObject),
    []
  );

  const config = useMemo<{
    [propName: string]: IColumnConfig<components["schemas"]["Teams"]>;
  }>(
    () => ({
      team: {
        title: "Team Name",
        renderCell: (row) => {
          return row.team?.logo !== null ? (
            <Stack direction="row" spacing={4}>
              <ListItemAvatar>
                <Avatar alt={row.team?.name} src={row.team?.logo} />
              </ListItemAvatar>
              <ListItemText
                primary={row.team?.name}
                secondary={row.team?.country}
              />
            </Stack>
          ) : null;
        },
      },
      venue: {
        title: "Venue",
        renderCell: (row) => {
          return row.venue?.name !== null ? (
            <Stack direction="row" spacing={4}>
              <ListItemAvatar>
                <Avatar
                  alt={row.venue?.name}
                  src={row.venue?.image}
                  variant="square"
                />
              </ListItemAvatar>
              <ListItemText
                primary={row.venue?.name + " (" + row.venue?.capacity + ")"}
                secondary={row.venue?.address + ", " + row.venue?.city}
              />
            </Stack>
          ) : (
            <></>
          );
        },
      },
    }),
    []
  );

  useEffect(() => {
    if (id && season)
      dispatch(getTeams({ teamId: Number(id), season: Number(season) }));
  }, [dispatch, id, season]);

  return status === "succeeded" && teams.length > 0 ? (
    <SchemaTable<TTeams>
      data={teams}
      schema={teamsSchema}
      height={window.innerHeight}
      width={window.innerWidth - 25}
      config={config}
      onRowClick={(row) => {
        console.log(row);
      }}
    />
  ) : (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};
