/*
* ---
* HIDE CUSTOM PROFILE CSS MODULE
* ---
*
* Disables custom CSS on a profile (imagine that!)
*
* Interacts with the Page Action popup as well as the profileCSSHandler
* content script in order to keep a running list of profiles that have their
* CSS disabled (stored in Chrome's storage).
*
*/

var ces__hideProfileCSS = (function(){
  "use strict";
  
  var headEl = document.getElementsByTagName('head')[0];
  var styleEl = headEl.getElementsByTagName('style')[0];

  // These events are fired by the profileCSSHandler content script
  window.addEventListener("disable-css", function() {
    styleEl.remove();
  });
  window.addEventListener("enable-css", function() {
    headEl.appendChild(styleEl);
  });

  // Asks the content script for the status of the current profile's css
  var requestCSSEvent = new CustomEvent("request-css-event");
  window.dispatchEvent(requestCSSEvent);
})();