import { combineReducers } from "redux";
import authReducer from "./authReducer";
import formReducer from "./formReducer";
import listReducer from "./listReducer";
import triggerReducer from "./triggerReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  list: listReducer,
  trigger: triggerReducer,
});
