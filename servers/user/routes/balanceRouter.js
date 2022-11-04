const Controller = require("../controllers/balanceController");

const router = require("express").Router();

router.get("/", Controller.getBalance);

module.exports = router;
