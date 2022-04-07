const router = require("express").Router();

const Product = require("../models/product.model");

//http://localhost:5005/api/allproducts

router.get("/", async (req, res, next) => {
    try{
        const productsAvailable = await Product.find();
        res.json({ productsAvailable });
    } catch (err) {
        res.status(400).json({
          errorMessage: "Error fetching doners lists from server! " + err.message,
        });
      }
  })

  module.exports = router;