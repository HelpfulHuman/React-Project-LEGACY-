import React from 'react'
import Navigation from '../Components/Navigation'

class Dashboard extends React.Component {

  /**
   * Set the initial state to "loading".
   */
  constructor() {
    super()

    this.state = {
      loading: true
    }
  }

  /**
   * Fetch some data and set the state using the result and set the
   * loading state to false.
   */
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 3000)
  }

  /**
   * Renders the dashboard page.
   *
   * @return {Function}
   */
  render() {
    var contents = '--- loading ---'

    if (!this.state.loading) {
      contents = 'You are now logged in!'
    }

    return (
      <div className='as-dashboard'>
        <Navigation />
        {contents}
      </div>
    )
  }

}

export default Dashboard
