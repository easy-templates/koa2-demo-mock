var mockListConfigs = require('./mockList.config');
module.exports = {
    isProxyFirst: true, // isProxyFirst : 是否后端代理优先     //true -> 优先使用代理服务器数据，false -> 使用本地模拟数据
    // /user使用3201端口，其他使用3501端口
    proxyList: [{
        host: 'http://127.0.0.1:3501',
        options: {
          filter: function(ctx){
            var url = ctx.url;
            return url.indexOf('/user') !== 0;
          }
        }
    },{
        host: 'http://127.0.0.1:3201',
        options: {
          filter: function(ctx){
            var url = ctx.url;
            return url.indexOf('/user') === 0;
          }
        }
    }], //代理服务器列表
    mockList: mockListConfigs, //模拟请求列表
}
