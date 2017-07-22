Element.prototype.hasClass = function( className ) {
  var el = this;
  if( el.classList ) {
    return el.classList.contains( className );
  } else {
    return ( ( el.className.split( ' ' ) ).indexOf( className ) >= 0 );
  }
};
