const router = require("express").Router();

const csrfMiddleware = require("../middleware/csrfMiddleware");
const isLoggedIn = require("../middleware/isLoggedIn");
const isDonor = require("../middleware/isDonor")

const Donor = require("../models/donor.model");
const Product = require("../models/product.model");

// CRUD - app
router.get("/products", /*csrfMiddleware, isLoggedIn,*/ async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Error in fetching products from server! " + err.message,
    });
  }
});


//UPDATE
router.put("/products", csrfMiddleware, isLoggedIn, async (req, res, next) => {

  try {
    const { _id, title, description, image } = req.body;

    if (!_id) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide a valid _id in your request" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { title, description, image },
      { new: true }
    );
    res.json({
      message: "Successfully updated product!",
      updatedProduct: updatedProduct,
    });
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: "Error in updating product! " + err.message });
  }
});


//DELETE 
router.delete("/products/:id", csrfMiddleware, isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.json({ message: "Successfully delete product id: " + id });
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: "Error in deleting product!" + err.message });
  }
});


//POST
router.post("/products", csrfMiddleware, isLoggedIn, async (req, res, next) => {

  try {
    const { title, description, image } = req.body;
    console.log("Should create a new product with", title);

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

    const newProduct = new Product({ title, description, image });
    await newProduct.save();
/*
    const donorId = req.session.user._id;
    await Donor.findByIdAndUpdate(donorId, {
      $push: { productList: [newProduct] },
    });
*/
    res.json({ message: "Succesfully created product!", product: newProduct });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Please provide correct request body!" + err.message,
    });
  }
});

//http://localhost:5005/api/profile/
/*router.get("/", isLoggedIn, isDonor,  async (req, res, next) => {
  try {
    const id = req.session.user._id;

    const donorData = await Donor.findOne({ _id: id });

    res.json({ donorData }); //Para depois retirar list of products e de alerts
  } catch (err) {
    res.status(400).json({
      errorMessage: "Error fetching products from server! " + err.message,
    });
  }
})*/

module.exports = router;
