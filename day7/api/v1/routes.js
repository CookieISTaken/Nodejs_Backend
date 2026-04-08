const express = require("express");
const { productsRouter } = require("./products/routes");
const { ordersRouter } = require("./orders/routes");
const apiRouter = express.Router();

// router level middleware
apiRouter.use((req, res, next) => {
  console.log("Printed by middleware!!");
  next();
});

apiRouter.use("/orders", ordersRouter);

apiRouter.use("/products", productsRouter);

module.exports = { apiRouter };
