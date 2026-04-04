const http = require("node:http");

const server = http.createServer((req, res) => {
  console.log("Hello");
  res.writeHead(200, { "content-type": "text/html" });
  // res.writeHead(301, { location: "https://www.google.com" });
  res.end("<h1 style = 'color : green '>Hello from nodejs</h1>");
});

server.listen(3000, () => {
  console.log("Server is listning at port");
});
