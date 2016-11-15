var windowHeight = window.screen.availHeight;
var windowWidth = window.screen.availWidth;

document.getElementById('popBody').style.height = (windowHeight + 100) + "px";
document.getElementById('popBody').style.width = (windowWidth * 0.6) + "px";

var jsonOutput = "";

document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById('attainBtn');
	link.addEventListener('click', function() {
		anaylyzeJobPosting();
	});
});

function anaylyzeJobPosting() {
	console.log("Working!");
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
			jsonOutput = analyzeText(pageText, "keyPhrases");
		});

	});
	;
}
