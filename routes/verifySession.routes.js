const router = require("express").Router();

router.get("/verifySession", async (req, res, next) => {
    try {
        const user = req.session.user;
        res.json({ user });
    } catch (err) {
        res.status(401).json({ errorMessage: "Session does not exist." });
    }
});

module.exports = router;