/*
 * Entry File to the path
 */

const http  = require('http');
const url = require('url');

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

	// Send the response
	res.end("Hello World \n");

	// Log the request path
	console.log('Path is '+ trimmedPath + ' method '+ method)
	console.log('Query String params ', queryStringObject)
});

// Start server
server.listen(3000, function() {
	console.log("Server listening on port 3000 now")
})