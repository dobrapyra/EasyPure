/**
 * EasyPure
 * author: dobrapyra
 * version: 2017-08-17
 */

'use strict';

if( !window.performance ) window.performance = {};
if( !window.performance.now ){
  window.performance.now = ( function() {
    return window.performance.now ||
      function() {
        return new Date().getTime();
      };
  } )();
}

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
if( !Element.prototype.matches ) {
  Element.prototype.matches = ( function() {
    return Element.prototype.matches ||
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      function( selector ) {
        var matches = document.querySelectorAll( selector ),
          mi, ml = matches.length;

        for( mi = 0; mi < ml; mi++ ) {
          if( matches[ mi ] === this ) return true;
        }

        return false;
      };
  } )();
}


if( !Function.prototype.bind ) {
  Function.prototype.bind = function( ctx ) {

    var fn = this, args = Array.prototype.slice.call( arguments, 1 );

    return function() {
      fn.apply( ctx, args );
    };
  };
}

if( !Object.assign ) {
  Object.assign = function( obj/*, srcObjs*/ ) {

    if( obj !== Object( obj ) ) throw new TypeError( 'Object.keys called on a non-object' );

    var resultObj, tmpSource, keysArr, i, l, j, k, tmpKey;

    resultObj = Object( obj );

    l = arguments.length;
    for( i = 1; i < l; i++ ) {
      tmpSource = arguments[ i ];

      if( !tmpSource ) continue;

      keysArr = Object.keys( tmpSource );

      k = keysArr.length;
      for( j = 0; j < k; j++ ) {
        tmpKey = keysArr[ j ];

        resultObj[ tmpKey ] = tmpSource[ tmpKey ];
      }
    }

    return resultObj;
  };
}

if( !Object.keys ) {
  Object.keys = function( obj ) {

    if( obj !== Object( obj ) ) throw new TypeError( 'Object.keys called on a non-object' );

    var keysArr = [], key;

    for( key in obj ) {
      if( obj.hasOwnProperty( key ) ) keysArr.push( key );
    }

    return keysArr;
  };
}

if( !window.cancelAnimationFrame ) {
  window.cancelAnimationFrame = ( function() {
    return window.cancelAnimationFrame ||
      window.webkitCancelRequestAnimationFrame ||
      window.mozCancelRequestAnimationFrame ||
      window.oCancelRequestAnimationFrame ||
      window.msCancelRequestAnimationFrame ||
      clearTimeout;
  } )();
}

if( !window.requestAnimationFrame ) {
  window.requestAnimationFrame = ( function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function( cb ) {
        return window.setTimeout( cb, 1000 / 60 );
      };
  } )();
}

Array.prototype.each = function( fn ) {
  if( typeof fn !== 'function' ) return;
  var arr = this, i, l = arr.length, result;
  for( i = 0; i < l; i++ ) {
    result = fn( arr[ i ], i );
    if( result === true ) continue;
    if( result === false ) break;
  }
};
NodeList.prototype.each = Array.prototype.each;
HTMLCollection.prototype.each = Array.prototype.each;

Element.prototype.getOffset = function( relEl, withScroll ) {
  var el, offset = { l: 0, t: 0 };
  for( el = this; el && el !== relEl; el = el.offsetParent ) {
    offset.l += el.offsetLeft;
    offset.t += el.offsetTop;
    if( withScroll ) {
      offset.l -= el.scrollLeft;
      offset.t -= el.scrollTop;
    }
  }
  return offset;
};

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
  return this;
};
HTMLCollection.prototype.addClass = NodeList.prototype.addClass;

Element.prototype.hasClass = function( className ) {
  var el = this;

  if( el.classList ) {
    return el.classList.contains( className );
  } else {
    return ( ( el.className.split( ' ' ) ).indexOf( className ) >= 0 );
  }
};

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
HTMLCollection.prototype.removeClass = NodeList.prototype.removeClass;

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
    if( eventObj.capture === capture && ( !eventId || eventObj.id === eventId ) ) eventObj.fn();
  }
};

document.trigger = Element.prototype.trigger.bind( document );
window.trigger = Element.prototype.trigger.bind( window );

window.scrollLeft = function( scrollVal ) {
  if( scrollVal ) {
    document.body.scrollLeft = document.documentElement.scrollLeft = scrollVal;
  } else {

    return window.scrollX ||
      window.pageXOffset ||
      document.body.scrollLeft ||
      document.documentElement.scrollLeft ||
      0;
  }
};

window.scrollTop = function( scrollVal ) {
  if( scrollVal ) {
    document.body.scrollTop = document.documentElement.scrollTop = scrollVal;
  } else {

    return window.scrollY ||
      window.pageYOffset ||
      document.body.scrollTop ||
      document.documentElement.scrollTop ||
      0;
  }
};

