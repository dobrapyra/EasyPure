let gulp = require( 'gulp' ),
  concat = require( 'gulp-concat' ),
  rename = require( 'gulp-rename' ),
  stripdebug = require( 'gulp-strip-debug' ),
  uglify = require( 'gulp-uglify' ),
  notify = require( 'gulp-notify' )

let notifyLogOnly = notify.withReporter( ( options, callback ) => {
  console.log( "Message:", options.message )
  callback()
} );
notifyLogOnly.logLevel( 1 )

gulp.task( 'buildES5', () => {
  return gulp
    .src( [
      './src/info.js',
      './src/polyfills/**/*.js',
      './src/functions/**/*.js'
    ] )
    .pipe( concat( 'easypure.js' ) )
    .pipe( gulp.dest( './dist' ) )
    .pipe( notifyLogOnly( { message: 'ES5 build done!' } ) )
    .pipe( rename( 'easypure.min.js' ) )
    .pipe( stripdebug() )
    .pipe( uglify() )
    .pipe( gulp.dest( './dist' ) )
    .pipe( notifyLogOnly( { message: 'ES5 min build done!' } ) )
    .pipe( notify( { message: 'ES5 all build done!' } ) )
} )

// default tasks
gulp.task( 'default', [ 'buildES5' ] )