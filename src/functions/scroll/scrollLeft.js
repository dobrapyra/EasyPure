/* scrollLeft */
window.scrollLeft = function( scrollVal ) {
  if( scrollVal ) {
    document.body.scrollLeft = document.documentElement.scrollLeft = scrollVal;
  } else {

    return window.scrollX ||
      window.pageXOffset ||
      document.body.scrollLeft ||
      document.documentElement.scrollLeft ||
      0;
  }
};
