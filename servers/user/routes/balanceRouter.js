const Controller = require("../controllers/balanceController");

const router = require("express").Router();

router.get("/", Controller.getBalance);

router.post("/payment", Controller.midTransRequest);

router.post("/notification/handling", Controller.notification);

module.exports = router;
