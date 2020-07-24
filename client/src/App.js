import React from "react";
// webpack helps to access the styling part
import "./App.css";

// Importing to create Route services for Frontend React part and also BrowserRouter to mimic as a standard server to go back button
import { BrowserRouter as Router, Route } from "react-router-dom";

// Importing Login and Register Components to use in their specific Routes
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Navbar
import Navbar from "./components/layout/Navbar";

// Footer
import Footer from "./components/layout/Footer";

// Landing Page
import Landing from "./components/layout/Landing";

function App() {
  return (
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
  );
}

export default App;
