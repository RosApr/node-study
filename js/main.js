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
			},'json');

		});
	}
});