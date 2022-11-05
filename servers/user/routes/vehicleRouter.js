const Controller = require("../controllers/vehicleController");

const router = require("express").Router();

router.get("/", Controller.getVehicle);

router.patch("/", Controller.changeImg);

router.post("/", Controller.create);

router.delete("/:id", Controller.delete);

module.exports = router;
