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
  },
  donor: [{ type: Schema.Types.ObjectId, ref: "Donor" }]
});

const Product = model("Product", productSchema);

module.exports = Product;
