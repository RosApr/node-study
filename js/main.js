requirejs.config({
	baseUrl: 'js',
	paths: {
		'jquery': '../bower_components/jQuery/jquery.min'
	}
});
require(['jquery'], function(){
	
	if($('body').find('button').size() > 0){
		$('body').on('click', 'button', function(){

			$.post('http://192.168.9.248:8888/',{'channel': 'sportnews'}, function(data){
				console.log(data['channel']);
				// document.write(data['rss']['channel']['title']);
				// document.write('111<br>');
				// document.write(decodeURI(data['rss']['channel']['title']));
				$('body').append(data['rss']['channel'])
			},'json');

		});
	}
});