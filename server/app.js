const  http = require('http');
const  koa = require('koa');
const  route = require('koa-route');
const  serve = require('koa-static');
const jsonp = require('koa-safe-jsonp');

const opt = require('./opt.js');
const api = require('./api.js');

const  app = new koa();
jsonp(app);

app.use(serve('./dist'));
app.use(route.get('/opt.do', opt));
app.use(route.get('/api/:api(.+)', api));

http.createServer(app.callback()).listen(3080);
console.log('needle server listening on port 3080');
http.createServer(app.callback()).listen(3081);
console.log('opt server listening on port 3081');
http.createServer(app.callback()).listen(3082);
console.log('template server listening on port 3082');
http.createServer(app.callback()).listen(3083);
console.log('api server listening on port 3083');
