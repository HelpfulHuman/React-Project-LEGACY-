/**
 * Generates a virtual document global for testing DOM manipulation
 * if a global document property doesn't already exist.
 *
 * @param  {String} markup
 */
module.exports = function (customDom) {
  // if DOM alredy exists, we don't need to do anything
  if (typeof document !== 'undefined') return;

  // default dom to fallback to
  var defaultDom = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>';

  // load in our virtual dom
  var jsdom = require('jsdom').jsdom;

  // bind the dom to our document global
  global.document = jsdom(customDom || defaultDom);

  // create a window object
  global.window = document.defaultView;//document.parentWindow;

  // add a basic navigator object
  global.navigator = { userAgent: 'node.js' };

  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  }

}
