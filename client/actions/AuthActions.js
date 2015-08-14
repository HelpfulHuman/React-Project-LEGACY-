import Dispatcher from '../Services/Dispatcher'
import Router from '../Services/Router'
import AuthStore from '../Stores/AuthStore'
import Api from '../Services/Api'

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

    return Api
      .post('/auth', { email, password })
      .then(this._loginSuccess)
      .catch(this._loginFailed)

  },

  /**
   * Handles successful responses from login attempt and dispatches
   * the "LOGIN_SUCCESS" action..
   *
   * @param  {Object} res
   */
  _loginSuccess: function (res) {
    // pull the token out
    var token = res.body.data.token

    // fetch the originally stored token (if any)
    var savedToken = AuthStore.token

    // dispatch the logged in event
    Dispatcher.dispatch({
      actionType: 'LOGIN_SUCCESS',
      token: token,
      user: {}
    })

    // if the token has changed in any way, redirect the user
    if (savedToken !== token) {
      var nextPath = Router.getCurrentQuery().nextPath || '/'
      Router.transitionTo(nextPath)
    }

  },

  /**
   * Dispatches the "LOGIN_FAILED" action.
   *
   * @param  {Object} err
   */
  _loginFailed: function (err) {
    Dispatcher.dispatch({
      actionType: 'LOGIN_FAILED',
      statusCode: err.status,
      error: err.error
    })
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
