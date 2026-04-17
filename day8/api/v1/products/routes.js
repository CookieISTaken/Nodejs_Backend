const express = require("express");
const { myReadFile, mySaveFile } = require("../../../utils/file_helper");
const {
  createProductController,
  updateProductController,
  getProductsController,
} = require("./controllers");
const { validateProductForCreation } = require("./dto");

const productsRouter = express.Router();

productsRouter.get("/", getProductsController);

// middleware chaining meaning once the firstone is done then only the nextone will be called
// first one is validating that product is given in correct format
productsRouter.post("/", validateProductForCreation, createProductController);
productsRouter.patch("/:prodId", updateProductController);

productsRouter.delete("/:prodId", async (req, res) => {
  const { prodId } = req.params;
  const products = await myReadFile("./products.json");
  const idx = products.findIndex((elem) => {
    return elem.id === prodId;
  });
  if (idx === -1) {
    res.status(404).json({
      isSuccess: false,
      message: "Invalid product id",
    });
  }
  // to remove from the products array
  products.splice(idx, 1);
  await mySaveFile("products.json", products);
  res.status(200).json({
    isSuccess: true,
    message: "Product removed!",
    data: {
      data: products,
    },
  });
});

module.exports = { productsRouter };
