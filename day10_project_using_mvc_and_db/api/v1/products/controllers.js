const { productModel } = require("../../../models/productSchema");

const createProductController = async (req, res) => {
  try {
    const product = req.body;
    // to create a document
    const newProduct = await productModel.create(product);
    res.status(201).json({
      isSuccess: true,
      message: "Product added to DB!",
      data: {
        newProduct,
      },
    });
  } catch (err) {
    console.log(
      "-----------------Error in createProductController -----------------",
      err.message,
    );

    if (err.code === 11000) {
      return res.status(400).json({
        isSuccess: false,
        message: "Duplicate not allowed: " + err.message,
        data: {},
      });
    }

    res.status(500).json({
      isSuccess: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const getAllProductsController = async (req, res) => {
  try {
    console.log("Inside getAllProductsController");
    const allProducts = await productModel.find();
    res.status(200).json({
      isSuccess: true,
      message: "All Products list",
      data: {
        products: allProducts,
      },
    });
  } catch (err) {
    console.log("Error Encountered in getAllProductsController", err.message);
    res.status(500).json({
      message: "Internal Server Error",
      data: {},
    });
  }
};

module.exports = { createProductController, getAllProductsController };
