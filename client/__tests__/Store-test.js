jest.dontMock('../stores/Store')

describe('Store', function () {
  
  it('initializes when called', function () {
    var Store = require('../stores/Store')
    expect(Store).toBeDefined()
  })

})
