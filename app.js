const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const nggUrl = 'https://selfstudybrain.com';

const proxy = createProxyMiddleware({
  target: nggUrl,
  changeOrigin: true,
  secure: true,
  logLevel: 'debug',
  router: function (req) {
    if (req.headers.host === 'https://selfstudybrain.com/') {
      req.headers['X-Forwarded-For'] = '';
      req.headers['X-Real-IP'] = '';
      req.headers['Via'] = '';
    }
    return nggUrl;
  },
});

app.use('/', proxy);

const port = process.env.PORT || 24433;
app.listen(port, () => {
  console.log(`roblox proxy is online http://localhost:24433`);
});
