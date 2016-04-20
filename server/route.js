function route(handle, pathname, response, channel, isChannel, callback){
  console.log("About to route a request for "+ pathname);
  if(typeof handle[pathname] === 'function' && isChannel === true && channel != '' && callback != ''){
    handle[pathname](response, channel, callback);
  }else{
    console.log("No request handler found for "+ pathname);
    response.writeHead(404,{"Content-Type":"text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;