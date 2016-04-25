var http = require("http");
var url = require("url");
// var querystring = require("querystring");
function start(route, handle){
    function onRequest(request, response){
      var _url = url.parse(request.url);
      var pathname = _url.pathname;
      var query = _url.query;
      var queryObj = {},
          queryArr = [],
          isChannel,
          channel,
          callback;
      if(query != '' && query.indexOf('&') >= 0){
        queryArr = query.split('&');
        var i = 0, _len = queryArr.length;
        for(;i<_len;i++){
          var _queryPrison = queryArr[i].split('=');
          queryObj[_queryPrison[0]] = _queryPrison[1];
        }
      }else if(query != '' && query.indexOf('=') >= 0){
          queryObj[query.split('=')[0]] = query.split('=')[1]
      }
      isChannel = !!queryObj['channel'];
      channel = queryObj['channel'] || '';
      callback = queryObj['callback'] || null;

      route(handle, pathname, response, channel, isChannel, callback);
    }
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;