import { combineReducers } from 'redux';
import authReducer from './auth';
import { routeReducer } from 'react-router-redux';

/**
 * The root reducer for this application.
 *
 * @param  {Object} state
 * @param  {Object} action
 * @return {Object}
 */
export default combineReducers({
  auth: authReducer,
  routing: routeReducer
});
