const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const isDonor = require("../middleware/isDonor")

const Donor = require("../models/donor.model");
const Product = require("../models/product.model");

// READ????
// api/profile/
/*router.get("/home", (req, res, next) => {
  try{
    const productsAvailable = await Product.find();
    res.json({ productsAvailable });
} catch (err) {
    res.status(400).json({
      errorMessage: "Error fetching products from server! " + err.message,
    });
  }
})*/

//http://localhost:5005/api/profile/
router.get("/", /*isLoggedIn, isDonor, */ async (req, res, next) => {
  try{
    const id = req.session.user._id; 
    
    const donorData = await Donor.findOne({_id: id});

    res.json({ donorData }); //Para depois retirar list of products e de alerts
} catch (err) {
    res.status(400).json({
      errorMessage: "Error fetching products from server! " + err.message,
    });
  }
})

// CREATE   http://localhost:5005/api/profile/
router.post("/", /*isLoggedIn, isDonor, */async (req, res, next) => {
    try {
        const { title, description, image } = req.body;
        const donorId = req.session.user._id;

       /* if (!title) {
            return res
              .status(400)
              .json({ errorMessage: "Please provide a title to your product." });
        } else if (!description) {
            return res
              .status(400)
              .json({ errorMessage: "Please provide a description to your product." });
        } else if (!image) {
            return res
              .status(400)
              .json({ errorMessage: "Please provide an image of your product." });
        }
*/

        const newProduct = new Product({title, description, image});
        await newProduct.save();
    
        await Donor.findByIdAndUpdate(donorId, {
          $push: { productList: [newProduct] },
        });
        res.json({ message: "Product created " });
      } catch (err) {
        res.status(400).json({ errorMessage: "Internal Server Error Creating New Product" })
      }
});


//DELETE http://localhost:5005/api/profile/

router.delete("/", /*isLoggedIn, isDonor, */ async (req, res, next) => {
    try {
        const { id } = req.body;
        await Product.findByIdAndDelete(id);
        res.json({ message: "Product deleted "});
    } catch (err) {
      res
        .status(400)
        .json({ errorMessage: "Error deleting! " + err.message });
    }
});

//Update http://localhost:5005/api/profile/
router.put("/", /*isLoggedIn, isDonor, */ async (req, res, next) => {
    try {
        
        const { _id, title, description, image } = req.body;
      
        const updateProduct = await Product.findByIdAndUpdate(
            _id, 
            { title, description, image });
        
        res.json({ message: "Product updated " }); //incomplete
    } catch (err) {
      res
        .status(400)
        .json({ errorMessage: "Error deleting! " + err.message });
    }
});    
    

module.exports = router;
