import React, { Component } from "react";
import Post from "./Post";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getPosts } from "../../actions/postActions";
import PropTypes from "prop-types";

import isEmpty from "../../validation/is-empty";
import Spinner from "../common/Spinner";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null
    };
  }

  componentDidMount() {
    this.props.getPosts();
  }
  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.post.posts)) {
      const posts = nextProps.post.posts;
      this.setState({ posts: posts });
    }
  }
  render() {
    const { loading } = this.props.post;
    let postsContent;
    if (this.state.posts === null || loading) {
      postsContent = <Spinner />;
    } else {
      postsContent = this.state.posts.map(post => (
        <Post key={post._id} post={post} />
      ));
    }
    return <div className="PostList">{postsContent}</div>;
  }
}

PostList.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(withRouter(PostList));
