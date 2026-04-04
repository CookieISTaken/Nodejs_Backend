const http = require("node:http");

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  res.writeHead(200, { "content-type": "application/json" });

  res.end(
    JSON.stringify({
      isSuccess: true,
      message: "Server is listning",
    }),
  );
});

server.listen(3000, () => {
  console.log("Server is listning at port 3000}");
});
