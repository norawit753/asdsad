import { combineReducers } from "redux";
import authReducer from "./authReducer";
import formReducer from "./formReducer";
import listReducer from "./listReducer";
import triggerReducer from "./triggerReducer";
import emailReducer from "./emailReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  list: listReducer,
  trigger: triggerReducer,
  email: emailReducer,
});
