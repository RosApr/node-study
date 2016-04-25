requirejs.config({
	baseUrl: 'js',
	paths: {
		'jquery': '../bower_components/jQuery/jquery.min',
		'jsonp': 'jsonp'
	}
});
require(['jquery'], function(){
	
	if($('body').find('button').size() > 0){
		$('body').on('click', 'button', function(){
                ////baidu rss
                //case 'civilnews':
                //case 'internews':
                //case 'mil':
                //case 'housenews':
                //case 'autonews':
                //case 'sportnews':
                ////qq rss
                //case 'qqnews':

			var channel = 'sportnews';
			
			require(['jsonp!http://192.168.9.248:8888/?channel=' + channel], function(feed4) {
				console.log(feed4)
			});

		});	
	}
});