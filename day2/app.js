// const os = require("os");
// console.log(os.cpus().length);
// // darwin name of macos kernel
// console.log(os.platform());
// // prints ram in gb
// console.log(os.totalmem() / (1024 * 1024 * 1024));
// // to print process info
// console.log(process.env);

//
const { pbkdf2, pbkdf2Sync } = require("node:crypto");
const { performance } = require("perf_hooks");

const starttime = performance.now();
const hash = pbkdf2Sync(
  "Shubham-kumar",
  "cookiewastaken",
  100000,
  64,
  "sha512",
);
const endtime = performance.now();
console.log("Time taken is : ", endtime - starttime);

console.log(hash.toString("hex"));
