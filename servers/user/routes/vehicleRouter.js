const Controller = require("../controllers/vehicleController");

const router = require("express").Router();

router.get("/", Controller.getVehicle);

router.patch("/", Controller.changeImg);

module.exports = router;
