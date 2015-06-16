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
  , client = './client'
  , server = './server'
  , dist = './public'


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
gulp.task('styles', function () {
  return gulp.src(src + '/*.styl')
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
  return gulp.src(src + '/images/**/*')
    .pipe(gulp.dest(dist + '/images'))
})

/**
 * WEBPACK
 * Various webpack build and serve routes.
 */
gulp.task('build:dev', webpackBuild(buildDevCfg))
gulp.task('build', webpackBuild(buildCfg))


/**
 * WATCH
 * Automatically run tasks on file change.
 */
gulp.task('watch', ['build:dev'], function () {
  // gulp.watch(src + '/**/*.styl', ['styles'])
  gulp.watch(client + '/**/*', ['build:dev'])
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
gulp.task('dev', ['watch', 'server'])


/**
 * DEFAULT TASK
 */
gulp.task('default', ['build', 'watch'])
