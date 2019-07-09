import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./Menubar.css";
import MenubarItem from "./MenubarItem";

class Menubar extends Component {
  render() {
    const { location } = this.props;

    const navLinks = (
      <ul className="nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            <span className="nav-icon twitter-logo">
              <ion-icon
                className="nav-icon"
                id="nav-icon"
                name="logo-twitter"
              />
            </span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/home">
            <span className="nav-icon">
              <ion-icon name="home" />
            </span>
            <span className="nav-title">Home</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/explore">
            <span className="nav-icon">
              <ion-icon name="compass" />
            </span>
            <span className="nav-title">Explore</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/notifications">
            <span className="nav-icon">
              <ion-icon name="notifications" />
            </span>
            <span className="nav-title">Notifications</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/messages">
            <span className="nav-icon">
              <ion-icon name="paper-plane" />
            </span>
            <span className="nav-title">Messages</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/bookmarks">
            <span className="nav-icon">
              <ion-icon name="bookmark" />
            </span>
            <span className="nav-title">Bookmarks</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/lists">
            <span className="nav-icon">
              <ion-icon name="list-box" />
            </span>
            <span className="nav-title">Lists</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/profile">
            <span className="nav-icon">
              <ion-icon name="person" />
            </span>
            <span className="nav-title">Profile</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="#">
            <span className="nav-icon">
              <ion-icon name="more" />
            </span>
            <span className="nav-title">More</span>
          </NavLink>
        </li>
      </ul>
    );

    return (
      <div className="Menubar">
        <div className="menubar-contents">
          <div className="twitter-logo" />
          {navLinks}
          <div className="tweet-button">
            <Link
              className="tweet-button-link"
              prevPath={window.location.pathname}
              to={{
                pathname: "/compose/tweet",
                prevPath: window.location.pathname
              }}
            >
              Tweet
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Menubar);
