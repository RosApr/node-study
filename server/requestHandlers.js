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
	    response.writeHead(404,headers);
	    response.write("404 Not found");
	    response.end();

	}else{

		gbk.fetch(rssUrl).to('string', function(err, string){
		  if (err) return console.log(err);

		  parseString(string, { explicitArray : false, ignoreAttrs : true }, function (err, result) {
                var newsList = result['rss']['channel']['item'];
			    var _data = JSON.stringify(newsList);
	  	  		response.writeHead(200,headers);
	  	  		response.write(callback + "(" + _data + ")");
	  	  		response.end();
		  });

		});

	}
}
//function makeData(newsitems){
//    //var newsitems = xmldata
//    $.each()
//    return ;
//}
function getChannelUrl(channel){
	switch(channel){
		//baidu rss
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
		//qq rss
		case 'qqnews':
			return 'http://news.qq.com/newsgn/rss_newsgn.xml';
		default:
			return;

	}
}

exports.getChannel = getChannel;