var webpack = require('webpack');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
  entry: "./client/main",

  output: {
    path: __dirname + "/build/",
    filename: "app.js"
  },

  module: {
    loaders: [
      {
        test: /client\/.+\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader?stage=0"
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    // dedupe our NPM packages
    new webpack.optimize.DedupePlugin(),
    // minify our outputted JS
    new webpack.optimize.UglifyJsPlugin(),
  ]
}
