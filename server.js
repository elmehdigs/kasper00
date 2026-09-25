const http = require('http');

// التقاط الأخطاء غير المعالجة لمنع انهيار الخادم status 128
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception captured:', err.message);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

let proxy;
try {
  proxy = require('./api/proxy.js');
  console.log('Successfully loaded api/proxy.js');
} catch (err) {
  console.error('Failed to load proxy.js module:', err.message);
}

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (proxy) {
    try {
      proxy(req, res);
    } catch (err) {
      res.statusCode = 500;
      res.end('Proxy runtime error: ' + err.message);
    }
  } else {
    res.statusCode = 500;
    res.end('Proxy module failed to load. Check logs.');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
