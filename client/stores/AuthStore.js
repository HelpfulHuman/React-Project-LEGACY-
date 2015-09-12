import Store from './Store'
import Session from '../Services/Session'
import Token from '../Services/Token'

class AuthStore extends Store {

  /**
   * Register the store events to the dispatcher.
   */
  constructor() {
    super()

    // register our actions with the dispatcher
    this.subscribe(this.registerActions.bind(this))

    // define "private" variable(s)
    this._token = Session.get('authToken')
    this._user  = this._token ? {} : null
  }

  /**
   * Registers the actions that the store will watch for.
   *
   * @param  {Object} action
   */
  registerActions(action) {
    switch(action.actionType) {
      case 'LOGIN_SUCCESS':
        this._token = action.token
        this._user  = action.user
        Session.set('authToken', this._token)
        break

      case 'LOGOUT':
        this._user = this._token = null
        Session.drop('authToken')
        break

      default:
        return true
    }

    this.emitChange()
  }

  /**
   * Returns the user object.
   *
   * @return {Object}
   */
  get user() {
    return this._user
  }

  /**
   * Returns the user object.
   *
   * @return {Object}
   */
  get token() {
    return this._token
  }

  /**
   * Returns true if the user is logged in.
   *
   * @return {Boolean}
   */
  isLoggedIn() {
    return (!!this._token && !Token.isExpired(this._token))
  }
}

export default new AuthStore()
