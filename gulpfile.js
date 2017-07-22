'use strict';

// Load plugins
var gulp = require( 'gulp' );
var concat = require( 'gulp-concat' );
var rename = require( 'gulp-rename' );
var stripdebug = require( 'gulp-strip-debug' );
var uglify = require( 'gulp-uglify' );
var notify = require( 'gulp-notify' );

gulp.task( 'buildES5', function() {
  return gulp
    .src( [
      './src/head.js',
      './src/polyfills/**/*.js',
      './src/functions/**/*.js',
      './src/foot.js'
    ] )
    .pipe( concat( 'easypure.js' ) )
    .pipe( gulp.dest( '.' ) )
    .pipe( notify( { message: 'ES5 build done!' } ) )
    .pipe( rename( 'easypure.min.js' ) )
    .pipe( stripdebug() )
    .pipe( uglify() )
    .pipe( gulp.dest( '.' ) )
    .pipe( notify( { message: 'ES5 min build done!' } ) );
} );

// default tasks
gulp.task( 'default', [ 'buildES5' ] );
