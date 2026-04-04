const fsPromises = require("fs/promises");

console.log("START");
const write = async () => {};
const main = async () => {
  const data = await fsPromises.readFile("./hello.txt", "utf-8");
  console.log(data);
};
main();

console.log("END");
