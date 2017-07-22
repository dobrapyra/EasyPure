if( !Array.prototype.indexOf ) {

  Array.prototype.indexOf = function( el, from ) {

    var arr = this, i, l = arr.length;

    from = from || 0;

    for( i = from; i < l; i++ ) {
      if( arr[ i ] === el ) return i;
    }

    return -1;
  };

}
