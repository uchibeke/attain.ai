function getSentiment(input) {
	var request_url = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment';

	// open a new request object
	var request = new XMLHttpRequest();
	request.open('POST', request_url, true);

	// set headers
	request.setRequestHeader("Content-Type", "application/json");
	request.setRequestHeader("Ocp-Apim-Subscription-Key", "88148d2194ee4870a6fdfff9ba20807f");
	request.setRequestHeader("Accept", "application/json");

	// Slipt page content by 2 new lines
	var allDocs = input.split("\n\n");

	// set body.
	var requestBody = {};
	requestBody.documents = [];
	for (var i = 0; i < allDocs.length; i++) {
		requestBody.documents.push({
			"language" : "en",
			"id" : i + 1,
			"text" : allDocs[i]
		});
	}

	request.responseType = "json";

	requestBody = JSON.stringify(requestBody);
	request.onload = function() {
		if (request.status !== 200) {
			console.log("failed to get sentiment`");
			return null;
		} else {
			var sentimentJson = request.response;
			console.log("Response:\n");
			console.log(sentimentJson);
			return 0;
		}
	};

	// send the request
	request.send(requestBody);
}


function getKeyPhrases(input) {
	var request_url = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases';

	// open a new request object
	var request = new XMLHttpRequest();
	request.open('POST', request_url, true);

	// set headers
	request.setRequestHeader("Content-Type", "application/json");
	request.setRequestHeader("Ocp-Apim-Subscription-Key", "88148d2194ee4870a6fdfff9ba20807f");
	request.setRequestHeader("Accept", "application/json");

	// Slipt page content by 2 new lines
	var allDocs = input.split("\n\n");

	// set body.
	var requestBody = {};
	requestBody.documents = [];
	for (var i = 0; i < allDocs.length; i++) {
		requestBody.documents.push({
			"language" : "en",
			"id" : i + 1,
			"text" : allDocs[i]
		});
	}
	
	request.responseType = "json";

	requestBody = JSON.stringify(requestBody);
	request.onload = function() {
		if (request.status !== 200) {
			console.log("failed to get sentiment`");
			return null;
		} else {
			var sentimentJson = request.response;
			console.log("Response:\n");
			console.log(sentimentJson);
			return 0;
		}
	};

	// send the request
	request.send(requestBody);
}