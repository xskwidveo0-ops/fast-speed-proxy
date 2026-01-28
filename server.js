const express = require('express');
const http = require('http');
const app = express();
const port = process.env.PORT || 443;

// صفحة تأكيد العمل لـ Render
app.get('/', (req, res) => {
  res.send('<h1>Proxy BB1: Status Online</h1><p>Server is running in Frankfurt.</p>');
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`BB1 Server is live on port ${port}`);
  console.log("Waiting for Telegram connections...");
});

// معالجة الأخطاء لضمان عدم توقف السيرفر
process.on('uncaughtException', (err) => {
  console.error('System Error:', err);
});
