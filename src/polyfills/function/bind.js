if( !Function.prototype.bind ) {

  Function.prototype.bind = function( ctx ) {
    var fn = this;
    return function() {
      fn.apply( ctx, arguments );
    };
  };

}
