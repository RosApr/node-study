// var fetch = require('node-fetch');
// var fs = require('fs'),
//     xml2js = require('xml2js');

// var parser = new xml2js.Parser();

var request = require('superagent');

function getChannel(response, channel){
	console.log("Request handler 'getChannel' was called.");
	var rssUrl = getChannelUrl(channel);
	console.log(rssUrl);

	request
	.get(rssUrl)
	.end(function (err, res) {
		console.log(res);
		response.setHeader('Access-Control-Allow-Origin', '*');
  	  	response.writeHead(200,{"Content-Type":"text/html"});
  	  	response.write(JSON.stringify(res));
  	  	response.end();
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