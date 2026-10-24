const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");

const app = express();

// Environment variables are loaded in server.js before app is imported.
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;