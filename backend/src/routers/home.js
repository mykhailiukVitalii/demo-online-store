const Router = require("express");
const homeRouter = new Router();
const homeController = require("../controllers/homeController")

homeRouter.get("/", homeController.gethomepageStatic);

module.exports = homeRouter;