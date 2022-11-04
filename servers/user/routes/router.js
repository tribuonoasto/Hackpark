const authController = require("../controllers/authController");
const authentication = require("../middlewares/authentication");
const userRouter = require("./userRouter");
const balanceRouter = require("./balanceRouter");
const vehicleRouter = require("./vehicleRouter");

const router = require("express").Router();

router.post("/login", authController.login);

router.post("/register", authController.register);

router.use("/users", userRouter);

router.use("/balances", authentication, balanceRouter);

router.use("/vehicles", authentication, vehicleRouter);

module.exports = router;
