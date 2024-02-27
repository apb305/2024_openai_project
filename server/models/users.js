const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true, 
    },
  },
  { timestamps: true }
);

// Check if the model exists before creating it to avoid overwriting
const User = mongoose.models.User || mongoose.model("users", UserSchema);

module.exports = User;
