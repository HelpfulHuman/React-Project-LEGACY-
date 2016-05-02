import React, { Component } from 'react';

export default class DashboardNav extends Component {

  static propTypes = {
    displayName: React.PropTypes.string
  };

  static defaultProps = {
    displayName: 'unknown'
  };

  render () {
    return (
      <div>
        <nav>
          <span>Welcome back, { this.props.displayName }</span>
        </nav>
      </div>
    );
  }
}
