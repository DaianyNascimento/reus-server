const router = require("express").Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const isDonee = require("../middleware/isDonee");

const Donor = require("../models/donor.model");
const Donee = require("../models/donee.model");
const Product = require("../models/product.model");
const Alert = require("../models/alert.model");


router.get("/:id", isLoggedIn, isDonee, async (req, res, next) => {
    try{
            const productsAvailable = await Product.find();

            res.json({ productsAvailable });


    } catch (err) {
            res.status(400).json({
              errorMessage: "Error fetching doners lists from server! " + err.message,
            });
    }
          
});

router.post("/:id", isLoggedIn, isDonee, async (req, res, next) => {
    try {
        const doneeId = req.session.user._id;
        const productId = req.params.id;
    
        const productRequested = await Product.findById({product: productId});
        
        const donorToBeContacted = await Donor.findOne({productList: productId})
        
        const alert = await Alert.create({ donee: doneeId, donor: donorToBeContacted, product: productRequested});
      
        await Donor.findOneAndUpdate(donorToBeContacted, {
          $push: { alertList: [alert] },
        });


    } catch (error) {
        console.error(error);
        res.render("error");
    }
});

module.exports = router;