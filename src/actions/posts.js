import * as api from "../api";
import { CREATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH, LIKE, STOP_LOADING, START_LOADING, FETCH_POST, UPDATE, COMMENT } from "./../constants/actionTypes";

export const getPost = (id) => async (dispatch) => {
  // Fetch Data
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: STOP_LOADING });

    dispatch({ type: FETCH_POST, payload: data });
  } catch (error) {
    console.log("get post", error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  // Fetch Data
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: STOP_LOADING });

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log("get posts", error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: STOP_LOADING });

    dispatch({ type: FETCH_BY_SEARCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createPost(post);
    dispatch({ type: STOP_LOADING });
    navigate(`/posts/${data._id}`);
    // navigate('/posts');
    window.location.reload()
    

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value,id) => async (dispatch) => {
  try {
    const {data} = await api.comment(value,id);
    dispatch({ type: COMMENT, payload: data });
    return data.comments;

  } catch (error) {
    console.log(error);
  }
}