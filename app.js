
var koa = require('koa');
var app = new koa();
var mockServer = require("./server/mockServer");

app.use(require('koa-static')(__dirname + '/src'));

var mockServer = new mockServer(app);
mockServer.start();

app.listen(2000);
