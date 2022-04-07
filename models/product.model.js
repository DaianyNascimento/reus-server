const { Schema, model } = require("mongoose");


const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  }
});

const Product = model("Product", productSchema);

module.exports = Product;
