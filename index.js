/*
 * Entry File to the path
 */

const http  = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder; 

const server = http.createServer(function(req, res) {

	// Get url and parse it
	const parsedUrl = url.parse(req.url, true)

	// Get the path
	const path = parsedUrl.pathname
	const trimmedPath = path.replace(/^\/+|\/+$/g, '');	// Esure foo/ equals to foo ==> remove last slashes

	// Get query String objects from url
	var queryStringObject = parsedUrl.query;

	// Get http method
	var method = req.method.toLowerCase();

	// Get Header as an object
	var headers = req.headers

	// Get payloads if any
	var decoder = new StringDecoder('utf-8')
	var buffer = ''

	// As payload is streamed, req object emits data event, we subscribe to that to receive the data
	req.on('data', function(data) {
		buffer += decoder.write(data)
	})

	// When streaming ends, req object emits end event, after this we send our response back
	// (ALWAYS CALLED) irregardles of payload or not
	req.on('end', function() {
		buffer += decoder.end()

		// Choose handler request goes to or else 404
		var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

		// Send the response
		res.end("Hello World \n");
	
		console.log('Request received with payload', buffer)
	})
});

// Start server
server.listen(3000, function() {
	console.log("Server listening on port 3000 now")
})

// handlers
var handlers = {}

handlers.sample = function(data, callback) {
	// callback http status and payload object
	callback(406, {'name': 'sample handler'})
}

//// Not found handler
handlers.notFound = function(data, callback) {
	callback(404);
}  

// request router 
var router = {
	'sample': handlers.sample
}