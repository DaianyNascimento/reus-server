const router = require("express").Router();

const csrfMiddleware = require("../middleware/csrfMiddleware");
const isLoggedIn = require("../middleware/isLoggedIn");
const isDonee = require("../middleware/isDonee");

const Donor = require("../models/donor.model");
const Product = require("../models/product.model");
const Alert = require("../models/alert.model");


router.get("/", csrfMiddleware, isLoggedIn, async (req, res, next) => {
  try {
    const productsAvailable = await Product.find();

    const pendingAlerts = await Alert.find({donor: req.session.user._id} ).populate("donee donor product");
    //console.log("This is body from pending aaalerts", req.session.user._id)
    //console.log("This is pendingAlerts from the get route", pendingAlerts)

    res.json({ productsAvailable, pendingAlerts });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Error fetching products and alerts lists from server! " + err.message,
    });
  }
})

router.post("/:id", isLoggedIn, isDonee, async (req, res, next) => {
  try {
      const productId = req.params.id;
      console.log("params", req.params.id)
      console.log("productId", productId)

      const doneeId = req.session.user._id;
      console.log("sessions", req.session.user._id)
      console.log("This is the doneeId", doneeId)
      
      const productRequested = await Product.findById({_id: productId});
      console.log("productRequested", productRequested)

      const donorAlert = await Donor.findOne({_id : productRequested.donor});

      console.log("This is donorAlert", donorAlert)

      const newAlert = await Alert.create({ donee: doneeId, donor: donorAlert, product: productRequested});
    
      await newAlert.populate("donee donor product")
      await newAlert.save();

      //console.log("This is newAlert", newAlert)
      res.json({newAlert : newAlert})

  } catch (error) {
    res.status(400).json({
    errorMessage: "Error creating an alert!" + error.message,
    });
  }
});

module.exports = router;


      
      /*

      donorToBeContacted.alertsList.push(newAlert._id);
      await donorToBeContacted.save()*/