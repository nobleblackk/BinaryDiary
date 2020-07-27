// Axios => A HTTP Client, We gonna make our request in the onSubmit
import axios from "axios";

// Importing to decode information form token
import jwt_decode from "jwt-decode";

// Importing this set our token to header with the help of axios
import setAuthToken from "../utils/setAuthToken";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User. This is actually our Action Creator, returning(creating) inner function(for the sake of middlewares), which will eventually dispatch the action object, which will be dispatched to reducers.
// A thunk middleware can return either a simple JS object or also a function as well, which further can be dispatched to reducers in case function returned by thunk.
export const registerUser = (userData, history) => (dispatch, getState) => {
  // We are not using the whole url here(http://localhost:5000), because we already put that in proxy value in package.json, so now we need not mention the whole url address. :)
  axios
    .post("/api/users/register", userData)
    .then((res) =>
      // Using withRouter, we can redirect ourself from within action to our desired location
      history.push("/login")
    )
    .catch((err) =>
      // Since here we are making an ajax call(asynchronus requese), so we can't simply return the object for showing errors, because it is a asynchronus request and the return block will only return undefined in that case, That's why we are using dispatch() in place of return.
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // Save to localStorage
      const { token } = res.data;

      // Set token to localStorage
      // localStorage only stores string
      localStorage.setItem("jwtToken", token);

      // Set token to Auth header, exactly what we did when we were dealing with postman
      setAuthToken(token);

      // Decode token to get user data
      const decoded = jwt_decode(token);

      // Set current user to our Redux State
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      // Since here we are making an ajax call(asynchronus requese), so we can't simply return the object for showing errors, because it is a asynchronus request and the return block will only return undefined in that case, That's why we are using dispatch() in place of return.
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");

  // Remove auth header for future requests
  setAuthToken(false);

  // Set current user to an empty object, which will also set isAuthenticated also false
  dispatch(setCurrentUser({}));
};
