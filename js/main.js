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
    var channel = 'sportnews';
    renderingBody({ newschannel: channel });
    $(window).on('scroll', { newschannel: channel }, renderingBody);

    function renderingBody(data){
        var _channel = data['newschannel'] || data.data.newschannel;
        var $body = $('body');
        var bodyScrollTop = $body.scrollTop();
        var screenHeight = $(window).height();
        var bodyHeight = $body.height();
        if(bodyHeight - screenHeight - bodyScrollTop < 20){
            require(['jsonp!http://192.168.9.248:8888/?channel=' + _channel], function(newslist) {
                console.log(newslist);
                var newslistend = getEndnewsList(newslist);
                require(['mustache-js', 'text!../templates/new.mst'], function (Mustache, template) {

                    var html = Mustache.render(template, newslistend);
                    renderingnews(html);

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