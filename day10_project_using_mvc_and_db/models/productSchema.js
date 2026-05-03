const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0,
    },
    description: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const productModel = model("product", productSchema);

module.exports = { productModel };
