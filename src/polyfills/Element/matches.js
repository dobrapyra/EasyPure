if( !Element.prototype.matches ) {

  Element.prototype.matches = ( function() {
    return Element.prototype.matches ||
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      function( selector ) {
        var elCount = 0, matches = document.querySelectorAll( selector ),
          mi, ml = matches.length;

        for( mi = 0; mi < ml; mi++ ) {
          if( matches[ mi ] === this ) return true;
        }

        return false;
      };
  } )();

}

