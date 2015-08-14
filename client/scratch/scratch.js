/*jshint esnext: true */

// TESTING PURPOSES ONLY

class Scratch {

  constructor (msg1, msg2) {
    this.msg1 = msg1
    this.msg2 = msg2
  }

  helloWorld () {
    return this.msg1 + ' ' + this.msg2
  }

}

export default Scratch
