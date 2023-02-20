// third-party
import { combineReducers } from "redux";

// project import
import menu from "./menu";
import leagues from "./leagues";
import teams from "./teams";
import standings from "./standings";
import fixtures from "./fixtures";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, leagues, teams, standings, fixtures });

export default reducers;
