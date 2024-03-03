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

router.route("/get-chat")
  .post(ensureAuthenticated, getChat)
  .delete(ensureAuthenticated, deleteChat);

router.route("/all").post(ensureAuthenticated, getAllChats);

module.exports = router;
