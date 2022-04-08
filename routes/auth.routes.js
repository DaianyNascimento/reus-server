const router = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const Donor = require("../models/donor.model");
const Donee = require("../models/donee.model");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide all information." });
    }

    if (password.length < 8) {
      return res.status(400).json({
        errorMessage: "Your password needs to be at least 8 characters long.",
      });
    }

    if (role == 'donor') {
      const donorAlreadyExists = await Donor.findOne({ email });
      if (donorAlreadyExists) {
        return res.status(400).json({
          errorMessage: "Email already exists, please try a different one!",
        });
      }

      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);

      const donor = await new Donor({ name, email, password: hash, role });
      await donor.save();

      return res.json({ message: "Successfully signed up donor" });
    } else if (role == 'donee') {
      const doneeAlreadyExists = await Donee.findOne({ email });
      if (doneeAlreadyExists) {
        return res.status(400).json({
          errorMessage: "Email already exists, please try a different one!",
        });
      }

      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);

      const donee = await new Donee({ name, email, password: hash, role });
      await donee.save();

      return res.json({ message: "Successfully signed up donor" });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ errorMessage: "Something went wrong!" });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide email and password." });
    }

    if (password.length < 8) {
      return res.status(400).json({
        errorMessage: "Your password needs to be at least 8 characters long.",
      });
    }

    if (role == 'donor') {
      const donor = await Donor.findOne({ email });

      if (!donor) {
        throw Error();
      }

      const donorPasswordsMatch = await bcrypt.compare(password, donor.password);
      if (!donorPasswordsMatch) {
        throw Error();
      }

      const sessionDonor = { email: donor.email, _id: donor._id };
      req.session.user = sessionDonor;

      return res.json({ message: "Successfully logged in!", user: sessionDonor });

    } else if (role == 'donee') {

      const donee = await Donee.findOne({ email });

      if (!donee) {
        throw Error();
      }

      const doneePasswordsMatch = await bcrypt.compare(password, donee.password);
      if (!doneePasswordsMatch) {
        throw Error();
      }

      const sessionDonee = { email: donee.email, _id: donee._id };
      req.session.user = sessionDonee;

      return res.json({ message: "Successfully logged in!", user: sessionDonee });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      errorMessage: "Something went wrong - email and password don't match",
    });
  }
});

router.post("/logout", async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    return res.json({ message: "Successfully logged out!" });
  });
});

module.exports = router;
