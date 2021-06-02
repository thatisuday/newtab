var iframe = document.getElementById('iframe');
var loader = document.getElementById('loader');
var overlay = document.getElementById('overlay');
var page = document.getElementById('page');

chrome.storage.sync.get(['tabUrls', 'currentUrlIndex'], function(results) {
  var tabUrls = JSON.parse(results.tabUrls);
  var currentUrlIndex = results.currentUrlIndex;

  if (tabUrls[currentUrlIndex]) {
    iframe.src = tabUrls[currentUrlIndex];
    var nextTabIndex = currentUrlIndex < currentUrlIndex.length - 1 ? currentUrlIndex + 1 : 0;
    return chrome.storage.sync.set({ currentUrlIndex: nextTabIndex });
  }

  overlay.style.display = null;
});

iframe.onload = function() {
  loader.style.display = 'none';
};
