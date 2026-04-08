const express = require("express");

const ordersRouter = express.Router();

ordersRouter.get("/", (req, res) => {
  res.status(200).send("(GET) orders dummy response");
});

ordersRouter.post("/", (req, res) => {
  res.status(200).send("(POST) orders dummy response");
});

ordersRouter.patch("/", (req, res) => {
  res.status(200).send("(POST) orders dummy response");
});

ordersRouter.delete("/", (req, res) => {
  res.status(200).send("(DELETE) orders dummy response");
});

module.exports = { ordersRouter };
