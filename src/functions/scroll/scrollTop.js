window.scrollTop = function( scrollVal ) {
  if( scrollVal ) {
    document.body.scrollTop = document.documentElement.scrollTop = scrollVal;
  } else {

    return window.scrollY ||
      window.pageYOffset ||
      document.body.scrollTop ||
      document.documentElement.scrollTop ||
      0;
  }
};
