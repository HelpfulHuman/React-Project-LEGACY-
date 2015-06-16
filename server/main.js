require('dotenv').load()

var express = require('express')
  , app     = express()
  , port    = process.env.PORT || 8080

/**
 * Configure our express application.
 */
// app.use(express.static('public'))
app.set('views', __dirname + '/templates')
app.set('view engine', 'ejs')


/************************************************************
 *
 * Express routes for:
 *   - main.js
 *   - index.html
 *
 *   Sample endpoints to demo async data fetching:
 *     - POST /landing
 *     - POST /home
 *
 ************************************************************/

// Serve application file depending on environment
app.get('/app.js', function (req, res) {
  if (process.env.APP_ENV === 'production') {
    res.sendFile(__dirname + '/../build/app.js')
  }
  else {
    res.redirect('//localhost:9090/build/app.js')
  }
})

// Serve index page
app.get('*', function (req, res) {
  res.render('index', {
    mode: process.env.APP_ENV || 'development',
    appName: '',
    appDescription: ''
  })
})


/*************************************************************
 *
 * Webpack Dev Server
 *
 * See: http://webpack.github.io/docs/webpack-dev-server.html
 *
 *************************************************************/

if (process.env.APP_ENV !== 'production') {
  var webpack = require('webpack')
    , WebpackDevServer = require('webpack-dev-server')
    , config = require('../webpack.dev-config');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: true,
    historyApiFallback: true
  }).listen(9090, 'localhost', function (err, result) {
    if (err) {
      console.log(err)
    }
  })
}

/******************
 *
 * Express server
 *
 *****************/

var server = app.listen(port, function () {

  var host = server.address().address
    , port = server.address().port

  console.log('React listening at http://%s:%s', host, port)
})
