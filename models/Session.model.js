const { Schema, model } = require("mongoose");

const SessionSchema = new Schema(
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

const Session = model("Session", SessionSchema);

module.exports = Session;