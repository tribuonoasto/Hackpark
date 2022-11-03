const authController = require("../controllers/authController");
const Controller = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/login", authController.login);

router.post("/register", authController.register);

router.get("/users", Controller.getAllUsers);

router.use(authentication);

router.delete("/users", Controller.delete);

router.patch("/users", Controller.changeUsername);

router.get("/users/:id", Controller.getUser);

module.exports = router;
