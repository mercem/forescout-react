import { Reducer } from 'redux';
import {
  GET_ALL_POSTS_SUCCESS,
  GET_POST_BY_ID_SUCCESS,
  DELETE_POST_BY_ID_SUCCESS,
  ADD_POST_SUCCESS
} from '../actionTypes';
import {
  IPostsState,
  IPostActionTypes
} from '../types';

const initialState: IPostsState = {
  posts: []
}

export const postsReducer: Reducer<IPostsState, IPostActionTypes> = (state = initialState, action: any): IPostsState => {
  switch(action.type){
    case GET_ALL_POSTS_SUCCESS: {
      return {
        posts: [...action.payload]
      } 
    }
    case GET_POST_BY_ID_SUCCESS: {
      let posts = [...state.posts];
      posts[action.id] = action.post;
      return {
        posts
      }
    }
    case DELETE_POST_BY_ID_SUCCESS: {
      let posts = [...state.posts];
      posts[action.id] = null;
      return {
        posts
      }
    }
    case ADD_POST_SUCCESS: {
      return {
        posts: [...state.posts, action.post]
      }
    }
    default:
      return state;
  }
}
