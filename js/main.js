requirejs.config({
	baseUrl: 'js',
	paths: {
		'jquery': '../bower_components/jQuery/jquery.min'
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
			var channel = 'sportnews';
			var $script = document.createElement('script');
			$script.type = 'text/javascript';
			// work
			// $script.src = 'http://192.168.9.248:8888/?channel='+channel;
			//home
			$script.src = 'http://192.168.1.106:8888/?channel='+channel;
			$script.onload = function(){
				console.log(resData);
			}
			document.getElementsByTagName("HEAD")[0].appendChild($script);
		});	
	}
});