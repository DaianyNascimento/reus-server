const csrfMiddleware = require("../middleware/csrfMiddleware");
const router = require("express").Router();

const authRoutes = require("./auth.routes");
const profileRoutes = require("./profile.routes");
const alertRoutes = require("./alert.routes");
const productsRoutes = require("./products.routes");



/* GET home page */ // http://localhost:5005/api
router.get("/", (req, res, next) => {
  res.json("All good in here");
});


router.get("/getCsrfToken", csrfMiddleware, (req, res, next) => {
  res.json({ csrfToken: req.csrfToken() });
});

// You put the next routes here 👇
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes)
router.use("/checkproduct", alertRoutes)
router.use("/allproducts", productsRoutes)

module.exports = router;
