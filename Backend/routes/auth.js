const express = require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
var fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = "abhishekiNotes@";

//Route 1: Create User
router.post(
  "/createuser",
  [
    body("name", "Please provide your First Name.").isLength({ min: 4 }),
    body("email", "Please provide a valid Email address.").isEmail(),
    body("password", "Please provide a desired Password.")
      .optional()
      .isLength({ min: 6 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "Sorry a user having same email exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success, authtoken });
    } 
    catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);
// .then(user=> res.json(user))
// .catch(err=> console.log(err));

// Route 2: Authenticate a user -- Login
router.post(
  "/login",
  [
    body("email", "Please provide a valid Email address.").isEmail(),
    body("password", "Password is required.").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Invalid credentials. User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ error: "Invalid credentials. Password incorrect" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(payload, JWT_SECRET);
      res.json({ success: true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);
//Router 3: Fetching User

router.post(
  "/getuser",fetchUser,async (req, res) => {
try {
  userId= req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.log(error.message);
  res.status(500).send("Internal server error occured.");
}})

module.exports = router;
