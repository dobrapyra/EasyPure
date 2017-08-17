if( !Element.prototype.closest ) {
  Element.prototype.closest = function( selector ) {
    var el, matches = document.querySelectorAll( selector ),
      mi, ml = matches.length;

    for( el = this; el; el = el.parentElement ) {
      for( mi = 0; mi < ml; mi++ ) {
        if( matches[ mi ] === el ) {
          return el;
        }
      }
    }

    return null;
  };
}