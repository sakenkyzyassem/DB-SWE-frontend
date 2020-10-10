const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080/hotel_management_war_exploded/',
            changeOrigin: true,
        })
    );
};