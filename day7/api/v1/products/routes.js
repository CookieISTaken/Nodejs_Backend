const express = require("express");

const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  res.status(200).send("(GET) products dummy response");
});

productsRouter.post("/", (req, res) => {
  res.status(200).send("(POST) products dummy response");
});

productsRouter.patch("/", (req, res) => {
  res.status(200).send("(POST) products dummy response");
});

productsRouter.delete("/", (req, res) => {
  res.status(200).send("(DELETE) products dummy response");
});

module.exports = { productsRouter };
