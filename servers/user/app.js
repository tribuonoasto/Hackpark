if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const router = require("./routes/router");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandler);

module.exports = app;
