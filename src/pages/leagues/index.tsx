import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { AppDispatch } from "../../store";
import {
  getLeagues,
  getLeaguesStatus,
  selectAllLeagues,
} from "../../store/reducers/leagues";
import SchemaTable, { IColumnConfig } from "../../components/SchemaTable";
import { components } from "../../types/openapi";
import openapi from "../../openapi.json";
import { SchemaObject } from "openapi3-ts";
import { Stack, ListItemAvatar, Avatar, ListItemText } from "@mui/material";

type TLeagues = components["schemas"]["Leagues"];

export default function Leagues() {
  const dispatch = useDispatch<AppDispatch>();
  const leagues: TLeagues[] = useSelector(selectAllLeagues);
  const status = useSelector(getLeaguesStatus);
  //const error = useSelector(getLeaguesError);
  const leaguesSchema = useMemo(
    () =>
      ({
        properties: {
          ...openapi.components.schemas.Leagues.properties,
        },
      } as SchemaObject),
    []
  );

  const config = useMemo<{
    [propName: string]: IColumnConfig<components["schemas"]["Leagues"]>;
  }>(
    () => ({
      league: {
        title: "League Name",
        renderCell: (row) => {
          return row.league?.logo !== null ? (
            <Stack direction="row" spacing={4}>
              <ListItemAvatar>
                <Avatar alt={row.league?.name} src={row.league?.logo} />
              </ListItemAvatar>
              <ListItemText
                primary={row.league?.name}
                secondary={row.seasons?.length + " seasons"}
              />
            </Stack>
          ) : null;
        },
      },
      seasons: {
        title: "Type",
        renderCell: (row) => <>{row.league?.type}</>,
      },
      country: {
        title: "Country",
        renderCell: (row) => {
          return row.country?.flag !== null ? (
            <Stack direction="row" spacing={4}>
              <ListItemAvatar>
                <Avatar alt={row.country?.name} src={row.country?.flag} />
              </ListItemAvatar>
              <ListItemText primary={row.country?.name} secondary={""} />
            </Stack>
          ) : null;
        },
      },
    }),
    []
  );

  useEffect(() => {
    if (leagues.length === 0) dispatch(getLeagues());
  }, [dispatch, leagues.length]);

  return status === "succeeded" && leagues.length > 0 ? (
    <SchemaTable<TLeagues>
      data={leagues}
      schema={leaguesSchema}
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
}
