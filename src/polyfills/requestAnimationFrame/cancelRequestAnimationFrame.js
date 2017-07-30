if( !window.cancelAnimationFrame ) {

  window.cancelAnimationFrame = ( function() {
    return window.cancelAnimationFrame ||
      window.webkitCancelRequestAnimationFrame ||
      window.mozCancelRequestAnimationFrame ||
      window.oCancelRequestAnimationFrame ||
      window.msCancelRequestAnimationFrame ||
      clearTimeout;
  } )();

}
