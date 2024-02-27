const mongoose = require("mongoose");
require("../models/users");
const User = mongoose.model("users");

const signIn = async (req, res) => {
  try {
    // Check if the user exists
    const userExists = await User.findOne({ _id: req.body.uid });
    if (userExists) {
      return res.status(200).json(userExists);
    } else {
        // Create a new user
      const user = await User.create({
        _id: req.body.uid,
        name: req.body.name,
        email: req.body.email,
      });
      return res.status(201).json(user);
    }
  } catch (error) {
   res.status(400).send("An error has occured");
  }
};

const getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.body.uid });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).send("An error has occured");
  }
};

const updateUser = async (req, res) => {
  const user = await User.findOne({ _id: req.body.uid });
  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    user.save();
    res.status(200).json(user);
  } else {
    res.status(400).send("An error has occured");
  }
};

module.exports = { signIn, getUser, updateUser };
