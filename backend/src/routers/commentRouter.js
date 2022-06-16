const Router = require("express");
const router = new Router();
const roleMiddleware = require("../middlewares/roleMiddleware");
const commentController = require("../controllers/commentController");
const { check } = require("express-validator");

//GET methods
router.get("/comments", commentController.getComments);
// router.get("/:id", productController.getProduct);
// //POST methods
// router.post(
// 	"/new",
// 	[
// 		check('name', "Name field").notEmpty(),
// 		check('price', "Price field").notEmpty(),
// 		check('img', "img field").notEmpty(),
// 	],
// 	productController.createProduct);


module.exports = router;