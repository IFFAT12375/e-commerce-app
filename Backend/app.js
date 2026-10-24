const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");


const app = express();

// Environment variables are loaded in server.js before app is imported.
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", product);
app.use("/api", user);
app.use("/api", order);
// app.use("/api", payment);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;