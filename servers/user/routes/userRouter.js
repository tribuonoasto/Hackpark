const router = require("express").Router();
const Controller = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const upload = require("../middlewares/multer");

router.get("/", Controller.getAllUsers);

router.patch("/verify/:id", Controller.verify);

router.use(authentication);

router.delete("/", Controller.delete);

router.patch("/changeusername", Controller.changeUsername);

router.patch("/changeImg", upload.single("image"), Controller.changeImgUser);

router.patch("/changeBalancePayment", Controller.changeBalancePayment);

router.get("/:id", Controller.getUser);

module.exports = router;
