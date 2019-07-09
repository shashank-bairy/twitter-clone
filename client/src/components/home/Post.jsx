import React, { Component } from "react";
import user_image from "./jian-yang.jpg";
import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    };
    this.handleHeartClick = this.handleHeartClick.bind(this);
  }

  handleHeartClick(e) {
    this.setState(state => ({
      liked: !state.liked
    }));
    // Alternate: this.setState({ liked: !this.state.liked });
  }
  render() {
    const liked = this.state.liked;
    return (
      <div className="Post">
        <div className="post-container">
          <div className="post-items">
            <img className="post-user-img" src={user_image} alt="User" />
          </div>
          <div className="post-items">
            <div className="post-user-details">
              <h2 className="post-user-fullname">Jian Yang</h2>
              <p className="post-user-username">@jianyang</p>
            </div>
            <p className="post-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries.
            </p>
            <div className="post-actions">
              <div className="post-icon-box">
                <i className="far fa-comment-alt comment-icon post-actions-icon" />
                <span className="post-action-count post-comment-count">9</span>
              </div>
              <div className="post-icon-box">
                <i className="fas fa-retweet retweet-icon post-actions-icon" />
                <span className="post-action-count post-retweet-count">9</span>
              </div>
              {!liked ? (
                <div className="post-icon-box">
                  <i
                    onClick={this.handleHeartClick}
                    className="far fa-heart heart-unfilled-icon post-actions-icon"
                  />
                  <span className="post-action-count post-liked-count">9</span>
                </div>
              ) : (
                <div className="post-icon-box">
                  <i
                    onClick={this.handleHeartClick}
                    className="fas fa-heart heart-filled-icon post-actions-icon"
                  />
                  <span
                    style={{ color: "rgb(224, 36, 94)" }}
                    className="post-action-count post-liked-count"
                  >
                    9
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
