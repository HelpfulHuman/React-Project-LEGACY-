import React from 'react'
import {RouteHandler} from 'react-router'
import AuthStore from '../stores/AuthStore'

class Authenticated extends React.Component {

  /**
   * Acts as auth "middleware", checking if the user is logged in
   * and redirecting them to the login page if they're not.  The
   * initially attempted path is included to redirect the user back
   * upon successful login.
   *
   * @param  {Object} transition
   */
  static willTransitionTo(transition) {
    if (!AuthStore.isLoggedIn()) {
      transition.redirect('login', {}, {'nextPath': transition.path})
    }
  }

  /**
   * Sets the initial state from AuthStore.
   */
  constructor() {
    super()

    this.state = this.getLoginState()
  }

  /**
   * Gets the user's state from the AuthStore.
   *
   * @return {Object}
   */
  getLoginState() {
    return {
      user: AuthStore.user,
      token: AuthStore.token
    }
  }

  /**
   * If any change has occurred in the AuthStore, re-render the component
   * by updating its state with whatever is in the AuthStore.
   */
  _onChange() {
    this.setState(this.getLoginState())
  }

  /**
   * Subscribe to changes in the AuthStore so we can respond as necessary.
   */
  componentDidMount() {
    AuthStore.addChangeListener(this._onChange.bind(this))
  }

  /**
   * Remove the AuthStore listener when the component is removed.
   */
  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange.bind(this))
  }

  /**
   * Renders the route handler with user session data.
   *
   * @return {Function}
   */
  render() {
    return (
      <RouteHandler
        {...this.props}
        user={this.state.user}
        token={this.state.token} />
    )
  }

}

export default Authenticated
