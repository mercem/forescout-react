import { applyMiddleware, combineReducers, createStore, Store, compose } from 'redux';
import thunk from 'redux-thunk';
import { postsReducer } from './reducers/posts';
import { loadingReducer } from './reducers/loading';
import {IPostsState} from './types';

export interface IAppState {
  posts: IPostsState,
  loading: any
}

const rootReducer = combineReducers<IAppState>({
  posts: postsReducer,
  loading: loadingReducer
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (): Store<IAppState, any> => createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

