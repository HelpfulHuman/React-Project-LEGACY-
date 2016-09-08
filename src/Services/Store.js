import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../Reducers/index';
import createLogger from 'redux-logger';
import { syncHistoryWithStore } from 'react-router-redux';
import { appHistory } from './History';
import thunk from 'redux-thunk';

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

const createStoreWithMiddleware = applyMiddleware(
  createLogger(),
  syncHistoryWithStore(appHistory),
  thunk
)(createStore);

export default createStoreWithMiddleware(rootReducer);
