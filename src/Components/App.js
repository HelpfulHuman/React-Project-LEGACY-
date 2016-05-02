import React, { Component } from 'react';

export default class App extends Component {

  render () {
    return (
      <div className='app'>
        <h1 className='app__greeting'>
          Example Application
        </h1>
        {this.props.children}
      </div>
    );
  }
}
