const router = require("express").Router();

//const isLoggedIn = require("../middleware/isLoggedIn");
//const isDonee = require("../middleware/isDonee");
//const csrfMiddleware = require("../middleware/csrfMiddleware");

//const Donor = require("../models/donor.model");
//const Donee = require("../models/donee.model");
const Product = require("../models/product.model");
//const Alert = require("../models/alert.model");


router.get("/", async (req, res, next) => {
  try {
    const productsAvailable = await Product.find();
    res.json({ productsAvailable });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Error fetching products available lists from server! " + err.message,
    });
  }
})
/*
router.post("/:id", csrfMiddleware,isLoggedIn, isDonee, async (req, res, next) => {
  try {
      const doneeId = req.session.user._id;
      const productId = req.params.id;
  
      const productRequested = await Product.findById({product: productId});
      
      const donorToBeContacted = await Donor.findOne({productList: productId})
      
      const newAlert = await Alert.create({ donee: doneeId, donor: donorToBeContacted, product: productRequested});
      await newAlert.save();

      res.json({alert : newAlert})

  } catch (error) {
    res.status(400).json({
    errorMessage: "Error creating an alert!" + err.message,
    });
  }
});
*/


module.exports = router;