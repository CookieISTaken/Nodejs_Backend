const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    description: String,
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const productModel = model("product", productSchema);

module.exports = { productModel };
