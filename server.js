const http = require('http');
const proxy = require('./api/proxy.js');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  try {
    proxy(req, res);
  } catch (err) {
    res.statusCode = 500;
    res.end('Proxy Error: ' + err.message);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
