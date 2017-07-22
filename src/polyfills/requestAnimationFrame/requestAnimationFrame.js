window.requestAnimFrame = ( function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( cb ) {
      return window.setTimeout( cb, 1000 / 60 );
    };
} )();
