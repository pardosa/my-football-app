import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Card, CardContent, CardHeader, List } from "@mui/material";

import { AppDispatch } from "../../store";
import { components } from "../../types/openapi";

import { useParams, useNavigate } from "react-router-dom";
import {
  selectAllFixtures,
  getFixturesStatus,
  getFixtures,
} from "../../store/reducers/fixtures";
import FixtureBox from "../../components/FixtureBox";

type TFixtures = components["schemas"]["Fixtures"];

const Fixtures = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fixtures: TFixtures[] = useSelector(selectAllFixtures);
  const status = useSelector(getFixturesStatus);
  const { id, season } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && season)
      dispatch(getFixtures({ teamId: Number(id), season: Number(season) }));
  }, [dispatch, id, season, fixtures.length]);

  const style = {
    width: "100%",
    bgcolor: "background.paper",
  };

  return status === "succeeded" && fixtures.length > 0 ? (
    <Card key={"fixtures-card-"}>
      <CardHeader title={"Fixtures"} />
      <CardContent>
        <List sx={style} component="nav" aria-label="mailbox folders">
          {fixtures.map((fx) => (
            <FixtureBox
              fx={fx}
              onClick={() => navigate("/dashboard/fixture/" + fx.fixture?.id)}
            />
          ))}
        </List>
      </CardContent>
    </Card>
  ) : (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};

export default Fixtures;
