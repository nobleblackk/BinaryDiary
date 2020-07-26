// Axios => A HTTP Client, We gonna make our request in the onSubmit
import axios from "axios";

import { TEST_DISPATCH } from "./types";

// Register User. This is actually our Action Creator, returning(creating) our action object, which will be dispatched to reducers.
export const registerUser = (userData) => (dispatch) => {
  // We are not using the whole url here(http://localhost:5000), because we already put that in proxy value in package.json, so now we need not mention the whole url address. :)
  axios
    .post("/api/users/register", userData)
    .then((res) => console.log(res.data))
    .catch((err) =>
    
    );
};
