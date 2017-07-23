window.scrollTop = function() {
  return window.scrollY ||
    window.pageYOffset ||
    document.body.scrollTop ||
    document.documentElement.scrollTop ||
    0;
};
