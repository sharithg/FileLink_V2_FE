import { combineReducers } from "redux";
//Reducer imports
import filesReducer from "./filesReducer";
import errors from "./errors";
import messagesReducer from "./messagesReducer";
import authReducer from "./authReducer";
import googleReducer from "./googleReducer";
import classesReducer from "./classesReducer";
import reactReducer from "./reactReducer";
import eventsReducer from "./eventsReducer";
export default combineReducers({
  files: filesReducer,
  errors: errors,
  messages: messagesReducer,
  auth: authReducer,
  google: googleReducer,
  classes: classesReducer,
  react: reactReducer,
  events: eventsReducer,
});
