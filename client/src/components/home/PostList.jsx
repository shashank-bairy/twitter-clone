import React, { Component } from "react";
import Post from "./Post";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getPosts, deletePost } from "../../actions/postActions";
import PropTypes from "prop-types";

import isEmpty from "../../validation/is-empty";
import Spinner from "../common/Spinner";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null
    };
    this.deletePostById = this.deletePostById.bind(this);
  }

  deletePostById(id) {
    this.props.deletePost(id, this.props.history);
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
    const { loading, posts } = this.props.post;

    let postsContent;
    if (posts === null || loading) {
      postsContent = <Spinner />;
    } else {
      postsContent = posts.map(post => (
        <Post key={post._id} post={post} deletePostById={this.deletePostById} />
      ));
    }
    return <div className="PostList">{postsContent}</div>;
  }
}

PostList.propTypes = {
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts, deletePost }
)(withRouter(PostList));
