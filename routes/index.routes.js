const csrfMiddleware = require("../middleware/csrfMiddleware");
const router = require("express").Router();
const authRoutes = require("./auth.routes");
const homeProductsRoutes = require("./homeProducts.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/getCsrfToken", csrfMiddleware, (req, res, next) => {
  res.json({ csrfToken: req.csrfToken() });
});

// You put the next routes here 👇
router.use("/auth", authRoutes);
router.use(require("./profile.routes"));
router.use("/homeProducts", homeProductsRoutes);
router.use(require("./verifySession.routes"));

module.exports = router;
