import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";

import "./App.css";
import PrivateRoute from "./components/common/PrivateRoute";

import Menubar from "./components/menu/Menubar";
import Home from "./components/home/Home";
import TrendsMenu from "./components/trends/TrendsMenu";
import ComposeTweet from "./components/tweet/ComposeTweet";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/profile/Profile";
import CreateProfile from "./components/create-profile/CreateProfile";

// check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // todo: clear current profile
    // store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/login" component={Login} />
            <div className="App__container">
              <PrivateRoute path="/" component={Menubar} />
              <Switch>
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute
                  exact
                  path="/profile/:handle"
                  component={Profile}
                />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={CreateProfile}
                />
              </Switch>
              <PrivateRoute path="/" component={TrendsMenu} />
              <PrivateRoute
                exact
                path="/compose/tweet"
                component={ComposeTweet}
              />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
