var http = require("http");
var url = require("url");
// var querystring = require("querystring");
function start(route, handle){
    function onRequest(request, response){
      var _url = url.parse(request.url);
      var pathname = _url.pathname;
      var query = _url.query;
      var isChannel = query.split('=')[0];
      var channel = query.split('=')[1];

      route(handle, pathname, response, channel, isChannel);
    }
  // function onRequest(request, response){
  //   var postData = "";
  //   var pathname = url.parse(request.url).pathname;
  //   console.log("Request for "+ pathname +" received.");
  //   if(request.method == "GET"){
  //     console.log('get')
  //         var headers = {};
  //         // IE8 does not allow domains to be specified, just the *
  //         // headers["Access-Control-Allow-Origin"] = req.headers.origin;
  //         headers["Access-Control-Allow-Origin"] = "*";
  //         headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
  //         headers["Access-Control-Allow-Credentials"] = false;
  //         headers["Access-Control-Max-Age"] = '86400'; // 24 hours
  //         headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
  //         // response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
  //         // response.writeHead(200,headers);
  //     response.writeHead(404,{"Content-Type":"text/plain"});
  //     response.write("404 Not found");
  //     response.end();

  //   }else if(request.method == 'POST'){
  //     console.log('post')
  //     request.setEncoding("UTF8");
  //     request.addListener("data",function(postDataChunk){
  //       postData += postDataChunk;
  //       console.log("Received POST data chunk '"+
  //       postDataChunk +"'.");
  //     });

  //     request.addListener("end",function(){
  //       var channel = postData.split('=')[1];
  //       console.log(channel);
  //       route(handle, pathname, response, channel);
  //     });

  //   }

  // }
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;