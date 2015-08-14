require('dotenv').load()
var path    = require('path')
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
        test: /jsx?$/,
        include: path.join(__dirname, 'client'),
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
    // pass in our environment variables
    new webpack.DefinePlugin({
      env: Object.keys(process.env).reduce(function(o, k) {
        o[k] = JSON.stringify(process.env[k])
        return o
      }, {})
    })
  ]
}
