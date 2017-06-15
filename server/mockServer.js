'use strict';

var proxy = require('koa-better-http-proxy');
var router = require('koa-router')();
var cfg = require('../config/mock.config')


module.exports = function(app) {
    var isProxyFirst = cfg.isProxyFirst;
    var mockList = cfg.mockList;
    var proxyList = cfg.proxyList;

    return {
        start: function() {
            //模拟数据方法
            function mock() {
                mockList.forEach(function(config) {
                    var url = config['url'];
                    router[config['type']](url, async function(ctx, next) {
                        var mockFile = require('../mockData/' + config['json']);
                        ctx.body = JSON.stringify(mockFile);
                        console.log('Mock URL: ', '\x1b[32m', config['url'] + ' --> ' + config['json'], '\x1b[0m', ' started.');
                    });
                });
            }

            //判断是否开启代理,未开启则使用模拟数据
            if (!isProxyFirst) {
                mock();
            } else if (proxyList) {
                proxyList.forEach(function(config) {
                    app.use(proxy(config.host, config.options));
                    console.log('Proxy :', '\x1b[33m', ' -> ', config.host, '\x1b[0m', ' Started.');
                });
            }

            app.use(router.routes(), router.allowedMethods());
            console.log('FE test server  ', '\x1b[33m', 'http://localhost:2000 ', '\x1b[0m', ' Started.');
        }
    }
};
