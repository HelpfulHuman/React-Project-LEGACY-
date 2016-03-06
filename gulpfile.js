require('dotenv').load();

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var ui = require('helpful-ui')();
var webpack = require('webpack');
var port = process.env.PORT || 9700;

/**
 * Compile Stylus files into CSS and apply vendor prefixes for us
 * automatically.
 */
gulp.task('styles', function () {
  return gulp
    .src('./src/index.styl')
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.stylus({ use: [ui] }))
      .pipe(plugins.autoprefixer())
      .pipe(plugins.rename({ basename: 'app' }))
      .pipe(gulp.dest('./build'))
    .pipe(plugins.sourcemaps.write('./build'));
});

/**
 * Run a webpack build once.
 */
gulp.task('scripts', function (done) {
  webpack(require('./webpack.config'), done);
});

/**
 * Single task for compiling everything once.
 */
gulp.task('build', ['styles', 'scripts']);

/**
 * Starts up the live-reloading development server.  Currently,
 * only Javascript changes invoke a live reload but we're working
 * on adding support to reload Stylus changes as well.
 */
gulp.task('dev-server', ['styles'], function () {
  gulp.watch('./**/*.styl', ['styles']);
  require('./dev-server');
});

/**
 * Default task for when "gulp" is run.
 */
gulp.task('default', ['build']);
