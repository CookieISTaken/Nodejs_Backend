require("dotenv").config();
const express = require("express");
const { productModel } = require("./models/productSchema.js");
require("./config/db.js");
const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newProduct = await productModel.create({
      title: data.title,
      price: data.price,
      description: data.description,
      quantity: data.quantity,
    });
    console.log(newProduct);
    res.status(201).json({
      isSuccess: true,
      message: "Product created!",
    });
  } catch (err) {
    console.log(err);
    if (err.name === "ValidationError" || err.code == "11000") {
      res.status(400).json({
        isSuccess: false,
        message: `Validation failed ${err.message}`,
      });
    } else {
      res.status(500).json({
        isSuccess: false,
        message: "Internal server error",
      });
    }
  }
});

app.listen(3000, () => {
  console.log("Server running at port 3000");
});
