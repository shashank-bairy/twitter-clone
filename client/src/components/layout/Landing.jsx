import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import "./Landing.css";

import twitter_bird_url from "../../img/twitter-bird.png";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }
  render() {
    return (
      <div className="Landing">
        <div className="Landing__block--display">
          <ul className="about-list">
            <li className="about-list__follow">
              <ion-icon className="about-list__icon" name="search" />
              Follow your interests.
            </li>
            <li className="about-list__hear">
              <ion-icon className="about-list__icon" name="people" />
              Hear what people are talking about.
            </li>
            <li className="about-list__join">
              <ion-icon className="about-list__icon" name="mail" />
              Join the conversation.
            </li>
          </ul>
        </div>
        <div className="Landing__block--action">
          <div className="Landing__block--navigate">
            <div>
              <img
                className="Landing__navigate--twitter-bird"
                src={twitter_bird_url}
                alt=""
              />
            </div>
            <h1 className="Landing__navigate--heading">
              See what’s happening in the world right now
            </h1>
            <h2 className="Landing__navigate--link-heading">
              Join Twitter today.
            </h2>
            <div className="Landing__links">
              <Link
                to="/signup"
                className="Landing__link Landing__navigate--signup-link"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="Landing__link Landing__navigate--login-link"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
