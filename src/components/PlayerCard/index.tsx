import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { components } from "../../types/openapi";
import { Stack, Avatar } from "@mui/material";
import StatsCard from "../StatsCard";
import openapi from "../../openapi.json";
import { SchemaObject } from "openapi3-ts";
import Masonry from "@mui/lab/Masonry";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Iprops {
  stats?: components["schemas"]["Statistics"][];
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `league-tabpanel-${index}`,
  };
}

export default function PlayerCard(props: Iprops) {
  const { stats } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return stats && stats.length > 0 ? (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="statistics tabs"
        >
          {stats.map((sts, index) => (
            <Tab
              label={
                <Stack direction={"row"} spacing={1}>
                  <Avatar
                    sx={{ width: "15px", height: "15px", mr: 1 }}
                    aria-label="logo"
                    src={sts.league?.logo}
                  />
                  {sts.league?.name}
                </Stack>
              }
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {stats.map((sts, index) => (
        <TabPanel value={value} index={index}>
          <Masonry columns={4} spacing={2}>
            <StatsCard<components["schemas"]["League"]>
              schema={openapi.components.schemas.League as SchemaObject}
              value={sts.league}
              title="League"
            />

            <StatsCard<components["schemas"]["Team"]>
              schema={openapi.components.schemas.Team as SchemaObject}
              value={sts.team}
              title="Team"
            />

            <StatsCard<components["schemas"]["PlayerGames"]>
              schema={openapi.components.schemas.PlayerGames as SchemaObject}
              value={sts.games}
              title="Games"
            />

            <StatsCard<components["schemas"]["PlayerSubstitutes"]>
              schema={
                openapi.components.schemas.PlayerSubstitutes as SchemaObject
              }
              value={sts.substitutes}
              title="Substitutes"
            />

            <StatsCard<components["schemas"]["PlayerShots"]>
              schema={openapi.components.schemas.PlayerShots as SchemaObject}
              value={sts.shots}
              title="Shots"
            />

            <StatsCard<components["schemas"]["PlayerGoals"]>
              schema={openapi.components.schemas.PlayerGoals as SchemaObject}
              value={sts.goals}
              title="Goals"
            />

            <StatsCard<components["schemas"]["PlayerPasses"]>
              schema={openapi.components.schemas.PlayerPasses as SchemaObject}
              value={sts.passes}
              title="Passes"
            />
            <StatsCard<components["schemas"]["PlayerTackles"]>
              schema={openapi.components.schemas.PlayerTackles as SchemaObject}
              value={sts.tackles}
              title="Tackles"
            />
            <StatsCard<components["schemas"]["PlayerDuels"]>
              schema={openapi.components.schemas.PlayerDuels as SchemaObject}
              value={sts.duels}
              title="Duels"
            />
            <StatsCard<components["schemas"]["PlayerDribbles"]>
              schema={openapi.components.schemas.PlayerDribbles as SchemaObject}
              value={sts.dribbles}
              title="Dribbles"
            />
            <StatsCard<components["schemas"]["PlayerFouls"]>
              schema={openapi.components.schemas.PlayerFouls as SchemaObject}
              value={sts.fouls}
              title="Fouls"
            />
            <StatsCard<components["schemas"]["PlayerCards"]>
              schema={openapi.components.schemas.PlayerCards as SchemaObject}
              value={sts.cards}
              title="Cards"
            />
            <StatsCard<components["schemas"]["PlayerPenalty"]>
              schema={openapi.components.schemas.PlayerPenalty as SchemaObject}
              value={sts.penalty}
              title="Penalty"
            />
          </Masonry>
        </TabPanel>
      ))}
    </Box>
  ) : (
    <></>
  );
}
