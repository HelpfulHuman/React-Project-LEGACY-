import React from 'react'
import AuthActions from '../actions/AuthActions'

class Navigation extends React.Component {

  /**
   * Logs the user out.
   */
  logout() {
    AuthActions.logout()
  }

  /**
   * Renders the component.
   *
   * @return {Function}
   */
  render() {
    return(
      <nav>
        <a onClick={this.logout.bind(this)}>
          Log Out
        </a>
      </nav>
    )
  }

}

export default Navigation
