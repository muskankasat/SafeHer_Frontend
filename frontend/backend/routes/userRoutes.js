const express = require("express");
const router = express.Router();
const User = require("../models/User");
const axios = require("axios");

router.post("/verify-email", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({
        message: "Email already verified",
        user
      });
    }

    // Create new user
    user = new User({
      email: email,
    });

    await user.save();

    res.status(201).json({
      message: "User saved successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/google-login", async (req, res) => {
  try {
    const { access_token } = req.body;

    // Fetch user info from Google
    const googleResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    const { id, email } = googleResponse.data;

    // Check if user exists
    let user = await User.findOne({ googleId: id });
    if (!user) {
      user = await User.findOne({ email });
      if (user) {
        // Update with googleId
        user.googleId = id;
        await user.save();
      } else {
        // Create new user
        user = new User({
          email,
          googleId: id
        });
        await user.save();
      }
    }

    res.status(200).json({
      message: "Google login successful",
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
