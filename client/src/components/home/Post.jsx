import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Post.css";

import { deletePost, likePost, unlikePost } from "../../actions/postActions";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPostMenu: false
    };
    this.onLikePost = this.onLikePost.bind(this);
    this.onUnlikePost = this.onUnlikePost.bind(this);
    this.showPostMenu = this.showPostMenu.bind(this);
    this.closePostMenu = this.closePostMenu.bind(this);
  }

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  showPostMenu(e) {
    e.preventDefault();
    if (this._isMounted) {
      this.setState({ showPostMenu: true }, () => {
        document.addEventListener("click", this.closePostMenu);
      });
    }
  }

  closePostMenu(e) {
    e.preventDefault();
    if (this._isMounted) {
      this.setState({ showPostMenu: false }, () => {
        document.removeEventListener("click", this.closePostMenu);
      });
    }
  }

  onDeleteClick(id) {
    this._isMounted = false;
    this.props.deletePost(id, this.props.history);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user._id).length > 0)
      return true;
    else return false;
  }

  onLikePost(id) {
    this.props.likePost(id);
  }

  onUnlikePost(id) {
    this.props.unlikePost(id);
  }

  render() {
    const { post } = this.props;

    const postMenu = (
      <div className="post-menu">
        <div className="post-menu__items">
          <Link to="" className="post-menu__link" onClick={this.onEditClick}>
            Edit&nbsp;post
          </Link>
          <Link
            to=""
            className="post-menu__link"
            onClick={this.onDeleteClick.bind(this, post._id)}
          >
            Delete&nbsp;post
          </Link>
        </div>
      </div>
    );

    return (
      <div className="Post">
        <div className="post-arrow-container">
          {this.state.showPostMenu ? postMenu : null}
          <Link to="" onClick={this.showPostMenu}>
            <i className="fas fa-angle-down post-arrow-down"></i>
          </Link>
        </div>
        <div className="post-container">
          <div className="post-items">
            <img
              className="post-user-img"
              src={`${window.location.protocol}//${window.location.host}/${post.avatar}`}
              alt="User"
            />
          </div>
          <div className="post-items">
            <div className="post-user-details">
              <h2 className="post-user-fullname">{`${post.name.first} ${post.name.last}`}</h2>
              <p className="post-user-username">{`@${post.handle}`}</p>
            </div>
            <p className="post-text">{post.text}</p>
            <div className="post-actions">
              <div className="post-icon-box">
                <i className="far fa-comment-alt comment-icon post-actions-icon" />
                <span className="post-action-count post-comment-count">
                  {post.count.comments}
                </span>
              </div>
              <div className="post-icon-box">
                <i className="fas fa-retweet retweet-icon post-actions-icon" />
                <span className="post-action-count post-retweet-count">
                  {post.count.retweet}
                </span>
              </div>
              {!this.findUserLike(post.likes) ? (
                <div className="post-icon-box">
                  <i
                    onClick={() => this.onLikePost(post._id)}
                    className="far fa-heart heart-unfilled-icon post-actions-icon"
                  />
                  <span className="post-action-count post-liked-count">
                    {post.count.likes}
                  </span>
                </div>
              ) : (
                <div className="post-icon-box">
                  <i
                    onClick={() => this.onUnlikePost(post._id)}
                    className="fas fa-heart heart-filled-icon post-actions-icon"
                  />
                  <span
                    style={{ color: "rgb(224, 36, 94)" }}
                    className="post-action-count post-liked-count"
                  >
                    {post.count.likes}
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

Post.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, likePost, unlikePost }
)(Post);
