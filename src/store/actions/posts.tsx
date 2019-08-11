import { ThunkAction } from 'redux-thunk';
import { ActionCreator, Dispatch } from 'redux';
import {
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAIL,
  GET_POST_BY_ID_REQUEST,
  GET_POST_BY_ID_SUCCESS,
  GET_POST_BY_ID_FAIL,
  DELETE_POST_BY_ID_REQUEST,
  DELETE_POST_BY_ID_SUCCESS,
  DELETE_POST_BY_ID_FAIL,
  ADD_POST_REQEUST,
  ADD_POST_SUCCESS,
  ADD_POST_FAIL
} from '../actionTypes';
import {
  IPost,
  IPostActionTypes,
  IPostsState
} from '../types';
import axios from '../../config/axios-instance';
import api from '../../config/api';


const getAllPostsRequest = (): IPostActionTypes => {
  return {
    type: GET_ALL_POSTS_REQUEST
  }
}

const getAllPostsSuccess = (posts: IPost[]): IPostActionTypes => {
  return {
    type: GET_ALL_POSTS_SUCCESS,
    payload: posts
  }
}

const getAllPostsFail = (): IPostActionTypes =>{
  return {
    type: GET_ALL_POSTS_FAIL
  }
}

export const getAllPosts: ActionCreator<ThunkAction<Promise<any>, IPostsState, null, IPostActionTypes>> = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getAllPostsRequest());
    try {
      const res = await axios.get(api.getAllPosts);
      dispatch(getAllPostsSuccess(res.data));
      return res;
    } catch(error) {
      dispatch(getAllPostsFail());
      return error;
    }
  }
}

const getPostByIDRequest = (): IPostActionTypes => {
  return {
    type: GET_POST_BY_ID_REQUEST
  }
}

const getPostByIDSuccess = (post: IPost, id: number): IPostActionTypes => {
  return {
    type: GET_POST_BY_ID_SUCCESS,
    post,
    id
  }
}

const getPostByIDFail = (): IPostActionTypes =>{
  return {
    type: GET_POST_BY_ID_FAIL
  }
}

export const getPostByID: ActionCreator<ThunkAction<Promise<any>, IPostsState, null, IPostActionTypes>> = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(getPostByIDRequest());
    try {
      const res = await axios.get(api.getPost + id.toString());
      dispatch(getPostByIDSuccess(res.data, id));
      return res;
    } catch(error) {
      dispatch(getPostByIDFail());
      return error;
    }
  }
}

const deletePostByIDRequest = (): IPostActionTypes => {
  return {
    type: DELETE_POST_BY_ID_REQUEST
  }
}

const deletePostByIDSuccess = (id: number): IPostActionTypes => {
  return {
    type: DELETE_POST_BY_ID_SUCCESS,
    id
  }
}

const deletePostByIDFail = (): IPostActionTypes =>{
  return {
    type: DELETE_POST_BY_ID_FAIL
  }
}

export const deletePostByID: ActionCreator<ThunkAction<Promise<any>, IPostsState, null, IPostActionTypes>> = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(deletePostByIDRequest());
    try {
      const res = await axios.delete(api.deletePost + id.toString());
      dispatch(deletePostByIDSuccess(id));
      return res;
    } catch(error) {
      dispatch(deletePostByIDFail());
      return error;
    }
  }
}

const addPostRequest = (): IPostActionTypes => {
  return {
    type: ADD_POST_REQEUST
  }
}

const addPostSuccess = (post: IPost): IPostActionTypes => {
  return {
    type: ADD_POST_SUCCESS,
    post
  }
}

const addPostFail = (): IPostActionTypes =>{
  return {
    type: ADD_POST_FAIL
  }
}

export const addPost: ActionCreator<ThunkAction<Promise<any>, IPostsState, null, IPostActionTypes>> = (post: IPost) => {
  return async (dispatch: Dispatch) => {
    dispatch(addPostRequest());
    try {
      const res = await axios.post(api.addPost, post);
      dispatch(addPostSuccess(post));
      return res;
    } catch(error) {
      dispatch(addPostFail());
      return error;
    }
  }
}

