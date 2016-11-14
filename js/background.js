'use strict';

/*global chrome:false */

chrome.browserAction.setBadgeBackgroundColor({
	color : 'black'
});

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
			//code : 'document.body.outerHTML;' //Gives you the whole HTML of the page
		}, function(response) {
			pageText = response[0];
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


// React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function(tab) {
	var viewTabUrl = chrome.extension.getURL('popup.html');
	var imageUrl = "../image/icon.png";

	var views = chrome.extension.getViews();
	for (var i = 0; i < views.length; i++) {
		var view = views[i];
		if (view.location.href == viewTabUrl && !view.imageAlreadySet) {
			view.setImageUrl(imageUrl);
			view.imageAlreadySet = true;
			break;
		}
	}
});
