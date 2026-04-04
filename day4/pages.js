const http = require("http");
const fsPromise = require("fs/promises");
const { getProductCards } = require("./utils/product_helper");

const server = http.createServer(async (req, res) => {
  console.log("--->", req.method, req.url, new Date());
  try {
    if (req.url == "/") {
      const data = await fsPromise.readFile("./pages/homePage.html", "utf-8");
      const cardsStr = await getProductCards();
      const newdata = data.replace("__MAIN__", cardsStr);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(newdata);
    } else if (req.url == "/about") {
      const data = await fsPromise.readFile("./pages/aboutPage.html", "utf-8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    } else {
      const data = await fsPromise.readFile("./pages/notFound.html", "utf-8");
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end(data);
    }
  } catch (err) {
    console.log(err);
    res.end("<h1>Page req not found!!</h1>");
  }
});

server.listen(3000, () => {
  console.log("Server is listning");
});
