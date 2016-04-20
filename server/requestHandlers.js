var parseString = require('xml2js').parseString;
var gbk = require('./lib/index');
function getChannel(response, channel, callback){
	console.log("Request handler 'getChannel' was called.");
    var headers = {};
 	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	var rssUrl = getChannelUrl(channel);
	console.log('channel:'+channel);
	if(!rssUrl){
		console.log(rssUrl);
		// console.log("No request handler found for "+ pathname);
	    response.writeHead(404,headers);
	    response.write("404 Not found");
	    response.end();

	}else{

		gbk.fetch(rssUrl).to('string', function(err, string){
		  if (err) return console.log(err);

		  parseString(string, { explicitArray : false, ignoreAttrs : true }, function (err, result) {

			    // response.setHeader('Access-Control-Allow-Origin', '*');
			    // var _data = "getData('" + JSON.stringify(result) + "');";
			     // var _data = callback + "('" + JSON.stringify(result) + "');";
			    // var _data = 'getData' + "('" + JSON.stringify(result) + "');";
			    // var _data = "getData('" + JSON.stringify(result) + "');";
			    console.log(typeof (result + ' '));
			    var _data = JSON.stringify(result['rss']);
			    var string = result['rss'] + '';
			    console.log(string);
			    // console.log(typeof result);
			    // console.log(_data);
			      // IE8 does not allow domains to be specified, just the *
			      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
			      // headers["Access-Control-Allow-Origin"] = "*";
	  	  		// response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	  	  		response.writeHead(200,headers);
	  	  		// response.write(_data);
	  	  		// response.write(callback + "({'name':'mark'})");
	  	  		response.write(callback + "(" + _data + ")");

	  	  		console.log('over');
	  	  		response.end();
		  });

		});

	}
}
function getChannelUrl(channel){
	switch(channel){
		case 'civilnews':
			return 'http://news.baidu.com/n?cmd=1&class=civilnews&tn=rss';
		break;
		case 'internews':
			return 'http://news.baidu.com/n?cmd=1&class=internews&tn=rss';
		break;
		case 'mil':
			return 'http://news.baidu.com/n?cmd=1&class=mil&tn=rss';
		break;
		case 'housenews':
			return 'http://news.baidu.com/n?cmd=1&class=housenews&tn=rss';
		break;
		case 'autonews':
			return 'http://news.baidu.com/n?cmd=1&class=autonews&tn=rss';
		break;
		case 'sportnews':
			return 'http://news.baidu.com/n?cmd=1&class=sportnews&tn=rss';
		break;
		default:
			return;

	}
}

exports.getChannel = getChannel;