// var http = require('http');
// var url = require('url');

// function start(route, handle){

// 	function onRequest(request, response){
		
// 		var pathname = url.parse(request.url).pathname;
// 		console.log(pathname + 'received!');

// 		response.writeHead(200, {'Content-Type': 'text/plain'});
// 		var content = route(handle, pathname);
// 		response.write(content);
// 		response.end();

// 	}

// 	http.createServer(onRequest).listen(8888);
// 	console.log('server is start!');
// }

// exports.start = start;

// var http = require("http");
// var url = require("url");

// function start(route, handle){
//   function onRequest(request, response){
//     var pathname = url.parse(request.url).pathname;
//     console.log("Request for "+ pathname +" received.");

//     route(handle, pathname, response);
//   }

//   http.createServer(onRequest).listen(8888);
//   console.log("Server has started.");
// }

// exports.start = start;

var http = require("http");
var url = require("url");

function start(route, handle){
  function onRequest(request, response){
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for "+ pathname +" received.");
    request.setEncoding("UTF8");

    request.addListener("data",function(postDataChunk){
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
      postDataChunk +"'.");
    });

    request.addListener("end",function(){
      var channel = postData.split('=')[1];
      console.log(channel);
      route(handle, pathname, response, channel);
    });

  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;