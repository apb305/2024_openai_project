const mongoose = require('mongoose')
require("dotenv").config();

const connectDB = () => {
  try {
   mongoose.connect(process.env.ATLAS_URI)
    console.log("MongoDB is connected...")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
