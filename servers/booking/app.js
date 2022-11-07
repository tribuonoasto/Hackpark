if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routes");
const app = express();

const { mongoConnect } = require("./config/mongo");
const task = require("./cron/cron");
const port = process.env.PORT || 4002;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);
app.use(errorHandler);

mongoConnect().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    task.start();
  });
});

module.exports = app;
