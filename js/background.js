'use strict';

/*global chrome:false */

chrome.browserAction.setBadgeText({
	text : '(My Awesome Addon)'
});
chrome.browserAction.setBadgeBackgroundColor({
	color : 'black'
});

// chrome.browserAction.onClicked.addListener(function(aTab) {
// chrome.tabs.query({'url': 'http://chilloutandwatchsomecatgifs.com/'}, (tabs) => {
// if (tabs.length === 0) {
// chrome.tabs.create({
// 'url' : 'http://chilloutandwatchsomecatgifs.com/',
// 'active' : true
// });
// } else {
// chrome.tabs.query({'url': 'http://chilloutandwatchsomecatgifs.com/', 'active': true}, (active) => {
// if (active.length === 0) {
// chrome.tabs.update(tabs[0].id, {
// 'active' : true
// });
// }
// });
// }
// });
// });

var pageText,
    pageUrl,
    pageTitle = "",
    loadStatus = "";

chrome.browserAction.onClicked.addListener(function(tab) {
	console.log('Injecting content script(s)');

	var selectedTab = "";
	chrome.tabs.query({
		active : true,
		lastFocusedWindow : true
	}, function(tabs) {
		var selectedTab = tabs[0];
		console.log(selectedTab);

		pageUrl = selectedTab.url;
		pageTitle = selectedTab.title;
		loadStatus = selectedTab.status;

		chrome.tabs.executeScript(selectedTab.id, {
			code : 'document.body.innerText;' //Gives you all the text on the page
			// code : 'document.body.outerHTML;'  //Gives you the whole HTML of the page
		}, function(response) {
			pageText = response[0];
			//console.log(pageText);
			console.log(pageUrl);
			console.log(pageTitle);
			getKeyPhrases(pageText);
		});

	});
});


function getText() {
	return document.body.innerText;
}

function receiveText(resultsArray) {
	console.log(resultsArray[0]);
}

