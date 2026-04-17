const fsPromises = require("fs/promises");

const myReadFile = async (filePath) => {
  try {
    const data = await fsPromises.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.log("Error reading the file -> ", err.message);
    return [];
  }
};
const mySaveFile = async (filepath, newArr) => {
  try {
    const stringArr = JSON.stringify(newArr);
    await fsPromises.writeFile(filepath, stringArr);
  } catch (err) {
    console.log("Error Saving the file -> ", err.message);
  }
};

module.exports = {
  myReadFile,
  mySaveFile,
};
