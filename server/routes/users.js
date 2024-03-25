const express = require("express");
const router = express.Router();
require("../models/users");
const {
  getUser,
  updateUser,
  signIn,
  deleteUser,
} = require("../controllers/userController");
const { ensureAuthenticated } = require("../middleware/auth");

router
  .route("/")
  .get(ensureAuthenticated, getUser)
  .put(ensureAuthenticated, updateUser)
  .post(ensureAuthenticated, signIn)
  .delete(ensureAuthenticated, deleteUser);

module.exports = router;
