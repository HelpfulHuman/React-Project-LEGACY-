import { routeActions } from 'react-router-redux';

/**
 * Attempts to login the user with the given credentials.
 *
 * @param  {String} email
 * @param  {String} password
 * @return {Function}
 */
export function attemptLogin (email, password) {
  return function (dispatch) {
    dispatch({ type: 'ATTEMPTING_AUTH' });
    // after a "successful" login attempt...
    setTimeout(() => dispatch(loginSuccess('exampletoken', email)), 500);
  };
}


/**
 * Creates an action for a successful login using the given token
 * and then routes the user to the dashboard.
 *
 * @param  {String} token
 * @return {Function}
 */
export function loginSuccess (token, email) {
  return function (dispatch) {
    dispatch({ type: 'AUTH_SUCCESS', token, email });
    dispatch(routeActions.push('/'));
  };
}

/**
 * Creates an action for when a login fails.
 *
 * @param  {Error} err
 * @return {Object}
 */
export function loginFailed (err) {
  return {
    type: 'AUTH_FAILED',
    message: err.message
  };
}

/**
 * Logs the user out.
 *
 * @return {Function}
 */
export function logout () {
  return function (dispatch) {
    dispatch({ type: 'AUTH_LOGOUT' });
    dispatch(routeActions.push('/login'));
  };
}
