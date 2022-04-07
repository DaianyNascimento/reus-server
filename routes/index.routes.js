const csrfMiddleware = require("../middleware/csrfMiddleware");
const router = require("express").Router();

const authRoutes = require("./auth.routes");
const profileRoutes = require("./profile.routes");
const alertRoutes = require("./alert.routes");

const Product = require("../models/product.model");

/* GET home page */ // http://localhost:5005/api
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//http://localhost:5005/api/home
router.get("/home", async (req, res, next) => {
  try{
      const productsAvailable = await Product.find();
      res.json({ productsAvailable });
  } catch (err) {
      res.status(400).json({
        errorMessage: "Error fetching doners lists from server! " + err.message,
      });
    }
})

router.get("/getCsrfToken", csrfMiddleware, (req, res, next) => {
  res.json({ csrfToken: req.csrfToken() });
});

// You put the next routes here 👇
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes)
router.use("/checkproduct", alertRoutes)

module.exports = router;
