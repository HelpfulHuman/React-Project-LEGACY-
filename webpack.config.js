require('dotenv').load();
process.env.BABEL_ENV = process.env.APP_ENV;

var path = require('path');
var webpack = require('webpack');
var APP_ENV = process.env.APP_ENV;
var port = process.env.PORT || 9700;

var config = {
  entry: [ path.resolve(__dirname, 'src/index.js') ],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'app.js'
  },
  resolve: ['', '.js', '.jsx'],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.resolve(__dirname, 'src')
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // inject "env" as a global variable
      env: JSON.stringify({
        API_HOST: process.env.API_HOST || null
      })
    })
  ]
}

// development specific configurations here
if (APP_ENV !== 'production') {
  config['debug'] = true;
  config['devtool'] = 'eval-cheap-module-source-map';
  config['entry'].unshift('webpack-hot-middleware/client?reload=true');
  config['plugins'].push(new webpack.HotModuleReplacementPlugin());
  config['plugins'].push(new webpack.NoErrorsPlugin());
}

module.exports = config;
