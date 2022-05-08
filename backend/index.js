require('dotenv').config();
const sequelize = require("./db");
const app = require("./app");

//APP CONSTANTs(provide App port)
const PORT = process.env.PORT || 5053;
//START server functionality
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
          });
    } catch (e) {
        console.log("Server unknown error: ", e);
        process.exit();
    }
}

start();