import React from 'react'
import Router from '../services/Router'
import AuthActions from '../actions/AuthActions'

class Login extends React.Component {

  /**
   * Atempts a login using the email and password.
   *
   * @param  {Event} e
   */
  attemptLogin(e) {
    e.preventDefault()

    // get the input from the forms
    var email     = this.refs.email.getDOMNode().value
      , password  = this.refs.password.getDOMNode().value

    AuthActions.login(email, password)
  }

  /**
   * Renders the login page.
   *
   * @return {Function}
   */
  render() {
    return (
      <div>
        <form role='login'>
          <input type='email' ref='email' placeholder='E-Mail' />
          <input type='password' ref='password' placeholder='Password' />
          <button type='submit' onClick={this.attemptLogin.bind(this)}>Submit</button>
        </form>
      </div>
    )
  }

}

export default Login
