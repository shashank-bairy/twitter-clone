import React, { Component } from "react";
import { Link } from "react-router-dom";
import image_url from "./jian-yang.jpg";

import "./ComposeTweet.css";

class ComposeTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }
  render() {
    const prevPath = this.props.location.prevPath;
    return (
      <div className="ComposeTweet">
        <div className="ComposeTweet--overlay" />
        <div className="ComposeTweet--container">
          <div className="tweet-bar">
            <div className="tweet-bar-item">
              <Link className="tweet-bar-close-link" to={prevPath || "/"}>
                <ion-icon className="btn-close button-close" name="close" />
              </Link>
            </div>
            <div className="tweet-bar-item">
              <button type="submit" className="create-tweet-button">
                Tweet
              </button>
            </div>
          </div>
          <div className="tweet-content">
            <div className="tweet-content-item">
              <img
                className="tweet-content-user-img"
                src={image_url}
                alt="User"
              />
            </div>
            <div className="tweet-content-item" />
            <div className="tweet-content-item">
              <textarea
                className="tweet-content-text"
                name="tweet-content-text"
                id="tweet-content-text"
                placeholder="What's happening?"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ComposeTweet;
