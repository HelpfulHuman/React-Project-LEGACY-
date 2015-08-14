import React from 'react'

class TextField extends React.Component {

  /**
   * Sets up the initial state for the element.
   */
  constructor() {
    super()
    this.state = {
      value: this.props.value || ''
    }
  }

  /**
   * Mounts the component and calls the given attachToForm() method.
   */
  componentWillMount() {
    this.props.attachToForm(this)
  }

  /**
   * Unmounts the component and calls the given detachFromForm() method.
   */
  componentWillUnmount() {
    this.props.detachFromForm(this)
  }

  /**
   * Update the input's value when any kind of input has been received.
   *
   * @param  {Object} event
   */
  updateValue(event) {
    this.setState({
      value: event.target.value
    })
  }

  /**
   * Render the component.
   *
   * @return {Function}
   */
  render() {
    let {
      label,
      className,
      multiline,
      ...other
    } = this.props

    return (
      <div className={'field ' + className}>
        <label>{label}</label>
        { multiline
          ? <textarea onChange={this.updateValue.bind(this)} value={this.state.value} {...other} />
          : <input onChange={this.updateValue.bind(this)} value={this.state.value} {...other} />
        }
      </div>
    )
  }

}

TextField.propTypes = {
  type: React.PropTypes.string,
  label: React.PropTypes.string,
  className: React.PropTypes.string,
  multiline: React.PropTypes.boolean,
  name: React.PropTypes.string.isRequired
}

TextField.defaultProps = {
  type: 'text',
  label: '',
  className: '',
  multiline: false
}

export default TextField
