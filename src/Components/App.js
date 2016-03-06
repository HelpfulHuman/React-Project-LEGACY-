import React from 'react';

class App extends React.Component {

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

export default App;
