const fs = require("fs");

fs.writeFileSync("./hello.txt", "Written by machine");
console.time("id1");
const data = fs.readFileSync("./hello.txt", "utf-8");
console.timeEnd("id1");
console.log(data);
