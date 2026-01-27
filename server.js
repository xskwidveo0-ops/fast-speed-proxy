const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = process.env.PORT || 443;

// هذه الصفحة هي التي ستجعل Render يعطيك علامة Live خضراء
app.get('/', (req, res) => {
  res.send('<h1>Proxy BB1 is Running Successfully!</h1><p>The proxy is working in the background.</p>');
});

app.listen(port, () => {
  console.log(`Web interface listening on port ${port}`);
  
  // تشغيل محرك البروكسي الألماني
  console.log("Starting Telegram Proxy engine...");
  const proxy = spawn('docker', ['run', '-e', `SECRET=${process.env.SECRET}`, '-p', '443:443', 'telegrammessenger/proxy:latest']);
  
  proxy.stdout.on('data', (data) => console.log(`Proxy LOG: ${data}`));
  proxy.stderr.on('data', (data) => console.error(`Proxy ERROR: ${data}`));
});
