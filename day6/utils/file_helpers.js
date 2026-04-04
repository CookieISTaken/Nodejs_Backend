const { chownSync } = require("fs");
const fsPromises = require("fs/promises");
const myReadFile = async (filePath) => {
  try {
    const data = await fsPromises.readFile(filePath, "utf-8");
    // method to convert
    // JSON(string) ==> JSON(Object)
    return JSON.parse(data);
  } catch (err) {
    console.log("Error reading the file : -> ", err.message);
    return [];
  }
};

const mySaveFile = async (filePath, newArr) => {
  try {
    // to convert
    // JSON(Object) ==> JSON(String)
    const convertedArr = JSON.stringify(newArr);
    await fsPromises.writeFile(filePath, convertedArr);
  } catch (err) {
    console.log("Error Saving the file : -> ", err.message);
  }
};

module.exports = {
  myReadFile,
  mySaveFile,
};
