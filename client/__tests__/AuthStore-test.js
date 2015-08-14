jest.dontMock('../stores/AuthStore')

describe('AuthStore', function () {

  // This test doens't do anything of value - it's
  // more just to make sure the Jest is working
  it('initializes when called', function () {
    var AuthStore = require('../stores/AuthStore')
    expect(AuthStore).toBeDefined()
  })

})

// SCRATCH PAGE TESTS =========================
//
// jest.dontMock('../scratch/scratch')
// describe('Scratch', function () {
//
//   it('returns the string hello world', function () {
//     var Scratch = require('../scratch/scratch');
//
//     var s = new Scratch('hello', 'world')
//     console.log(s.helloWorld())
//
//     expect(s.helloWorld()).toEqual('hello world');
//   });
//
// });
