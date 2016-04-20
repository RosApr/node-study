requirejs.config({
	baseUrl: 'js',
	paths: {
		'jquery': '../bower_components/jQuery/jquery.min',
		'jsonp': 'jsonp'
		// 'request': '../bower_components/request/request'
	}
	// shim: {
 //        'request': {
 //            deps: [],
 //            exports: 'request'
 //        },
 //    },
});
require(['jquery'], function(){
	
	if($('body').find('button').size() > 0){
		$('body').on('click', 'button', function(){
			// require(['xmlData'], function(xmlData){
			// 	var data = xmlData();
			// 	console.log(data);
			// });
			// require(["http://192.168.9.248:8888/?channel=sportnews&callback=define"], function(data){
			// 		//The data object will be the API response for the
			//         //JSONP data call.
			//         console.log(data);
			// });
		// var channel = 'sportnews';
		// var $script = document.createElement('script');
		// $script.type = 'text/javascript';
		// // work
		// $script.src = 'http://192.168.9.248:8888/?channel='+channel;
		// //home
		// // $script.src = 'http://192.168.1.106:8888/?channel='+channel;
		// $script.onload = function(){
		// 	console.log('script is load over!');
		// 	return resData;
		// }
		// document.getElementsByTagName("HEAD")[0].appendChild($script);



			require(['jsonp!http://192.168.9.248:8888/?channel=sportnews'], function(feed4) {
				console.log(feed4)
				console.log('feed4 (Custom PHP code which purposely delayed response): ', feed4);
			});
		
		});	
	}
});