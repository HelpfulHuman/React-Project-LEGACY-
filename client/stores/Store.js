import { EventEmitter } from 'events'
import Dispatcher from '../Services/Dispatcher'

class Store extends EventEmitter {

  /**
   * Subscribes the store to the dispatcher and stores the returned
   * index.  This dispatcher index can be used later in Flux's
   * "waitFor()" method.
   *
   * @param  {Function} actionSubscribe
   */
  subscribe(actionSubscribe) {
    this._dispatchIndex = Dispatcher.register(actionSubscribe.bind(this))
  }

  /**
   * Returns the dispatchIndex that was generated from calling the
   * "subscribe()" method on the store.
   *
   * @return {String}
   */
  get dispatchIndex() {
    return this._dispatchIndex
  }

  /**
   * Notifies listeners that a "change" has occurred.
   */
  emitChange() {
    this.emit('CHANGE')
  }

  /**
   * Adds a new listener to the "change" event.  This listener will be
   * invoked when the "emitChange()" method is called.
   *
   * @param {Function} cb
   */
  addChangeListener(cb) {
    this.on('CHANGE', cb)
  }

  /**
   * Removes a listener from the "change" event.
   *
   * @param  {Function} cb
   */
  removeChangeListener(cb) {
    this.removeListener('CHANGE', cb)
  }

}

export default Store
