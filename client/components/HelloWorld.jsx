import React from 'react'

class HelloWorld extends React.Component {

  /**
   * Constructor; Set our default state.  Also pay attention to the
   * fact that we're calling "super()" to initiate our parent class!
   */
  constructor() {
    super()

    this.state = {
      subject: 'World'
    }
  }

  /**
   * Renders the DOM markup for the component instance.
   *
   * @return {Function}
   */
  render() {
    return (
      <div>
        {this.props.greeting}, {this.state.subject}!
      </div>
    )
  }

}

/**
 * Define property details; similar to defining necessary arguments
 * and their types in a function declaration.
 *
 * @type {Object}
 */
HelloWorld.propTypes = {
  greeting: React.PropTypes.string
}

/**
 * Default properties in case a property is not provided.
 *
 * @type {Object}
 */
HelloWorld.defaultProps = {
  greeting: 'Hello'
}

export default HelloWorld
