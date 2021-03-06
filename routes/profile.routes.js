const router = require("express").Router();
const csrfMiddleware = require("../middleware/csrfMiddleware");
const isLoggedIn = require("../middleware/isLoggedIn");
const Product = require("../models/product.model");
const Donor = require("../models/donor.model");
const Alert = require("../models/alert.model");

// CRUD - app
router.get("/products", csrfMiddleware, isLoggedIn, async (req, res, next) => {
  try {
    const currentDonorProducts = await Product.find({ donor: req.session.user._id });
    const [currentDonor] = await Donor.find({ _id: req.session.user._id });
    res.json({ currentDonorProducts, currentDonor });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Error in fetching products from server! " + err.message,
    });
  }
});

//UPDATE
router.put("/products", isLoggedIn, async (req, res, next) => {
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
router.delete("/products/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);

    alertToDelete = await Alert.findOne({ product: id });
    if (alertToDelete !== null) {
      await Alert.findByIdAndDelete(alertToDelete._id);
    }

    const donorOfDeletedProduct = await Donor.findOne({ _id: deletedProduct.donor });
    const productsList = donorOfDeletedProduct.productList;

    for (let i = 0; i < productsList.length; i++) {
      await Donor.findOneAndUpdate({ _id: donorOfDeletedProduct._id }, { "$pull": { productList: id } });
    }

    res.json({ message: "Successfully delete product id: " + id });
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: "Error in deleting product!" + err.message });
  }
});

//POST
router.post("/products", isLoggedIn, async (req, res, next) => {
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

    const newProduct = new Product({ title, description, image, donor: req.session.user._id });
    await newProduct.save();

    await Donor.findOneAndUpdate({ _id: req.session.user._id }, { "$push": { productList: newProduct } }, { new: true }).populate('productList');

    res.json({ message: "Succesfully created product!", product: newProduct });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Please provide correct request body!" + err.message,
    });
  }
});

module.exports = router;
