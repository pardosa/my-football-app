// third-party
import { combineReducers } from "redux";

// project import
import menu from "./menu";
import leagues from "./leagues";
import teams from "./teams";
import standings from "./standings";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, leagues, teams, standings });

export default reducers;
