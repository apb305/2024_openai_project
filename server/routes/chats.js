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
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post("/", ensureAuthenticated, upload.single('file'), generateNewChat);

router.route("/")
  .get(ensureAuthenticated, getChat)
  .delete(ensureAuthenticated, deleteChat);

router.route("/all").get(ensureAuthenticated, getAllChats);

module.exports = router;
