const Router = require("express");
const router = new Router();
const roleMiddleware = require("../middlewares/roleMiddleware");
const productController = require("../controllers/productController");
const { check } = require("express-validator");

//GET methods
router.get("/products", productController.getProducts);
router.get("/:id", productController.getProduct);
//POST methods
router.post(
	"/newproduct",
	[
		check('name', "Name field").notEmpty(),
		check('price', "Price field").notEmpty(),
		check('img', "img field").notEmpty(),
	],
	roleMiddleware(["ADMIN"]),
	productController.createProduct);

module.exports = router;