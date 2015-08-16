var gulp = require('gulp');
var plugin = require('gulp-load-plugins')();
var del = require('del');
var webpack = require('webpack');

require('babel/register');

var config = {
  package: require('./package.json'),
  production: require('./webpack.config'),
  development: require('./webpack.dev-config'),
  assets: './resources',
  client: './client',
  server: './server',
  dist: './build'
};

// var webpack = require('webpack')
//   , del = require('del')
//   , gutil = require('gulp-util')
//   , stylus = require('gulp-stylus')
//   , autoprefix = require('gulp-autoprefixer')
//   , minifyCss = require('gulp-minify-css')
//   , uglify = require('gulp-uglify')
//   , plumber = require('gulp-plumber')
//   , rename = require('gulp-rename')
//   , nodemon = require('gulp-nodemon')
//   , pkg = require('./package.json')
//   , buildCfg = require("./webpack.config")
//   , buildDevCfg = require("./webpack.dev-config")
//   , assets = './resources'
//   , client = './client'
//   , server = './server'
//   , dist = './build'


/**
 * HELPER:WEBPACK
 * This helper allows you to generate webpack tasks using
 */
var webpackBuild = function (config) {
  return function (done) {
    webpack(config).run(function (err, stats) {
      if (err) {
        throw new plugin.util.PluginError('webpack', err)
      }

      plugin.util.log('[webpack]', stats.toString({
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
  del([config.dist + '/scripts/**/*.js'], done);
});

gulp.task('clean:styles', function (done) {
  del([config.dist + '/**/*.css'], done);
});

gulp.task('clean:images', function (done) {
  del([config.dist + '/images'], done);
});

/**
 * STYLES:COMPILE
 * Compile Stylus files, apply vendor prefixes and minify stylesheets.
 */
gulp.task('styles', ['clean:styles'], function () {
  return gulp
    .src(config.assets + '/styles/*.styl')
    .pipe(plugin.plumber())
    .pipe(plugin.stylus())
    .pipe(plugin.autoprefixer())
    .pipe(gulp.dest(config.dist))
    .pipe(plugin.rename({ suffix: '.min' }))
    .pipe(plugin.minifyCss())
    .pipe(gulp.dest(config.dist));
});

/**
 * IMAGES
 * Copying images to the distribution folder.
 */
gulp.task('images', ['clean:images'], function () {
  return gulp
    .src(config.client + '/images/**/*')
    .pipe(gulp.dest(dist + '/images'));
});

/**
 * WEBPACK
 * Various webpack build and serve routes.
 */
gulp.task('webpack:dev', webpackBuild(config.development));
gulp.task('webpack', webpackBuild(config.production));

/**
 * BUILD
 */
gulp.task('build:dev', ['styles', 'webpack:dev']);
gulp.task('build', ['styles', 'webpack']);

/**
 * WATCH
 * Automatically run tasks on file change.
 */
gulp.task('watch', ['build:dev'], function () {
  gulp.watch(config.client + '/**/*.styl', ['styles']);
  gulp.watch(config.client + '/**/*.{js,jsx}', ['webpack:dev']);
});

/**
 * SERVER
 * Spins up the Node server that hosts our application.
 */
gulp.task('server', function () {

  plugin.nodemon({
    script: config.package.main,
    ext: 'js,jsx',
    watch: [
      'server',
      'client'
    ]
  });

});

/**
 * TEST
 * Run Mocha tests across your application.
 */
gulp.task('test', function () {
  return gulp
    .src([
      config.client + '/**/*.test.{js,jsx}',
      config.server + '/**/*.test.{js,jsx}'
    ])
    .pipe(plugin.mocha({
      reporter: 'spec',
      require: [
        './resources/testing/init'
      ]
    }));
});

/**
 * TDD
 * Test-driven development will automatically run tests after saving.
 */
gulp.task('tdd', function () {
  gulp.watch([
    config.client + '/**/*.{js,jsx}',
    config.server + '/**/*.{js,jsx}'
  ], ['test']);
});

/**
 * AGGREGATED TASKS
 * These are tasks that have been put together for ease of use.
 */
gulp.task('publish', ['build']);

/**
 * DEFAULT TASK
 */
gulp.task('default', ['watch', 'server']);
