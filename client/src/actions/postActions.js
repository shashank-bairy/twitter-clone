import axios from "axios";

import { GET_POSTS, GET_ERRORS, POST_LOADING, DELETE_POST } from "./types";

export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

export const createPost = (postData, history) => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res => {
      dispatch(setPostLoading());
      history.push("/home");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deletePost = (id, history) => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_POST,
        payload: id
      });
      // history.push("/home");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const likePost = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const unlikePost = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
