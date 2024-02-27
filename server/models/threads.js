const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreadSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    chatId: {
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

const Thread =
  mongoose.models.Thread || mongoose.model("threads", ThreadSchema);

module.exports = Thread;
