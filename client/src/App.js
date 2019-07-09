import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import "./App.css";

import Menubar from "./components/menu/Menubar";
import Home from "./components/home/Home";
import TrendsMenu from "./components/trends/TrendsMenu";
import ComposeTweet from "./components/tweet/ComposeTweet";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <div className="App__container">
            <Menubar />
            <Home />
            <TrendsMenu />
          </div> */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={Register} />
          <div className="container">
            <Switch>
              <Route exact path="/compose/tweet" component={ComposeTweet} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
