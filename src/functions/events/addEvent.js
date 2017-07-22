Element.prototype.addEvent = function( name, fn, capture ) {
  if( typeof fn !== 'function' ) return;
  var el = this, eventObj, nameArr, eventName, eventId;
  el._event = el._event || {};
  nameArr = name.split( '.' ); eventName = nameArr[ 0 ] || '_'; eventId = nameArr[ 1 ];
  if( eventId ) el.removeEvent( name, capture );
  capture = !!capture;
  eventObj = { id: eventId, fn: fn.bind( el ), capture: capture };
  el._event[ eventName ] = el._event[ eventName ] || [];
  el._event[ eventName ].push( eventObj );
  el.addEventListener( eventName, eventObj.fn, capture );
};

document.addEvent = Element.prototype.addEvent.bind( document );
window.addEvent = Element.prototype.addEvent.bind( window );
