// TO combine our all reducers in one object in order to create Store
import { combineReducers } from "redux";

// For Authentication Purpose
import authReducer from "./authReducer";

// For Fetching User Profiles
import profileReducer from "./profileReducer";

// For Error Purpose
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
});
