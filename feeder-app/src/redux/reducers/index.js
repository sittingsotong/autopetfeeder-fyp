import { combineReducers } from "redux";
import { auth } from "./auth";
import { schedule } from "./schedule";
import { trend } from "./trend";

const Reducers = combineReducers({
  auth,
  schedule,
  trend,
});

export default Reducers;
