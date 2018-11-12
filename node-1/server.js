const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    console.log("get request");
    res.statusCode = 200;
    setTimeout(() => res.end(), 100);
});

server.listen(port, hostname, () => {
   console.log("Server started");
});