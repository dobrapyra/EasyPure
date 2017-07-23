( function() {

  'use strict';

  // Load plugins
  var gulp = require( 'gulp' );
  var concat = require( 'gulp-concat' );
  var rename = require( 'gulp-rename' );
  var stripdebug = require( 'gulp-strip-debug' );
  var uglify = require( 'gulp-uglify' );
  var notify = require( 'gulp-notify' );

  var notifyLogOnly = notify.withReporter( function( options, callback ) {
    console.log( "Message:", options.message );
    callback();
  } );

  notifyLogOnly.logLevel( 1 );

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
      .pipe( notifyLogOnly( { message: 'ES5 build done!' } ) )
      .pipe( rename( 'easypure.min.js' ) )
      .pipe( stripdebug() )
      .pipe( uglify() )
      .pipe( gulp.dest( '.' ) )
      .pipe( notifyLogOnly( { message: 'ES5 min build done!' } ) )
      .pipe( notify( { message: 'ES5 all build done!' } ) );
  } );

  // default tasks
  gulp.task( 'default', [ 'buildES5' ] );

} )();