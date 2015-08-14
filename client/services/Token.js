export default {

  /**
   * Decodes a base64 encoded string.
   *
   * Requires "window.atob"
   * - IE9 Polyfill: https://github.com/davidchambers/Base64.js
   *
   * @param  {String} str
   * @return {String}
   */
  urlBase64Decode(str) {
    var output = str.replace(/-/g, '+').replace(/_/g, '/')
    switch (output.length % 4) {
      case 0:
        break
      case 2:
        output += '=='
        break
      case 3:
        output += '='
        break
      default:
        throw new Error('Illegal base64url string!')
    }
    return decodeURIComponent(escape(window.atob(output)))
  },

  /**
   * Decodes a JWT token and returns the decoded object.
   *
   * @param  {String} token
   * @return {Object}
   */
  decode(token) {
    var parts = token.split('.')

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts')
    }

    var decoded = this.urlBase64Decode(parts[1])

    if (!decoded) {
      throw new Error('Cannot decode the token')
    }

    return JSON.parse(decoded)
  },

  /**
   * Returns the expiration date for the string.
   *
   * @param  {String} token
   * @return {Date}
   */
  getExpirationDate(token) {
    var decoded = this.decode(token)

    if (typeof decoded.exp === 'undefined') {
      return null
    }

    var d = new Date(0)
    d.setUTCSeconds(decoded.exp)

    return d
  },

  /**
   * Returns true if the given token has expired.
   *
   * @param  {String} token
   * @param  {Number} offsetSeconds
   * @return {Boolean}
   */
  isExpired(token, offsetSeconds = 0) {
    var d = this.getExpirationDate(token)

    if (d === null) {
      return false
    }

    return !(d.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
  }

}
