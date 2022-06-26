const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { check } = require("express-validator");

//GET methods
router.get("/auth", authMiddleware, userController.check);
router.get("/users", roleMiddleware(["ADMIN"]), userController.getUsers);
//POST methods
router.post(
	"/registration",
	[
		check('email', "Empty Email").notEmpty(),
		check('password', "Empty Password").notEmpty()
	],
	userController.registration);
router.post(
	"/login", 
	[
		check('email', "Empty Email").notEmpty(),
		check('password', "Empty Password").notEmpty()
	],
	userController.login
);
router.post(
	"/restore",
	[
		check('email', "Empty Email").notEmpty(),
		check('password', "Empty Password").notEmpty()
	],
	userController.resetPassword
);

module.exports = router;