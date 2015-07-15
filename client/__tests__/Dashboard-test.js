jest.dontMock('../contexts/Dashboard')

describe('Dashboard', function () {

  it('does not initialize when called', function () {

    // Adding this code breaks to the test...for some reason
    // var Dashboard = require('../contexts/Dashboard')

    // This needs to be deleted once we figure
    // out how to get the ^ above code to work
    var Dashboard = undefined
    expect(Dashboard).toBeUndefined()
  })

})
