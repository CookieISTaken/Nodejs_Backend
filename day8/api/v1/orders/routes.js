const express = require("express");
const { myReadFile, mySaveFile } = require("../../../utils/file_helper");
const { v4: uuidv4 } = require("uuid");

const ordersRouter = express.Router();

ordersRouter.get("/", async (req, res) => {
  const orderlist = await myReadFile("./orders.json");
  res.status(200).json({
    isSuccess: true,
    data: {
      orderlist,
    },
  });
});

ordersRouter.post("/:prodId", async (req, res) => {
  const { prodId } = req.params;
  const { quantity } = req.body;
  const productsList = await myReadFile("./products.json");
  const idx = productsList.findIndex((elem) => {
    return elem.id === prodId;
  });
  if (idx === -1) {
    res.status(409).json({
      isSuccess: false,
      message: "Invalid Product id!",
    });
  } else {
    if (productsList[idx].quantity == 0) {
      res.status(409).json({
        isSuccess: false,
        message: "Prodcut out of stock!",
      });
    } else {
      const currentprod = productsList[idx];
      productsList[idx] = {
        ...currentprod,
        quantity: currentprod.quantity - quantity,
      };
      await mySaveFile("./products.json", productsList);
      const orderList = await myReadFile("./orders.json");
      const neworder = {
        prodId: prodId,
        quantity: quantity,
        id: uuidv4(),
      };
      orderList.push(neworder);
      await mySaveFile("./orders.json", orderList);
      res.status(200).json({
        isSuccess: true,
        message: "Order Confirm",
        order: {
          name: productsList[idx].name,
          quantity: quantity,
        },
      });
    }
  }
});

ordersRouter.patch("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { newquantity } = req.body;
  const orderList = await myReadFile("./orders.json");
  const idx = orderList.findIndex((elem) => {
    return elem.id === orderId;
  });
  console.log("Code running till here!!");
  if (idx === -1) {
    res.status(404).json({
      isSuccess: false,
      message: "Invalid order id!",
    });
  } else {
    const extraprod = orderList[idx].quantity - newquantity;
    console.log("Code running till here 2!!");
    const productsList = await myReadFile("./products.json");
    const prodId = orderList[idx].prodId;
    const prodIdx = productsList.findIndex((elem) => {
      return elem.id === prodId;
    });
    const oldProd = productsList[prodIdx];
    productsList[prodIdx] = {
      ...oldProd,
      quantity: oldProd.quantity + extraprod,
    };
    console.log("Code running till here 3!!");
    await mySaveFile("./products.json", productsList);

    const oldOrder = orderList[idx];
    orderList[idx] = { ...oldOrder, quantity: newquantity };
    await mySaveFile("./orders.json", orderList);
    res.status(200).json({
      isSuccess: true,
      message: "Order modified",
    });
  }
});

ordersRouter.delete("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const ordersList = await myReadFile("./orders.json");
  const idx = ordersList.findIndex((elem) => {
    return elem.id === orderId;
  });
  if (idx === -1) {
    res.status(404).json({
      isSuccess: false,
      message: "Invalid order id!",
    });
  } else {
    const prodId = ordersList[idx].prodId;
    const orderQuatity = ordersList[idx].quantity;
    const productsList = await myReadFile("./products.json");
    const prodIdx = productsList.findIndex((elem) => {
      return elem.id === prodId;
    });
    const oldProd = productsList[prodIdx];
    productsList[prodIdx] = {
      ...oldProd,
      quantity: productsList[prodIdx].quantity + orderQuatity,
    };
    await mySaveFile("./products.json", productsList);
    ordersList.splice(idx, 1);
    await mySaveFile("./orders.json", ordersList);
    res.status(200).json({
      isSuccess: true,
      message: "Order deleted",
    });
  }
});

module.exports = { ordersRouter };
