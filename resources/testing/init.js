/**
 * Generates a fake document object (if needed).
 */
global.jsdom = require('mocha-jsdom');

/**
 * Expose expect() globally.
 */
global.expect = require('chai').expect;

/**
 * Expose React globally.
 */
global.React = require('react/addons');

/**
 * Expose React's testing utilities globally.
 */
global.TestUtils = React.addons.TestUtils;
