/**
 * Checks the store to see if a valid auth token exists
 * at "auth.token".  If false, they are redirected to the
 * login page.
 *
 * @param  {Object}  store
 * @return {Function}
 */
export function isLoggedIn (store) {
  return (nextState, replaceState) => {
   let state = store.getState();
   if ( ! state.auth.token) {
     replaceState(nextState, '/login');
   }
  };
}

/**
* Checks the store to see if a valid auth token exists
* at "auth.token".  If true, they are redirected to the
* dashboard page.
 *
 * @param  {Object} store
 * @return {Function}
 */
 export function isGuest (store) {
   return (nextState, replaceState) => {
    let state = store.getState();
    if (state.auth.token) {
      replaceState(nextState, '/');
    }
   };
 }
