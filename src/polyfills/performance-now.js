if( !window.performance ) window.performance = {};
window.performance.now = ( function() {
  return window.performance.now ||
    function() {
      return new Date().getTime();
    };
} )();
