const router = require("express").Router();

//const isLoggedIn = require("../middleware/isLoggedIn");
//const isDonee = require("../middleware/isDonee");

const Donor = require("../models/donor.model");
const Product = require("../models/product.model");
const Alert = require("../models/alert.model");


router.get("/", async (req, res, next) => {
  try {
    const productsAvailable = await Product.find();
    const pendingAlerts = await Alert.find();
    //await pendingAlerts.populate("donee");
    //await pendingAlerts.populate("product");

    console.log("This is pendingAlerts from the get route", pendingAlerts)

    res.json({ productsAvailable, pendingAlerts});
  } catch (err) {
    res.status(400).json({
      errorMessage: "Error fetching products and alerts lists from server! " + err.message,
    });
  }
})

router.post("/:id", async (req, res, next) => {
  try {
      const productId = req.params.id;
      //console.log("params", req.params.id)
      const doneeId = req.session.user._id;
      //console.log("sessions", req.session.user._id)
      const productRequested = await Product.findOne({product: productId});
      //console.log("productRequested", productRequested)
      const donorToBeContacted = await Donor.findOne({donor: productRequested})
      //console.log("donorToBeContacted", donorToBeContacted)
      const newAlert = await Alert.create({ donee: doneeId, donor: donorToBeContacted, product: productRequested});
      await newAlert.save();
    
      await newAlert.populate("donee product")
      console.log("This is newAlert", newAlert)
      res.json({newAlert : newAlert})

  } catch (error) {
    res.status(400).json({
    errorMessage: "Error creating an alert!" + error.message,
    });
  }
});

module.exports = router;



 //const doneeId = req.session.user._id;
      //const productId = req.params.id;
  
      //const productRequested = await Product.findById({product: productId});
      
      //const donorToBeContacted = await Donor.findOne({productList: productId})
      
      //const newAlert = await Alert.create({ donee: doneeId, donor: donorToBeContacted, product: productRequested});
     // await newAlert.save();
      
      /*

      donorToBeContacted.alertsList.push(newAlert._id);
      await donorToBeContacted.save()*/