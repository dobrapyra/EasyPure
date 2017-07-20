/**
 * EasyPure
 * author: dobrapyra
 * version: 2017-07-20
 */
( function() {
	"use strict";

	// each

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

	// classes

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
	};

	Element.prototype.hasClass = function( className ) {
		var el = this;
		if( el.classList ) {
			return el.classList.contains( className );
		} else {
			return ( ( el.className.split( ' ' ) ).indexOf( className ) >= 0 );
		}
	};

	// events

	Element.prototype.addEvent = function( name, fn, capture ) {
		if( typeof fn !== 'function' ) return;
		var el = this, eventObj, nameArr, eventName, eventId;
		el._event = el._event || {};
		nameArr = name.split( '.' ); eventName = nameArr[ 0 ]; eventId = nameArr[ 1 ];
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
		nameArr = name.split( '.' ); eventName = nameArr[ 0 ]; eventId = nameArr[ 1 ];
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
		nameArr = name.split( '.' ); eventName = nameArr[ 0 ]; eventId = nameArr[ 1 ];
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

	// others

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

	window.scrollTop = function() {
		return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	};

	window.scrollLeft = function() {
		return window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
	};

} )();