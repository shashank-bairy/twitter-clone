import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import user_image from "./jian-yang.jpg";
import "./Home.css";

import Post from "./Post";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <section className="section-title-container">
          <div className="section-title">
            <h2 className="section-title-heading">Home</h2>
          </div>
        </section>
        <section className="section-tweet">
          <ul className="section-tweet-list">
            <li className="tweet-items">
              <img className="tweet-image" src={user_image} alt="User" />
            </li>
            <li className="tweet-items tweet-items-text-box">
              <div className="tweet-text-box">
                <span className="tweet-text-box-text">What's happening?</span>
              </div>
            </li>
            <li className="tweet-items tweet-items-icon">
              <ion-icon className="tweet-icon" name="photos" />
            </li>
          </ul>
        </section>
        <section className="section-posts">
          <Post />
        </section>
      </div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
