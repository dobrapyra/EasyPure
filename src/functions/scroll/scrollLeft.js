window.scrollLeft = function() {
  return window.scrollX ||
    window.pageXOffset ||
    document.body.scrollLeft ||
    document.documentElement.scrollLeft ||
    0;
};
