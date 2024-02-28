const express = require("express");
const router = express.Router();
require("../models/chats");
const {
  getChat,
  generateNewChat,
  deleteChat,
  getAllChats,
} = require("../controllers/chatController");
const { ensureAuthenticated } = require("../middleware/auth");

router
  .route("/")
  .get(ensureAuthenticated, getChat)
  .delete(ensureAuthenticated, deleteChat)
  .post(ensureAuthenticated, generateNewChat);

router.route("/all").get(ensureAuthenticated, getAllChats);

module.exports = router;
