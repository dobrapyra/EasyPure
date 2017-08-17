if( !window.performance ) window.performance = {};
if( !window.performance.now ){
  window.performance.now = ( function() {
    return window.performance.now ||
      function() {
        return new Date().getTime();
      };
  } )();
}
