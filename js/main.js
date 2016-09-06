requirejs.config({
	baseUrl: 'js',
	paths: {
		'jquery': '../bower_components/jQuery/jquery.min',
		'jsonp': 'jsonp',
        'text': '../bower_components/text/text',
        'mustache-js': '../bower_components/mustache.js/mustache.min',
        'pace': '../bower_components/PACE/pace.min'
	}
});
require(['jquery','pace', "./js/conf.js"], function($, pace, serverUrl){
    //pace.start({
    //    document: true,
    //    ajax: true
    //});
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
    var channel = channelArray[Math.floor(channelArray.length*Math.random())];
    var tips = {loading:'正在加载...', loaded: '加载已完成'};
    renderingBody({ newschannel: channelArray, url: serverUrl.serverUrl });

    (function(){
        var body = document.body;
        var html = document.documentElement;
        //console.log(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.offsetHeight,html.scrollHeight));
    })();
    $(window).on('scroll', { newschannel: channelArray, url: serverUrl.serverUrl }, renderingBody);
    function renderingBody(data){
        //pace.restart();
        var $body = $('body');

        if($body.hasClass('loading')){
            return true;
        }
        var channelArray = data['newschannel'] || data.data.newschannel,
            _channel = channelArray[Math.floor(channelArray.length*Math.random())] || channelArray[Math.floor(channelArray.length*Math.random())],
            url = data['url'] || data.data.url,
            bodyScrollTop = $body.scrollTop(),
            screenHeight = $(window).height(),
            bodyHeight = $body.height();
        if(bodyHeight - screenHeight - bodyScrollTop < 100){
            $body.addClass('loading');
            $("#tip").text(tips['loading']);
            pace.start();
            //$body.find('ul').size() > 0 && (
            //    $body.find('ul').append($("<div class='loadingTip' id='loadingTip'>").text('加载中...'))
            //);
            require(['jsonp!' + url + '?channel=' + _channel], function(newslist) {
                var newslistend = getEndnewsList(newslist);
                require(['mustache-js', 'text!../templates/new.mst'], function (Mustache, template) {
                    // execImg(newslistend["items"], function(){
                        
                    // });

                    var html = Mustache.render(template, newslistend);
                    renderingnews(html);
                    $('body').removeClass('loading');
                    if($body.height() < $(window).height()){
                        console.log('needs load again!');
                        renderingBody({ newschannel: channelArray, url: serverUrl.serverUrl });
                    }
                    function renderingnews(liStr){
                        var $ul = $('body').find('.content') || '';
                        if($ul.size() > 0){
                            //$ul.remove('#loadingTip').append($(liStr));
                            $ul.append($(liStr));
                        }else{
                            $("<ul class='content'>").html(liStr).insertBefore($('#tip'));
                        }
                        $("#tip").text(tips['loaded']);
                        setTimeout(function(){
                            Array.prototype.forEach.call($(".content").find("img"), function(ele){
                                console.log($(ele).prop("naturalWidth"));
                                if($(ele).prop("naturalWidth") == 1){
                                    console.log("error img!");
                                    console.log($(ele).next().text());
                                    $(ele).attr("src", "./images/rssBg.jpg");
                                }
                            });
                        }, 500);
                        pace.stop();
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
                 function execImg (imgs,callback) {
                    var imgsLen = imgs.length;
                    var loaded = 0;
                    for (var i = 0; i < imgsLen; i++) {
                        var imgDOM = document.createElement('img');
                        imgDOM.src = imgs[i]["thub"];
                        (function(i){
                            imgDOM.onload = function () {
                                loaded++;
                                console.log("img loaded");
                                console.log(imgDOM.naturalWidth);
                                if(imgDOM.naturalWidth == "0"){
                                    console.log("img error!");
                                    imgs[i]["thub"] = "./images/rssBg.jpg";
                                }
                                if (loaded == imgsLen) {
                                    setTimeout(function () {
                                        callback()
                                    },500)
                                }
                            }
                        })(i);

                    }
                }    
            });

        }


    }

});

/*
jQuery get body or document height
var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight );

*/