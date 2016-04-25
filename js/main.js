requirejs.config({
	baseUrl: 'js',
	paths: {
		'jquery': '../bower_components/jQuery/jquery.min',
		'jsonp': 'jsonp',
        'text': '../bower_components/text/text',
        'mustache-js': '../bower_components/mustache.js/mustache.min'
	}
});
require(['jquery'], function(){
	
    ////baidu rss
    //case 'civilnews':
    //case 'internews':
    //case 'mil':
    //case 'housenews':
    //case 'autonews':
    //case 'sportnews':
    ////qq rss
    //case 'qqnews':
    //$(window).trigger('scroll');
    var channelArray = ['civilnews','internews','housenews','mil','autonews','sportnews'];
    //var channel = 'sportnews',
    var channel = channelArray[Math.floor(channelArray.length*Math.random())],
        //serverUrl = 'http://192.168.9.248:8888/';
        serverUrl = 'http://192.168.1.106:8888/',
        isloading = false;
    renderingBody({ newschannel: channelArray, url: serverUrl });
    $(window).on('scroll', { newschannel: channelArray, url: serverUrl }, renderingBody);

    function renderingBody(data){
        if(isloading){
            return true;
        }
        isloading = true;
        var channelArray = data['newschannel'] || data.data.newschannel,
            _channel = channelArray[Math.floor(channelArray.length*Math.random())] || channelArray[Math.floor(channelArray.length*Math.random())],
            url = data['url'] || data.data.url,
            $body = $('body'),
            bodyScrollTop = $body.scrollTop(),
            screenHeight = $(window).height(),
            bodyHeight = $body.height();
        if(bodyHeight - screenHeight - bodyScrollTop < 20){
            require(['jsonp!' + url + '?channel=' + _channel], function(newslist) {
                console.log(newslist);
                var newslistend = getEndnewsList(newslist);
                require(['mustache-js', 'text!../templates/new.mst'], function (Mustache, template) {

                    var html = Mustache.render(template, newslistend);
                    renderingnews(html);
                    isloading = false;
                    function renderingnews(liStr){
                        var $ul = $('body').find('.content') || '';
                        if($ul.size() > 0){
                            $ul.append($(liStr));
                        }else{
                            $("<ul class='content'>").html(liStr).appendTo('body');
                        }
                    }
                });
                function getEndnewsList(newslist){
                    var _newslistend = [];
                    $.each(newslist, function(index, that){
                        var $_dom = $(that['description']);
                        $.each($_dom, function(domindex, domthat){
                            if($(domthat).is('a') && $(domthat).find('img').size() > 0){
                                var imgSrc = $(domthat).find('img').attr('src');
                                var title = that['title'];
                                var link = that['link'];
                                var news = { link: link, title: title, thub: imgSrc };
                                _newslistend.push(news);
                                return false;
                            }

                        });
                    });
                    return { items: _newslistend };
                }

            });

        }


    }

});