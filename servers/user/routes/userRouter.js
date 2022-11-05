const router = require("express").Router();
const Controller = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

router.get("/", Controller.getAllUsers);

router.patch("/verify/:id", Controller.verify);

router.use(authentication);

router.delete("/", Controller.delete);

router.patch("/changeusername", Controller.changeUsername);

router.patch("/changeImg", Controller.changeImg);

router.patch("/changeBalance", Controller.changeBalance);

router.get("/:id", Controller.getUser);

module.exports = router;
