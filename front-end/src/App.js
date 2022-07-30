import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import JobsList from "./components/JobsList";
import AddJob from "./components/AddJob";
import Job from "./components/Job";

// main screen of the app

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/jobs"} className="navbar-brand">
            Job Listing Portal
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/jobs"} className="nav-link">
                List of Available jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add a Job
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/jobs"]} component={JobsList} />
            <Route exact path="/add" component={AddJob} />
            <Route path="/jobs/:id" component={Job} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
