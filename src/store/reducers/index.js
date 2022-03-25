import { combineReducers } from "redux";
import calendar from "./calendar";
import modal from "./modal";

const rootReducer = combineReducers({
  calendar,
  modal,
});

export default rootReducer;
