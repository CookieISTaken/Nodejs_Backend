const fs = require("fs");

fs.writeFile("./hello.txt", "written asynchronously", (err, data) => {
  if (err) {
    console.log("Problem while writing the file");
  } else {
    console.log("writting successfull");
  }
});

fs.readFile("./hello.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("could not read file");
  } else {
    console.log(data);
  }
});
