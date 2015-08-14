import React from 'react'
import Router from '../Services/Router'
import AuthActions from '../Actions/AuthActions'

import TextField from '../Components/TextField'

class Login extends React.Component {

  /**
   * Atempts a login using the email and password.
   *
   * @param  {Event} e
   */
  attemptLogin(e) {
    e.preventDefault()

    // get the input from the forms
    var email    = React.findDOMNode(this.refs.email.refs.input).value
    var password = React.findDOMNode(this.refs.password.refs.input).value

    AuthActions.login(email, password)
  }

  /**
   * Renders the login page.
   *
   * @return {Function}
   */
  render() {
    return (
      <div className='login'>
        <div className='login__form'>
          <TextField type='email' label='Email' ref='email' placeholder='E-Mail' />
          <TextField type='password' label='Password' ref='password' placeholder='Password' />
          <div className='login__actions'>
            <div className='login__support'>
              <a href='/password'>Forgot your password?</a>
            </div>
            <div className='login__continue'>
              <button onClick={this.attemptLogin.bind(this)}>
                Log In
              </button>
            </div>
          </div>
        </div>
        <div className='login__signup'>
          Don't have an account? <a href='/register'>Sign Up</a>
        </div>
      </div>
    )
  }

}

export default Login
