import { combineReducers } from "redux";
import combineMain from "./main/index";
import combineComplaint from "./complaint/index";

export default combineReducers({
  main: combineMain,
  complaint: combineComplaint,
});
