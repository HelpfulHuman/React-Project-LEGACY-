// load into modules
import Example from '../Example';

// define the test suite
describe('Example', function () {

  jsdom();

  it('renders "Hello, World!" by default', function () {
    var example = TestUtils.renderIntoDocument(<Example />);

    expect(React.findDOMNode(example).textContent).to.equal('Hello, World!');
  });

  it('renders "Hola, World!" when given a greeting', function () {
    var example = TestUtils.renderIntoDocument(<Example greeting='Hola' />);

    expect(React.findDOMNode(example).textContent).to.equal('Hola, World!');
  });

});
