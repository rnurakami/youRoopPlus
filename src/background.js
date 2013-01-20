var PLAIN_THEMA = "resources/css/plain/plainYouRoom.css", 
    PLAIN_ICON = "resources/images/icon/apply.gif",
    DEFAULT_ICON = "resources/images/icon/icon.gif";

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var thema = localStorage['thema'] ? localStorage['thema'] : 'default';

	if (tab.url.indexOf('youroom.in') > 6) {
		if (thema === 'default') {
			chrome.pageAction.setIcon({"tabId": tabId, "path": DEFAULT_ICON});
		} else {
			chrome.pageAction.setIcon({"tabId": tabId, "path": PLAIN_ICON});
		}
		chrome.pageAction.show(tabId);

		if (thema === 'plain') {
			chrome.tabs.insertCSS(null, {file: PLAIN_THEMA});
		}
	}
});

chrome.pageAction.onClicked.addListener(function(tab) {
	var thema = localStorage['thema'] ? localStorage['thema'] : 'default';

	if (thema === 'default') {
		localStorage['thema'] = 'plain';
		chrome.pageAction.setIcon({"tabId": tab.id, "path": PLAIN_ICON});
		chrome.tabs.insertCSS(null, {file: PLAIN_THEMA});
	} else {
		localStorage['thema'] = 'default';
		chrome.pageAction.setIcon({"tabId": tab.id, "path": DEFAULT_ICON})
	}
});