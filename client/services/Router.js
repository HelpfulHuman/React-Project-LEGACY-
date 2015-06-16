import Router from 'react-router'
import routes from '../routes'

/**
 * Create a singleton reference for the router than can be imported
 * by other components.
 */
export default Router.create({
  routes,
  location: Router.HistoryLocation
})
