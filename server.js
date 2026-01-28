const express = require('express');
const net = require('net');
const app = express();
const port = process.env.PORT || 443;

// صفحة الويب التي تضمن بقاء السيرفر Live
app.get('/', (req, res) => {
  res.send('<h1>BB1 Proxy: System Active</h1><p>Location: Frankfurt, Germany</p>');
});

const server = app.listen(port, () => {
  console.log(`Web/Proxy bridge active on port ${port}`);
});

// محرك تحويل البيانات (Proxy Bridge)
server.on('upgrade', (req, socket, head) => {
  const target = net.connect(443, '127.0.0.1', () => {
    socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
                 'Upgrade: WebSocket\r\n' +
                 'Connection: Upgrade\r\n\r\n');
    target.pipe(socket);
    socket.pipe(target);
  });
  target.on('error', () => socket.end());
});
