/**
 * Track all generated <div> elements
 *
 * @type array
 */
var divs = [];

/**
 * Generates a new <div> element, adds it to the tracking array and
 * then injects the given React instance into it.
 *
 * @param {React.Component} component
 * @return {Object}
 */
exports.renderIntoDocument = function (component) {
  // create a new div element
  var div = document.createElement('div');
  // add it to our tracking array
  divs.push(div);
  // render the component to the div and return it
  var node = React.render(component, div);
  // find the dom node and return it
  return React.findDOMNode(node);
}

/**
 * Clean up all of the mounted <div> tags.
 */
exports.unmountComponents = function () {
  // loop through and unmount each component
  divs.forEach(function (div) {
    React.unmountComponentAtNode(div);
  });

  // reset our tracking array
  divs = [];
}
