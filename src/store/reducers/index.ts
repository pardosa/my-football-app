// third-party
import { combineReducers } from "redux";

// project import
import menu from "./menu";
import leagues from "./leagues";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, leagues });

export default reducers;
