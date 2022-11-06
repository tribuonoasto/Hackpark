const authController = require("../controllers/authController");
const Controller = require("../controllers/balanceController");
const authentication = require("../middlewares/authentication");
const userRouter = require("./userRouter");
const balanceRouter = require("./balanceRouter");
const vehicleRouter = require("./vehicleRouter");
const authorize = require("../middlewares/authorize");

const router = require("express").Router();

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/notification", Controller.paymentNotif);

router.use("/users", userRouter);

router.use("/balances", authentication, authorize, balanceRouter);

router.use("/vehicles", authentication, authorize, vehicleRouter);

module.exports = router;
