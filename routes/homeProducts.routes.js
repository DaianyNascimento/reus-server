const router = require("express").Router();

const csrfMiddleware = require("../middleware/csrfMiddleware");
const isLoggedIn = require("../middleware/isLoggedIn");
const isDonee = require("../middleware/isDonee");

const Donor = require("../models/donor.model");
const Product = require("../models/product.model");
const Alert = require("../models/alert.model");

router.get("/", async (req, res, next) => {
  try {
    const productsAvailable = await Product.find();
    res.json({ productsAvailable });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Error fetching products and alerts lists from server! " + err.message,
    });
  }
})

router.get("/alerts", csrfMiddleware, isLoggedIn, async (req, res, next) => {
  try {
    const pendingAlerts = await Alert.find({ donor: req.session.user._id }).populate("donee donor product");
    res.json({ pendingAlerts });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Error fetching alerts from server! " + err.message,
    });
  }
})

router.post("/:id", isLoggedIn, isDonee, async (req, res, next) => {
  try {
    const productId = req.params.id;
    const doneeId = req.session.user._id;
    const productRequested = await Product.findById({ _id: productId });
    const donorAlert = await Donor.findOne({ _id: productRequested.donor });
    const newAlert = await Alert.create({ donee: doneeId, donor: donorAlert, product: productRequested });

    await newAlert.populate("donee donor product")
    await newAlert.save();

    res.json({ newAlert: newAlert })
  } catch (error) {
    res.status(400).json({
      errorMessage: "Error creating an alert!" + error.message,
    });
  }
});

module.exports = router;