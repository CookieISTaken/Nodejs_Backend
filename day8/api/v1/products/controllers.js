const { saveProduct, readProducts } = require("../../../models/productModel");
const { myReadFile, mySaveFile } = require("../../../utils/file_helper");
const { v4: uuidv4 } = require("uuid");

const getProductsController = async (req, res) => {
  try {
    const products = await readProducts();
    res.status(200).json({
      isSuccess: true,
      message: "Products Fetched",
      data: {
        products,
      },
    });
  } catch (err) {
    console.log("--- Error in getProductsController ----", err.message);
    res.status(500).json({
      isSucess: false,
      message: "Internal Server Error",
    });
  }
};

const createProductController = async (req, res) => {
  try {
    const data = req.body;
    await saveProduct(data);
    res.status(200).json({
      isSuccess: true,
      message: "Product created !",
    });
  } catch (err) {
    console.log("--- Error in createProductsController ----", err.message);
    res.status(500).json({
      isSucess: false,
      message: err.message,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
  } catch (err) {
    console.log("---- Error in updateProductController", err.message);
    res.status(500).json({
      isSucess: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createProductController,
  getProductsController,
  updateProductController,
};
