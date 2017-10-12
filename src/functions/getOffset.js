/* getOffset */
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
