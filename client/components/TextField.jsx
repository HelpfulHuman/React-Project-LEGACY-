import React from 'react'

class TextField extends React.Component {

  /**
   * Render the component.
   *
   * @return {Function}
   */
  render() {
    let {
      type,
      label,
      className,
      ...other
    } = this.props



    return (
      <div className={'field ' + className}>
        <label>{label}</label>
        { type === 'multiline' ? <textarea {...other} /> : <input {...other} /> }
      </div>
    )
  }

}

TextField.propTypes = {
  type: React.PropTypes.string,
  label: React.PropTypes.string,
  className: React.PropTypes.string
}

TextField.defaultProps = {
  type: 'text',
  label: '',
  className: '',
  value: ''
}

export default TextField
