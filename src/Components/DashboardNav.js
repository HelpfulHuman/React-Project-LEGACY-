import React from 'react';

class DashboardNav extends React.Component {

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

export default DashboardNav;
