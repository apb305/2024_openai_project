const express = require("express");
const router = express.Router();
require("../models/users")
const { getUser, updateUser, signIn } = require("../controllers/userController");
const { ensureAuthenticated } = require("../middleware/auth");

router
    .route("/")
    .get(ensureAuthenticated, getUser).put(ensureAuthenticated, updateUser).post(ensureAuthenticated, signIn);

module.exports = router;