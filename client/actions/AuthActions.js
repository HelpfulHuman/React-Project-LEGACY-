import Dispatcher from '../services/Dispatcher'
import Router from '../services/Router'
import AuthStore from '../stores/AuthStore'
import Request from 'superagent'

export default {

  /**
   * Takes an user credentials and sends them to the server for
   * authentication.  Once authenticated, a JWT should be returned
   * for us to send with the AUTHENTICATED_USER action.
   *
   * @param  {String} email
   * @param  {String} email
   * @return {Promise}
   */
  login: function (email, password) {

    return Request
      .post('/auth')
      .send({ email, password })
      .end((err, res) => {
        if (!err && res.status === 200) {
          this._authenticate(res.body.data.token)
          return
        }

        Dispatcher.dispatch({
          actionType: 'LOGIN_FAILED',
          status: err || res.body
        })
      })

  },

  /**
   * Checks localStorage for a token and uses it to invoke the
   * AUTHENTICATED_USER action.
   */
  checkAndAuthenticate: function () {
    if (AuthStore.token) {
      this._authenticate(AuthStore.token)
    }
  },

  /**
   * Compares the provided token with any tokens in storage and redirects
   * the user to the appropriate location before dispatching the
   * "AUTHENTICATED_USER" action.
   *
   * @param  {String} token
   */
  _authenticate: function (token) {
    // fetch the originally stored token (if any)
    var savedToken = AuthStore.token

    // dispatch the logged in event
    Dispatcher.dispatch({
      actionType: 'LOGIN',
      token: token,
      user: { id: '' }
    })

    // if the token has changed in any way, redirect the user
    if (savedToken !== token) {
      var nextPath = Router.getCurrentQuery().nextPath || '/'
      Router.transitionTo(nextPath)
    }

  },

  /**
   * Un-authenicates the user and removes any stored tokens from
   * localStorage.
   */
  logout: function () {
    Router.transitionTo('login')
    Dispatcher.dispatch({
      actionType: 'LOGOUT'
    })
  }

}
