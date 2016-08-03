// Adds toggle for custom theme to Page Action.
//
// This file *only* controls that toggle,
// the logic behind enabling/disabling the theme is found in
// core/js/customThemeHandler.js

var customThemeToggle = (function() {
  var optionsLink = document.getElementById("options-link");
  var enableTheme = document.getElementById("enable-theme");

  chrome.storage.local.get("cmCustomThemeEnabled", function(response) {
    enableTheme.checked = !!response.cmCustomThemeEnabled;
    setEventListeners();
  });

  function setEventListeners() {

    // Need to manually add link functionality to the options page link.
    // Alternatively, could just dynamically add the URL-- I'm not sure it matters much though.
    optionsLink.addEventListener("click", function(e) {

      // needed to prevent the click from propagating to the checkbox
      e.preventDefault();

      //http://stackoverflow.com/a/16130739
      var optionsUrl = chrome.extension.getURL("core/html/ces_options.html");
      chrome.tabs.query({url: optionsUrl}, function(tabs) {
        if (tabs.length) {
          chrome.tabs.update(tabs[ 0 ].id, {active: true});
        } else {
          chrome.tabs.create({url: optionsUrl});
        }
      });
    });

    enableTheme.addEventListener("click", function() {
      chrome.storage.local.set({"cmCustomThemeEnabled": enableTheme.checked}, function() {
        sendToActiveTab({method: "enable-custom-theme", data: enableTheme.checked});
      });
    });
  }
})();
