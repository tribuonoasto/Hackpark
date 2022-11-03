const authController = require("../controllers/authController");
const Controller = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/login", authController.login);

router.post("/register", authController.register);

router.get("/users", Controller.getAllUsers);

router.use(authentication);

router.get("/users/:id", Controller.getUser);

router.delete("/users/:id", Controller.delete);

router.patch("/users/:id", Controller.changeUsername);

module.exports = router;
