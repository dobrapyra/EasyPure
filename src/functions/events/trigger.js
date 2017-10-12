/* trigger */
Element.prototype.trigger = function( name, capture ) {
  var el = this, eventObj, nameArr, eventName, eventId, i, l;
  if( !el._event ) return;

  nameArr = name.split( '.' ); eventName = nameArr[ 0 ] || '_'; eventId = nameArr[ 1 ];
  if( !el._event[ eventName ] ) return;

  capture = !!capture;

  l = el._event[ eventName ].length;
  if( !l ) return;

  for( i = 0; i < l; i++ ) {
    eventObj = el._event[ eventName ][ i ];
    if( eventObj.capture === capture && ( !eventId || eventObj.id === eventId ) ) {
      eventObj.fn( {
        currentTarget: el
      } );
    }
  }
};

document.trigger = Element.prototype.trigger.bind( document );
window.trigger = Element.prototype.trigger.bind( window );
