import React, { Component } from 'react';

export default class App extends Component {

  getInitialState() {
    return {
      hideFocusOutline : true
    };
  },

  componentDidMount() {
    // calculate the responsive state after the component has been mounted
    window.addEventListener('keydown', this.showFocusOutline);
    window.addEventListener('mousemove', this.hideFocusOutline);
  },

  componentWillUnmount() {
    window.removeEventListener('keydown', this.showFocusOutline);
    window.removeEventListener('mousemove', this.hideFocusOutline);
  },

  showFocusOutline(event) {
    if (this.state.hideFocusOutline && event.keyCode === 9) {
      this.setState ({
        hideFocusOutline : false
      });
    }
  },

  hideFocusOutline() {
    if (!this.state.hideFocusOutline) {
      this.setState ({
        hideFocusOutline : true
      });
    }
  },

  render () {
    const classes = [
      'app',
      this.state.hideFocusOutline ? 'focus-outline--hidden' : null,
    ].join(' ').trim();

    return (
      <div className={classes}>
        <h1 className='app__greeting'>
          Example Application
        </h1>
        {this.props.children}
      </div>
    );
  }
}
