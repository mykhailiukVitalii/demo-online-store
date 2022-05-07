require('dotenv').config();
const express = require("express");
//Files
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const router = require("./routes/index")
const homeRouter = require("./routes/home") //TODO: need to fix
const errorHandler = require("./middlewares/ErrorHandlingMiddleware")

//APP CONSTANTs
// set port, listen for requests
const PORT = process.env.PORT || 5053;

//APP basic functions
const app = express(); //TODO: прочитать что такое Експресс и его основные ништяки

//simple additional settings
app.use(cors()) //TODO: что такое use() и как это работает в Nodejs
app.use(express.json())

// // simple route
// app.use(homeRouter) //TODO: для демо - после удалить
// app.get("/", (req, res) => {
//     res
//         .status(200)
//         .sendFile(path.resolve(__dirname, "static", "index.html"));
// });
app.use("/api", router)

//Обработка ошибок, последний должен быть Middleware

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
          });
    } catch (e) {
        console.log("Server unknown error: ", e);
    }
}

start();