if( !Function.prototype.bind ) {
  Function.prototype.bind = function( ctx ) {

    var fn = this, args = Array.prototype.slice.call( arguments, 1 );

    return function() {
      fn.apply( ctx, args );
    };
  };
}
