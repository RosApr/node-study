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
			document.getElementsByTagName("HEAD")[0].appendChild($script);
			// $.ajax({  
		 //        url:"http://192.168.1.106:8888/",  
		 //        dataType:'jsonp',  
		 //        data:{channel:channel},  
		 //        jsonp:'callback',  
		 //        success:function(result) {  
		 //            for(var i in result) {  
		 //                alert(i+":"+result[i]);//循环输出a:1,b:2,etc.  
		 //            }  
		 //        },  
		 //        timeout:3000  
		 //    });  
		});	
	}
});