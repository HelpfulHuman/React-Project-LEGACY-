import {Portal} from 'portals'
import AuthStore from '../Stores/AuthStore'

/**
 * Instantiate a Portal instance that we can use to make all
 * of our requests to a web service.
 */
let Api = new Portal()

/**
 * Use the default interceptors such as "merge globals" and
 * encode/decode JSON.
 */
Api.useDefaultInterceptors()

/**
 * Set our global settings, like "hostname".
 */
Api.globals.hostname = 'http://localhost'

/**
 * Add a custom interceptor that will check the AuthStore to
 * see whether or not an Authorization token is available.
 */
Api.onRequest(function (options) {
  if (AuthStore.isLoggedIn()) {
    options.headers.Authorization = 'Bearer ' + AuthStore.token
  }

  return options
})



export default Api
