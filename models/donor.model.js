const { Schema, model } = require("mongoose");

const donorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  role: {
    type: String,
    enum: ["donor", "donee"],
    required: true,
  },
  productList: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  doneeList: [{ type: Schema.Types.ObjectId, ref: "Donee" }],
});

const Donor = model("Donor", donorSchema);

module.exports = Donor;
