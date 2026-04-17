const { v4: uuidv4 } = require("uuid");
const { myReadFile, mySaveFile } = require("../utils/file_helper");

const PRODUCT_FILE_PATH = "./models/products.json";
const saveProduct = async (data) => {
  const products = await myReadFile(PRODUCT_FILE_PATH);
  const idx = products.findIndex((elem) => {
    if (elem.name === data.name) {
      return true;
    } else return false;
  });

  if (idx !== -1) {
    throw new Error("Product with given title already exists !");
  }
  data.id = uuidv4();
  products.push(data);
  await mySaveFile(PRODUCT_FILE_PATH, products);
};

const readProducts = async () => {
  const products = await myReadFile(PRODUCT_FILE_PATH);
  return products;
};

module.exports = { saveProduct, readProducts };
