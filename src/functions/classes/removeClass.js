Element.prototype.removeClass = function( className ) {
  var el = this, tmpArr;

  if( el.classList ) {
    el.classList.remove( className );
  } else {
    if( !el.hasClass( className ) ) return;

    tmpArr = el.className.split( ' ' );
    tmpArr.splice( tmpArr.indexOf( className ) );
    el.className = tmpArr.join( ' ' );
  }

  return el;
};

NodeList.prototype.removeClass = function( className ) {
  this.each( function( el ) {
    el.removeClass( className );
  } );

  return this;
};
HTMLCollection.prototype.addClass = NodeList.prototype.addClass;
