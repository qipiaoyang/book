(function() {
  var newEl = document.createElement('script'),
      firstScriptTag = document.getElementsByTagName('script')[0];

  if (firstScriptTag) {
    newEl.async = 1;
    firstScriptTag.parentNode.insertBefore(newEl, firstScriptTag);
  }

})();
