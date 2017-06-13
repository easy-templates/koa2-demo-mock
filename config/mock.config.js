var mockListConfigs = require('./mockList.config');
module.exports = {
    isProxyFirst: false, // isProxyFirst : 是否后端代理优先     //true -> 优先使用代理服务器数据，false -> 使用本地模拟数据
    proxyList: [{
        host: 'http://127.0.0.1:3201',
    }], //代理服务器列表
    mockList: mockListConfigs, //模拟请求列表
}
