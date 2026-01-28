const net = require('net');

// عنوان خادم تلجرام الرسمي (DC4 - Europe/Middle East)
const TELEGRAM_HOST = "149.154.167.50"; 
const TELEGRAM_PORT = 443;

const server = net.createServer((socket) => {
    socket.once('data', (data) => {
        // حيلة لإرضاء Render: إذا جاء طلب تصفح عادي (HTTP) نرد عليه
        if (data.toString().startsWith('GET') || data.toString().startsWith('HEAD')) {
            socket.write('HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 9\r\n\r\nProxy BB1');
            socket.end();
            return;
        }

        // إذا لم يكن تصفح، فهو تلجرام -> نحوله للسيرفر الأصلي فوراً
        const proxy = net.createConnection(TELEGRAM_PORT, TELEGRAM_HOST, () => {
            proxy.write(data); // إرسال أول حزمة بيانات
            socket.pipe(proxy); // ربط الخط من عندك لتلجرام
            proxy.pipe(socket); // ربط الخط من تلجرام لعندك
        });

        proxy.on('error', (err) => {
            console.error("Telegram Connection Error:", err.message);
            socket.end();
        });
        
        socket.on('error', (err) => {
            console.error("Client Socket Error:", err.message);
            proxy.end();
        });
    });
});

server.listen(process.env.PORT || 443, () => {
    console.log("BB1 Bridge is connected to Telegram DC4");
});
