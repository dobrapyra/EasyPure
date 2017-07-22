Element.prototype.addClass = function( className ) {
  var el = this, tmpArr;
  if( el.classList ) {
    el.classList.add( className );
  } else {
    if( el.hasClass( className ) ) return;
    tmpArr = el.className.split( ' ' );
    tmpArr.push( className );
    el.className = tmpArr.join( ' ' );
  }
  return el;
};

NodeList.prototype.addClass = function( className ) {
  this.each( function( el ) {
    el.addClass( className );
  } );
};
