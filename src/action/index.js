document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();
  var urlsFormValue = e.target.elements.url.value;
  if (!urlsFormValue) {
    return;
  }
  
  // split URLs by `,`
  var urls = urlsFormValue.split(',').map( url => {
    if (!/^https?:\/\//i.test(url.trim())) {
      return 'https://' + url.trim();
    }
    
    return url.trim();
  } );
  
  // store url
  var urlsJson = JSON.stringify(urls);
  
  chrome.storage.sync.set({ tabUrls: urlsJson, currentUrlIndex: 0 }, function() {
    window.close();
    chrome.tabs.query({ currentWindow: true, active: true }, function(tab) {
      chrome.tabs.update(tab.id, { url: urls[0] });
    });
  });
});
