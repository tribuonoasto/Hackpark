const authController = require("../controllers/authController");
const Controller = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/login", authController.login);

router.post("/register", authController.register);

router.get("/users", Controller.getAllUsers);

router.patch("/users/verify/:id", Controller.verify);

router.use(authentication);

router.delete("/users", Controller.delete);

router.patch("/users/changeusername", Controller.changeUsername);

router.patch("/users/changeImg", Controller.changeImg);

router.get("/users/:id", Controller.getUser);

module.exports = router;
