const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const target = 'https://kasper-00.duckdns.org:443';

  const proxy = createProxyMiddleware({
    target,
    changeOrigin: true,
    ws: true,
    secure: false,
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('Host', 'kasper-00.duckdns.org');
    }
  });

  return proxy(req, res);
};
