import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../Reducers/index';
import createLogger from 'redux-logger';
import { syncHistory } from 'redux-simple-router';
import browserHistory from './History';
import thunk from 'redux-thunk';


const createStoreWithMiddleware = applyMiddleware(
  createLogger(),
  syncHistory(browserHistory),
  thunk
)(createStore);

export default createStoreWithMiddleware(rootReducer);
