const { Schema, model } = require("mongoose");

const doneeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    role: {
      type: String,
      enum: ['donor', 'donee'],
      required: true,
    },
  }
);

const Donee = model("Donee", doneeSchema);

module.exports = Donee;
