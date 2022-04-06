const { Schema, model } = require("mongoose");

const doneeSchema = new Schema(
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
    }
);

const Donee = model("Donee", doneeSchema);

module.exports = Donee;