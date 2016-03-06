import React from 'react';
import { findDOMNode } from 'react-dom';

class Login extends React.Component {

  static propTypes = {
    onLogin: React.PropTypes.func
  };

  static defaultProps = {
  };

  onLogin () {
    let email = findDOMNode(this.refs.email).value;
    let pass  = findDOMNode(this.refs.pass).value;
    if (this.props.onLogin) this.props.onLogin(email, pass);
  }

  render () {
    return (
      <div className='login'>
        { this.props.isLoading ? 'Logging in...' : null }
        <input type='email' ref='email' placeholder='E-Mail Address' />
        <input type='password' ref='pass' placeholder='Password' />
        <button
          onClick={this.onLogin.bind(this)}
          disabled={this.props.isLoading}>
            Login
        </button>
      </div>
    );
  }

}

export default Login;
