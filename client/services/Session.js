/**
 * Acts as an abstraction layer around a storage mechanism like "cookies",
 * "localStorage" or even "window" (for testing purposes).
 */
class Session {

  /**
   * Defines the storage mechanism used for the session object.
   *
   * @param  {Object} storage
   */
  constructor(storage) {
    this._storage = storage
  }

  /**
   * Returns an item from storage if it exists, or returns the given
   * default or null.
   *
   * @param  {String} key
   * @param  {mixed}  def
   * @return {mixed}
   */
  get(key, def = null) {
    return this._storage.getItem(key) || def
  }

  /**
   * Sets the value to the given key location in storage.
   *
   * @param  {String} key
   * @param  {mixed}  val
   * @return {this}
   */
  set(key, val) {
    this._storage.setItem(key, val)

    return this
  }

  /**
   * Returns true if the given key exists in storage.
   *
   * @param  {String} key
   * @return {Boolean}
   */
  has(key) {
    return !! this._storage.getItem(key)
  }

  /**
   * Removes the given key/value from storage.
   *
   * @param  {String} key
   * @return {this}
   */
  drop(key) {
    this._storage.removeItem(key)

    return this
  }

  /**
   * Destroys a session clearing all contents from storage.
   *
   * @return {this}
   */
  destroy() {
    this._storage.clear()
    return this
  }

}

export default new Session(localStorage)
