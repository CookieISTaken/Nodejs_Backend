const express = require("express");
const { myReadFile, mySaveFile } = require("../../../utils/file_helper");
const { v4: uuidv4 } = require("uuid");

const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  const data = await myReadFile("./products.json");
  res.status(200).json({
    products: data,
  });
});

productsRouter.post("/", async (req, res) => {
  const prod = req.body;
  const olddata = await myReadFile("./products.json");
  const idx = olddata.findIndex((elem) => {
    return elem.name === prod.name;
  });
  if (idx === -1) {
    prod.id = uuidv4();
    olddata.push(prod);
    await mySaveFile("./products.json", olddata);

    res.status(200).json({
      message: "Added to DB !",
      productLists: {
        data: olddata,
      },
    });
  } else {
    res.status(409).json({
      isSuccess: false,
      message: "Product already exits duplicate product",
    });
  }
});

productsRouter.patch("/:prodId", async (req, res) => {
  const newdata = req.body;
  const { prodId } = req.params;
  const products = await myReadFile("./products.json");
  const idx = products.findIndex((elem) => {
    return elem.id === prodId;
  });
  if (idx == -1) {
    res.status(400).json({
      isSuccess: false,
      message: "Invalid Product Id.",
    });
    return;
  }
  const oldProd = products[idx];
  products[idx] = { ...oldProd, ...newdata };
  await mySaveFile("./products.json", products);
  res.status(200).json({
    isSuccess: true,
    message: "Product updated!",
    data: {
      products: products[idx],
    },
  });
});

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
