import { combineReducers } from "redux";
import authReducer from "./authReducer";
import depReducer from "./depReducer";
import errorReducer from "./errorReducer";
import triggerReducer from "./triggerReducer";

export default combineReducers({
  trigger: triggerReducer,
  auth: authReducer,
  departments: depReducer,
  error: errorReducer,
});
