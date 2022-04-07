const { Schema, model } = require("mongoose");

const alertSchema = new Schema({
  donee: { 
      type: Schema.Types.ObjectId, ref: "Donee"
  },
  product: { 
      type: Schema.Types.ObjectId, ref: "Product" 
}
});

const Alert = model("Alert", alertSchema);

module.exports = Alert;


router.post("/productinfo/:id", isDonee, async (req, res, next) => {
    try {
        const doneeId = req.session.user._id;
        const productId = req.params.id;
    
        const productRequested = await Product.find({product: productId});
    
        const alert = await Alert.create({ donee: doneeId, product: productRequested});
      

    } catch (error) {
        console.error(error);
        res.render("error");
    }
});