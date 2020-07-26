// TO combine our all reducers in one object in order to create Store
import { combineReducers } from "redux";

// For Authentication Purpose
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
});
