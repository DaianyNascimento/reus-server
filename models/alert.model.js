const { Schema, model } = require("mongoose");

const alertSchema = new Schema({
  donee: { 
      type: Schema.Types.ObjectId, ref: "Donee", required: true
  },
  donor: {
    type: Schema.Types.ObjectId, ref: "Donor", required: true
  },
  product: { 
      type: Schema.Types.ObjectId, ref: "Product" 
}
});

const Alert = model("Alert", alertSchema);

module.exports = Alert;
