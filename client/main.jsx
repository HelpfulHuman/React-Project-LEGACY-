import 'babel-core/polyfill'
import React from 'react'
import Router from './Services/Router'

/**
 * Start the router.
 */
Router.run(function (Handler) {
  React.render(<Handler />, document.getElementById('app'))
})
