/* removeEvent */
Element.prototype.removeEvent = function( name, capture ) {
  var el = this, eventObj, nameArr, eventName, eventId, i, l, toRemove = [];
  if( !el._event ) return;

  nameArr = name.split( '.' ); eventName = nameArr[ 0 ] || '_'; eventId = nameArr[ 1 ];
  if( !el._event[ eventName ] ) return;

  capture = !!capture;

  l = el._event[ eventName ].length;
  if( !l ) return;

  for( i = 0; i < l; i++ ) {
    eventObj = el._event[ eventName ][ i ];
    if( eventObj.capture === capture && ( !eventId || eventObj.id === eventId ) ) toRemove.push( eventObj );
  }

  l = toRemove.length;
  for( i = 0; i < l; i++ ) {
    eventObj = toRemove[ i ];

    el.removeEventListener( eventName, eventObj.fn, eventObj.capture );

    el._event[ eventName ].splice( el._event[ eventName ].indexOf( eventObj ), 1 );
  }
};

document.removeEvent = Element.prototype.removeEvent.bind( document );
window.removeEvent = Element.prototype.removeEvent.bind( window );
