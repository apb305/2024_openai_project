const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    chatId: {
      type: String,
      required: true,
    },
    chatTitle: {
        type: String,
        required: true,
    },
    threadId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Chat =
  mongoose.models.Chat || mongoose.model("chats", ChatSchema);

module.exports = Chat;
