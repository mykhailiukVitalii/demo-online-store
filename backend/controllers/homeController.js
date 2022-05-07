const path = require("path");

class HomeController {
    //TODO: description jsdoc
    async gethomepageStatic(req, res) {
        res
            .status(200)
            .sendFile(path.resolve(__dirname, "../static", "index.html"));
    }
}

module.exports = new HomeController();