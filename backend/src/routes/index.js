const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter")
// const homeRouter = require("./home")

router.use("/user", userRouter)
//Home static route TODO: update
// router.use("/", homeRouter)
//TODO: add product....

module.exports = router;