const Controller = require("../controllers/vehicleController");
const upload = require("../middlewares/multer");

const router = require("express").Router();

router.get("/", Controller.getVehicle);

router.patch("/:vehicleId", upload.single("image"), Controller.changeImg);

router.post("/", Controller.create);

router.delete("/:id", Controller.delete);

module.exports = router;
