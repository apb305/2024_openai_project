const express = require("express");
require('./services/sentry');
const app = express();
const cors = require("cors");
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const users = require("./routes/users");
const chats = require("./routes/chats");
require("dotenv").config();

// Connect DB
connectDB();

// Init Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors());

// Use routes
app.use("/api/users", users);
app.use("/api/chats", chats);

// Test Sentry error
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

// Sentry error handler - must be last in middleware chain
app.use(errorHandler)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));