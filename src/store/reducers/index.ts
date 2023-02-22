// third-party
import { combineReducers } from "redux";

// project import
import menu from "./menu";
import leagues from "./leagues";
import teams from "./teams";
import standings from "./standings";
import fixtures from "./fixtures";
import fixture from "./fixture";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  leagues,
  teams,
  standings,
  fixtures,
  fixture,
});

export default reducers;
