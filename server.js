const express = require('express');
const MTProtoProxy = require('mtproto-proxy-server');
const app = express();
const port = process.env.PORT || 443;

// إرضاء Render بصفحة ويب
app.get('/', (req, res) => {
  res.send('<h1>Proxy BB1 is Online</h1>');
});

app.listen(port, () => {
  console.log(`Web server running on port ${port}`);

  const config = {
    port: 8080, // منفذ داخلي
    secret: process.env.SECRET || "00000000000000000000000000000001",
    site_tag: "ads_tag"
  };

  try {
    const proxy = new MTProtoProxy(config);
    proxy.run();
    console.log("MTProto Proxy engine started successfully!");
  } catch (err) {
    console.error("Proxy failure:", err);
  }
});
