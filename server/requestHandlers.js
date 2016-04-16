var parseString = require('xml2js').parseString;
var gbk = require('./lib/index');
function getChannel(response, channel){
	console.log("Request handler 'getChannel' was called.");
	var rssUrl = getChannelUrl(channel);
	console.log(rssUrl);

	gbk.fetch(rssUrl).to('string', function(err, string){
	  if (err) return console.log(err);

	  parseString(string, { explicitArray : false, ignoreAttrs : true }, function (err, result) {

		    console.log(JSON.stringify(result));

		    response.setHeader('Access-Control-Allow-Origin', '*');
  	  		response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
  	  		response.write(JSON.stringify(result));
  	  		response.end();
	  });

	});
	
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
			return 'error';

	}
}

exports.getChannel = getChannel;