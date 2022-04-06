const router = require("express").Router();



const Donor = require("../models/Donor.model");
const Product = require("../models/Product.model");

// READ
router.get("/home", async (req, res, next) => {
    try{
        const productsAvailable = await Product.find();
        res.json({ productsAvailable });
    } catch (err) {
        res.status(400).json({
          errorMessage: "Error fetching products from server! " + err.message,
        });
      }
})

/*
router.get("/profile/addproduct", (req, res, next) => {

})*/

// CREATE
router.post("/profile/addproduct",  async (req, res, next) => {
    try {
        const { title, description, image } = req.body;
        const donorId = req.session.user._id;

        if (!title) {
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


        const newProduct = new Product({title, description, image});
        await newProduct.save();
    
        await Donor.findByIdAndUpdate(donorId, {
          $push: { productList: [newProduct] },
        });
        res.json(); // incompleto
      } catch (err) {
        res.status(400).json({ errorMessage: "Internal Server Error" })
      }
});


//DELETE

router.delete("/profile",  async (req, res, next) => {
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

//Update
router.put("/profile",  async (req, res, next) => {
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
