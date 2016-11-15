// Analyze a text input from a webpage to get key phrase or dominant sentiment
// input:
// text to parse
// type of analysis to do: keyPhrases | sentiment
function analyzeText(input, anaType) {
	var request_url = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/' + anaType;
	var out = "";

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
		if (allDocs[i].split(" ").length > 2) {
			requestBody.documents.push({
				"language" : "en",
				"id" : i + 1,
				"text" : allDocs[i].replace(/(?:\r\n|\r|\n)/g, "")
			});
		}
	}
	console.log(requestBody);

	request.responseType = "json";

	requestBody = JSON.stringify(requestBody);
	request.onload = function() {
		if (request.status !== 200) {
			console.log("failed to get sentiment`");
			console.log(request.response);
			return null;
		} else {
			out = request.response;
			console.log("Response:\n");
			console.log(out);
			out = out.documents;
			var postingKeywords = [];
			for (var i = 0; i < out.length; i++) {
				var item = out[i];
				postingKeywords = postingKeywords.concat(item.keyPhrases);
			}
			postingKeywords = uniqArray(postingKeywords);

			populateDiv(postingKeywords, "fromPosting");

			var wordsFromResume = uniqArray(resumes.documents[0].keyPhrases);

			populateDiv(wordsFromResume, "fromResume");

			assignWeight(postingKeywords);

			return 0;
		}
	};

	// send the request
	request.send(requestBody);
}

function uniqArray(arr) {
	arr = arr.filter(function(e, i, arr) {
		return arr.lastIndexOf(e) === i;
	});
	return arr;
}

var firstClassTerms = [];
var secondClassTerms = [];
var thirdClassTerms = [];

var resumes = [];

function assignWeight(jobDesc) {
	resumes = JSON.parse(JSON.stringify(resumes).toLowerCase().trim());
	jobDesc = JSON.parse(JSON.stringify(jobDesc).toLowerCase().trim());

	for (var i = 0; i < resumes.documents.length; i++) {
		var doc = resumes.documents[i];
		for (var j = 0; j < doc.keyphrases.length; j++) {
			var phrase = doc.keyphrases[j];
			if (jobDesc.indexOf(phrase.trim()) != -1) {
				firstClassTerms.push(phrase);
			} else if (JSON.stringify(jobDesc).includes(phrase.trim())) {
				secondClassTerms.push(phrase);
			} else {
				thirdClassTerms.push(phrase);
			}

		}
	}
	console.log(firstClassTerms);
	console.log(secondClassTerms);
	console.log(thirdClassTerms);

}

// Print keyPhrases from job posting and resume
function populateDiv(array, parentID) {

	var d = document.createElement('div');
	array.sort();

	for (var i = 0; i < array.length; i++) {

		var item = document.createElement('p');
		item.appendChild(document.createTextNode(array[i].trim()));
		d.appendChild(item);
	}

	document.getElementById(parentID).appendChild(d);
}

// Local sample resume
function loadJSON(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'js/sampleResume.json', true);
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
}

loadJSON(function(response) {
	resumes = JSON.parse(response);
	console.log(resumes);
});
