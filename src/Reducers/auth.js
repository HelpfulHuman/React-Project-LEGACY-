/**
 * Calculates the user's current authenticated state.
 *
 * @param  {Object} state
 * @param  {Object} action
 * @return {Object}
 */
export default function (state = {}, action) {
  let newState;

  switch (action.type) {
    case 'ATTEMPTING_AUTH':
      newState = { loading: true };
      break;
    case 'AUTH_SUCCESS':
      newState = { token: action.token, email: action.email };
      break;
    case 'AUTH_FAILED':
      newState = { error: action.message };
      break;
    case 'AUTH_LOGOUT':
      newState = {};
      break;
    default:
      newState = Object.assign({}, state);
  }

  return newState;
}
