var server = require('./server');
var router = require('./route');
var requestHandlers = require('./requestHandlers');

var handle = {};
handle['/'] = requestHandlers.getChannel;

server.start(router.route, handle);