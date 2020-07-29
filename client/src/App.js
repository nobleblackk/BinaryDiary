import React from "react";

// Importing to create Route services for Frontend React part and also BrowserRouter to mimic as a standard server to get back and forth button
// Every PrivateRoute must be wrapped in Switch, thats gonnae prevent some starange redirection issues
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Decodes jwt to token
import jwt_decode from "jwt-decode";

// SetAuthToken to axios defualts, so that each request made, can access that token in headers
import setAuthToken from "./utils/setAuthToken";

// It returns a plain Action Object
import { setCurrentUser } from "./actions/authActions";

// import { clearCurrentProfile } from "./actions/profileActions";

// Bringing our Dashboard
import Dashboard from "./components/dashboard/Dashboard";

import { logoutUser } from "./actions/authActions";

// It is a react component, it provides our application with the store which holds the state, which holds all our data. It has to wrapped around every thing. It works like a reference to our Redux Store.
import { Provider } from "react-redux";

// Importing store
import store from "./store";

// Importing Private Route
import PrivateRoute from "./components/common/PrivateRoute";

// Navbar
import Navbar from "./components/layout/Navbar";

// Footer
import Footer from "./components/layout/Footer";

// Landing Page
import Landing from "./components/layout/Landing";
import CreateProfile from "./components/create-profile/CreateProfile";

// Importing Login and Register Components to use in their specific Routes
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

// webpack helps to access the styling part
import "./App.css";
import { clearCurrentProfile } from "./actions/profileActions";
import EditProfile from "./components/edit-profile/EditProfile";

import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";

import Profiles from "./components/profiles/Profiles";

import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";

import Posts from "./components/posts/Posts";

import Post from "./components/post/Post";

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

    // after seesion expire, clear the current user profile
    store.dispatch(clearCurrentProfile());

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
              <Route exact path="/profile/:handle" component={Profile}></Route>

              <Route exact path="/register" component={Register}></Route>

              <Route exact path="/profiles" component={Profiles}></Route>

              <Route exact path="/login" component={Login}></Route>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                ></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/dashboard"
                  component={Dashboard}
                ></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                ></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                ></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                ></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/feed"
                  component={Posts}
                ></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/post/:id"
                  component={Post}
                ></PrivateRoute>
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
