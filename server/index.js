const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const connectDB = require('./config/db')
const users = require("./routes/users")
const chats = require("./routes/chats")
require("dotenv").config();

//Connect DB
connectDB()

//Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cors
app.use(cors());

//Use routes
app.use("/api/users", users);
app.use("/api/chats", chats);

// Serve Static assets for production
if (process.env.NODE_ENV === "production") {
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));
