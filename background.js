'use strict';

/*global chrome:false */

chrome.browserAction.setBadgeText({
	text : '(My Awesome Addon)'
});
chrome.browserAction.setBadgeBackgroundColor({
	color : 'black'
});

chrome.browserAction.onClicked.addListener(function(aTab) {
	chrome.tabs.query({'url': 'http://chilloutandwatchsomecatgifs.com/'}, (tabs) => {
		if (tabs.length === 0) {
			// There is no catgif tab!
			chrome.tabs.create({
				'url' : 'http://chilloutandwatchsomecatgifs.com/',
				'active' : true
			});
		} else {
			// Do something here…
			chrome.tabs.query({'url': 'http://chilloutandwatchsomecatgifs.com/', 'active': true}, (active) => {
				if (active.length === 0) {
					chrome.tabs.update(tabs[0].id, {
						'active' : true
					});
				}
			});
		}
	});
});
