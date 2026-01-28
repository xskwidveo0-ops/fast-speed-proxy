const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.get('/', (req, res) => res.send('BB1 System Active 🚀'));

// تحويل البيانات لسيرفر تلجرام عبر بروكسي ويب مستقر
app.use('/proxy', createProxyMiddleware({
    target: 'http://149.154.167.50:443',
    changeOrigin: true,
    ws: true, // تفعيل الـ WebSocket وهو السر هنا
    logLevel: 'debug'
}));

app.listen(process.env.PORT || 443);
