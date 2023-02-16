// third-party
import { combineReducers } from "redux";

// project import
import menu from "./menu";
import leagues from "./leagues";
import teams from "./teams";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, leagues, teams });

export default reducers;
