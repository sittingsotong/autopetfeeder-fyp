import { combineReducers } from "redux";
import { auth } from "./auth";
import { schedule } from "./schedule";

const Reducers = combineReducers({
  auth,
  schedule,
});

export default Reducers;
