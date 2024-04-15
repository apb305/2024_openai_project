const express = require("express");
const router = express.Router();
require("../models/chats");
const {
  getChat,
  generateResponse,
  deleteChat,
  getAllChats,
  deleteAllChats,
} = require("../controllers/chatController");
const { ensureAuthenticated } = require("../middleware/auth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage });

router.post("/", ensureAuthenticated, upload.single("file"), generateResponse);

router.route("/get-chat").post(ensureAuthenticated, getChat);

router.route("/delete-chat").delete(ensureAuthenticated, deleteChat);

router.route("/all").post(ensureAuthenticated, getAllChats);

router.route("/delete-all").delete(ensureAuthenticated, deleteAllChats);

module.exports = router;
