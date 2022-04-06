const { Schema, model } = require("mongoose");

const donorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isDonor: {
      type: Boolean,
      required: true,
    },
    productList: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    doneeList: [{ type: Schema.Types.ObjectId, ref: "Donee" }],
  }
);

const Donor = model("Donor", donorSchema);

module.exports = Donor;
