import {
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST
} from "../actions/types";

const initalState = {
  post: null,
  posts: null,
  loading: false
};

export default function(state = initalState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case DELETE_POST:
      console.log(action.payload);
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    default:
      return state;
  }
}
