var gulp = require('gulp')
  , webpack = require('webpack')
  , del = require('del')
  , gutil = require('gulp-util')
  , stylus = require('gulp-stylus')
  , autoprefix = require('gulp-autoprefixer')
  , minifyCss = require('gulp-minify-css')
  , uglify = require('gulp-uglify')
  , plumber = require('gulp-plumber')
  , rename = require('gulp-rename')
  , nodemon = require('gulp-nodemon')
  , pkg = require('./package.json')
  , buildCfg = require("./webpack.config")
  , buildDevCfg = require("./webpack.dev-config")
  , assets = './resources'
  , client = './client'
  , server = './server'
  , dist = './build'


/**
 * HELPER:WEBPACK
 * This helper allows you to generate webpack tasks using
 */
var webpackBuild = function (config) {
  return function (done) {
    webpack(config).run(function (err, stats) {
      if (err) {
        throw new gutil.PluginError('webpack', err)
      }

      gutil.log('[webpack]', stats.toString({
        hash: true,
        colors: true,
        cached: false,
        timings: false,
        chunks: false,
        chunkModules: false,
        version: false
      }))

      done()
    })
  }
}

/**
 * CLEAN
 * Various clean tasks that remove un-needed code from each build.
 */
gulp.task('clean:scripts', function (done) {
  del([dist + '/scripts/**/*.js', '!**/vendor.js'], done)
})

gulp.task('clean:styles', function (done) {
  del([dist + '/styles'], done)
})

gulp.task('clean:images', function (done) {
  del([dist + '/images'], done)
})

/**
 * STYLES:COMPILE
 * Compile Stylus files, apply vendor prefixes and minify stylesheets.
 */
gulp.task('styles', ['clean:styles'], function () {
  return gulp.src(client + '/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefix())
    .pipe(gulp.dest(dist))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCss())
    .pipe(gulp.dest(dist))
})

/**
 * IMAGES
 * Copying images to the distribution folder.
 */
gulp.task('images', ['clean:images'], function () {
  return gulp.src(client + '/images/**/*')
    .pipe(gulp.dest(dist + '/images'))
})

/**
 * WEBPACK
 * Various webpack build and serve routes.
 */
gulp.task('webpack:dev', webpackBuild(buildDevCfg))
gulp.task('webpack', webpackBuild(buildCfg))

/**
 * BUILD
 */
gulp.task('build:dev', ['styles', 'webpack:dev'])
gulp.task('build', ['styles', 'webpack'])

/**
 * WATCH
 * Automatically run tasks on file change.
 */
gulp.task('watch', ['build:dev'], function () {
  gulp.watch(client + '/**/*.styl', ['styles'])
  gulp.watch(client + '/**/*.(js|jsx)', ['webpack:dev'])
})

/**
 * SERVER
 * Spins up the Node server that hosts our application.
 */
gulp.task('server', function () {

  nodemon({
    script: pkg.main,
    ext: 'js,jsx',
    watch: [
      'server',
      'client'
    ]
  })

})

/**
 * AGGREGATED TASKS
 * These are tasks that have been put together for ease of use.
 */
gulp.task('publish', ['build'])

/**
 * DEFAULT TASK
 */
gulp.task('default', ['watch', 'server'])
