const Controller = require("../controllers/balanceController");
const Index = require("../controllers/midtrans/payments");

const router = require("express").Router();

router.get("/", Controller.getBalance);

router.post("/va/charge", Index.bankTransfer);

module.exports = router;
