const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")
//GET methods
router.get("/auth", authMiddleware, userController.checkUser);
//POST methods
router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/restore", userController.resetPassword);

//old version without conroller
// router.get("/auth", (req, res) => {
//     res
//         .status(200)
//         .json({ message: "Auth works" });
// });

module.exports = router;