import React from "react";

// Importing to create Route services for Frontend React part and also BrowserRouter to mimic as a standard server to get back and forth button
import { BrowserRouter as Router, Route } from "react-router-dom";

// Decodes jwt to token
import jwt_decode from "jwt-decode";

// SetAuthToken to axios defualts, so that each request made, can access that token in headers
import setAuthToken from "./utils/setAuthToken";

// It returns a plain Action Object
import { setCurrentUser } from "./actions/authActions";

import { logoutUser } from "./actions/authActions";

// It is a react component, it provides our application with the store which holds the state, which holds all our data. It has to wrapped around every thing. It works like a reference to our Redux Store.
import { Provider } from "react-redux";

// Importing store
import store from "./store";

// Navbar
import Navbar from "./components/layout/Navbar";

// Footer
import Footer from "./components/layout/Footer";

// Landing Page
import Landing from "./components/layout/Landing";

// Importing Login and Register Components to use in their specific Routes
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

// webpack helps to access the styling part
import "./App.css";

// check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  // because Date.now() gives time in milliseconds
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends React.Component {
  render() {
    return (
      // The whole jsx will be wrapped around BrowserRouter to mimic as a standard server to get back and forth button

      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            {/* We don't want our Landing page to display every time, we want to create a specific route for Landing page, i.e. our home page => "/" */}
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register}></Route>

              <Route exact path="/login" component={Login}></Route>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
