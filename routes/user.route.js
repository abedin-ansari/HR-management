const express = require("express");
const { UserModel } = require("../models/userModel");
const { blackListTokenModel } = require("../models/blacklist.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "Server error occurred" });
      } else {
        const user = new UserModel({ email, password: hash });
        await user.save();
        res.status(201).json({ msg: "Registration successful" });
      }
    });
  } catch (err) {
    res.status(400).json({ msg: "Registration failed", error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          const refresh_token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );
          res
            .status(200)
            .json({ msg: "Login Successful!", token, refresh_token });
        } else {
          res.status(200).json({ msg: "Wrong Password" });
        }
      });
    }
  } catch (err) {
    res.status(400).json({ msg: "Oops! Register first" });
    console.log(err);
  }
});

userRouter.get("/logout", auth, async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const blacklist = new blackListTokenModel({ token });
    await blacklist.save();
    res.status(200).json({ msg: "Logged out" });
  } catch (err) {
    res.status(400).json({ error: "err" });
  }
});

module.exports = {
  userRouter,
};
