import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Menucard from "./Menucard";
import "./Menubar.css";

class Menubar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenucard: false
    };
    this.showMenucard = this.showMenucard.bind(this);
    this.closeMenucard = this.closeMenucard.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  showMenucard(e) {
    e.preventDefault();
    this.setState({ showMenucard: true }, () => {
      document.addEventListener("click", this.closeMenucard);
    });
  }
  closeMenucard() {
    this.setState({ showMenucard: false }, () => {
      document.removeEventListener("click", this.closeMenucard);
    });
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

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
          <NavLink
            className="nav-link"
            to={
              profile && Object.keys(profile).length > 0
                ? `/profile/${profile.handle}`
                : "/create-profile"
            }
          >
            <span className="nav-icon">
              <ion-icon name="person" />
            </span>
            <span className="nav-title">Profile</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <div className="nav-link-items">
            <NavLink className="nav-link" onClick={this.showMenucard}>
              <span className="nav-icon">
                <ion-icon name="more" />
              </span>
              <span className="nav-title">More</span>
            </NavLink>
            {this.state.showMenucard ? <Menucard /> : null}
          </div>
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

Menubar.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Menubar);
