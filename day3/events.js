const EventEmitter = require("node:events");
const myEmitter = new EventEmitter();

myEmitter.on("hello", () => {
  console.log("hi");
});

myEmitter.on("name", () => {
  console.log("Shubham Singh");
});
myEmitter.on("where", () => {
  console.log("Delhi");
});
myEmitter.on("buy", (id) => {
  console.log("Product is added to cart", id);
});
myEmitter.emit("hello");
myEmitter.emit("name");
myEmitter.emit("where");
myEmitter.emit("buy", 100);
