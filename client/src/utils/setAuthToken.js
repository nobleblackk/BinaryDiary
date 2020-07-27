// We will use axios's default. By this, we can set default header for every request for axios, this is one of the reasons, axios is better than fetch.

const axios = require("axios");

const setAuthToken = (token) => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // If the token isn't there, then we want to Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
