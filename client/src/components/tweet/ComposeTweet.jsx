import React, { Component } from "react";
import { Link } from "react-router-dom";
import { createPost } from "../../actions/postActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import "./ComposeTweet.css";

class ComposeTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const postData = {
      text: this.state.text
    };
    this.props.createPost(postData, this.props.history);
  }

  render() {
    const prevPath = this.props.location.prevPath;
    const { user } = this.props.auth;
    return (
      <div className="ComposeTweet">
        <div className="ComposeTweet--overlay" />
        <div className="ComposeTweet--container">
          <form onSubmit={this.onSubmit}>
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
                  src={`${window.location.protocol}//${window.location.host}/${user.avatar}`}
                  alt="User"
                />
              </div>
              <div className="tweet-content-item" />
              <div className="tweet-content-item">
                <textarea
                  className="tweet-content-text"
                  id="tweet-content-text"
                  name="text"
                  placeholder="What's happening?"
                  value={this.state.text}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ComposeTweet.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createPost }
)(withRouter(ComposeTweet));
