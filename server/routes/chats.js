const express = require("express");
const router = express.Router();
require("../models/threads");
const {
  getThread,
  generateResponse,
  deleteThread,
  getAllThreads,
} = require("../controllers/chatController");
const { ensureAuthenticated } = require("../middleware/auth");

router
  .route("/")
  .get(ensureAuthenticated, getThread)
  .delete(ensureAuthenticated, deleteThread)
  .post(ensureAuthenticated, generateResponse);

router.route("/all").get(ensureAuthenticated, getAllThreads);

module.exports = router;
