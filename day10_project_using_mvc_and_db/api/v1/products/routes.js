const express = require("express");
const {
  createProductController,
  getAllProductsController,
} = require("./controllers");
const { createProductValidator } = require("./dto");
const productRouter = express.Router();

productRouter.post("/", createProductValidator, createProductController);
productRouter.get("/", getAllProductsController);

module.exports = { productRouter };
