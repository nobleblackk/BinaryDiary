import React from "react";

// Importing to create Route services for Frontend React part and also BrowserRouter to mimic as a standard server to get back and forth button
import { BrowserRouter as Router, Route } from "react-router-dom";

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

class App extends React.Component {
  render() {
    return (
      // The whole jsx will be wrapped around BrowserRouter to mimic as a standard server to get back and forth button

      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            {/* We don't want our Landing page to display every time, we want to create a specific route for Landing page, i.e. out home pasge => "/" */}
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
