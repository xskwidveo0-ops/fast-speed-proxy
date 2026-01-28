const express = require('express');
const MTProtoProxy = require('mtprotoproxy');
const app = express();
const port = process.env.PORT || 443;

// إرضاء Render بصفحة ويب حقيقية
app.get('/', (req, res) => {
  res.send('<h1>Proxy BB1 is Live in Germany!</h1>');
});

app.listen(port, () => {
  console.log(`Web interface listening on port ${port}`);

  // تشغيل البروكسي مباشرة بدون Docker
  const proxy = new MTProtoProxy({
    port: 444, // منفذ داخلي للبروكسي
    secret: process.env.SECRET || "00000000000000000000000000000001",
    users: [{ name: "user1", secret: "00000000000000000000000000000001" }]
  });
  
  proxy.run().then(() => {
    console.log("Telegram Proxy engine is running successfully!");
  }).catch(err => {
    console.error("Proxy Error:", err);
  });
});
