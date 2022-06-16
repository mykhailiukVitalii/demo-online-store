const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const commentRouter = require("./commentRouter");
// const homeRouter = require("./home")

router.use("/user", userRouter)
//Home static route TODO: update
// router.use("/", homeRouter)
//TODO: add product....
router.use("/product", productRouter)
//comments
router.use("/comment", commentRouter)

module.exports = router;